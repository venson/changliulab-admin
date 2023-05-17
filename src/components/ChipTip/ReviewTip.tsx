import ChipTip from "./chipTip"
import { ReviewStatus } from "@/common/types"
import PropTypes from 'prop-types'
const propsTypes = {
    review: PropTypes.oneOf(Object.keys(ReviewStatus)).isRequired
}
type ReviewTipProps = PropTypes.InferProps<typeof propsTypes>


const reviewTipMap = {
    'FINISHED':{
        tip: 'Review passed',
        label: 'Reviewed'
    },
    'APPLIED':{
        tip: 'Review applied',
        label: 'Applied'
    },
    'REJECTED':{
        tip: 'Review rejected',
        label: 'Rejected'
    },
    'NONE':{
        tip: 'New content',
        label: 'New'
    },
}

const ReviewTip = (prop:ReviewTipProps)=>{
    const type: keyof typeof reviewTipMap = prop.review as keyof typeof reviewTipMap
    const chiptip = reviewTipMap[type]
    return (
        <ChipTip label={chiptip.label} tip={chiptip.tip}/>
    )
}
ReviewTip.prototype = propsTypes
export default ReviewTip;