import MdInput, { RenderMarkdownSave } from "@/components/MdInput";
import ReactMdInput from "@/components/ReactMdInput";
import { Box } from "@mui/material";
import { memo, useRef } from "react";
import { Edit, SaveButton, SelectArrayInput, SimpleForm,TextInput } from "react-admin";
const members = ():any[] =>{
    return [{name:111,id:1},{id:2, name:'aaa'}]

}

const ActivityEdit = memo(() =>{
    const markdownRef = useRef<any>();
    // const RenderEditActions = () => {
    //     return (
    //         <SaveButton className="m-2"  onClick={() => markdownRef.current?.saveHtml()} />
    //     )
    // }
    return (<div>
        <Edit>
            <SimpleForm toolbar={<RenderMarkdownSave mRef={markdownRef}/>}>
                <Box display={{sm: 'flex' ,width: '100%'}}>

                <Box flex={3} mx={2}>
                    <TextInput source="title" sx={{width:'100%'}}/>
                </Box>
                <Box flex={1} mx={2}>
                    <SelectArrayInput source="member" choices={members()}/>
                </Box>
                </Box>
                <MdInput ref={markdownRef} source="markdown" html="htmlBrBase64"/>
            </SimpleForm>


        </Edit>

    </div>)
})
export default ActivityEdit;