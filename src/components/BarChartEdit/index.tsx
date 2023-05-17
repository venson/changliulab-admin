import {CommonInputProps} from "ra-ui-materialui/src/input/CommonInputProps";
import {useInput} from "react-admin";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import {useState} from "react";
type DataItem = {
    id: string;
    year: number;
    citations: number;
};
const BarChartEdit = (props:BarChartEditProps)=>{
    const{source,...rest} = props;
    const{field} = useInput(props);
    const [chartData, setChartData] = useState(field.value);
    // return <div>
    //     BarChart
    // </div>
    // const chartData = field.value;


    // const handleCitationsEdit = (id: string, value: number) => {
    //     setChartData((prevData) =>
    //         prevData.map((item) =>
    //             item.id === id ? { ...item, citations: value } : item
    //         )
    //     );
    // };

    const handleYearAdd = () => {
        const lastYear = chartData[chartData.length - 1].year;
        const newYearData: DataItem = {
            id: Date.now().toString(),
            year: lastYear + 1,
            citations: 0,
        };
        setChartData([...chartData, newYearData]);
    };

    // const handleYearRemove = () => {
    //     setChartData((prevData) => prevData.slice(0, -1));
    // };

    const CustomizedAxisTick = (props: any) => {
        const { x, y, payload } = props;

        const [inputValue, setInputValue] = useState<string>(
            payload.value.toString()
        );

        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(e.target.value);
            const newValue = parseInt(e.target.value);
            // if (!isNaN(newValue)) {
            //     // handleCitationsEdit(payload.id, newValue);
            // }
        };

        return (
            <g transform={`translate(${x},${y})`}>
                <text x={0} y={0} dy={16} textAnchor="middle" fill="#666">
                    {payload.value}
                </text>
                <foreignObject x={-30} y={20} width={60} height={40}>
                    <input
                        type="number"
                        value={inputValue}
                        onChange={handleInputChange}
                        min={0}
                        style={{ width: "100%" }}
                    />
                </foreignObject>
            </g>
        );
    };

    return (
        <>
            <BarChart width={600} height={300} data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" tick={CustomizedAxisTick} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="citations" fill="#8884d8" />
            </BarChart>
            <div>
                <button onClick={handleYearAdd}>Add Year</button>
                {/*{chartData.length > 1 && (*/}
                {/*    // <button onClick={handleYearRemove}>Remove Year</button>*/}
                {/*)}*/}
            </div>
        </>
    );
};

export type BarChartEditProps= CommonInputProps;
export default BarChartEdit;
