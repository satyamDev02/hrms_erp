import './Settings.scss';
import { HiUserPlus } from "react-icons/hi2";
import { TfiClose } from "react-icons/tfi";
import { useNavigate } from 'react-router-dom';
import SettingsDashboard from './settingsData.jsx';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Users from './ManageAccounts/Users/Users.jsx';
import OrganizationSetup from './ManageAccounts/Organization/OrganizationSetup.jsx';

const Settings = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('users');  // Default Tab
    const location = useLocation();

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    const JobList = () => {
        navigate('/')
    }

    const currentURL = window.location.pathname;

    let updatedURL = currentURL.replace(/^\/reports/, '');

    // Extract the first word from the URL
    let firstWord = updatedURL.split('/').filter(Boolean)[0];

    console.log('First Word:', firstWord);



    useEffect(() => {

        if (currentURL === '/reports') {
            return
        } else {
            setActiveTab(currentURL)
        }
    }, [currentURL]);



    return (
        <>
            {currentURL === '/settings' && (
                <>
                    <div className="setting_nav_">
                        <div className="top-bar">
                            <h2><div className='span'><HiUserPlus /></div>Settings </h2>
                            <span className="close_nav" onClick={JobList}><TfiClose /></span>
                            <div className="">
                                <span className="1"></span>
                                <span className="2"></span>
                                <span className="3"></span>
                                <span className="4"></span>
                                <span className="5"></span>
                                <span className="6"></span>
                                <span className="7"></span>
                                <span className="8"></span>
                                <span className="9"></span>
                                <span className="10"></span>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <SettingsDashboard />
                    </div>
                </>
            )}

            {currentURL === '/settings/manage-accounts/users' && (
                <Users />
            )}
            {currentURL === '/settings/manage-accounts/organization-setup' && (
                <OrganizationSetup />
            )}
            
        </>
    );
};

export default Settings;


// 

