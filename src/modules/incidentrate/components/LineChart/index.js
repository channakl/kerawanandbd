
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CustomizedXAxisTick = (props) => {
    const { x, y, stroke, payload } = props;

    return (
    <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)" fontSize={12}>
        {payload.value}
        </text>
    </g>
    );
};


const CustomizedYAxisTick = (props) => {
    const { x, y, payload } = props;

    return (
        <text x={x} y={y} width={30} textAnchor="end" verticalAnchor="middle" fontSize={10} fill="#666">
            {payload.value}
        </text>
    );
};


const LineChartCustom = (props) => {
    const { data } = props;
    return (
        <div style={{ width: '100%' }}>
          <LineChart
                width={350}
                height={200}
                data={data}
                margin={{
                top: 20,
                right: 20,
                left: -25,
                bottom: 18,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={<CustomizedXAxisTick />} />
                <YAxis tick={<CustomizedYAxisTick />}/>
                <Tooltip />
                <Line type="monotone" dataKey="Kuantitas" stroke="#14B8A6" fill="#14B8A6" />
            </LineChart>
      </div>
    );
};


export default LineChartCustom;