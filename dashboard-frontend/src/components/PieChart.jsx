import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const PieChart = ({ data, width = 200, height = 200 }) => {
    const svgRef = useRef();

    useEffect(() => {
        const radius = Math.min(width, height) / 2;
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove(); // Clear previous elements

        // Create a pie chart layout
        const pie = d3.pie();
        const arc = d3.arc()
            .innerRadius(0) // Full pie, no hole in the middle
            .outerRadius(radius);

        // Define color scale
        const color = d3.scaleOrdinal()
            .domain(data)
            .range(d3.schemeCategory10);

        // Group for positioning the pie chart in the center
        const group = svg
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${width / 2}, ${height / 2})`);

        // Bind data and create pie chart slices
        group.selectAll("path")
            .data(pie(data))
            .enter()
            .append("path")
            .attr("d", arc)
            .attr("fill", (d, i) => color(i))
            .attr("stroke", "white")
            .style("stroke-width", "2px");
    }, [data, width, height]);

    return <svg ref={svgRef}></svg>;
};

export default PieChart;
