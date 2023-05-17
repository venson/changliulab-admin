import MdInput from "@/components/MdInput";
import ReactMdInput from "@/components/ReactMdInput";
import { Box } from "@mui/material";
import { Edit, SelectArrayInput, SimpleForm,TextInput } from "react-admin";
const members = ():any[] =>{
    return [{name:111,id:1},{id:2, name:'aaa'}]

}

const ActivityEdit = () =>{
    return (<div>
        <Edit>
            <SimpleForm >
                <Box display={{sm: 'flex' ,width: '100%'}}>

                <Box flex={3} mx={2}>
                    <TextInput source="title" sx={{width:'100%'}}/>
                </Box>
                <Box flex={1} mx={2}>
                    <SelectArrayInput source="member" choices={members()}/>
                </Box>
                </Box>
                <MdInput source="markdown" html="htmlBrBase64"/>
            </SimpleForm>


        </Edit>

    </div>)
}
export default ActivityEdit;