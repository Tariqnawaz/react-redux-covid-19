import React from 'react';
import { Chart, Line} from 'bizcharts';

function HistoricalCharts(props) {
	const {montlyCaseHistory} = props
  return <Chart scale={{value: {min: 0}}} padding={[10,20,50,40]} autoFit height={400} data={montlyCaseHistory} >
    <Line shape="hv" position="month*value" />
  </Chart>
}
export default HistoricalCharts;

