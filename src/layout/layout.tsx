import { Layout, LayoutProps } from "react-admin";
import CMenu from "./CMenu";

const CLayout = (props:LayoutProps)=> <Layout {...props} menu={CMenu} />
export default CLayout;