import { Switch } from "@mui/material"
import {PublicFieldProps } from "react-admin"
import { useRecordContext } from "react-admin";
import {FC} from 'react'
const SwitchList:FC<PublicFieldProps> =((props) =>{
    const {source} = props
    const record = useRecordContext(props);

    const checked =source? record[source]: false;
    const switchStatus = ()=>{

    }

    return (
        <Switch checked={checked} onClick={switchStatus}/>
    )


})

export default SwitchList