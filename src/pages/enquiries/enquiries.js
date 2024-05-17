import React from "react";
import Styles from "./enquiries.module.scss";
import {
  Card,
  Header,
  Heading,
  Sidebar,
} from "../../components";
import { useGetEnquiries } from "./useGetEnquiries";

const Enquiries = () => {
  const { enquiriesData } = useGetEnquiries();
  console.log('this is enquiries data', enquiriesData)

  return (
    <div className={Styles.dashboard}>
      <Sidebar />
      <div className={Styles.main}>
        <Header pageHeading={"Enquiries"} />
        <div className={Styles.container}>
          <div className={Styles.title}>
            <Heading
              headingText={"Portfolio Form Equiries"}
              headingType={"h2"}
            />
          </div>
          <div className={`${Styles.cardGrid} mt-5`}>
            <Card className={`${Styles.card} ${Styles.cardDark}`}>
              <Heading headingText={"Enquiries"} headingType={"h3"} />
              <div className={`${Styles.cardList} table-card`}>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Contact</th>
                      <th scope="col">Message</th>
                    </tr>
                  </thead>
                  <tbody>
                  {enquiriesData?.map((eachData, index) => (
                    <tr>
                      <th scope="row">{index+1}</th>
                      <td>{eachData.name}</td>
                      <td>{eachData.email}</td>
                      <td>{eachData.contact}</td>
                      <td>{eachData.message}</td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enquiries;
