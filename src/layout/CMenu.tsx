import { Menu } from "react-admin";
import { NestMenu } from "./src/NestMenu";

import DefaultIcon from '@mui/icons-material/ViewList';
import GroupIcon from '@mui/icons-material/Group';
import { Icon } from "@mui/material";
const CMenu = () =>(
    <Menu>
        <Menu.ResourceItem name="research"/>
        <Menu.ResourceItem name="course"/>
        <Menu.ResourceItem name="methodology"/>
        <Menu.ResourceItem name="banner"/>
        <Menu.ResourceItem name="scholar"/>
        <Menu.ResourceItem name="activity"/>
        <Menu.ResourceItem name="member" />
        <Menu.Item to="/review" primaryText="Review" leftIcon={<Icon>preview</Icon>} />
        <NestMenu label="Users" >
            <NestMenu.ResourceItem name="user"/>
            <NestMenu.ResourceItem name="roles"/>
            <NestMenu.ResourceItem name="permission"/>
            {/* <NestMenu.Item to="ss" title="User name" /> */}
        </NestMenu>
    </Menu>
)
export default CMenu;