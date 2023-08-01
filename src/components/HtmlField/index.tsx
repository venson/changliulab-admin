import { Fragment, memo } from "react"
import pako from 'pako'
import { base64ToBytes, base64decode } from "@/common/utils/base64";
import { FieldProps, PublicFieldProps, useRecordContext } from "react-admin";
import get from 'lodash/get'

interface HtmlFieldProps
extends PublicFieldProps{
    base64?: string;
    // html?: string;
    // className?: string;
}

const decodeHtml = (base64?:string) =>{
    if(base64){
    try{
    const htmlbr = base64ToBytes(base64)
    return pako.inflate(htmlbr, {to: 'string'})
    } catch(err){
        console.log(err)
        return "No Content"
    }
    }
    return "No Content"


}
const HtmlField = memo((props: HtmlFieldProps)=>{
    const {base64, source} = props;
    let value
    if(source){

    const record = useRecordContext(props);

    value = get(record, source);

    }else{
        value = base64
    }
    console.log('render html')
    const htmlContent = decodeHtml(value)

    return <Fragment>
        <div className="text-left p-4" dangerouslySetInnerHTML={{ __html: htmlContent as TrustedHTML}}></div>


    </Fragment>
})
export default HtmlField;