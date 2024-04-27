// Graph.js
import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useTheme } from '../../../context/theme/ThemeContext';

const Graph = () => {
  const { theme } = useTheme();

  const [a, setA] = useState(0);
  const thetaRef = useRef(0);
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const xScale = d3.scaleLinear().domain([-1.8119, 1.8119]).range([0, 400]);
    const yScale = d3.scaleLinear().domain([-2, 2]).range([450, 50]);

    const line = d3.line()
      .x(d => xScale(d.x))
      .y(d => yScale(d.y));

      const updateGraph = () => {
        const t = d3.transition().duration(.0001);
        const data = d3.range(-1.812, 1.812, .001).map(x => {
          const yValue = Math.cbrt(x**2) + (0.9 * Math.sqrt(3.3 - x**2) * Math.sin(a * Math.PI * x));
          return { x, y: isNaN(yValue) ? 0 : yValue };
        });
      
        svg.selectAll('path').data([data])
          .join(
            enter => enter.append('path').attr('d', line).attr('fill', 'none').attr('stroke', theme.accentColor),
            update => update.transition(t).attr('d', line),
            exit => exit.remove()
          );
      };

    const interval = setInterval(() => {
      thetaRef.current += 0.001;
      setA(
        //prevA => (prevA + .01) % 20 - 10
        (Math.sin(thetaRef.current) * 10)
      );  // Oscillate between -10 and 10
    }, .0001);

    updateGraph(); // Initial graph rendering
    const updateInterval = setInterval(updateGraph, .0001);

    return () => {
      clearInterval(interval);
      clearInterval(updateInterval);
    };
  }, [a]);

  return (
    <svg ref={svgRef} width="400" height="400"/>
  );
};

export default Graph;
