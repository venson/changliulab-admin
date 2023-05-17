import { usePermissions } from "react-admin";
import Error403 from "@/pages/error/403";
import { Fragment, ReactNode } from "react";

interface PermissionCheckProps {
    resource: string;
    action: string;
    children: ReactNode;
}

const PermissionCheck = (props:PermissionCheckProps)=>{
    const { resource, action ,children} = props;
    const {isLoading, permissions} = usePermissions()


    return isLoading ? 
            (<div>Loading...</div>):
             permissions.has(`${resource}.${action}`) ?
             (<Fragment>
             {children}
             </Fragment>):
             (<Error403/>);
    
}
export default PermissionCheck;