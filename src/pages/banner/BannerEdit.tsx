import MdInput from "@/components/MdInput";
import ReactMdInput from "@/components/ReactMdInput";
import { Box } from "@mui/material";
import { Edit, SelectArrayInput, SimpleForm,TextInput } from "react-admin";
const members = ():any[] =>{
    return [{name:111,id:1},{id:2, name:'aaa'}]

}

const BannerEdit = () =>{
    return (<div>
        <Edit>
            <SimpleForm >
                <Box display={{sm: 'flex' ,width: '100%'}}>

                <Box flex={3} mx={2}>
                    <TextInput source="title" sx={{width:'100%'}}/>
                </Box>
                </Box>
            </SimpleForm>


        </Edit>

    </div>)
}
export default BannerEdit;