import React, {useState} from 'react';
import Styles from './viewPortfolio.module.scss';
import { Button, Heading, Icon, Image, Input, Label, Link, MyGallery, Text } from './components';
import './assets/scss/styles.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { CopyToClipboard } from 'react-copy-to-clipboard';

function ViewPortfolio() {
  const [theme, setTheme] = useState('blue');
  // const [copied, setCopied] = useState(false);
  const [copiedStates, setCopiedStates] = useState({});


  const handleKeyPress = (event) => {
    if (event.key === 'r') {
      setTheme('red');
    } else if (event.key === 'g') {
      setTheme('green');
    } else {
      setTheme('blue');
    }
  };

  const handleReadText = () => {
    if ('speechSynthesis' in window) {
      const paragraphs = document.querySelectorAll('.aboutUs'); 
      const utterances = Array.from(paragraphs).map((data) => new SpeechSynthesisUtterance(data.textContent));
      utterances.forEach((utterance) => window.speechSynthesis.speak(utterance));
    } else {
      alert('Text-to-speech is not supported in this browser.');
    }
  };
  
  const handleCopy = (sectionId) => {
    setCopiedStates((prevStates) => ({
      ...prevStates,
      [sectionId]: true,
    }));

    setTimeout(() => {
      setCopiedStates((prevStates) => ({
        ...prevStates,
        [sectionId]: false,
      }));
    }, 1500); // Reset the copied state after 1.5 seconds
  };



  return (
    <div className={`${Styles.app} theme`} data-theme={theme} onKeyDown={handleKeyPress} tabIndex="0">
      {/* Head */}
      <div className={Styles.header}>
        <div>
          <Heading headingType={'h1'} headingText={'Prashant Dave'} color={'white'} />          
          <div className='mt2'><Text variant={'md'} color={'white'}>Founder</Text></div>
          <div><Text variant={'lg'} color={'white'} strong={'semiBold'}>eDesignGuru</Text></div>
        </div>
        <div className={Styles.profileImg}>
          <Image src='/images/user.png' className={'w100'} />
        </div>
      </div>

      {/* About Us */}
      <div className={Styles.about}>
        <Heading headingType={'h2'} headingText={'About Us'} color={'primary'} strong={'bold'} className={'mb1'} />
        <Text variant={'lg'}><Text className={'aboutUs'}>eDesignGuru is a leading Website Design and Development company. We are located in Ahmedabad, Gujarat, India. Making attractive and easy to use websites has always been our main planning. We provide services in wide range of Website Design and Development, Graphic Design, Logo Design and Branding.</Text> <Link>Read More..</Link> <Icon className={'icon-Speaker'} onClick={handleReadText} /></Text> 
      </div>

      {/* Socail Details */}
      <div className={Styles.socail} id='contact'>
        <div className={Styles.contacts}>
          <Button variant={'icon'}><Icon className={'icon-phone'} /></Button>
          <Button variant={'icon'}><Icon className={'icon-mail'} /></Button>
          <Button variant={'icon'}><Icon className={'icon-globe'} /></Button>
          <Button variant={'icon'}><Icon className={'icon-map'} /></Button>
        </div>
        <div className={Styles.channels}>
          <Heading headingText={'Our Social Channels'} headingType={'h4'} />
          <div className={Styles.grid}>
            <div className={`${Styles.btn} ${Styles.facebook}`}><Image src='/images/facebook.svg' /><Text>Facebook</Text></div>
            <div className={`${Styles.btn} ${Styles.linkedin}`}><Image src='/images/linkedin.svg' /><Text>LinkedIn</Text></div>
            <div className={`${Styles.btn} ${Styles.twitter}`}><Image src='/images/twitter.svg' /><Text>Twitter</Text></div>
            <div className={`${Styles.btn} ${Styles.instagram}`}><Image src='/images/instagram.svg' /><Text>Instagram</Text></div>
          </div>
        </div>
        <div className={Styles.channels}>
          <Heading headingText={'Other Links'} headingType={'h4'} />
          <div className={`${Styles.btn} ${Styles.btnOther}`}><Icon className={'icon-pdf'} /><Text color={'primary'}>eDesignGuru Flyer.pdf</Text></div>
        </div>
      </div>

      {/* Services */}
      <div className={`mt4 ${Styles.services} serviceSlider`} id='services'>
        <Heading headingType={'h2'} headingText={'Our Services'} color={'primary'} strong={'bold'} />
        <Swiper navigation={true} pagination={true} modules={[Navigation, Pagination]} className={Styles.mySwiper}>
          <SwiperSlide>
            <div className={Styles.serviceCard}>
              <Image src='/images/service.png' className={'w100'} />
              <div className={Styles.content}>
                <Heading headingText={'Website Design & Development'} headingType={'h4'} className={'mb1'} />
                <Text>Mobile friendly website with eye catchy design built with latest technology that takes your business to the next level!</Text>
                <div className={Styles.flex}>
                  <Text variant={'lg'} strong={'bold'}>Price: ₹1250*/Month</Text>
                  <Button variant={'icon'}><Icon className={'icon-arrow-right'} /></Button>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={Styles.serviceCard}>
              <Image src='/images/service.png' className={'w100'} />
              <div className={Styles.content}>
                <Heading headingText={'Website Design & Development'} headingType={'h4'} className={'mb1'} />
                <Text>Mobile friendly website with eye catchy design built with latest technology that takes your business to the next level!</Text>
                <div className={Styles.flex}>
                  <Text variant={'lg'} strong={'bold'}>Price: ₹1250*/Month</Text>
                  <Button variant={'icon'}><Icon className={'icon-arrow-right'} /></Button>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={Styles.serviceCard}>
              <Image src='/images/service.png' className={'w100'} />
              <div className={Styles.content}>
                <Heading headingText={'Website Design & Development'} headingType={'h4'} className={'mb1'} />
                <Text>Mobile friendly website with eye catchy design built with latest technology that takes your business to the next level!</Text>
                <div className={Styles.flex}>
                  <Text variant={'lg'} strong={'bold'}>Price: ₹1250*/Month</Text>
                  <Button variant={'icon'}><Icon className={'icon-arrow-right'} /></Button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Gallery */}
      <div className={Styles.gallery}>
        <Heading headingType={'h2'} headingText={'Gallery'} color={'primary'} strong={'bold'} className={'mb2'} />
        <MyGallery />
      </div>

      {/* Our Videos */}
      <div className={Styles.videos}>
        <Heading headingType={'h2'} headingText={'Our Videos'} color={'primary'} strong={'bold'} className={'mb2'} />
        <Swiper navigation={true} pagination={true} modules={[Navigation, Pagination]} className={Styles.mySwiper}>
          <SwiperSlide><Image src='/images/service.png' className={'w100'} /></SwiperSlide>
          <SwiperSlide><Image src='/images/service.png' className={'w100'} /></SwiperSlide>
          <SwiperSlide><Image src='/images/service.png' className={'w100'} /></SwiperSlide>
          <SwiperSlide><Image src='/images/service.png' className={'w100'} /></SwiperSlide>
          <SwiperSlide><Image src='/images/service.png' className={'w100'} /></SwiperSlide>
        </Swiper>
      </div>

      {/* Payment */}
      <div className={Styles.payment} id='payment'>
        <Heading headingType={'h2'} headingText={"Payment QR's"} color={'primary'} strong={'bold'} className={'mb2'} />
        <div className={Styles.grid}>
          <div>
            <Heading headingType={'h4'} headingText={'Paytm'} strong={'semiBold'} className={'mb1'} />
            <Image src='/images/paytm.jpg' className={'w100'} />
            <CopyToClipboard text="9009886949@ybl" onCopy={() => handleCopy('section1')}>
              <div className={Styles.upi}>9009886949@ybl <Icon className={'icon-copy'} /></div>
            </CopyToClipboard>
            {copiedStates['section1'] && <Text className={Styles.copied} color={'primary'} strong={'semiBold'}>Copied</Text>}
          </div>
          <div>
            <Heading headingType={'h4'} headingText={'Phonepe'} strong={'semiBold'} className={'mb1'} />
            <Image src='/images/phonepe.jpg' className={'w100'} />
            <CopyToClipboard text="9009886949@ybl" onCopy={() => handleCopy('section2')}>
              <div className={Styles.upi}>9009886949@ybl <Icon className={'icon-copy'} /></div>
            </CopyToClipboard>
            {copiedStates['section2'] && <Text className={Styles.copied} color={'primary'} strong={'semiBold'}>Copied</Text>}
          </div>
          <div>
            <Heading headingType={'h4'} headingText={'Google Pay'} strong={'semiBold'} className={'mb1'} />
            <Image src='/images/google.jpg' className={'w100'} />
            <CopyToClipboard text="9009886949@ybl" onCopy={() => handleCopy('section3')}>
              <div className={Styles.upi}>9009886949@ybl <Icon className={'icon-copy'} /></div>
            </CopyToClipboard>
            {copiedStates['section3'] && <Text className={Styles.copied} color={'primary'} strong={'semiBold'}>Copied</Text>}
          </div>
          <div>
            <Heading headingType={'h4'} headingText={'Amazon Pay'} strong={'semiBold'} className={'mb1'} />
            <Image src='/images/amazon.jpg' className={'w100'} />
            <CopyToClipboard text="9009886949@ybl" onCopy={() => handleCopy('section4')}>
              <div className={Styles.upi}>9009886949@ybl <Icon className={'icon-copy'} /></div>
            </CopyToClipboard>
            {copiedStates['section4'] && <Text className={Styles.copied} color={'primary'} strong={'semiBold'}>Copied</Text>}
          </div>
        </div>        
      </div>

      {/* Enquiry */}
      <div className={Styles.enquiry} id='enquiry'>
        <Heading headingType={'h2'} headingText={"Enquiry"} color={'primary'} strong={'bold'} className={'mb2'} />
        <div>
          <Label htmlFor={'Name'}>Name</Label>
          <Input id={'Name'} />
        </div>
        <div className='mt2'>
          <Label htmlFor={'Email'}>Email</Label>
          <Input type={'email'} id={'Email'} />
        </div>
        <div className='mt2'>
          <Label htmlFor={'Contact'}>Contact</Label>
          <Input id={'Contact'} />
        </div>
        <div className='mt2'>
          <Label htmlFor={'Message'}>Message</Label>
          <Input type={'textarea'} id={'Message'} rows={5} />
        </div>
        <div className='mt3 textCenter'>
          <Button>Submit</Button>
        </div>
      </div>

      <div className={Styles.logo}>
        <Image src='/images/logo.svg' />
      </div>

      {/* Footer */}
      <div className={Styles.footer}>
        <div className={Styles.navBtn}><Link href={'#contact'}><Icon className={'icon-contact'} /></Link></div>
        <div className={Styles.navBtn}><Link href={'#payment'}><Icon className={'icon-qr'} /></Link></div>
        <div><div className={Styles.whatsappBorder}><div className={Styles.whatsapp}><Icon className={'icon-whatsapp'} color={'white'} /></div></div></div>
        <div className={Styles.navBtn}><Link href={'#enquiry'}><Icon className={'icon-chat'} /></Link></div>
        <div className={Styles.navBtn}><Link href={'#services'}><Icon className={'icon-setting'} /></Link></div>
      </div>
    </div>
  );
}

export default ViewPortfolio;
