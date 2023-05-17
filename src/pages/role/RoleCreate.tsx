import { Create, SimpleForm, TextInput } from "react-admin"

const PermissionCreate = () =>{
    return (
        <Create>
            <SimpleForm>
                <TextInput source='name'/>
                <TextInput source="category"/>
                <TextInput source="description"/>
            </SimpleForm>

        </Create>
    )

}
export default PermissionCreate;