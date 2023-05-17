import {Create, SelectInput, SimpleForm, TextInput} from "react-admin"
import {actionChoices} from "@/common/types";
import * as React from "react";

const PermissionCreate = () =>{
    return (
        <Create resource="permission">
            <SimpleForm>
                <TextInput source="category"/>
                <SelectInput  source="action" choices={actionChoices} />
                <TextInput source='name'/>
                <TextInput source="description"/>
            </SimpleForm>

        </Create>
    )

}
export default PermissionCreate;
