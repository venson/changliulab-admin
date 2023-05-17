import React, { useState, useEffect, Fragment } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { RaRecord, SaveButton, SimpleForm, TextInput, useDataProvider, useGetOne, useRefresh, useUpdate } from 'react-admin';
import GroupCheckBoxInput, { GroupChoices } from '@/components/GroupCheckBox';
import {Box, IconButton} from '@mui/material';
import Icon from "@mui/material/Icon";
import CloseIcon from '@mui/icons-material/Close';

interface DialogProps {
  dialog:{open: boolean, record: RaRecord| null},
  setDialog: Function
}
export default function RoleDialog({dialog, setDialog}:DialogProps) {
  const [role, setRole] = useState<Partial<RaRecord>>({});
  const dataProvider = useDataProvider();
  const[permissions, setPermissions ] = useState<GroupChoices[]>([])
  const [isLoading, setIsLoading] = useState(false);
  const refresh = useRefresh()
  const [update] = useUpdate()
  // if (!dialog.record) { return <div></div> }
  useEffect(() => {
    console.log('effect' , isLoading)
    setIsLoading(true)
    const helper = async () => {
      if(dialog.record){
      const { data } = await dataProvider.getOne('role', { id: dialog.record.id })
      setRole(data)
      setIsLoading(false);
      console.log('role', data)
      }
    }
    helper();
    console.log('effect' , isLoading)
  }, [dialog.record])
  useEffect(() =>{
    console.log('get All permissions')
    const helper = async () =>{
      // const {data} = await dataProvider.getList('auth/admin/permission/permissions',{pagination:{page:1,perPage:1000},sort:{field:'id',order:'ASC'}, filter:null})
      dataProvider.getList('auth/admin/permission/permissions',
          {pagination:{page:1,perPage:1000},sort:{field:'id',order:'ASC'}, filter:null})
          .then(({data}) =>  {
            console.log(data)
            setPermissions(data)
          }
    )
      // setPermissions(data as GroupChoices[]);

    }
    helper();


  },[])
  const handleClose = () => {
    setDialog({ open: false, record: null });
  };
  const save = (data: Partial<RaRecord>) => {
    dialog.record && update('role', { id: dialog.record.id, data: data }, {
      onSuccess: (data) => {
        setDialog({ open: false, record: null })
        console.log('dialog update', data)
        refresh();
      }
    })
  }
  const toolbar = ()=>{
    return (
      <Fragment>
        <SaveButton/>
        <Button onClick={handleClose}>Close</Button>
      </Fragment>
    )
  }

  return (
    <div>
        <Dialog open={dialog.open} onClose={handleClose}  maxWidth='md' fullWidth={true}>
          <DialogTitle>Role
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
            >
              {/*<Icon>close</Icon>*/}
              <CloseIcon/>
              </IconButton>
          </DialogTitle>
          <DialogContent sx={{minWidth: 800}}>
            <SimpleForm record={role} resource='role' onSubmit={save} toolbar={toolbar()} >
              <Box sx={{minWidth: 800}}>
              <TextInput source='roleName' sx={{marginInline:1}}/>
              <TextInput source='remark' sx={{marginInline:1}}/>
              <TextInput source='roleCode' sx={{marginInline:1}}/>
              </Box>
              <GroupCheckBoxInput resource='role' source='permissionIds' choices={permissions} label='permissions' />
            </SimpleForm>
          </DialogContent>
        </Dialog>
    </div>
  );
}
