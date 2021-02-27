import React from 'react';
import { PieChart } from 'bizcharts';

const PChart = React.memo(props =>{
  const {activeCount} = props;
  return (
    <PieChart
      data={activeCount}
      title={{
        visible: false,
        text: 'Covid-19 active cases',
      }}
      description={{
        visible: true,
        text: 'Pie chart shows the no. of active cases',
      }}
      radius={0.8}
      angleField='value'
      colorField='type'
      label={{
        visible: true,
        type: 'outer',
        offset: 20,
      }}
    >
      
    </PieChart>
  );
})
export default PChart;

