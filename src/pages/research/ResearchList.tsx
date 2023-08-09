import {
    Datagrid,
    DeleteButton,
    EditButton,
    FunctionField,
    List,
    TextField,
    TopToolbar,
    CreateButton,
    WrapperField, BooleanField, ShowButton

} from "react-admin";
import ReviewTip from "@/components/ChipTip/ReviewTip";
import SwitchList from "@/components/SwitchList";
import {Fragment} from "react";
import {TitleField} from "@/components/TitleField";

const ListActions = () => (
    <TopToolbar>
        <CreateButton/>
    </TopToolbar>
);
const ItemActions = () => (
    <Fragment>
        <EditButton/>
        <DeleteButton/>
        <ShowButton />
    </Fragment>
);
const ResearchList = () => {
    return (
        <div>
            <List resource="research" actions={<ListActions/>}>
                <Datagrid bulkActionButtons={false}>
                    <TitleField source="title" remove="isRemoveAfterReview"/>
                    <FunctionField
                        label="Review"
                        render={({review}: { review: string }) => (
                            <ReviewTip review={review}/>
                        )}
                    />
                    <SwitchList source="enable" sortable={false}/>
                    <FunctionField label="Actions" render={ItemActions}/>

                </Datagrid>
            </List>
        </div>
    );
};
export default ResearchList;
