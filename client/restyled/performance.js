import React from 'react';
import { extent, min, max } from 'd3-array';
import {
  VictoryChart,
  VictoryGroup,
  VictoryLine,
  VictoryArea,
  VictoryContainer,
  VictoryStack,
  VictoryScatter,
  VictoryAxis,
  VictoryLegend,
  VictoryLabel,
  VictoryTooltip,
  Line
} from 'victory';
import moment from 'moment';
import ds from './performance-data';

// const count = ds.x.data.length;
// const chartData = [];
// for (var i = 0; i < count; i++) {
//   const cy1 = i == 0 ? 0 : chartData[i - 1].y1;
//   const cy2 = i == 0 ? 0 : chartData[i - 1].y2;

//   chartData.push({
//     x: new Date(ds.x.data[i]),
//     y1: cy1 + ds.y1.data[i],
//     y2: cy2 + ds.y2.data[i]
//   });
// }

const chartData = ds.x.data.map((date, i) => ({
  x: new Date(date),
  y1: ds.y1.data[i],
  y2: ds.y2.data[i]
}));

const e1 = extent(chartData, e => e.y1);
const e2 = extent(chartData, e => e.y2);

const domain = {
  x: [chartData[0].x, chartData[chartData.length - 1].x],
  // x: [0, chartData.length - 1],
  y: extent(e1.concat(e2))
};

// const xTickFormat = x => {
//   if (x % 12 === 0) {
//     return `${x / 12}yr`;
//   }
//   return `${x}m`;
// };

const interpolation = 'linear'; // 'catmullRom'

const domainPadding = { x: 0, y: [20, 1] };
const padding = { left: 25, top: 0, bottom: 41, right: 25 };

const yAxisStyle = {
  axis: { stroke: '#dedede', strokeWidth: '1px', shapeRendering: 'crispEdges', fill: 'none' }
};

const xAxisStyle = {
  axis: { stroke: '#dedede', strokeWidth: '1px', shapeRendering: 'crispEdges', fill: 'none' },
  grid: { stroke: '#f2f2f2', strokeWidth: '1px', fill: 'none' },
  tickLabels: { fontSize: '10px', color: '#24070b', padding: 15 }
};

const filterMonth = chartData[0].x.getMonth();
const lastIndex = chartData.length - 1;
const xTickValues = chartData.filter(d => d.x.getMonth() === filterMonth).map(d => d.x);

const colorScale = ['red', 'blue'];
const flyoutStyle = { fill: 'white', stroke: '#756f6a' };

const Chart = () => {
  return (
    <VictoryChart
      height={270}
      width={910}
      domainPadding={domainPadding}
      domain={domain}
      padding={padding}
      containerComponent={<VictoryContainer responsive={false} />}
      scale={{ x: 'time' }}
    >
      {/* x axis */}
      <VictoryAxis tickValues={xTickValues} tickFormat={d => d.getFullYear()} style={xAxisStyle} />

      {/* y axis */}
      <VictoryAxis dependentAxis style={yAxisStyle} tickFormat={x => x} tickCount={30} />
      <VictoryAxis dependentAxis offsetX={910 - padding.right} style={yAxisStyle} tickFormat={() => ''} />

      {/* y1 - Allan Gray */}
      <VictoryLine
        data={chartData}
        y={'y1'}
        interpolation={interpolation}
        style={{ data: { stroke: '#c53146', strokeWidth: '1px' } }}
      />

      {/* y2 - Benchmark */}
      <VictoryLine
        data={chartData}
        y={'y2'}
        interpolation={interpolation}
        style={{ data: { stroke: '#9f9f9f', strokeWidth: '1px' } }}
      />
    </VictoryChart>
  );
};

export default Chart;
