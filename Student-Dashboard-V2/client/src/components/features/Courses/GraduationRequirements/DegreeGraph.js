import React, { useEffect, useState } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import { useTheme } from '../../../../context/theme/ThemeContext';

// TODO: Change Colors

const DegreeGraph = ({ selectedDegree }) => {
    const { currentTheme } = useTheme();
    const [elements, setElements] = useState([]);
    const [hiddenChildren, setHiddenChildren] = useState({});

    useEffect(() => {
        if (selectedDegree) {
            const degreeElements = buildGraphElements(selectedDegree);
            setElements(degreeElements);
            setHiddenChildren({});
        }
    }, [selectedDegree]);

    const buildGraphElements = (degree) => {
        const nodes = [];
        const edges = [];
        let index = 0;

        nodes.push({
            data: { id: `degree-${index}`, label: `Degree: ${degree.type} in ${degree.name}` },
            classes: 'degree-node',
        });

        const courseIdMap = {};

        degree.concentrations.forEach((concentration, cIndex) => {
            const concentrationId = `concentration-${cIndex}`;

            nodes.push({
                data: { id: concentrationId, label: `Concentration: ${concentration.name}` },
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
                    data: { id: requirementId, label: `Requirement: ${requirement.name}\nCredits: ${requirement.credits}` },
                    classes: 'requirement-node',
                });

                edges.push({
                    data: {
                        source: concentrationId,
                        target: requirementId,
                    },
                });

                requirement.courses.forEach((course, courseIndex) => {
                    const courseId = `course-${cIndex}-${rIndex}-${courseIndex}`;
                    const courseDetails = `
                        ${course.code}: ${course.name}
                        ${course.credits} Credits
                        Completed: ${course.is_complete ? 'Yes' : 'No'}
                    `.trim();

                    nodes.push({
                        data: { id: courseId, label: courseDetails },
                        classes: 'course-node',
                    });

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
                    const courseId = `course-${cIndex}-${rIndex}-${courseIndex}`;
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

        return [...nodes, ...edges];
    };

    const layoutOptions = {
        name: 'breadthfirst',
        circle: true,
        directed: true,
        padding: 10,
        avoidOverlap: true,
        spacingFactor: 1,
    };

    const toggleChildrenVisibility = (node, hide) => {
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
    };

    function handleNodeClick(event) {
        const node = event.target;
        if (node.isNode()) {
            const nodeId = node.id();
            const isHidden = hiddenChildren[nodeId];

            if (isHidden) {
                console.log('Showing children');
                toggleChildrenVisibility(node, false);
                setHiddenChildren((prev) => ({ ...prev, [nodeId]: false }));
            } else {
                console.log('Hiding children');
                toggleChildrenVisibility(node, true);
                setHiddenChildren((prev) => ({ ...prev, [nodeId]: true }));
            }
        }
    }

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
                        width: 'label',
                        height: 'label',
                        padding: '10px',
                        'font-size': '10px',
                        'text-wrap': 'wrap',
                        'text-max-width': '100px',
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
