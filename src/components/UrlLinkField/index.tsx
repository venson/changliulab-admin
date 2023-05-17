import * as React from 'react';
import {AnchorHTMLAttributes, memo, FC, Fragment, useState} from 'react';
import get from 'lodash/get';
import { sanitizeFieldRestProps } from 'react-admin';
import { Typography, Link } from '@mui/material';
import { useRecordContext, useTranslate } from 'ra-core';
import { PublicFieldProps, InjectedFieldProps} from 'react-admin';
import Button from "@mui/material/Button";

export const UrlLinkField: FC<UrlFieldProps> = memo(props => {
    const { className,onClick ,emptyText, source,children, ...rest } = props;
    const record = useRecordContext(props);
    const value = get(record, source ?? 'url');
    const translate = useTranslate();

    if (value == null) {
        return (
            <Typography
                component="span"
                variant="body2"
                className={className}
                {...sanitizeFieldRestProps(rest)}
            >
                {emptyText && translate(emptyText, { _: emptyText })}
            </Typography>
        );
    }

    return (
        <div className="flex flex-col justifiy-between">
            <Link
                className={`${className}`}
                href={value}
                onClick={stopPropagation}
                variant="body2"
                {...sanitizeFieldRestProps(rest)}
            >
                    <div className="text-center m-2">
                        {children}
                    </div>

            </Link>
            <div>
                <Button onClick={ () =>onClick} title="Edit">Edit</Button>
            </div>
        </div>
    );
});

// UrlLinkField.propTypes = fieldPropTypes;
UrlLinkField.displayName = 'UrlLinkField';

export interface UrlFieldProps
    extends PublicFieldProps,
        InjectedFieldProps,
        AnchorHTMLAttributes<HTMLAnchorElement> {}

// useful to prevent click bubbling in a Datagrid with rowClick
const stopPropagation = (e: MouseEvent) => e.stopPropagation();
