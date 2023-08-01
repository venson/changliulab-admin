import { ReviewType } from "@/common/types"
import ReviewTip from "@/components/ChipTip/ReviewTip"
import { RemoveRedEye } from "@mui/icons-material"
import { Fragment } from "react"
import { List, TextField, useDataProvider, Datagrid, DateField, FunctionField, EditButton, Button, Link } from "react-admin"
// import RenderAction, { renderAction } from "./common"
import RenderAction from "./common"

 const ActivityReviewList = ()=>{
    return <>
    <List resource="review" filter={{'type':'activity'}} actions={false}>
        <Datagrid bulkActionButtons={false}>
            <TextField source="title"/>
            <DateField source="gmtCreate" showTime locales="zh-CN" label="Create"/>
          <FunctionField
            label="Review"
            render={({ review }: { review: string }) => (
              <ReviewTip review={review} />
            )}
          />
          <FunctionField render={({refId, type}: {refId: string,type:ReviewType})=>(
            // renderAction(refId,type)
            <RenderAction id={refId} type={type} />
            )
          }/>
        </Datagrid>

    </List>
    </>
}
export default ActivityReviewList