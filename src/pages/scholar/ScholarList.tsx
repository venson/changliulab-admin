import {
    Datagrid,
    DeleteButton,
    EditButton,
    FunctionField,
    List,
    TextField,
    TopToolbar,
    CreateButton,
    WrapperField, BooleanField

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
        <EditButton />
        <DeleteButton/>
    </Fragment>
);
const ScholarList = () => {
    return (
        <div>
            <List resource="scholar" actions={<ListActions/>}>
                <Datagrid bulkActionButtons={false}>
                    <TextField source="title"/>
                    <TextField source="year"/>
                    <TextField source="totalCitations" label="Cited By"/>
                    {/*<TitleField source="title" remove="isRemoveAfterReview"/>*/}
                    {/*<FunctionField*/}
                    {/*    label="Review"*/}
                    {/*    render={({review}: { review: string }) => (*/}
                    {/*        <ReviewTip review={review}/>*/}
                    {/*    )}*/}
                    {/*/>*/}
                    {/*<SwitchList source="enable" sortable={false}/>*/}
                    <FunctionField label="Actions" render={ItemActions}/>

                </Datagrid>
            </List>
        </div>
    );
};
export default ScholarList;
