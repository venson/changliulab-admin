import MdInput from "@/components/MdInput";
import { useRef } from "react";
import { Edit, SaveButton, SimpleForm, TextInput, useRecordContext } from "react-admin";


const Title = ()=>{
    const record = useRecordContext()
    console.log('record', record)
    return <span>Methodology: {record ? `${record.title}`: ''}</span>
}

const MethodologyEdit = ()=>{

  const markdownRef = useRef<any>(); // add type any to the useRef hook
const RenderEditActions = () => {
    return (
        <SaveButton onClick={() => markdownRef.current?.saveHtml()} />
        // <SaveButton />
    )
}
    return (
        <Edit  title={<Title/>} >
            <SimpleForm toolbar={<RenderEditActions />}>
                <TextInput source="title" sx={{width: '100%'}}/>
                <MdInput ref={markdownRef} source="markdown" html="htmlBrBase64"/>
            </SimpleForm>

        </Edit>
    )

}
export default MethodologyEdit;
