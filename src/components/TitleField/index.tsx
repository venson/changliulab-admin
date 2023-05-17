import * as React from 'react';
import { memo, FC, ElementType } from 'react';
import get from 'lodash/get';
import Typography, { TypographyProps } from '@mui/material/Typography';
import { useRecordContext } from 'ra-core';

import { sanitizeFieldRestProps } from 'react-admin';
import { PublicFieldProps, InjectedFieldProps} from 'react-admin';
export const TitleField: FC<TitleFieldProps> = memo(props => {
    const { className, source, emptyText, remove ,published, updated,...rest } = props;
    const record = useRecordContext(props);
    const titleSource = source? source: 'title';
    const value = get(record, titleSource);
    const isRemove = get(record,remove);
    const isPublished = get(record,published ?published : 'isPublished');
    const isUpdated = get(record,updated? updated: 'isModified');
    const newClassName = `${className? className:''} ${isRemove? 'line-through': ''}`;

    return (
        <Typography
            component="span"
            variant="body2"
            className={newClassName}
            {...sanitizeFieldRestProps(rest)}
        >
            {value != null && typeof value !== 'string'
                ? JSON.stringify(value)
                : value || emptyText}
                {isUpdated && <span className='text-xs italic text-green-600'> New</span>}
                {isPublished && <span className='text-xs italic text-red-400'> Published</span>}
        </Typography>
    );
});

// what? TypeScript loses the displayName if we don't set it explicitly
TitleField.displayName = 'TitleField';
TitleField.propTypes = {
    // @ts-ignore
    ...Typography.propTypes,
};

export interface TitleFieldProps
    extends PublicFieldProps,
        InjectedFieldProps,
        Omit<TypographyProps, 'textAlign'> {
    // TypographyProps do not expose the component props, see https://github.com/mui-org/material-ui/issues/19512
    component?: ElementType<any>;
    remove: string;
    updated?: string;
    published?: string;
}
