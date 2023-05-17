import MdInput from "@/components/MdInput";
import { Edit, SimpleForm, TextInput, useRecordContext } from "react-admin";


const Title = ()=>{
    const record = useRecordContext()
    console.log(record)
    return <span>Methodology: {record ? `${record.title}`: ''}</span>
}

const MethodologyEdit = ()=>{
    return (
        <Edit resource="eduservice/admin/edu-methodology" title={<Title/>}>
            <SimpleForm>
                <TextInput source="title" sx={{width: '100%'}}/>
                <MdInput source="markdown" html="htmlBrBase64"/>
            </SimpleForm>

        </Edit>
    )

}
export default MethodologyEdit;
