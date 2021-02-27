import React from 'react'
import { Chart, Interval, Tooltip } from 'bizcharts';

const AreaStackCharts = React.memo(props => {
  const {continentCount} = props;
  return <Chart height={400} autoFit data={continentCount} interactions={['active-region']}  >
    <Interval position="country*cases" />
    <Tooltip  />
  </Chart>
})
export default AreaStackCharts;