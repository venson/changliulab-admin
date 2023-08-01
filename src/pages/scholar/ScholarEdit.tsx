import {Box} from "@mui/material";
import {
    DateInput,
    Edit,
    NumberInput,
    SelectArrayInput,
    SimpleForm,
    TextInput,
    UrlField,
} from "react-admin";
import {dataProvier} from "@/dataProvider";
import React, {memo, useEffect, useMemo, useState} from "react";
import EditableBarChart from "@/components/BarChartEdit/chat";
import {UrlLinkField} from "@/components/UrlLinkField";

const ScholarEdit = memo(() => {
    // const [memberChoices, setMemberChoices] = useState([{id: 1, name:'example'}]);
    const [memberChoices, setMemberChoices] = useState<any[]>([]);
    const [editGoogle, setEditGoogle]  = useState(false);
    const [isMemberLoading, setIsMemberLoading] = useState(false);
    useEffect(() => {
        // setIsLoading(true)
        const getMembers = async () => {

            const {data} = await dataProvier.getList('eduservice/admin/edu-member', {
                pagination: {
                    perPage: 100,
                    page: 1
                }, sort: {field: 'sss', order: 'DESC'}, filter: {member: 'current'}
            })
            setMemberChoices(data)
        }
        getMembers()
        setIsMemberLoading(false)

    }, [])
    const multiSelect = () => {
        return isMemberLoading ? <div></div> :
            <SelectArrayInput className="w-1/2" source="memberIdList" label="Members" choices={memberChoices}/>
    }
    // console.log('member', memberChoices)
    return <div>
        <Edit>
            <SimpleForm>
                <Box className="w-full">
                    <Box className="flex justify-between gap-x-4">
                        <TextInput className="w-3/4" source="title"/>
                        <TextInput className="w-1/4" source="titleLinkUrl"/>
                        <UrlLinkField  source="googleLink"
                                       onClick={() =>{setEditGoogle(!editGoogle)
                                    console.log('editGoogle', editGoogle)}
                                       }>
                            Google</UrlLinkField>
                        {/*<UrlField emptyText="xxx" source="googleLink"/>*/}
                    </Box>

                    {/* <TextInput className={editGoogle? '':'hidden'} source="googleLink" sx={{width: '100%'}}/> */}
                    {editGoogle && <TextInput  source="googleLink" sx={{width: '100%'}}/> }
                    <Box className="flex justify-between gap-x-4">
                        <TextInput className="w-1/2" source="authors"/>
                        {multiSelect()}
                    </Box>
                    <TextInput source="linkText" sx={{width: '100%'}}/>
                    <TextInput source="linkUrl" sx={{width: '100%'}}/>
                    <Box className="flex  justify-between gap-x-4">
                        <TextInput className="w-1/2 " source="journal"/>
                        <TextInput className="w-1/4" source="publisher"/>
                        <DateInput className="w-1/4" source="publicationDate"/>
                    </Box>
                    <Box className="flex  justify-between gap-x-8">
                        <NumberInput className="w-1/3 pr-2" source="volume"/>
                        <NumberInput className="w-1/3 pr-2" source="issue"/>
                        <TextInput className="w-1/3" source="pages"/>
                    </Box>
                    <TextInput className="w-full" source="description" rows={5} multiline/>
                    <EditableBarChart source="citationList" dateSource="publicpublicationDate"/>
                </Box>
            </SimpleForm>


        </Edit>

    </div>
})
export default ScholarEdit;
