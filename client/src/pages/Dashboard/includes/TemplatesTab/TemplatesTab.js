import React, { useState } from 'react';
import { Button } from '@mui/material';

const templates = [
    {
        template_name: "My Template",
        description: "This is my nice new template",
        content: "<p>Hello there!<p>",
        template_id: "567"
    },
    {
        template_name: "My Second Template",
        description: "This is another great template",
        content: "<p>What's up<p>",
        template_id: "890"
    }
];


const TemplatesTab = () => {
    const [option, setOption] = useState("");

    function handleOptionChange(e) {
        setOption(e.target.value);
    };

    return (
        <>
            <select className="form-select" value={option}
                onChange={e => handleOptionChange(e)}>
                <option value="">Select Field</option>
                {
                    templates.map((item, key) =>
                        <option value={key} key={key}>{item.template_name}</option>
                    )
                }
            </select>
            {option ?
                <>
                    <h6>Template Name</h6>
                    <p>{templates[option]['template_name']}</p>

                    <h6>Description</h6>
                    <p>{templates[option]['description']}</p>
                </>
                :
                null
            }
            <Button
                className="btn-choose"
                variant="outlined"
                component="span" >
                + Add Template
            </Button>
        </>
    );
};

export default TemplatesTab;