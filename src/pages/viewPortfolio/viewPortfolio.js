import React, { useEffect, useState } from "react";
import Styles from "./viewPortfolio.module.scss";
import {
  Button,
  Heading,
  Icon,
  Image,
  Input,
  Label,
  Link,
  Text,
} from "./components";
import "./assets/scss/styles.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useGetPortfolioDetails } from "../portfolio/useGetPortfolioDetails";
import QRCode from "react-qr-code";
import { useSubmitEnquiry } from "./useSubmitEnquiry";
import { ProtectedRoute } from "../../components/security/protectedRoute";
import Sidebar from "../../components/common/sidebar";
import Header from "../../components/common/header";

function ViewPortfolio() {
  const [theme, setTheme] = useState("blue");
  const [copiedStates, setCopiedStates] = useState({});

  const userId = sessionStorage.getItem("userId");
  const token = sessionStorage.getItem("token");
  const { portfolioDetails } = useGetPortfolioDetails(token, userId);
  console.log("line 30", portfolioDetails);
  const { enquiryDetails, setEnquiryDetails, onSubmit } = useSubmitEnquiry();

  const handleChangeEnquiry = (e) => {
    setEnquiryDetails({
      ...enquiryDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitEnquiry = (form) => {
    form.preventDefault();
    try {
      onSubmit(enquiryDetails);
    } catch (e) {
      console.log("line 46", e);
    }
  };

  console.log("this is enquiry details,", enquiryDetails);
  const [allServices, setAllServices] = useState([]);

  useEffect(() => {
    setAllServices([
      {
        title: portfolioDetails?.serviceOneName,
        image: portfolioDetails?.serviceOneImage,
        description: portfolioDetails?.serviceOneDescription,
        price: portfolioDetails?.serviceOnePrice,
      },
      {
        title: portfolioDetails?.serviceTwoName,
        image: portfolioDetails?.serviceTwoImage,
        description: portfolioDetails?.serviceTwoDescription,
        price: portfolioDetails?.serviceTwoPrice,
      },
      {
        title: portfolioDetails?.serviceThreeName,
        image: portfolioDetails?.serviceThreeImage,
        description: portfolioDetails?.serviceThreeDescription,
        price: portfolioDetails?.serviceThreePrice,
      },
    ]);
  }, [portfolioDetails, token]);

  useEffect(() => {
    setTheme(portfolioDetails?.theme);
  }, [portfolioDetails]);

  // const handleKeyPress = (event) => {
  //   if (event.key === "r") {
  //     setTheme("red");
  //   } else if (event.key === "g") {
  //     setTheme("green");
  //   } else {
  //     setTheme("blue");
  //   }
  // };

  const handleReadText = () => {
    if ("speechSynthesis" in window) {
      const paragraphs = document.querySelectorAll(".aboutUs");
      const utterances = Array.from(paragraphs).map(
        (data) => new SpeechSynthesisUtterance(data.textContent)
      );
      utterances.forEach((utterance) =>
        window.speechSynthesis.speak(utterance)
      );
    } else {
      alert("Text-to-speech is not supported in this browser.");
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
    <ProtectedRoute>
      <div style={{ padding: 1.5 + "rem" }}>
        <Sidebar />
        <div style={{ marginLeft: 290 + "px", paddingLeft: 1 + "rem" }}>
          <Header pageHeading={"Portfolio"} />

          <div
            className={`${Styles.app} theme`}
            data-theme={theme}
            tabIndex="0"
          >
            {/* Head */}
            <div className={Styles.header}>
              <div>
                <Heading
                  headingType={"h1"}
                  headingText={portfolioDetails?.name}
                  color={"white"}
                />
                <div className="mt2">
                  <Text variant={"md"} color={"white"}>
                    {portfolioDetails?.designation}
                  </Text>
                </div>
                <div>
                  <Text variant={"lg"} color={"white"} strong={"semiBold"}>
                    {portfolioDetails?.companyName}
                  </Text>
                </div>
              </div>
              <div className={Styles.profileImg}>
                <Image
                  src={portfolioDetails?.profilePhoto || "/images/user.png"}
                  className={"w100"}
                />
              </div>
            </div>

            {/* About Us */}
            <div className={Styles.about}>
              <Heading
                headingType={"h2"}
                headingText={"About Us"}
                color={"primary"}
                strong={"bold"}
                className={"mb1"}
              />
              <Text variant={"lg"}>
                <Text className={"aboutUs"}>{portfolioDetails?.about}</Text>{" "}
                <Link>
                  <span className={Styles.Readmore}>Read More..</span>
                </Link>{" "}
                <Icon className={"icon-Speaker"} onClick={handleReadText} />
              </Text>
            </div>

            {/* Socail Details */}
            <div className={Styles.socail} id="contact">
              <div className={Styles.contacts}>
                <Button variant={"icon"}>
                  <Icon className={"icon-phone"} />
                </Button>
                <Button variant={"icon"}>
                  <Icon className={"icon-mail"} />
                </Button>
                <Button variant={"icon"}>
                  <Icon className={"icon-globe"} />
                </Button>
                <Button variant={"icon"}>
                  <Icon className={"icon-map"} />
                </Button>
              </div>
              <div className={Styles.channels}>
                <Heading
                  headingText={"Our Social Channels"}
                  headingType={"h4"}
                />
                <div className={Styles.grid}>
                  {portfolioDetails?.facebookProfileUrl && (
                    <a
                      href={"https://" + portfolioDetails?.facebookProfileUrl}
                      target="_blank"
                      style={{ textDecoration: "none" }}
                    >
                      <div className={`${Styles.btn} ${Styles.facebook}`}>
                        <Image src="/images/facebook.svg" />
                        <Text>Facebook</Text>
                      </div>
                    </a>
                  )}
                  {portfolioDetails?.linkedInProfileUrl && (
                    <a
                      href={"https://" + portfolioDetails?.linkedInProfileUrl}
                      target="_blank"
                      style={{ textDecoration: "none" }}
                    >
                      <div className={`${Styles.btn} ${Styles.linkedin}`}>
                        <Image src="/images/linkedin.svg" />
                        <Text>Linked In</Text>
                      </div>
                    </a>
                  )}
                  {portfolioDetails?.twitterProfileUrl && (
                    <a
                      href={"https://" + portfolioDetails?.twitterProfileUrl}
                      target="_blank"
                      style={{ textDecoration: "none" }}
                    >
                      <div className={`${Styles.btn} ${Styles.twitter}`}>
                        <Image src="/images/twitter.svg" />
                        <Text>Twitter</Text>
                      </div>
                    </a>
                  )}
                  {portfolioDetails?.instagramProfileUrl && (
                    <a
                      href={"https://" + portfolioDetails?.instagramProfileUrl}
                      target="_blank"
                      style={{ textDecoration: "none" }}
                    >
                      <div className={`${Styles.btn} ${Styles.instagram}`}>
                        <Image src="/images/instagram.svg" />
                        <Text>Instagram</Text>
                      </div>
                    </a>
                  )}
                </div>
              </div>
              <div className={Styles.channels}>
                <Heading headingText={"Other Links"} headingType={"h4"} />
                <div className={`${Styles.btn} ${Styles.btnOther}`}>
                  <Icon className={"icon-pdf"} />
                  <Text color={"primary"}>eDesignGuru Flyer.pdf</Text>
                </div>
              </div>
            </div>

            {/* Services */}
            <div
              className={`mt4 ${Styles.services} serviceSlider`}
              id="services"
            >
              <Heading
                headingType={"h2"}
                headingText={"Our Services"}
                color={"primary"}
                strong={"bold"}
              />
              <Swiper
                navigation={true}
                pagination={true}
                modules={[Navigation, Pagination]}
                className={Styles.mySwiper}
              >
                {allServices.map((service) => (
                  <SwiperSlide>
                    <div className={Styles.serviceCard}>
                      <Image
                        src={service.image}
                        className={`w100 ${Styles.serviceCardImage}`}
                      />
                      <div className={Styles.content}>
                        <Heading
                          headingText={service.title}
                          headingType={"h4"}
                          className={"mb1"}
                        />
                        <Text>{service.description}</Text>
                        <div className={Styles.flex}>
                          <Text variant={"lg"} strong={"bold"}>
                            Price: ${service.price}
                          </Text>
                          <Button variant={"icon"}>
                            <Icon className={"icon-arrow-right"} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Gallery */}
            <div className={Styles.gallery}>
              <Heading
                headingType={"h2"}
                headingText={"Gallery"}
                color={"primary"}
                strong={"bold"}
                className={"mb2"}
              />
              <Swiper
                slidesPerView={2.8}
                spaceBetween={30}
                className={Styles.mySwiper}
              >
                {portfolioDetails?.galleryImages.map((eachCertificate) => (
                  <SwiperSlide className={Styles.galleryImagesSlides}>
                    <Image
                      src={eachCertificate || "/images/pdf.png"}
                      className={"certificate-img"}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              {/* <MyGallery /> */}
            </div>

            {/* Our Videos */}
            <div className={Styles.videos}>
              <Heading
                headingType={"h2"}
                headingText={"Our Videos"}
                color={"primary"}
                strong={"bold"}
                className={"mb2"}
              />
              <Swiper
                navigation={true}
                pagination={true}
                modules={[Navigation, Pagination]}
                className={Styles.mySwiper}
              >
                {portfolioDetails?.videos.map((eachVideo) => (
                  <SwiperSlide>
                    <video width="100%" height="240" controls>
                      <source src={eachVideo} type="video/mp4" />
                    </video>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Payment */}
            <div className={Styles.payment} id="payment">
              <Heading
                headingType={"h2"}
                headingText={"Payment QR's"}
                color={"primary"}
                strong={"bold"}
                className={"mb2"}
              />
              <div className={Styles.grid}>
                {/* Paytm Pay*/}
                {portfolioDetails?.paytmUPIId && (
                  <div>
                    <Heading
                      headingType={"h4"}
                      headingText={"Paytm"}
                      strong={"semiBold"}
                      className={"mb1"}
                    />
                    <div className={Styles.QRCode}>
                      <QRCode
                        size={200}
                        style={{
                          height: "auto",
                          maxWidth: "100%",
                          width: "100%",
                        }}
                        value={`${portfolioDetails?.paytmUPIId}`}
                        viewBox={`0 0 200 200`}
                      />
                    </div>
                    <CopyToClipboard
                      text={portfolioDetails?.paytmUPIId}
                      onCopy={() => handleCopy("section1")}
                    >
                      <div className={Styles.upi}>
                        {portfolioDetails?.paytmUPIId}{" "}
                        <Icon className={"icon-copy"} />
                      </div>
                    </CopyToClipboard>
                    {copiedStates["section1"] && (
                      <Text
                        className={Styles.copied}
                        color={"primary"}
                        strong={"semiBold"}
                      >
                        Copied
                      </Text>
                    )}
                  </div>
                )}
                {/* Phone Pay */}
                {portfolioDetails?.phonePayUPIId && (
                  <div>
                    <Heading
                      headingType={"h4"}
                      headingText={"Phonepe"}
                      strong={"semiBold"}
                      className={"mb1"}
                    />
                    <div className={Styles.QRCode}>
                      <QRCode
                        size={200}
                        style={{
                          height: "auto",
                          maxWidth: "100%",
                          width: "100%",
                        }}
                        value={`${portfolioDetails?.phonePayUPIId}`}
                        viewBox={`0 0 200 200`}
                      />
                    </div>
                    <CopyToClipboard
                      text={portfolioDetails?.phonePayUPIId}
                      onCopy={() => handleCopy("section2")}
                    >
                      <div className={Styles.upi}>
                        {portfolioDetails?.phonePayUPIId}{" "}
                        <Icon className={"icon-copy"} />
                      </div>
                    </CopyToClipboard>
                    {copiedStates["section2"] && (
                      <Text
                        className={Styles.copied}
                        color={"primary"}
                        strong={"semiBold"}
                      >
                        Copied
                      </Text>
                    )}
                  </div>
                )}
                {/* Google Pay*/}
                {portfolioDetails?.googlePayUPIId && (
                  <div>
                    <Heading
                      headingType={"h4"}
                      headingText={"Google Pay"}
                      strong={"semiBold"}
                      className={"mb1"}
                    />
                    <div className={Styles.QRCode}>
                      <QRCode
                        size={200}
                        style={{
                          height: "auto",
                          maxWidth: "100%",
                          width: "100%",
                        }}
                        value={`${portfolioDetails?.googlePayUPIId}`}
                        viewBox={`0 0 200 200`}
                      />
                    </div>
                    <CopyToClipboard
                      text={portfolioDetails?.googlePayUPIId}
                      onCopy={() => handleCopy("section3")}
                    >
                      <div className={Styles.upi}>
                        {portfolioDetails.googlePayUPIId}{" "}
                        <Icon className={"icon-copy"} />
                      </div>
                    </CopyToClipboard>
                    {copiedStates["section3"] && (
                      <Text
                        className={Styles.copied}
                        color={"primary"}
                        strong={"semiBold"}
                      >
                        Copied
                      </Text>
                    )}
                  </div>
                )}
                {/* Amazon Pay*/}
                {portfolioDetails?.amazonPayUPIId && (
                  <div>
                    <Heading
                      headingType={"h4"}
                      headingText={"Amazon Pay"}
                      strong={"semiBold"}
                      className={"mb1"}
                    />
                    <div className={Styles.QRCode}>
                      <QRCode
                        size={200}
                        style={{
                          height: "auto",
                          maxWidth: "100%",
                          width: "100%",
                        }}
                        value={`${portfolioDetails?.amazonPayUPIId}`}
                        viewBox={`0 0 200 200`}
                      />
                    </div>
                    <CopyToClipboard
                      text={portfolioDetails?.amazonPayUPIId}
                      onCopy={() => handleCopy("section4")}
                    >
                      <div className={Styles.upi}>
                        {portfolioDetails?.amazonPayUPIId}{" "}
                        <Icon className={"icon-copy"} />
                      </div>
                    </CopyToClipboard>
                    {copiedStates["section4"] && (
                      <Text
                        className={Styles.copied}
                        color={"primary"}
                        strong={"semiBold"}
                      >
                        Copied
                      </Text>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Enquiry */}
            <div className={Styles.enquiry} id="enquiry">
              <Heading
                headingType={"h2"}
                headingText={"Enquiry"}
                color={"primary"}
                strong={"bold"}
                className={"mb2"}
              />
              <form onSubmit={handleSubmitEnquiry}>
                <div>
                  <Label htmlFor={"Name"}>Name</Label>
                  <Input
                    id={"Name"}
                    name="name"
                    onChange={handleChangeEnquiry}
                  />
                </div>
                <div className="mt2">
                  <Label htmlFor={"Email"}>Email</Label>
                  <Input
                    type={"email"}
                    id={"Email"}
                    name="email"
                    onChange={handleChangeEnquiry}
                  />
                </div>
                <div className="mt2">
                  <Label htmlFor={"Contact"}>Contact</Label>
                  <Input
                    id={"Contact"}
                    name="contact"
                    onChange={handleChangeEnquiry}
                  />
                </div>
                <div className="mt2">
                  <Label htmlFor={"Message"}>Message</Label>
                  <Input
                    type={"textarea"}
                    id={"Message"}
                    rows={5}
                    name="message"
                    onChange={handleChangeEnquiry}
                  />
                </div>
                <div className="mt3 textCenter">
                  <Button type="submit">Submit</Button>
                </div>
              </form>
            </div>

            <div className={Styles.logo}>
              <Image src="/images/logo.svg" />
            </div>

            {/* Footer */}
            <div className={Styles.footer}>
              <div className={Styles.navBtn}>
                <Link href={"#contact"}>
                  <Icon className={"icon-contact"} />
                </Link>
              </div>
              <div className={Styles.navBtn}>
                <Link href={"#payment"}>
                  <Icon className={"icon-qr"} />
                </Link>
              </div>
              <div>
                <div className={Styles.whatsappBorder}>
                  <div className={Styles.whatsapp}>
                    <Icon className={"icon-whatsapp"} color={"white"} />
                  </div>
                </div>
              </div>
              <div className={Styles.navBtn}>
                <Link href={"#enquiry"}>
                  <Icon className={"icon-chat"} />
                </Link>
              </div>
              <div className={Styles.navBtn}>
                <Link href={"#services"}>
                  <Icon className={"icon-setting"} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default ViewPortfolio;
