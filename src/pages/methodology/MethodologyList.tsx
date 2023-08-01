import ReviewTip from "@/components/ChipTip/ReviewTip";
import SwitchList from "@/components/SwitchList";
import { Fragment } from "react";
import { Datagrid, TopToolbar, CreateButton, FunctionField, List, EditButton, DeleteButton, Show, ShowBase, ShowButton } from "react-admin";
import {TitleField} from "@/components/TitleField";

const ListActions = () => (
  <TopToolbar>
    <CreateButton />
  </TopToolbar>
);
const ItemActions = ()=>(
  <Fragment>
    <EditButton resource="methodology"/>
    <DeleteButton resource="methodology"/>
    <ShowButton resource="methodology"/>
  </Fragment>
)
const MethodologyList = () => {
  return (
    <Fragment>
      <List resource="methodology" actions={<ListActions/>}>
        {/* <List resource="eduservice/admin/edu-methodology" actions={<ListActions/>} */}
         {/* title={<span>Methodology</span>}> */}
        <Datagrid bulkActionButtons={false}>
            <TitleField source="title" remove="isRemoveAfterReview"/>
          <FunctionField
            label="Review"
            render={({ review }: { review: string }) => (
              <ReviewTip review={review} />
            )}
          />
          <SwitchList source="enable" sortable={false} />
          <SwitchList source="isPublic" sortable={false} />
          {/* <FunctionField label="Actions" render={ItemActions}/> */}

          <FunctionField
            label="Actions"
            render={ItemActions}
          />
        </Datagrid>
      </List>
    </Fragment>
  );
};
export default MethodologyList;
