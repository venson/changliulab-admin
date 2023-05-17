import {
    Button,
    DeleteButton,
    Edit,
    FunctionField,
    ImageField,
    ImageInput,
    ListButton,
    required,
    SaveButton,
    SelectInput,
    ShowButton,
    SimpleForm,
    TextInput,
    Toolbar,
    TopToolbar,
    useRecordContext
} from "react-admin";
import { Member, MemberChoices, MemberLevel } from "../../common/types";
import AvatarInput from "../../components/AvatarInput";
import {Box} from "@mui/material";
function customAction() {
    console.log('action');
}
const PostEditActions = () => (
    <TopToolbar>
        {/* <ShowButton /> */}
        {/* Add your custom actions */}
        <ListButton />
        {/* <Button color="primary" onClick={customAction} label='Custome Action' /> */}
    </TopToolbar>
);
const CustomToolbar = () => (
    <Toolbar
        // {...props}
        sx={{ display: 'flex', justifyContent: 'space-between' }}
    >
        <SaveButton label="MySave"/>
        <ListButton label="Return"/>
        {/* <DeleteButton mutationMode="pessimistic" /> */}
    </Toolbar>
);
function MemberEdit(){

    const Title = () =>{
    const record = useRecordContext()
        // return <span>record ? `Edit ${record.name}` : 'Edit'</span>
        return <span>Member {record ? `"${record.name}"` : ''}</span>;

    }
    return (
        <Edit actions={<PostEditActions/>} mutationMode="pessimistic" title={<Title/>}>
            <SimpleForm toolbar={<CustomToolbar/>} >
                <Box sx={{display: 'flex', flexDirection:'row'}}>
                        <Box  sx={{display: 'flex', flexDirection:'column' , mr:8}}>
                            <TextInput source="name" validate={[required()]}/>
                            <TextInput source="title" validate={[required()]}/>
                        </Box>
                    <Box>
                        <AvatarInput source="avatar" />
                    </Box>
                </Box>

            {/* <SimpleForm > */}
                <Box>
                    <SelectInput source="level"  choices={MemberChoices} sx={{mr: 4}} validate={[required()]}/>
                    <TextInput source="intro" validate={[required()]}/>

                </Box>
            <TextInput source="career" multiline/>
            </SimpleForm>
        </Edit>
    )

}
export default MemberEdit
