import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data }) => {
    const svgRef = useRef();

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove(); // Clear previous elements

        svg
            .attr("width", 500)
            .attr("height", 300)
            .style("background", "#f9f9f9")
            .style("overflow", "visible");

        const xScale = d3.scaleBand()
            .domain(data.map((_, index) => index))
            .range([0, 500])
            .padding(0.5);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data)])
            .range([300, 0]);

        svg.selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", (d, i) => xScale(i))
            .attr("y", y => yScale(y))
            .attr("width", xScale.bandwidth())
            .attr("height", y => 300 - yScale(y))
            .attr("fill", "royalblue");
    }, [data]);

    return <svg ref={svgRef}></svg>;
};

export default BarChart;
