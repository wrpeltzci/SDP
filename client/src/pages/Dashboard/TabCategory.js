import React from 'react';
import TemplatesTab from './includes/TemplatesTab/TemplatesTab';
import ProfileTab from './includes/ProfileTab/ProfileTab';
import CompanyTab from './includes/CompanyTab/CompanyTab';


const TabCategory = ({ tabs, openTab }) => {
    switch (tabs.indexOf(openTab)) {
        case 0:
            return <CompanyTab />;
        case 1:
            return <ProfileTab />;
        case 2:
            return <TemplatesTab />;
        default:
            return <p>404: Not Found</p>;
    };
};

export default TabCategory;