import ReviewTip from "@/components/ChipTip/ReviewTip"
import { Datagrid, DateField, FunctionField, List, TextField, WrapperField } from "react-admin"
// import RenderAction, { renderAction } from "./common"
import { ReviewType } from "@/common/types"
import RenderAction from "./common"

 const courseReviewList = ()=>{
    return <>
    <List resource="review" filter={{'type':'course'}} disableSyncWithLocation actions={false}>
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
          <FunctionField label="Action" render={({refId, type, parentId}: {refId: string,type:ReviewType, parentId: string})=>(
            <RenderAction id={refId} type={type} optId={parentId}  />
            // renderAction(refId,type)
            )
          }/>
        </Datagrid>

    </List>
    </>
}
export default courseReviewList