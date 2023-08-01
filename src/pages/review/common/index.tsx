import { ReviewType } from "@/common/types"
import { RemoveRedEyeRounded } from "@mui/icons-material"
import { Button } from "@mui/material"
import { Fragment, memo } from "react"
import { Link } from "react-admin"
interface ReviewProps{
    id: string,
    type: ReviewType,
    optId?: string,
    // optType?: ReviewType,
}
const courseRoot = ReviewType.SYLLABUS
const RenderAction = memo(({id,type,optId}: ReviewProps)=>{
    console.log('render action',id, type, optId)
    const url = optId? 
    `/review/${optId}?type=${courseRoot}&optId=${id}&optType=${type}`:
    `/review/${id}?type=${type}`

    // const url = `/review/${id}?type=${type}${ optId && optType ? `&optId=${optId}&optType=${optType}` : ''}`

  return <Fragment>
    {/* <Button> */}
        {/* Review */}
        <Link to={url}>Review</Link>
    {/* </Button> */}
    {/* <Button component={Link} to={url} label="Review" startIcon={<RemoveRedEyeRounded/>}/> */}
  </Fragment>
})


// (refId: string, type: ReviewType, optId?: string, optType?:ReviewType) =>{



// }


// export {renderAction}
export default RenderAction;
