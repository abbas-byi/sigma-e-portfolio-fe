import React, { useEffect, useState } from "react";
import Styles from "./viewResume.module.scss";
import { Icon, Image, Link, Text } from "./components";
import "./assets/scss/styles.scss";
import "./viewResume.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useViewResumeWithId } from "./useViewResumeWithId";

const ViewResumeWithId = () => {
  const [theme, setTheme] = useState("");

  const { resumeDetails } = useViewResumeWithId();
  console.log("line 30", resumeDetails);
  useEffect(() => {
    setTheme(resumeDetails?.theme);
  }, [resumeDetails]);

  return (
    <div
      className={`${Styles.app} ${Styles.theme}`}
      data-theme={theme}
      tabIndex="0"
    >
      {/* Head */}
      <div className={Styles.header}>
        <div className={Styles.profileImg}>
          <Image
            src={resumeDetails?.profilePhoto || "/images/User-new.png"}
            className={"profilePhoto"}
          />
        </div>
        <div className={Styles.contentBox}>
          <div className={Styles.content}>
            <h1>{resumeDetails?.name}</h1>
            <h5>{resumeDetails?.jobTitle}</h5>
            <div className={Styles.divider}>
              <div className={Styles.dividerFirst}></div>
              <div className={Styles.dividersec}></div>
            </div>
            <div className={Styles.social}>
              <div>
                <a
                  href={"https://" + resumeDetails?.linkedInProfileUrl}
                  target="_blank"
                >
                  <Image src="/images/linkedin.svg" />
                </a>
                <Text>Linkedin</Text>
              </div>
              <div>
                <a href={"mailto:" + resumeDetails?.email}>
                  <Image src="/images/mail.svg" />
                </a>
                <Text>Email</Text>
              </div>
              <div>
                <a href={"tel:" + resumeDetails?.phone}>
                  <Image src="/images/phone.svg" />
                </a>
                <Text>Phone</Text>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video */}
      <div className={Styles.video}>
        <video width="100%" height="215" poster="/images/video-image.png">
          <source
            src={resumeDetails?.introVideo || "movie.mp4"}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        <Image src="/images/Vector.png" className={Styles.videoIcon} />
      </div>

      {/* Tabs */}
      <nav id="navbar-example2">
        <ul className={Styles.navPills}>
          <li>
            <a href="#scrollspyHome" className={Styles.active}>
              Home
            </a>
          </li>
          <li>
            <a href="#scrollspyEducation">Education</a>
          </li>
          <li>
            <a href="#scrollspyExperience">Experience</a>
          </li>
          <li>
            <a href="#scrollspyProjects">Projects</a>
          </li>
        </ul>
      </nav>
      <div
        data-bs-spy="scroll"
        data-bs-target="#navbar-example2"
        data-bs-offset="0"
        className={Styles.scrollspy}
        tabindex="0"
      >
        <div id="scrollspyHome">
          {/* About Us */}
          <div className={Styles.about}>
            <h2 className={Styles.title}>About Us</h2>
            <Text variant={"lg"}>
              <Text className={"aboutUs"}>{resumeDetails?.aboutMe}</Text>{" "}
              {/* <Link>Read More..</Link> */}
            </Text>
          </div>
        </div>
        <div id="scrollspyEducation">
          {/* Education */}
          <div className={Styles.eduction}>
            <h2 className={Styles.title}>Education</h2>
            <ul className={Styles.list}>
              <li>
                <div className={Styles.marker}></div>
                <h6>{resumeDetails?.courseName}</h6>
                <p>{resumeDetails?.universityName}</p>
                <div className={Styles.year}>
                  {resumeDetails?.courseStartYear.split("-")[0]} -{" "}
                  {resumeDetails?.courseEndYear.split("-")[0]}
                </div>
              </li>
              {/*<li>
                      <div className={Styles.marker}></div>
                      <h6>Master of Computer Applications</h6>
                      <p>Devi Ahilya Vishwavidyalaya University, Indore</p>
                      <div className={Styles.year}>2020 - 2022</div>
  </li>*/}
            </ul>
          </div>
        </div>
        <div id="scrollspyExperience">
          {/* Experience */}
          <div className={Styles.experience}>
            <h2 className={Styles.title}>Experience</h2>
            <ul className={Styles.list}>
              <li>
                <div className={Styles.marker}></div>
                <div className={Styles.year}>
                  {resumeDetails?.workingStartYear.split("-")[0]} -{" "}
                  {resumeDetails?.workingEndYear.split("-")[0]}
                </div>
                <h6>{resumeDetails?.userCompanyProfile}</h6>
                <p>{resumeDetails?.details}</p>
              </li>
              {/*<li>
                      <div className={Styles.marker}></div>
                      <div className={Styles.year}>Nov 2019 - Present</div>
                      <h6>Sr. Php Developer, Google Inc</h6>
                      <p>
                        During my time at Google, I worked and several large
                        scale projects for clients. The products are management
                        applications used by our client for all their operations
                        process.
                      </p>
                      </li>*/}
            </ul>
          </div>
        </div>
        <div id="scrollspyProjects">
          {/* Project */}
          <div className={Styles.project}>
            <h2 className={Styles.title}>Projects</h2>
            <div className={Styles.projectBox}>
              <div>
                <div className={Styles.projectName}>
                  {resumeDetails?.projectName}
                </div>
                <div className={Styles.projectDescription}>
                  {resumeDetails?.projectDescription}
                </div>
              </div>
              {/*<div className={Styles.icon}>
                      <Image src="/images/arrow-down-right.svg" />
                    </div>*/}
            </div>
          </div>
        </div>
      </div>

      {/* Document */}
      <div className={Styles.document}>
        <h2 className={Styles.title}>Documents</h2>
        <Swiper
          slidesPerView={2.8}
          spaceBetween={30}
          className={Styles.mySwiper}
        >
          {resumeDetails?.certificate.map((eachCertificate) => (
            <SwiperSlide className={Styles.documentSlide}>
              <Image
                src={eachCertificate || "/images/pdf.png"}
                className={"certificate-img"}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Skills */}
      <div className={Styles.skills}>
        <h2 className={Styles.title}>Skills</h2>
        <div className={Styles.hard}>
          <h3 className={Styles.subtitle}>Hard Skills</h3>
          <Swiper
            className={`skillSlider ${Styles.mySwiper}`}
            slidesPerView={"auto"}
            spaceBetween={30}
          >
            {resumeDetails?.techSkills.map((eachSkill) => (
              <SwiperSlide>
                <div className={Styles.box}>{eachSkill}</div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className={Styles.soft}>
          <h3 className={Styles.subtitle}>Soft Skills</h3>
          <Swiper
            className={`skillSlider ${Styles.mySwiper}`}
            slidesPerView={"auto"}
            spaceBetween={30}
          >
            {resumeDetails?.skills.map((eachSkill) => (
              <SwiperSlide>
                <div className={Styles.box}>{eachSkill}</div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div className={Styles.calendly}>
        <Image src="/images/calendly.png" />
      </div>

      <div className={Styles.logo}>
        <Image src="/images/logo.svg" />
      </div>

      {/* Footer */}
      <div className={Styles.footer}>
        <div className={Styles.footerLink}>
          <div className={Styles.navBtn}>
            <Link href={""}>
              <Icon className={"icon-contact"} />
            </Link>
          </div>
          Save
        </div>
        <div className={Styles.footerLink}>
          <div className={Styles.navBtn}>
            <Link href={""}>
              <Icon className={"icon-qr"} />
            </Link>
          </div>
          QrCode
        </div>
        <div>
          <div className={Styles.whatsappBorder}>
            <div className={Styles.whatsapp}>
              <Icon className={"icon-whatsapp"} />
            </div>
          </div>
        </div>
        <div className={Styles.footerLink}>
          <div className={Styles.navBtn}>
            <Link href={""}>
              <Icon className={"icon-setting"} />
            </Link>
          </div>
          Setting
        </div>
        <div className={Styles.footerLink}>
          <div className={Styles.navBtn}>
            <Link href={""}>
              <Image src="/images/share.svg" />
            </Link>
          </div>
          Share
        </div>
      </div>
    </div>
  );
};

export default ViewResumeWithId;
