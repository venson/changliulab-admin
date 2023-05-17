import * as React from 'react';
import { ReactElement } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled } from '@mui/material/styles';
import ContentCreate from '@mui/icons-material/Create';
import { Link } from 'react-router-dom';
import {
    RaRecord,
    useResourceContext,
    useRecordContext,
    useCreatePath,
} from 'ra-core';
import { Button ,ButtonProps } from 'react-admin';

// import { Button, ButtonProps } from '';

/**
 * Opens the Edit view for the current record.
 *
 * Reads the record and resource from the context.
 *
 * @example // basic usage
 * import { EditButton } from 'react-admin';
 *
 * const CommentEditButton = () => (
 *     <EditButton label="Edit comment" />
 * );
 */
export const DialogButton = <RecordType extends RaRecord = any>(
    props: EditButtonProps<RecordType> & {setDialog: Function}
) => {
    const {
        icon = defaultIcon,
        label = 'ra.action.edit',
        scrollToTop = true,
        className,
        children,
        ...rest
    } = props;
    const stopPropagation = (e:any) => {e.stopPropagation();
    props.setDialog({open:true, record: record}) }
    const record = useRecordContext(props);
    if (!record) return null;
    return (
        <React.Fragment>
        <StyledButton
            label={label}
            onClick={stopPropagation}
            className={clsx(DialogButtonClasses.root, className)}
        >
            {icon}
        </StyledButton>
        </React.Fragment>

    );
};

// avoids using useMemo to get a constant value for the link state
const scrollStates = {
    true: { _scrollToTop: true },
    false: {},
};

const defaultIcon = <ContentCreate />;

// useful to prevent click bubbling in a datagrid with rowClick

interface Props<RecordType extends RaRecord = any> {
    icon?: ReactElement;
    label?: string;
    record?: RecordType;
    resource?: string;
    scrollToTop?: boolean;
}

export type EditButtonProps<RecordType extends RaRecord = any> = Props<
    RecordType
> &
    ButtonProps;

DialogButton.propTypes = {
    icon: PropTypes.element,
    label: PropTypes.string,
    record: PropTypes.any,
    scrollToTop: PropTypes.bool,
};

const PREFIX = 'DialogButton';

export const DialogButtonClasses = {
    root: `${PREFIX}-root`,
};

const StyledButton = styled(Button, {
    name: PREFIX,
    overridesResolver: (_props, styles) => styles.root,
})({});
