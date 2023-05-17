import MdInput from "@/components/MdInput";
import { Box } from "@mui/material";
import { Create, Edit, PasswordInput, SelectArrayInput, SimpleForm,TextInput } from "react-admin";

const UserCreate = () =>{
    return (<div>
        <Create>
            <SimpleForm >
                <Box display={{sm: 'flex' ,width: '100%'}}>
                    <TextInput source="username" sx={{marginInline: 1}}/>
                    <TextInput source="nickName"/>

                </Box>

                    <TextInput source="email"/>
            </SimpleForm>


        </Create>

    </div>)
}
export default UserCreate;