import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    FormGroup,
    FormControlLabel,
    Checkbox,
    Typography,
    Collapse,
} from '@mui/material';
// import {makeStyles} from '@mui/styles';
import { makeStyles } from 'tss-react/mui'
import { useInput } from 'react-admin';
import exp from 'constants';
import { FC } from 'react';

interface GroupChoice {
    id: string; //value
    name: string; //label
}

export interface GroupChoices {
    name: string;
    id: string;
    children: GroupChoice[];
    expand: boolean;
}

interface GroupCheckBoxInputProps {
    label: string;
    choices: GroupChoices[];
    source: string;
    fullWidth?: boolean;
}

const useStyles = makeStyles()((theme) => ({
    groupLabel: {
        marginBottom: theme.spacing(1),
        fontWeight: 'bold',
    },
}));

const GroupCheckBoxInput = ({
    label,
    choices,
    source,
}: GroupCheckBoxInputProps) => {
    const [ choicesState, setChoicesState ] = useState(choices);
    const { classes } = useStyles();
    const { field } = useInput({ source });


    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { checked, value: choiceValue } = event.target;
        const index = field.value.indexOf(choiceValue);
        const newValue = [...field.value];

        if (checked && index === -1) {
            newValue.push(choiceValue);
        } else if (!checked && index !== -1) {
            newValue.splice(index, 1);
        }
        console.log(newValue)

        field.onChange(newValue);
    };
    const toggleExpanded = (index:number) => {
        setChoicesState((prevState) => {
            const target =prevState[index]
             return [...prevState.slice(0,index), 
                { ...target, expand: target.expand? !target.expand: true},
                 ...prevState.slice(index+1)]})
    };
    return (
        <FormGroup>
            <Typography className={classes.groupLabel} >
                {label}
            </Typography>
            {choicesState.map(({ name, id, children, expand }, index) => (
                <div key={id}>
                    <Typography onClick={() =>toggleExpanded(index)}>
                        {name}
                    </Typography>
                    <Collapse in={expand}>
                        {children.map((option) => (
                            <FormControlLabel
                                className='pl-4'
                                key={option.id}
                                control={
                                    <Checkbox
                                        checked={field.value.includes(option.id)}
                                        onChange={handleCheckboxChange}
                                        value={option.id}
                                    />
                                }
                                label={option.name}
                            />
                        ))}
                    </Collapse>

                </div>
            ))}
        </FormGroup>
    );
};

GroupCheckBoxInput.propTypes = {
    label: PropTypes.string.isRequired,
    choices: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            children: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.string.isRequired,
                    name: PropTypes.string.isRequired,
                })
            ).isRequired,
        })
    ).isRequired,
    source: PropTypes.string.isRequired,
    resource: PropTypes.string.isRequired,
    fullWidth: PropTypes.bool,
};

GroupCheckBoxInput.defaultProps = {
    fullWidth: false,
};

export default GroupCheckBoxInput;
