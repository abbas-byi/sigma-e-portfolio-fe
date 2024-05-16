import React from 'react';
import Styles from './header.module.scss';
import { Icon, Image } from '../../shared';
import { useNavigate } from "react-router-dom";
import { useHeader } from './useHeader';

const Header = ({pageHeading}) => { 
    const navigate = useNavigate()
    const { logout } = useHeader();

    return (
        <div className={Styles.header}>
            <h3 className={Styles.pageHeading}>{pageHeading}</h3>
            <div className={Styles.menus}>
                <div className={Styles.search}>
                    <Icon className={'icon-search'} />
                    <input type='text' placeholder='Search' />
                </div>
                <div className={Styles.notiInfo}>
                    <Icon className={'icon-notifications'} />
                    <Icon className={'icon-info'} />
                </div>
                <div className={Styles.profile}>
                    <div className={`dropdown-toggle ${Styles.toggle}`} data-bs-toggle="dropdown" aria-expanded="false">
                        <Image src='/images/avatar.png' />
                    </div>
                    <ul className={`${Styles.dropdown} dropdown-menu mt-2`}>
                        <li>Account settings</li>
                        <li onClick={()=>navigate('/subscribe')}>Subscription</li>
                        <li>Support</li>
                        <li>Rate Us</li>
                        <li onClick={() => logout()}>Logout</li>
                    </ul>
                </div>                
            </div>
        </div>
    )
}

export default Header