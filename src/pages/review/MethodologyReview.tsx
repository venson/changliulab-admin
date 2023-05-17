import ReviewTip from "@/components/ChipTip/ReviewTip"
import { Datagrid, DateField, FunctionField, List, TextField } from "react-admin"

 const MethodologyReview = ()=>{
    return <>

    <List resource="review" filter={{'type':'methodology'}} disableSyncWithLocation actions={false}>
        <Datagrid bulkActionButtons={false}>
            <TextField source="title"/>
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
export default MethodologyReview