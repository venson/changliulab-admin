import MdInput from "@/components/MdInput";
import ReactMdInput from "@/components/ReactMdInput";
import { Box } from "@mui/material";
import {Edit, SelectArrayInput, SimpleForm, TextInput, useDataProvider} from "react-admin";
import {dataProvier} from "@/dataProvider";
import React, {useEffect, useMemo, useState} from "react";

const ResearchEdit = () =>{
    // const [memberChoices, setMemberChoices] = useState([{id: 1, name:'example'}]);
    const [memberChoices, setMemberChoices] = useState<any[]>([]);
    const [isLoading, setIsLoading]  = useState(true);
    useEffect(() =>{
        // setIsLoading(true)
        const getMembers = async ()=>{

            const {data} = await dataProvier.getList('eduservice/admin/edu-member',{pagination:{perPage:100, page:1},sort:{field:'sss', order:'DESC'}, filter:{member: 'current'}})
            setMemberChoices(data)
        }
        getMembers()
        setIsLoading(false)

    },[])
    const multiSelect = ()=>{
        return isLoading ? null:
        <SelectArrayInput source="member" choices={memberChoices} />
    }
    console.log('member',memberChoices)
    return <div>
        <Edit>
            <SimpleForm >
                <Box display={{sm: 'flex' ,width: '100%'}}>

                <Box flex={3} mx={2}>
                    <TextInput source="title" sx={{width:'100%'}}/>
                </Box>
                <Box flex={1} mx={2}>
                    {multiSelect()}
                </Box>
                </Box>
                <MdInput source="markdown" html="htmlBrBase64"/>
            </SimpleForm>


        </Edit>

    </div>
}
export default ResearchEdit;
