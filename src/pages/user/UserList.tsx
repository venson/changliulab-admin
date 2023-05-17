
import {
  Datagrid,
  DeleteButton,
  EditButton,
  FunctionField,
  List,
  TextField,
  TopToolbar,
  CreateButton,
  useRefresh,
  Button

} from "react-admin";
import { Fragment, useState } from "react";
import SwitchList from "@/components/SwitchList";
const ListActions = () => (
  <TopToolbar>
    <CreateButton />
  </TopToolbar>
);
const UserList = () => {
  const buttons = () => (
    <Fragment>
        <Button label="Rest"/>
        <DeleteButton />
    </Fragment>
  )

  return (
    <div>
      <List resource="user" actions={<ListActions />}>
        <Datagrid>
          <TextField source="username" label="User Name"/>
          <TextField source="email" label="E-mail" />
          <TextField source="nickName" label="Nick Name"/>
          <SwitchList source="enable" />
          <FunctionField render={buttons} />
        </Datagrid>
      </List>
    </div>
  );
};
export default UserList