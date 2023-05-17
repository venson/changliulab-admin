import {
  Datagrid,
  DeleteButton,
  EditButton,
  FunctionField,
  List,
  TextField,
  TopToolbar,
  CreateButton,

} from "react-admin";
import { Fragment, useState } from "react";
import SwitchList from "@/components/SwitchList";
import PermissionDialog from "./PermissionDialog";
const ListActions = () => (
  <TopToolbar>
    <CreateButton />
  </TopToolbar>
);
import { DialogButton } from "@/components/DialogButton";

const PermissionList = () => {
  const [dialog, setDialog] = useState({open:false, record:null})
const buttons = () => (
  <Fragment>
    <DialogButton setDialog={setDialog}/>
    <DeleteButton />
  </Fragment>
)

  return (
    <div>
      <List resource="permission" actions={<ListActions />}>
        <Datagrid>
            <TextField source="category" />
            <TextField source="action"/>
          <TextField source="name" />
          <SwitchList source="enable" />
          <TextField source="slug" />
          <TextField source="description" />
          <FunctionField render={buttons} label="Actions"/>
        </Datagrid>
      </List>
      <PermissionDialog dialog={dialog} setDialog={setDialog}/>
    </div>
  );
};
export default PermissionList;
