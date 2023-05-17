import React, {ChangeEvent, useEffect, useState} from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend, ResponsiveContainer,
} from "recharts";
import { useInput } from 'react-admin';
import {CommonInputProps} from "ra-ui-materialui";
import {Box} from "@mui/material";

interface CitationData {
    id: string;
    year: number;
    citations: number;
}

export type EditableBarChartProps = CommonInputProps & {dateSource: string};

const EditableBarChart: React.FC<EditableBarChartProps> = (props) => {
    const {source, dateSource}  = props;
    const {field} = useInput({source});
    const {field : publicationDate} = useInput({source: dateSource});

    useEffect(() =>{
        console.log(field.value)
        const current = new Date().getFullYear()
        const publishDate = new Date(publicationDate.value).getFullYear();
        // check if publishDate is valid
        if(publishDate < 1990 || publishDate > 2080)
            return;
        // init citation data while field is empty
        if(!field.value || field.value.length <1){
            const initCitation = createEmptyCitation(publishDate, current);
        //    const initCitation =  Array.from({length: current - publishDate +1}, (_,index) =>({
        //         id:'',
        //         year: publishDate + index,
        //         citations: 0,
        //     }))
            console.log('init', initCitation)
            field.onChange(initCitation)
            return;
        }
        const start: CitationData = field.value[0]
        const end: CitationData = field.value[field.value.length-1]

        const post = createEmptyCitation(end.year+1, current);
        const pre = createEmptyCitation(publishDate, start.year-1);
        // if publishDate is before the field start year
        if(publishDate <= start.year){
            field.onChange([...pre, ...field.value, ...post])
        }
        // if publishDate is after the field start year
        if(publishDate > start.year){
            const rest = field.value.slice(publishDate - start.year)
            field.onChange([...rest, ...post])
        }



    },[publicationDate.value])

    const createEmptyCitation = (start:number, end:number):CitationData[] =>{
        if(end <= start){
            return []
        }
        return Array.from({length: end -  start+1}, (_,index) =>({
                id:'',
                year: start + index,
                citations: 0,
            }))
    }


    const chartWidth =60 + field.value.length * 48;
    const handleCitationChange = (event:ChangeEvent<HTMLInputElement>, index:number) =>{
        // event.target.
        event.preventDefault()
        const data: CitationData[] = field.value
        field.onChange(
            [...data.slice(0,index),
                {...data[index], citations: event.target.value},
                ...data.slice(index+1)])
    }

    const InputBoxGroup =  () =>{
        if(field.value){
            return field.value.map((citation: CitationData, index:number) =>{
                return <input key={citation.year}
                              value={citation.citations}
                              className="w-[46px] border text-center"
                              onChange={(event) => handleCitationChange(event,index)}
                />
            })
        }else{
            return <div></div>
        }
    }

    return (
        <div className="w-full scroll-x">
                <BarChart data={field.value} margin={{bottom:0}} barGap={5} height={200} width={chartWidth}>
                    <CartesianGrid strokeDasharray="4" vertical={false}/>
                    <XAxis dataKey="year" fontSize={13} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="citations" width={0} barSize={28} fill="#8884d8" />
                </BarChart>
            <Box sx={{width: chartWidth, display:'flex'}}>
                <div className="pl-[60px] flex justify-between w-full ">
                    {InputBoxGroup()}
                </div>

            </Box>

        </div>
    );
};

export default EditableBarChart;
