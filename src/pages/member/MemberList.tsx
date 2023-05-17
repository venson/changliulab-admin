import {
  Datagrid,
  DeleteButton,
  EditButton,
  FunctionField,
  ImageField,
  List,
  TextField,
} from "react-admin";
import {
  TopToolbar,
  CreateButton,
} from "react-admin";
import { MemberLevel } from "../../common/types";
import { Fragment } from "react";
const ListActions = () => (
  <TopToolbar>
    <CreateButton />
  </TopToolbar>
);
const ItemActions = ()=>(
  <Fragment>
    <EditButton/>
    <DeleteButton/>
  </Fragment>
)
const MemberList = ()=> {
  return (
    <div>
      <List resource="member" actions={<ListActions />}>
        <Datagrid 
        >
          <TextField source="name" />
          <TextField source="title" />
          <ImageField
            source="avatar"
            sx={{
              "& img": { maxWidth: 50, maxHeight: 50, objectFit: "contain" },
            }}
            // sx={{'& img': { height: 100, weight: 100}}}
          />
          <FunctionField
            label="level"
            render={({ level }: { level: string }) =>
              MemberLevel[level as keyof typeof MemberLevel]
            }
          />
          <FunctionField
            label="Actions"
            render={ItemActions}
          />
        </Datagrid>
      </List>
    </div>
  );
}
export default MemberList;
