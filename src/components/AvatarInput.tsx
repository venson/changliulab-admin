// in SexInput.js
import { CommonInputProps, InputProps, UrlField, useInput } from 'react-admin';
import EasyCrop from '@/components/EasyCrop';

// create component AvatarInput.tsx use MyCropper crop image and save return url
export type AvatarInputProps= CommonInputProps;

const AvatarInput= ({source}:AvatarInputProps) => {
    const {
        field,
    } = useInput({source});

    return (
        <>
            <EasyCrop {...field} mode='avatar' path='path' source='avatar'/>
        </>
    );
};

export default AvatarInput;