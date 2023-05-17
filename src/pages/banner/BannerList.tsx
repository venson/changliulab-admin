import {
  Datagrid,
  DeleteButton,
  EditButton,
  FunctionField,
  List,
  TextField,
  TopToolbar,
  CreateButton,
  ImageField

} from "react-admin";
import SwitchList from "@/components/SwitchList";
import { Fragment } from "react";
const ListActions = () => (
  <TopToolbar>
    <CreateButton />
  </TopToolbar>
);
const ItemActions = () =>(
  <Fragment>
    <EditButton resource="banner"/>
    <DeleteButton resource="banner"/>
  </Fragment>
);
const BannerList = () => {
  return (
    <div>
      <List resource="educms/admin/banner" actions={<ListActions />}>
        <Datagrid>
          <TextField source="title" sortable={false} />
          <ImageField source="imageUrl" label="First Image" sortable={false} />
          <ImageField source="imageOutlinkUrl" label="Alternative Image" sortable={false} />
          <SwitchList source="enable" sortable={false} />
          <FunctionField label="Actions" render={ItemActions} />

        </Datagrid>
      </List>
    </div>
  );
};
export default BannerList;
