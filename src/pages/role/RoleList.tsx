import {
  Datagrid,
  DeleteButton,
  FunctionField,
  List,
  TextField,
  TopToolbar,
  CreateButton,
} from "react-admin";
import { Fragment, useState } from "react";
import SwitchList from "@/components/SwitchList";
import RoleDialog from "./RoleDialog";
const ListActions = () => (
  <TopToolbar>
    <CreateButton />
  </TopToolbar>
);
import { DialogButton } from "@/components/DialogButton";
import PermissionCheck from "@/components/PermissionCheck";

const RoleList = () => {
  const [dialog, setDialog] = useState({ open: false, record: null })
  const buttons = () => (
    <Fragment>
      <DialogButton setDialog={setDialog} />
      <DeleteButton />
    </Fragment>
  )

  return (
    <>
     {/* <PermissionCheck resource="role" action="READ"> */}
        <List resource="role" actions={<ListActions />} title={<span>Role</span>}>
        <Datagrid bulkActionButtons={false}>
          <TextField source="roleName" />
          <TextField source="remark" />
          <SwitchList source="enable" />
          <TextField source="roleCode" />
          <FunctionField render={buttons} />
        </Datagrid>
      </List>
      <RoleDialog dialog={dialog} setDialog={setDialog} />

     {/* </PermissionCheck> */}
    </>
    )
};
export default RoleList
