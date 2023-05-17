import { Chip, Tooltip } from "@mui/material"
import { capitalize } from "@/common/utils/capitalize"
import PropTypes from 'prop-types'
const propTypes =  {
    label: PropTypes.string.isRequired,
    tip: PropTypes.string.isRequired,
}
type cpropTypes = PropTypes.InferProps<typeof propTypes>;

const ChipTip = ({label, tip}:cpropTypes) =>{
    return (
        <div>
            <Tooltip title={tip}>
                <Chip label={capitalize(label)}></Chip>
            </Tooltip>
        </div>
    )
}
ChipTip.propTypes = propTypes
export default ChipTip;