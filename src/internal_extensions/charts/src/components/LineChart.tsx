import * as xCurves from '@visx/curve';
import { scaleLinear } from '@visx/scale';
import { LinePath } from '@visx/shape';
import {
  ChartComponentErrorCheck,
  ChartComponentProps,
  colors,
  ComponentPropertiesRegister,
  ComponentPropertyType,
} from 'bluefire';

const curves = {
  Basis: xCurves.curveBasis,
  'Basis (closed)': xCurves.curveBasisClosed,
  'Basis (open)': xCurves.curveBasisOpen,
  Bundle: xCurves.curveBundle,
  Cardinal: xCurves.curveCardinal,
  'Cardinal (closed)': xCurves.curveCardinalClosed,
  'Cardinal (open)': xCurves.curveCardinalOpen,
  'Catmull-Rom': xCurves.curveCatmullRom,
  'Catmull-Rom (closed)': xCurves.curveCatmullRomClosed,
  'Catmull-Rom (open)': xCurves.curveCatmullRomOpen,
  Linear: xCurves.curveLinear,
  'Linear (closed)': xCurves.curveLinearClosed,
  'Monotone (X)': xCurves.curveMonotoneX,
  'Monotone (Y)': xCurves.curveMonotoneY,
  Natural: xCurves.curveNatural,
  Step: xCurves.curveStep,
  'Step (after)': xCurves.curveStepAfter,
  'Step (before)': xCurves.curveStepBefore,
};

const _data = [
  { x: 10, y: 20 },
  { x: 20, y: 50 },
  { x: 30, y: 10 },
  { x: 40, y: 25 },
  { x: 50, y: 18 },
];

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

type LineData = ArrayElement<typeof _data>;

// data accessors
const getX = (d: any) => d.x;
const getY = (d: any) => d.y;

// scales
const xScale = scaleLinear<number>({
  domain: [0, 70],
});

const yScale = scaleLinear<number>({
  domain: [0, 50],
});

const LineChart = ({ width, height, id, tabId, compId, data, props }: ChartComponentProps) => {
  // const [compProps, setCompProps] = useState<any>();

  // useEffect(
  //   () =>
  //     getStore().subscribe(
  //       (s) => s.sheets.sheets[tabId][id]?.components[compId]?.props, //
  //       (props) => setCompProps(props),
  //     ),
  //   [],
  // );

  const xData = data.measures;

  xScale.range([0, width]);
  yScale.range([0, height]);

  const strokeWidth = props?.['line-thickness'] || defaultProps['line-thickness'];

  return (
    <LinePath<LineData>
      curve={Object.values(curves)[props?.['line-curve'] || 0]}
      data={_data}
      x={(d) => xScale(getX(d)) ?? 0}
      y={(d) => yScale(getY(d)) ?? 0}
      stroke={
        props?.['line-color']
          ? colors.safeHsvaToHexa(props['line-color'])
          : colors.getNamedColor(defaultProps['line-color'], true)
      }
      strokeWidth={strokeWidth}
      strokeDasharray={
        props?.['line-dashed'] ? `${2.5 * strokeWidth},${3.75 * strokeWidth}` : undefined
      }
      strokeOpacity={1}
      shapeRendering="geometricPrecision"
    />
  );
};

export default LineChart;

const defaultProps = {
  'line-color': 'blue.400',
  'line-thickness': 4,
};

export const LineChartProps: ComponentPropertiesRegister = {
  appearance: {
    title: 'Appearance',
    groups: [
      {
        title: 'Line',
        properties: {
          'line-color': {
            name: 'Color',
            desc: 'Line color',
            type: ComponentPropertyType.COLOR,
            defaultValue: defaultProps['line-color'],
          },
          'line-thickness': {
            name: 'Thickness',
            desc: 'Line width (px)',
            type: ComponentPropertyType.NUMBER,
            defaultValue: defaultProps['line-thickness'],
            inputProps: {
              min: 0,
              // step: 1,
              precision: 0,
            },
          },
          'line-curve': {
            name: 'Curve type',
            desc: 'Curve function',
            type: ComponentPropertyType.SELECT,
            defaultValue: 0,
            options: Object.keys(curves),
          },
          'line-dashed': {
            name: 'Dashed',
            desc: 'Use a dashed stroke',
            type: ComponentPropertyType.BOOLEAN,
            defaultValue: false,
          },
        },
      },
    ],
  },
};

export const LineChartErrorCheck: ChartComponentErrorCheck = (data, props) => {
  if (
    !data ||
    !data.dimensions ||
    data.dimensions.length === 0 ||
    !data.measures ||
    data.measures.length === 0
  )
    return { title: 'No data loaded' };
};
