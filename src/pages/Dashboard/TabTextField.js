import React, { useState } from "react";
import CoreGridItem from "../../components/_core/CoreGridItem";
import TextBox from '../../components/_core/Inputs/TextBox';
import Button from '@mui/material/Button';


const TabTextField = ({ key, value, category }) => {
    const [fieldState, setFieldState] = useState(value);
    const initialValue = value;

    function updateValue() {
        if (category === "company") {
            // Update DB
        } else if (category === "profile") {
            // Update DB
        } else if (category === "template") {
            // Update DB
        };
    };

    return (
        <CoreGridItem md={12}>
            <TextBox
                label={key}
                value={fieldState}
                onChange={(e) => setFieldState(e.target.value)}
            />
            {
                fieldState !== initialValue
                    ?
                    <Button onClick={() => updateValue()}>Update</Button>
                    :
                    null
            }
        </CoreGridItem>
    );
};

export default TabTextField;