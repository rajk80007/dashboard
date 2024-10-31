import { useEffect, useMemo, useRef } from 'react';
import * as d3 from 'd3';

const PieChart = ({ data, width = 400, height = 400 }) => {
    const svgRef = useRef();
    const colorMap = useMemo(() => {
        const uniqueNames = Array.from(new Set(data.map(d => d.name)));
        const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
        return uniqueNames.reduce((map, name) => {
            map[name] = colorScale(name);
            return map;
    }, {});
    }, [data]);

     // Define color scale
        // const color = d3.scaleOrdinal()
        // .domain(filteredData.map(d => d.name))
        // .range(d3.schemeCategory10);

        // const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

        // data.forEach(d => {
        //     if (!colorMapRef.current[d.name]) {
        //         colorMapRef.current[d.name] = colorScale(d.name);
        //     }
        // });
        

        // const colorMap = useMemo(() => {
        //     const uniqueNames = Array.from(new Set(data.map(d => d.name)));
        //     const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
        //     return uniqueNames.reduce((map, name, index) => {
        //         map[name] = colorScale(name);
        //         return map;
        //     }, {});
        //     }, [data]);


    useEffect(() => {
        const radius = Math.min(width, height) / 2;
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove(); // Clear previous elements

        const filteredData = data.filter(d => d.count > 0);

        // Create a pie chart layout
        const pie = d3.pie().value(d => d.count); // Use count for pie chart
        const arc = d3.arc()
            .innerRadius(50) 
            .outerRadius(radius);

       

        // Group for positioning the pie chart in the center
        const group = svg
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${width / 2}, ${height / 2})`);

        // Bind data and create pie chart slices
        const pieData = pie(filteredData);
        group.selectAll("path")
            .data(pieData)
            .enter()
            .append("path")
            .attr("d", arc)
            .attr("fill", d => colorMap[d.data.name])
            .attr("stroke", "white")
            .style("stroke-width", "2px");

        // Add labels with name and count
        group.selectAll("text")
            .data(pieData)
            .enter()
            .append("text")
            .attr("transform", d => {
                const midAngle = (d.startAngle + d.endAngle) / 2;
                const x = (radius * 0.7) * Math.sin(midAngle);
                const y = -(radius * 0.7) * Math.cos(midAngle);
                return `translate(${x}, ${y})`;
            })
            .attr("text-anchor", "middle")
            .style('fill', 'white')
            .style('font-size', '12px')
            .style('font-weight', 'bold')
            .text(d => `${d.data.name}: ${d.data.count}`);
    }, [data, width, height, colorMap]);

    return <svg ref={svgRef}></svg>;
};

export default PieChart;
