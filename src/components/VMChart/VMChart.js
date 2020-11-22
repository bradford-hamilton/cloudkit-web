import React, { useState, Fragment } from 'react';
import moment from 'moment';
import {
  Chart,
  Settings,
  Axis,
  AreaSeries,
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

const VMChart = ({ memUsage }) => {
  const palettes = paletteNames.map((paletteName, index) => {
    const options = index > 0 ? 10 : { sortBy: 'natural' };

    return {
      value: paletteName,
      title: paletteName,
      palette: paletteData[paletteNames[index]](options),
      type: 'fixed',
    };
  });

  const [barPalette, setBarPalette] = useState('euiPaletteColorBlind');
  const theme = EUI_CHARTS_THEME_DARK;
  const barPaletteIndex = paletteNames.findIndex((item) => item === barPalette);
  const customTheme = barPaletteIndex > 0 ? [{
    colors: { vizColors: paletteData[paletteNames[barPaletteIndex]](5) },
  }, theme] : theme;

  const chartData = () => {
    const data = [];
    memUsage?.forEach(usage => {
      data.push({
        hour: moment(usage.time).format('LT'),
        memUsage: usage.usage.toFixed(2),
        g: 'a',
      });
    });
    return data;
  }

  return (
    <Fragment>
      <Chart size={{ height: 250 }}>
        <Settings theme={customTheme} showLegend />
        <AreaSeries
          id="status"
          name="Memory Usage"
          xAccessor="hour"
          yAccessors={['memUsage']}
          data={chartData()}
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
