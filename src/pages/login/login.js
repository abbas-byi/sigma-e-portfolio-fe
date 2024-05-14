import React from "react";
import Styles from './login.module.scss';
import {Button, Heading, Image, Input, Label, Text} from '../../components';
import { useNavigate } from "react-router-dom";
import { useLogin } from "./useLogin";
import { Loader } from "../../components/shared/loader/loader";
import { Alert } from "@mui/material";

const Login = () => { 
    const navigate = useNavigate()
    const navigateTo = () => navigate('/register');
    const { handleChange, handleSubmit, formData, loaderState, errMsg } = useLogin();
  
    return (
        <div className={Styles.login}>
            {loaderState && <Loader />}
            <div className={Styles.content}>
                <div className={Styles.form}>
                    <div className="d-sm-none mb-4 text-center">
                        <Image src="images/logo.svg" className={'w-50'} />
                    </div>

                    <Heading headingText={'Sign In'} headingType={'h2'} />
                    <Text variant={'lg'} color={'secondary'}>Enter your email and password to sign in!</Text>
                    {/*<Button className={Styles.googleBtn}><Image src="images/google.svg" /> Sign in with Google</Button>
                    <div className={Styles.or}>
                        <div className={Styles.left}></div>
                        <Text>Or</Text>
                        <div className={Styles.right}></div>
                    </div>*/}
                    <div className="mb-3">&nbsp;</div>
                    <div className="mb-3">
                        <Label>Email*</Label>
                        <Input type={'email'} inputName='email' placeholder={'mail@simmmple.com'} value={formData.email} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <Label>Password*</Label>
                        <Input type={'password'} inputName='password' placeholder={'********'} value={formData.password} onChange={handleChange} />
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            <label class="form-check-label" for="flexCheckDefault">
                                Keep me logged in
                            </label>
                        </div>
                        <Text variant={'md'} strong={'semiBold'} className={Styles.cursor}>Forgot Password?</Text>
                    </div>
                    {errMsg && <Alert severity="error">{errMsg}</Alert>}
                    <Button className={Styles.loginBtn} onClick={handleSubmit}>Sign in</Button>
                    <Text>Not registered yet? <Text strong={'semiBold'} className={Styles.cursor} onClick={navigateTo}>Create an Account</Text></Text>
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

export default Login