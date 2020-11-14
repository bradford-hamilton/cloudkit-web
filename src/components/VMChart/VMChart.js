import React, { useState, Fragment } from 'react';
import {
  Chart,
  Settings,
  Axis,
  LineSeries,
  BarSeries,
  DataGenerator,
} from '@elastic/charts';

import {
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiColorPalettePicker,
} from '@elastic/eui';

import { EUI_CHARTS_THEME_DARK } from '@elastic/eui/dist/eui_charts_theme';
import '@elastic/charts/dist/theme_only_dark.css';

import {
  euiPaletteColorBlind,
  euiPaletteComplimentary,
  euiPaletteForStatus,
  euiPaletteForTemperature,
  euiPaletteCool,
  euiPaletteWarm,
  euiPaletteNegative,
  euiPalettePositive,
  euiPaletteGray,
} from '@elastic/eui/lib/services';

const paletteData = {
  euiPaletteColorBlind,
  euiPaletteForStatus,
  euiPaletteForTemperature,
  euiPaletteComplimentary,
  euiPaletteNegative,
  euiPalettePositive,
  euiPaletteCool,
  euiPaletteWarm,
  euiPaletteGray,
};

const paletteNames = Object.keys(paletteData);

const VMChart = () => {
  const palettes = paletteNames.map((paletteName, index) => {
    const options =
      index > 0
        ? 10
        : {
            sortBy: 'natural',
          };

    return {
      value: paletteName,
      title: paletteName,
      palette: paletteData[paletteNames[index]](options),
      type: 'fixed',
    };
  });

  const [barPalette, setBarPalette] = useState('euiPaletteColorBlind');
  const dg = new DataGenerator();
  const data1 = dg.generateGroupedSeries(20, 1);
  let data2 = dg.generateGroupedSeries(20, 5);
  const theme = EUI_CHARTS_THEME_DARK;
  const barPaletteIndex = paletteNames.findIndex((item) => item === barPalette);
  const customTheme = barPaletteIndex > 0 ? [{
    colors: { vizColors: paletteData[paletteNames[barPaletteIndex]](5) },
  }, theme] : theme;

  // x == hour in question
  // y == memeory usage 1-100
  console.log('data2', data2);
  data2 = [
    { hour: 1, memUsage: 35, g: "a" },
    { hour: 2, memUsage: 40, g: "a" },
    { hour: 3, memUsage: 75, g: "a" },
    { hour: 4, memUsage: 90, g: "a" },
    { hour: 5, memUsage: 85, g: "a" },
    { hour: 6, memUsage: 70, g: "a" },
    { hour: 7, memUsage: 50, g: "a" },
    { hour: 8, memUsage: 35, g: "a" },
    { hour: 9, memUsage: 21, g: "a" },
    { hour: 10, memUsage: 33, g: "a" },
    { hour: 11, memUsage: 34, g: "a" },
    { hour: 12, memUsage: 55, g: "a" },
  ]

  return (
    <Fragment>
      <Chart size={{ height: 250 }}>
        <Settings theme={customTheme} showLegend />
        <BarSeries
          id="status"
          name="Memory Usage"
          data={data2}
          xAccessor="hour"
          yAccessors={['memUsage']}
        />
        <Axis id="bottom-axis" position="bottom" />
        <Axis id="left-axis" position="left" />
      </Chart>
      <EuiSpacer size="xxl" />
      <EuiFlexGroup justifyContent="center">
        <EuiFlexItem grow={false} style={{ width: 300 }}>
          <EuiColorPalettePicker
            palettes={palettes}
            onChange={setBarPalette}
            valueOfSelected={barPalette}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    </Fragment>
  );
};

export default VMChart;