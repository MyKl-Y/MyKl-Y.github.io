import React, { useCallback, useEffect, useState } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import cytoscape from 'cytoscape';
import fcose from 'cytoscape-fcose';
import { useTheme } from '../../../../context/theme/ThemeContext';

// Register fcose layout
cytoscape.use(fcose);

//TODO: On click of course, set course as complete

const DegreeGraph = ({ selectedDegree }) => {
    const { currentTheme } = useTheme();
    const [elements, setElements] = useState([]);
    const [hiddenChildren, setHiddenChildren] = useState({});

    const calculateTotalDescendants = useCallback((node, elements) => {
        const children = elements.filter((el) => el.data.source === node.data.id);
        let totalDescendants = children.length;

        children.forEach((child) => {
            totalDescendants += calculateTotalDescendants(child, elements);
        });

        return totalDescendants;
    }, []);

    const buildGraphElements = useCallback((degree) => {
        const nodes = [];
        const edges = [];
        let index = 0;

        nodes.push({
            data: { id: `degree-${index}`, label: `Degree: ${degree.type} in ${degree.name}`, numChildren: 0 },
            classes: 'degree-node',
        });

        const courseIdMap = {};
        const courseNodeMap = new Map();

        degree.concentrations.forEach((concentration, cIndex) => {
            const concentrationId = `concentration-${cIndex}`;

            nodes.push({
                data: { id: concentrationId, label: `Concentration: ${concentration.name}`, numChildren: concentration.requirements.length },
                classes: 'concentration-node',
            });

            edges.push({
                data: {
                    source: `degree-${index}`,
                    target: concentrationId,
                },
            });

            concentration.requirements.forEach((requirement, rIndex) => {
                const requirementId = `requirement-${cIndex}-${rIndex}`;

                nodes.push({
                    data: { id: requirementId, label: `Requirement: ${requirement.name}\nCredits: ${requirement.credits}`, numChildren: requirement.courses.length },
                    classes: 'requirement-node',
                });

                edges.push({
                    data: {
                        source: concentrationId,
                        target: requirementId,
                    },
                });

                requirement.courses.forEach((course, courseIndex) => {
                    const courseKey = `${course.code}-${course.name}`;

                    let courseId;
                    if (courseNodeMap.has(courseKey)) {
                        courseId = courseNodeMap.get(courseKey);
                    } else {
                        courseId = `course-${cIndex}-${rIndex}-${courseIndex}`;
                        const courseDetails = `
                            ${course.code}: ${course.name}
                            ${course.credits} Credits
                            Completed: ${course.is_complete ? 'Yes' : 'No'}
                        `.trim();

                        nodes.push({
                            data: { id: courseId, label: courseDetails, numChildren: course.prerequisites ? course.prerequisites.length : 0 },
                            classes: 'course-node',
                        });

                        courseNodeMap.set(courseKey, courseId);
                    }

                    courseIdMap[course._id] = courseId;

                    edges.push({
                        data: {
                            source: requirementId,
                            target: courseId,
                        },
                    });
                });
            });
        });

        degree.concentrations.forEach((concentration, cIndex) => {
            concentration.requirements.forEach((requirement, rIndex) => {
                requirement.courses.forEach((course, courseIndex) => {
                    const courseId = courseIdMap[course._id];
                    if (course.prerequisites && course.prerequisites.length > 0) {
                        course.prerequisites.forEach((prerequisiteId) => {
                            const prerequisiteCourseId = courseIdMap[prerequisiteId];
                            if (prerequisiteCourseId) {
                                edges.push({
                                    data: {
                                        source: prerequisiteCourseId,
                                        target: courseId,
                                    },
                                    classes: 'prerequisite-edge',
                                });
                            }
                        });
                    }
                });
            });
        });

        // Calculate the total number of descendants for each node
        nodes.forEach((node) => {
            node.data.totalDescendants = calculateTotalDescendants(node, edges);
        });

        return [...nodes, ...edges];
    }, [calculateTotalDescendants]);

    const layoutOptions = {
        name: 'fcose',
        animate: false,
        fit: true,
        padding: 30,
        randomize: true,
        nodeDimensionsIncludeLabels: true,
        nodeRepulsion: 45000,
        idealEdgeLength: 200,
        edgeElasticity: 0.45,
        nestingFactor: 0.1,
        gravity: 0.25,
        numIter: 2500,
        tile: true,
        tilingPaddingVertical: 50,
        tilingPaddingHorizontal: 50,
        nodeSeparation: 75,
        edgeSeparation: 50,
    };

    const toggleChildrenVisibility = useCallback((node, hide) => {
        const childEdges = node.connectedEdges().filter((edge) => edge.source().id() === node.id());
        const childNodes = childEdges.targets();

        if (hide) {
            childEdges.hide();
            childNodes.hide();
        } else {
            childEdges.show();
            childNodes.show();
        }

        childNodes.forEach((childNode) => toggleChildrenVisibility(childNode, hide));
    }, []);

    const hideConcentrationChildren = useCallback((cy) => {
        const concentrationNodes = cy.nodes('.concentration-node');
        concentrationNodes.forEach((node) => {
            toggleChildrenVisibility(node, true);
            setHiddenChildren((prev) => ({ ...prev, [node.id()]: true }));
        });
    }, [toggleChildrenVisibility]);

    const handleNodeClick = (event) => {
        const node = event.target;
        if (node.isNode()) {
            const nodeId = node.id();
            const isHidden = hiddenChildren[nodeId];

            if (isHidden) {
                toggleChildrenVisibility(node, false);
                setHiddenChildren((prev) => ({ ...prev, [nodeId]: false }));
            } else {
                toggleChildrenVisibility(node, true);
                setHiddenChildren((prev) => ({ ...prev, [nodeId]: true }));
            }
        }
    };

    useEffect(() => {
        if (selectedDegree) {
            const degreeElements = buildGraphElements(selectedDegree);
            setElements(degreeElements);
            setHiddenChildren({});
        }
    }, [selectedDegree, buildGraphElements]);

    useEffect(() => {
        const cy = window.cy;
        if (cy) {
            cy.ready(() => {
                hideConcentrationChildren(cy);
            });
        }
    }, [elements, hideConcentrationChildren]);

    return (
        <CytoscapeComponent
            elements={elements}
            className='degree-graph'
            style={currentTheme}
            stylesheet={[
                {
                    selector: 'node',
                    style: {
                        content: 'data(label)',
                        'text-valign': 'center',
                        'text-halign': 'center',
                        shape: 'round-rectangle',
                        'background-color': '#6FB1FC',
                        width: (ele) => Math.max(100, ele.data('totalDescendants') * 50),
                        height: (ele) => Math.max(50, ele.data('totalDescendants') * 25),
                        padding: '10px',
                        'font-size': (ele) => Math.max(15, Math.min(35, ele.data('totalDescendants') * 5)),
                        'text-wrap': 'wrap',
                        'text-max-width': (ele) => Math.max(100, ele.data('totalDescendants') * 50),
                        'border-width': 1,
                        'border-color': '#000',
                    },
                },
                {
                    selector: '.degree-node',
                    style: { 'background-color': '#FFD700' },
                },
                {
                    selector: '.concentration-node',
                    style: { 'background-color': '#FF6347' },
                },
                {
                    selector: '.requirement-node',
                    style: { 'background-color': '#90EE90' },
                },
                {
                    selector: '.course-node',
                    style: { 'background-color': '#87CEFA' },
                },
                {
                    selector: 'edge',
                    style: {
                        width: 2,
                        'line-color': '#ccc',
                        'target-arrow-color': '#ccc',
                        'target-arrow-shape': 'triangle',
                        'curve-style': 'bezier',
                    },
                },
                {
                    selector: '.prerequisite-edge',
                    style: {
                        'line-color': '#FF4500',
                        'target-arrow-color': '#FF4500',
                        'target-arrow-shape': 'triangle',
                        'curve-style': 'unbundled-bezier',
                        'control-point-distances': 20,
                        'control-point-weights': 0.5,
                    },
                },
            ]}
            cy={(cy) => {
                window.cy = cy;
                cy.ready(() => {
                    cy.fit();
                    cy.layout(layoutOptions).run();
                    cy.on('tap', 'node', handleNodeClick);
                });
            }}
        />
    );
};

export default DegreeGraph;
