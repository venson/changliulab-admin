import ReviewTip from "@/components/ChipTip/ReviewTip"
import { RemoveRedEye } from "@mui/icons-material"
import { Fragment } from "react"
import { List, Datagrid, TextField, DateField, FunctionField, EditButton } from "react-admin"
// import {renderAction} from './common/index'
import { ReviewType } from "@/common/types"
import RenderAction from "./common"

 const ResearchReviewList = ()=>{
    return <>

    <List resource="review" filter={{'type':'research'}} disableSyncWithLocation actions={false}>
        <Datagrid bulkActionButtons={false}>
            <TextField source="title"/>
            <DateField source="gmtCreate" showTime locales="zh-CN" label="Create"/>
          <FunctionField
            label="Review"
            render={({ review }: { review: string }) => (
              <ReviewTip review={review} />
            )}
          />
          {/* <FunctionField label="Action" render={renderAction()} /> */}

          <FunctionField render={({refId, type}: {refId: string,type:ReviewType})=>(
            <RenderAction id={refId} type={type} />)
            // renderAction(refId,type))
          }/>
        </Datagrid>

    </List>
    </>
}
export default ResearchReviewList