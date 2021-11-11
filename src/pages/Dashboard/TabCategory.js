import React, { useState } from 'react';
import { Button } from '@mui/material';

const company = {
    company_name: "Apple",
    address: "100 Main STreet",
    city: "San Francisco",
    state: "CA",
    zip: "10412",
    phone: "+1123456789",
    fax: "1123456789",
    website: "www.apple.com",
    company_id: "11223344"
};

const profile = {
    full_name: "Michael Johnson",
    id: "99887766",
    email: "mike@email.com",
    company_id: "11223344"
};

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

const TabCategory = ({ tabs, openTab }) => {
    switch (tabs.indexOf(openTab)) {
        case 0:
            return companyTab();
        case 1:
            return profileTab();
        case 2:
            return TemplatesTab();
        default:
            return null;
    };
};

function companyTab() {
    return (
        <>
            <h6>Company name</h6>
            <p>{company['company_name']}</p>

            <h6>Address</h6>
            <p>{company['address']}</p>

            <h6>City</h6>
            <p>{company['city']}</p>

            <h6>State</h6>
            <p>{company['state']}</p>

            <h6>Zip Code</h6>
            <p>{company['zip']}</p>

            <h6>Phone</h6>
            <p>{company['phone']}</p>

            <h6>Fax</h6>
            <p>{company['fax']}</p>

            <h6>Website</h6>
            <p>{company['website']}</p>
        </>
    );
};

function profileTab() {
    return (
        <>
            <h6>Full name</h6>
            <p>{profile['full_name']}</p>

            <h6>ID</h6>
            <p>{profile['id']}</p>

            <h6>E-mail</h6>
            <p>{profile['email']}</p>

            <h6>Company ID</h6>
            <p>{profile['company_id']}</p>
        </>
    );
};

function TemplatesTab() {
    const [option, setOption] = useState(null);

    function handleOptionChange(e) {
        setOption(e.target.value);
    };

    return (
        <>
            <select class="form-select" value={option}
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

export default TabCategory;