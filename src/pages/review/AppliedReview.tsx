import ReviewTip from "@/components/ChipTip/ReviewTip"
import { Datagrid, DateField, FunctionField, List, TextField, WrapperField } from "react-admin"

 const AppliedReview = ()=>{
    return <>
    <List resource="review" disableSyncWithLocation actions={false}>
        <Datagrid bulkActionButtons={false}>
            <WrapperField label="Title">
                <TextField source="title"/>
                <br/>
                <TextField source="subTitle"/>
            </WrapperField>

            <FunctionField label="Type" render={({type}:{type: string}) =>(type.toLowerCase())}/>
            <DateField source="gmtCreate" showTime locales="zh-CN" label="Create"/>
          <FunctionField
            label="Review"
            render={({ review }: { review: string }) => (
              <ReviewTip review={review} />
            )}
          />
        </Datagrid>

    </List>
    </>
}
export default AppliedReview