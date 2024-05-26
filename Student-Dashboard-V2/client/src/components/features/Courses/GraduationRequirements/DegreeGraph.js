// DegreeGraph.js
import React, { useEffect, useState } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';

const DegreeGraph = ({ selectedDegree }) => {
    const [elements, setElements] = useState([]);

    useEffect(() => {
        if (selectedDegree) {
            const degreeElements = buildGraphElements(selectedDegree);
            setElements(degreeElements);
        }
    }, [selectedDegree]);

    const buildGraphElements = (degree) => {
        const nodes = [];
        const edges = [];
        let index = 0;

        // Add degree node
        nodes.push({
            data: { id: `degree-${index}`, label: `Degree: ${degree.name}` },
            classes: 'degree-node',
        });

        const courseIdMap = {};

        degree.concentrations.forEach((concentration, cIndex) => {
            const concentrationId = `concentration-${cIndex}`;

            // Add concentration node
            nodes.push({
                data: { id: concentrationId, label: `Concentration: ${concentration.name}` },
                classes: 'concentration-node',
            });

            // Add edge from degree to concentration
            edges.push({
                data: {
                    source: `degree-${index}`,
                    target: concentrationId,
                },
            });

            concentration.requirements.forEach((requirement, rIndex) => {
                const requirementId = `requirement-${cIndex}-${rIndex}`;

                // Add requirement node
                nodes.push({
                    data: { id: requirementId, label: `Requirement: ${requirement.name}\nCredits: ${requirement.credits}` },
                    classes: 'requirement-node',
                });

                // Add edge from concentration to requirement
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

                    // Add course node
                    nodes.push({
                        data: { id: courseId, label: courseDetails },
                        classes: 'course-node',
                    });

                    // Map MongoDB Object ID to course ID
                    courseIdMap[course._id] = courseId;

                    // Add edge from requirement to course
                    edges.push({
                        data: {
                            source: requirementId,
                            target: courseId,
                        },
                    });
                });
            });
        });

        // Add edges for prerequisites
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

    return (
        <CytoscapeComponent
            elements={elements}
            style={{ width: '100%', height: '600px' }}
            layout={{ name: 'breadthfirst' }}
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
        />
    );
};

export default DegreeGraph;
