import React, { useState } from "react";
import Styles from "./viewResume.module.scss";
import { Icon, Image, Link, Text } from "./components";
import "./assets/scss/styles.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ProtectedRoute } from "../../components/security/protectedRoute";
import Sidebar from "../../components/common/sidebar";
import Header from "../../components/common/header";

function ViewResume() {
  const [theme, setTheme] = useState("blue");

  const handleKeyPress = (event) => {
    if (event.key === "r") {
      setTheme("red");
    } else if (event.key === "g") {
      setTheme("green");
    } else {
      setTheme("blue");
    }
  };

  return (
    <ProtectedRoute>
      <div style={{ padding: 1.5 + 'rem' }}>
        <Sidebar />
        <div style={{ marginLeft: 290 + 'px', paddingLeft: 1 + 'rem' }}>
          <Header pageHeading={"Resume"} />
      
          <div
            className={`${Styles.app} theme`}
            data-theme={theme}
            onKeyDown={handleKeyPress}
            tabIndex="0"
          >
            {/* Head */}
            <div className={Styles.header}>
              <div className={Styles.profileImg}>
                <Image src="/images/User-new.png" className={"w100"} />
              </div>
              <div className={Styles.contentBox}>
                <div className={Styles.content}>
                  <h1>Kaylee Ferguson</h1>
                  <h5>UI/UX Designer</h5>
                  <div className={Styles.divider}>
                    <div className={Styles.dividerFirst}></div>
                    <div className={Styles.dividersec}></div>
                  </div>
                  <div className={Styles.social}>
                    <div>
                      <Image src="/images/linkedin.svg" />
                      <Text>Linkedin</Text>
                    </div>
                    <div>
                      <Image src="/images/mail.svg" />
                      <Text>Email</Text>
                    </div>
                    <div>
                      <Image src="/images/phone.svg" />
                      <Text>Phone</Text>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Video */}
            <div className={Styles.video}>
              <video width="100%" height="215" poster="/images/video-image.png">
                <source src="movie.mp4" type="video/mp4" />
                <source src="movie.ogg" type="video/ogg" />
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
                    <Text className={"aboutUs"}>
                      eDesignGuru is a leading Website Design and Development
                      company. We are located in Ahmedabad, Gujarat, India. Making
                      attractive and easy to use websites has always been our main
                      planning. We provide services in wide range of Website Design
                      and Development, Graphic Design, Logo Design and Branding.
                    </Text>{" "}
                    <Link>Read More..</Link>
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
                      <h6>Master of Computer Applications</h6>
                      <p>Devi Ahilya Vishwavidyalaya University, Indore</p>
                      <div className={Styles.year}>2020 - 2022</div>
                    </li>
                    <li>
                      <div className={Styles.marker}></div>
                      <h6>Master of Computer Applications</h6>
                      <p>Devi Ahilya Vishwavidyalaya University, Indore</p>
                      <div className={Styles.year}>2020 - 2022</div>
                    </li>
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
                      <div className={Styles.year}>Nov 2019 - Present</div>
                      <h6>Sr. Php Developer, Google Inc</h6>
                      <p>
                        During my time at Google, I worked and several large scale
                        projects for clients. The products are management
                        applications used by our client for all their operations
                        process.
                      </p>
                    </li>
                    <li>
                      <div className={Styles.marker}></div>
                      <div className={Styles.year}>Nov 2019 - Present</div>
                      <h6>Sr. Php Developer, Google Inc</h6>
                      <p>
                        During my time at Google, I worked and several large scale
                        projects for clients. The products are management
                        applications used by our client for all their operations
                        process.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
              <div id="scrollspyProjects">
                {/* Project */}
                <div className={Styles.project}>
                  <h2 className={Styles.title}>Projects</h2>
                  <div className={Styles.projectBox}>
                    <div>
                      <div className={Styles.projectName}>Project Name</div>
                      <div className={Styles.projectDescription}>
                        Project Description..
                      </div>
                    </div>
                    <div className={Styles.icon}>
                      <Image src="/images/arrow-down-right.svg" />
                    </div>
                  </div>
                  <div className={Styles.projectBox}>
                    <div>
                      <div className={Styles.projectName}>Project Name</div>
                      <div className={Styles.projectDescription}>
                        Project Description..
                      </div>
                    </div>
                    <div className={Styles.icon}>
                      <Image src="/images/arrow-down-right.svg" />
                    </div>
                  </div>
                  <div className={Styles.projectBox}>
                    <div>
                      <div className={Styles.projectName}>Project Name</div>
                      <div className={Styles.projectDescription}>
                        Project Description..
                      </div>
                    </div>
                    <div className={Styles.icon}>
                      <Image src="/images/arrow-down-right.svg" />
                    </div>
                  </div>
                  <div className={Styles.projectBox}>
                    <div>
                      <div className={Styles.projectName}>Project Name</div>
                      <div className={Styles.projectDescription}>
                        Project Description..
                      </div>
                    </div>
                    <div className={Styles.icon}>
                      <Image src="/images/arrow-down-right.svg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* About Us */}
            {/* <div className={Styles.about}>
          <h2 className={Styles.title}>About Us</h2>
          <Text variant={'lg'}><Text className={'aboutUs'}>eDesignGuru is a leading Website Design and Development company. We are located in Ahmedabad, Gujarat, India. Making attractive and easy to use websites has always been our main planning. We provide services in wide range of Website Design and Development, Graphic Design, Logo Design and Branding.</Text> <Link>Read More..</Link></Text>
        </div> */}

            {/* <div className={Styles.bG}>
          Education
          <div className={Styles.eduction}>
            <h2 className={Styles.title}>Education</h2>
            <ul className={Styles.list}>
              <li>
                <div className={Styles.marker}></div>
                <h6>Master of Computer Applications</h6>
                <div>Devi Ahilya Vishwavidyalaya University, Indore</div>
                <div className={Styles.year}>2020 - 2022</div>
              </li>
              <li>
                <div className={Styles.marker}></div>
                <h6>Master of Computer Applications</h6>
                <div>Devi Ahilya Vishwavidyalaya University, Indore</div>
                <div>Devi Ahilya Vishwavidyalaya University, Indore</div>
                <div className={Styles.year}>2020 - 2022</div>
              </li>
            </ul>
          </div>
          Experience
          <div className={Styles.experience}>
            <h2 className={Styles.title}>Experience</h2>
            <ul className={Styles.list}>
              <li>
                <div className={Styles.marker}></div>
                <div className={Styles.year}>Nov 2019 - Present</div>
                <h6>Sr. Php Developer, Google Inc</h6>
                <div>During my time at Google, I worked and several large scale projects for clients. The products are
                  management applications used by our client for all their operations process.</div>
              </li>
              <li>
                <div className={Styles.marker}></div>
                <h6>Master of Computer Applications</h6>
                <div>Devi Ahilya Vishwavidyalaya University, Indore</div>
                <div>Devi Ahilya Vishwavidyalaya University, Indore</div>
                <div className={Styles.year}>2020 - 2022</div>
              </li>
            </ul>
          </div>
        </div> */}

            {/* Project */}
            {/* <div className={Styles.project}>
          <h2 className={Styles.title}>Projects</h2>
          <div className={Styles.projectBox}>
            <div>
              <div className={Styles.projectName}>Project Name</div>
              <div className={Styles.projectDescription}>Project Description..</div>
            </div>
            <div className={Styles.icon}>@</div>
          </div>
          <div className={Styles.projectBox}>
            <div>
              <div className={Styles.projectName}>Project Name</div>
              <div className={Styles.projectDescription}>Project Description..</div>
            </div>
            <div className={Styles.icon}>@</div>
          </div>
          <div className={Styles.projectBox}>
            <div>
              <div className={Styles.projectName}>Project Name</div>
              <div className={Styles.projectDescription}>Project Description..</div>
            </div>
            <div className={Styles.icon}>@</div>
          </div>
          <div className={Styles.projectBox}>
            <div>
              <div className={Styles.projectName}>Project Name</div>
              <div className={Styles.projectDescription}>Project Description..</div>
            </div>
            <div className={Styles.icon}>@</div>
          </div>
        </div> */}

            {/* Document */}
            <div className={Styles.document}>
              <h2 className={Styles.title}>Document</h2>
              <Swiper
                slidesPerView={2.8}
                spaceBetween={30}
                className={Styles.mySwiper}
              >
                <SwiperSlide className={Styles.documentSlide}>
                  <Image src="/images/pdf.png" />
                  Experience letter.pdf
                </SwiperSlide>
                <SwiperSlide className={Styles.documentSlide}>
                  <Image src="/images/pdf.png" />
                  Appraisal letter.pdf
                </SwiperSlide>
                <SwiperSlide className={Styles.documentSlide}>
                  <Image src="/images/pdf.png" />
                  Experience letter.pdf
                </SwiperSlide>
                <SwiperSlide className={Styles.documentSlide}>
                  <Image src="/images/pdf.png" />
                  Experience letter.pdf
                </SwiperSlide>
                <SwiperSlide className={Styles.documentSlide}>
                  <Image src="/images/pdf.png" />
                  Experience letter.pdf
                </SwiperSlide>
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
                  <SwiperSlide>
                    <div className={Styles.box}>JavaScript</div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className={Styles.box}>JavaScript</div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className={Styles.box}>JavaScript</div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className={Styles.box}>JavaScript</div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className={Styles.box}>JavaScript</div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className={Styles.box}>JavaScript</div>
                  </SwiperSlide>
                </Swiper>
              </div>
              <div className={Styles.soft}>
                <h3 className={Styles.subtitle}>Soft Skills</h3>
                <Swiper
                  className={`skillSlider ${Styles.mySwiper}`}
                  slidesPerView={"auto"}
                  spaceBetween={30}
                >
                  <SwiperSlide>
                    <div className={Styles.box}>JavaScript</div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className={Styles.box}>JavaScript</div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className={Styles.box}>JavaScript</div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className={Styles.box}>JavaScript</div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className={Styles.box}>JavaScript</div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className={Styles.box}>JavaScript</div>
                  </SwiperSlide>
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
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default ViewResume;
