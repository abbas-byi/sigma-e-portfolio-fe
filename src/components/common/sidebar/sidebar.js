import React, { useEffect, useState } from 'react';
import Styles from './sidebar.module.scss';
import { Button, Heading, Icon, Image, Text } from '../../shared';
import { useNavigate } from "react-router-dom";

const Sidebar = () => { 
    const navigate = useNavigate()
    const ToDashboard = () => navigate('/dashboard');
    const ToResume = () => navigate('/resume');
    const ToPortfolio = () => navigate('/portfolio');
    const ToEnquirires = () => navigate('/enquiries');
    const url = window.location.href;
    const [activeButton, setActiveButton] = useState('');

    useEffect(() => {
        if (url.includes('dashboard')) {
            setActiveButton('Dashboard');
        }
        if (url.includes('resume')) {
            setActiveButton('E-Resume');
        }
        if (url.includes('portfolio')) {
            setActiveButton('E-Portfolio');
        }
        if (url.includes('enquiries')) {
            setActiveButton('Enquiries');
        }
    }, [url])

    return (
        <div className={Styles.sidebar}>
            <div className={Styles.logo}>
                <Image src='/images/logo.svg' />
            </div>
            <div className={Styles.menus}>
                <ul>
                    <li onClick={ToDashboard} className={activeButton === 'Dashboard' && Styles.active}><Icon className={'icon-dashboard'} /> <Text>Dashboard</Text></li>
                    <li onClick={ToResume} className={activeButton === 'E-Resume' && Styles.active}><Icon className={'icon-resume'} /> <Text>E-Resume</Text></li>
                    <li onClick={ToPortfolio} className={activeButton === 'E-Portfolio' && Styles.active}><Icon className={'icon-portfolio'} /> <Text>E-Portfolio</Text></li>
                    <li><Icon className={'icon-contacts'} /> <Text>Contacts</Text></li>
                    <li><Icon className={'icon-anlytics'} /> <Text>Analytics</Text></li>
                    <li onClick={ToEnquirires} className={activeButton === 'Enquiries' && Styles.active}><Icon className={'icon-anlytics'} /> <Text>Enquiries</Text></li>
                </ul>
            </div>
            <div className={Styles.upgrade}>
                <Heading headingText={'Upgrade to PRO'} headingType={'h3'} />
                <Text>to get access to all features! Connect with Sigma World!</Text>
                <Button onClick={()=>navigate('/subscribe')}><Icon className={'icon-up-right'} /></Button>
            </div>
        </div>
    )
}

export default Sidebar