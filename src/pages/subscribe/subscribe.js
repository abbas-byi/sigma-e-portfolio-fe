import React, { useState } from 'react';
import Styles from './subscribe.module.scss';
import {Button, Card, Header, Heading, Icon, Sidebar, Text} from '../../components';

const Subscribe = () => { 
    const [activeButton, setActiveButton] = useState(null);
    const btnHandler = (btnName) => {
        setActiveButton(btnName === activeButton ? null : btnName);
    };
    
    return (
        <div className={Styles.dashboard}>
            <Sidebar />
            <div className={Styles.main}>
                <Header pageHeading={'Subscribe'} />
                <div className={Styles.container}>
                    <div className={Styles.title}>
                        <Heading headingText={'Simple pricing for all your needs'} headingType={'h2'} />
                        <Text variant={'xl'} color={'dark'}>Start for free, upgrade when you love it</Text>
                    </div>
                    <div className={Styles.planType}>
                        <Button className={activeButton === 'Monthly' ? Styles.active : ''} onClick={()=>btnHandler('Monthly')}>Monthly</Button>
                        <Button className={activeButton === 'Annually' ? Styles.active : ''} onClick={()=>btnHandler('Annually')}>Annually <Text>Save 20%</Text></Button>
                    </div>
                    <div className={Styles.cardGrid}>
                        <Card className={Styles.card}>
                            <Heading headingText={'Starter Plan'} headingType={'h4'} />
                            <Heading headingText={'₹ 500/month'} headingType={'h3'} />
                            <Button>Get Started</Button>
                            <Text variant={'xl'}>Everything you need to start creating.</Text>
                            <div className={Styles.cardList}>
                                <Text variant={'xl'}><Icon className={'icon-check'} /> Everything you need..</Text>
                                <Text variant={'xl'}><Icon className={'icon-check'} /> Everything you need..</Text>
                                <Text variant={'xl'}><Icon className={'icon-check'} /> Everything you need..</Text>
                                <Text variant={'xl'}><Icon className={'icon-check'} /> Everything you need..</Text>
                                <Text variant={'xl'}><Icon className={'icon-check'} /> Everything you need..</Text>
                                <Text variant={'xl'}><Icon className={'icon-check'} /> Everything you need..</Text>
                                <Text variant={'xl'}><Icon className={'icon-check'} /> Everything you need..</Text>
                            </div>                            
                        </Card>
                        <Card className={Styles.card}>
                            <Heading headingText={'Lite Plan'} headingType={'h4'} />
                            <Heading headingText={'₹ 800/month'} headingType={'h3'} />
                            <Button>Get Started</Button>
                            <Text variant={'xl'}>Everything you need to start creating.</Text>
                            <div className={Styles.cardList}>
                                <Text variant={'xl'}><Icon className={'icon-check'} /> Everything you need..</Text>
                                <Text variant={'xl'}><Icon className={'icon-check'} /> Everything you need..</Text>
                                <Text variant={'xl'}><Icon className={'icon-check'} /> Everything you need..</Text>
                                <Text variant={'xl'}><Icon className={'icon-check'} /> Everything you need..</Text>
                                <Text variant={'xl'}><Icon className={'icon-check'} /> Everything you need..</Text>
                                <Text variant={'xl'}><Icon className={'icon-check'} /> Everything you need..</Text>
                                <Text variant={'xl'}><Icon className={'icon-check'} /> Everything you need..</Text>
                            </div>                            
                        </Card>
                        <Card className={`${Styles.card} ${Styles.cardDark}`}>
                            <Heading headingText={'Profesional Plan'} headingType={'h4'} />
                            <Heading headingText={'₹ 900/month'} headingType={'h3'} />
                            <Button>Get Started</Button>
                            <Text variant={'xl'}>Everything you need to start creating.</Text>
                            <div className={Styles.cardList}>
                                <Text variant={'xl'}><Icon className={'icon-check'} /> Everything you need..</Text>
                                <Text variant={'xl'}><Icon className={'icon-check'} /> Everything you need..</Text>
                                <Text variant={'xl'}><Icon className={'icon-check'} /> Everything you need..</Text>
                                <Text variant={'xl'}><Icon className={'icon-check'} /> Everything you need..</Text>
                                <Text variant={'xl'}><Icon className={'icon-check'} /> Everything you need..</Text>
                                <Text variant={'xl'}><Icon className={'icon-check'} /> Everything you need..</Text>
                                <Text variant={'xl'}><Icon className={'icon-check'} /> Everything you need..</Text>
                            </div>                            
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Subscribe