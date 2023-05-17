import ReviewTip from "@/components/ChipTip/ReviewTip"
import { List, TextField, useDataProvider, Datagrid, DateField, FunctionField } from "react-admin"

 const ActivityReview = ()=>{
    return <>
    <List resource="review" filter={{'type':'activity'}} disableSyncWithLocation actions={false}>
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
export default ActivityReview