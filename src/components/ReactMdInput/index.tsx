import { CommonInputProps, useInput } from "react-admin"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"

const ReactMdInput = (props: CommonInputProps)=>{
    const {field} = useInput(props)
    return (
        <ReactMarkdown children={field.value} />
    )
}
export default ReactMdInput;