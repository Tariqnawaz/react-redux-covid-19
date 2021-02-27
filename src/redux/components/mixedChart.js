import React from "react";
import { Chart, Tooltip, Legend, Point, Line, Interval } from "bizcharts";

const MixedChart = React.memo(props => {
	const {coustryWiseCaseCount} = props
		let chartIns = null;
		const scale = {
			death: {
				min: 0,
				tickCount: 4,
				type: 'linear-strict'
			},
			total: {
				min: 0,
				tickCount: 4,
				type: 'linear-strict'
			},
		};
		const colors = ["#6394f9", "#62daaa"];
		return (
			<Chart
				scale={scale}
				autoFit
				height={400}
				data={coustryWiseCaseCount}
				onGetG2Instance={(chart) => {
					chartIns = chart;
					chartIns.on("interval:mouseenter", (e) => {
						console.log(chartIns);
						chartIns.geometries.forEach((g) => {
							if (g.type === "interval") {
								(g.getShapes() || []).forEach((s) => {
									s.set("origin_fill", s.get("attrs").fill);
									s.attr("fill", "red");
								});
							}
						});
					});
					chartIns.on("interval:mouseleave", (e) => {
						console.log(chartIns);
						chartIns.geometries.forEach((g) => {
							if (g.type === "interval") {
								(g.getShapes() || []).forEach((s) => {
									s.attr("fill", s.get("origin_fill"));
								});
							}
						});
					});
				}}
			>
				<Legend
					custom={true}
					allowAllCanceled={true}
					items={[
						{
							value: "total",
							name: "Total case",
							marker: {
								symbol: "square",
								style: { fill: colors[0], r: 5 },
							},
						},
						{
							value: "death",
							name: "Death case",
							marker: {
								symbol: "hyphen",
								style: { stroke: colors[1], r: 5, lineWidth: 3 },
							},
						},
					]}
					onChange={(ev) => {
						const item = ev.item;
						const value = item.value;
						const checked = !item.unchecked;
						const geoms = chartIns.geometries;

						for (let i = 0; i < geoms.length; i++) {
							const geom = geoms[i];

							if (geom.getYScale().field === value) {
								if (checked) {
									geom.show();
								} else {
									geom.hide();
								}
							}
						}
					}}
				/>
				<Tooltip shared />
				<Interval position="time*total" color={colors[0]} />
				<Line
					position="time*death"
					color={colors[1]}
					size={3}
					shape="smooth"
				/>
				<Point
					position="time*death"
					color={colors[1]}
					size={3}
					shape="circle"
				/>
			</Chart>
		);
})
export default MixedChart;
