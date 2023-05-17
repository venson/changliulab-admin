import {
  Datagrid,
  DeleteButton,
  EditButton,
  FunctionField,
  List,
  TextField,
  TopToolbar,
  CreateButton

} from "react-admin";
import ReviewTip from "@/components/ChipTip/ReviewTip";
import SwitchList from "@/components/SwitchList";
import { Fragment } from "react";
import { TitleField } from "@/components/TitleField";
const ListActions = () => (
  <TopToolbar>
    <CreateButton />
  </TopToolbar>
);
const ItemActions = () =>(
  <Fragment>
    <EditButton/>
    <DeleteButton/>
  </Fragment>
);
const ActivityList = () => {
  return (
    <div>
      <List resource="activity" actions={<ListActions />} >
        <Datagrid>
          <TitleField source="title" remove="isRemoveAfterReview" published="isPublished" updated="isModified"/>
          <TextField source="title" sortable={false} />
          <FunctionField
            label="Review"
            render={({ review }: { review: string }) => (
              <ReviewTip review={review} />
            )}
          />
          <SwitchList source="enable" sortable={false} />
          <FunctionField label="Actions" render={ItemActions} />

        </Datagrid>
      </List>
    </div>
  );
};
export default ActivityList;
