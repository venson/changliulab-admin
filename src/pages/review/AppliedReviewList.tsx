import { ReviewType } from "@/common/types"
import ReviewTip from "@/components/ChipTip/ReviewTip"
import { Datagrid, DateField, FunctionField, List, TextField, WrapperField } from "react-admin"
import RenderAction from "./common"
// import { renderAction } from "./common"

 const AppliedReviewList = ()=>{
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
          <FunctionField render={({refId, type, parentId}: {refId: string,type:ReviewType, parentId: string})=>(
            // renderAction(refId,type)
            <RenderAction id={refId} type={type} optId={parentId} />
            )
          }/>
        </Datagrid>

    </List>
    </>
}
export default AppliedReviewList