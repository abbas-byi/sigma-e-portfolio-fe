import React from "react";
import Styles from './register.module.scss';
import {Button, Heading, Image, Input, Label, Text} from '../../components';
import { useNavigate } from "react-router-dom";
import { useRegister } from "./useRegister";
import { Loader } from "../../components/shared/loader/loader";
import { Alert } from "@mui/material";

const Register = () => { 
    const navigate = useNavigate()
    const navigateTo = () => navigate('/login');
    const { formData, handleChange, handleSubmit, loader, errMsg } = useRegister();

    return (
        <div className={Styles.login}>
            {loader === true && <Loader />}
            <div className={Styles.content}>
                <div className={Styles.form}>
                    <div className="d-sm-none mb-4 text-center">
                        <Image src="images/logo.svg" className={'w-50'} />
                    </div>

                    <Heading headingText={'Sign Up'} headingType={'h2'} />
                    <Text variant={'lg'} color={'secondary'}>Enter your email and password to sign in!</Text>
                    {/*<Button className={Styles.googleBtn}><Image src="images/google.svg" /> Sign up with Google</Button>
                    <div className={Styles.or}>
                        <div className={Styles.left}></div>
                        <Text>Or</Text>
                        <div className={Styles.right}></div>
                    </div>*/}
                    <div className="mb-3">&nbsp;</div>
                    <div className="mb-3">
                        <Label>Your name*</Label>
                        <Input type='text' placeholder='Name' inputName='name' value={formData.name} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <Label>Username*</Label>
                        <Input type='text' placeholder='mail@simmmple.com' inputName="username" value={formData.username} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <Label>Email*</Label>
                        <Input type='email' placeholder='mail@simmmple.com' inputName="email" value={formData.email} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <Label>Mobile*</Label>
                        <Input type='text' placeholder='+91 98765 43210' inputName="mobile" value={formData.mobile} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <Label>Password*</Label>
                        <Input type='password' placeholder='******' inputName="password" value={formData.password} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <Label>Confirm Password*</Label>
                        <Input type='password' placeholder='******' inputName="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                    </div>
                    {errMsg.length > 1 && <Alert severity="error">{errMsg}</Alert>}
                    <Button className={Styles.loginBtn} onClick={handleSubmit}>Create an Account</Button>
                    <Text>Already have an Account? <Text strong={'semiBold'} className={Styles.cursor} onClick={navigateTo}>Sign In</Text></Text>
                </div>
            </div>
            <div className={Styles.image}>
                <Image src="images/logoBW.svg" className={Styles.logo} />
                <Image src="images/mockup.png" className={Styles.mockup} />
                <Text className={'mt-5'}>© 2022 Sigma. All Rights Reserved. <Text strong={'semiBold'} className={Styles.cursor}>Made with love by UpSpot!</Text></Text>
            </div>
        </div>
    )
}

export default Register