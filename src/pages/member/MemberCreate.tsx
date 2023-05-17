import {
    Create,
    SelectInput,
    SimpleForm,
    TextInput,
    choices,
    Toolbar,
    SaveButton,
    ListButton,
    required
} from "react-admin"
import AvatarInput from "@/components/AvatarInput"
import { MemberChoices } from "@/common/types"
import {Box} from "@mui/material";

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
const MemberCreate= () =>{
    return (
        <Create>

            {/*<SimpleForm toolbar={<CustomToolbar/>} >*/}
                <SimpleForm  >
                <Box sx={{display: 'flex', flexDirection:'row'}}>
                    <Box  sx={{display: 'flex', flexDirection:'column' , mr:8}}>
                        <TextInput source="name" validate={[required()]}/>
                        <TextInput source="title" validate={[required()]}/>
                        <SelectInput source="level"  choices={MemberChoices} validate={[required()]}/>
                    </Box>
                    <Box>
                        <AvatarInput source="avatar" />
                    </Box>
                </Box>

                {/* <SimpleForm > */}<TextInput source="intro" fullWidth={true} validate={[required()]}/>

                <TextInput source="career" multiline fullWidth={true}/>

            </SimpleForm>
            {/*<SimpleForm>*/}

            {/*<TextInput source="name" />*/}
            {/*<TextInput source="title"/>*/}
            {/*<TextInput source="intro"/>*/}
            {/*<TextInput source="career" multiline/>*/}
            {/*<SelectInput source="level"  choices={MemberChoices}/>*/}

            {/*/!* <FunctionField source='avatar' render={(record: Member) =>*/}
            {/*<>*/}
            {/*<Image height={100} width={100} src={record.avatar} />*/}
            {/*</>*/}
            {/*}/> *!/*/}
            {/*<AvatarInput source="avatar" />*/}
            {/*</SimpleForm>*/}

        </Create>
    )
}
export default MemberCreate
