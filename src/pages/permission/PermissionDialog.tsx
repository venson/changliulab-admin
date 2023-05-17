import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import {HttpError, RaRecord, SelectInput, SimpleForm, TextInput, useNotify, useRefresh, useUpdate} from 'react-admin';

import {actionChoices} from "@/common/types";

interface PermissionDialogProps{
    dialog:{open: boolean , record: RaRecord | null};
    setDialog: Function
}
export default function PermissionDialog({dialog, setDialog}: PermissionDialogProps) {
    const [update, {isLoading, error}] = useUpdate()
    const refresh = useRefresh()
    const notify = useNotify()
  const handleClose = () => {
    setDialog({open: false, record: null});
  };
  const save = (data: Partial<RaRecord>)=>{
    dialog.record && update('permission', {id: dialog.record.id, data: data},{
        onSuccess:(data)=>{
        setDialog({open:false, record: null})
        console.log('dialog update',data)
        refresh();
        },
        onError:(error) =>{
            if(error instanceof HttpError){
                notify(error.message);
            }

        }
    })
  }

  return (
    <div>
        {dialog.record &&
      <Dialog open={dialog.open} onClose={handleClose} maxWidth="md" fullWidth={true}>
        <DialogContent>
            <SimpleForm record={dialog.record} resource='permission' onSubmit={save} >
                <TextInput source="category" />
                <TextInput source='name' />
                <TextInput source="description" />
                <SelectInput  source="action" choices={actionChoices} />
            </SimpleForm>
        </DialogContent>
      </Dialog>
        }
    </div>
  );
}
