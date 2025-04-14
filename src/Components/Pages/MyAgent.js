import React, { useEffect, useState } from "react";
import UserSidebar from "../NavFooter/UserSidebar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import swal from "sweetalert";
const MyAgent = () => {
  const [count, setcount] = useState();
  const [dataofAgent,setdataofAgent] = useState();
  const [topagent, settopagent] = useState();
  const loginid = secureLocalStorage.getItem("loginuserid");
  
  const navigate = useNavigate();

  let cityes = secureLocalStorage.getItem("cityname");

  useEffect(()=>{
    window.scrollTo(0, 0);
    Myagents()
    GettopAgent();
  },[0])
  const Myagents = () => {
    const data = {
      userId: loginid,
    };
    axios
      .post("http://157.66.191.24:3089/website/get_user_contact_us", data)
      .then((res) => {
        
        setcount(res?.data?.data?.length);
        
        setdataofAgent(res.data.data);
      })
      .catch((error) => {});
  };
  const AddMyagents = (item) => {
    if (!loginid) {
      swal({
        title: "Please Login First!",
        icon: "error",
      }).then(() => {
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      });
      return;
    }
    const data = {
      userId: loginid,
      agentId: item,
      
    };

    axios
      .post(`http://157.66.191.24:3089/website/add_agent_user_contact_us`, data)
      .then((res) => {
        swal({
          title: "Your Details Share With Our Expert",
          icon: "success",
        });
      })
      .catch((error) => {
        swal({
          title: error.response.data.msg,
          icon: "error",
        });
        
      });
  };



  const GettopAgent = () => {
    const data = {
      city_name: cityes,
    };
    axios
      .post("http://157.66.191.24:3089/website/get_top_agent", data)
      .then((res) => {
        settopagent(res.data.data);
      })
      .catch((error) => {});
  };
  return (
    <>
      <UserSidebar />
      <div className="dashboard__content bg-23" style={{ padding: 15 }}>
        <section className="flat-title2" style={{ padding: "79px 0px 17px" }}>
          <div className="container7">
            <div className="row">
              <div className="col-lg-12">
                <div className="title-group fs-30 lh-45 fw-7">
                  Partner Agents
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          className="tf-section2 flat-agent flat-property page style"
          style={{ backgroundColor: "#fff", padding: 10 }}
        >
          <div className>
            <div className="row flex">
              
              <div className="col-lg-8 col-md-12">
                <section
                  className="flat-title"
                  style={{ marginTop: "-20px", marginBottom: "-30px" }}
                >
                  <div className="container7" style={{ marginBottom: 45 }}>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className style={{ padding: "7px 0 19px" }}>

                          <div
                            className=" bg-white img-box flex justify-content-end align-center mb-2 mt-1 bg-white"
                            style={{ margin: "15px 0px", float: "left" }}
                          >

                            <div
                              className="flat-bt-top sc-btn-top mt-3"
                              style={{ marginLeft: "2%" }}
                            >
                              <Link
                                style={{ borderRadius: 5, width: 156 }}
                                className="sc-button btn-icon "
                                to="#"
                              >
                                <span style={{ paddingLeft: 10 }}>
                                  Prefer Agent- {count}
                                </span>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                { dataofAgent?.length > 0 ? 
                
                dataofAgent?.map((data) => {
                    return (
                      <div
                        className="bg-white box box-dream flex hv-one"
                        style={{ maxWidth: 1018 }}
                      >
                        <div
                          className="wrap-review wrap-style"
                          style={{
                            padding: "10px 10px 0 10px",
                            maxWidth: "100%",
                          }}
                        >
                          <div className="comment-list">
                            <ol className>
                              <li className="flex">
                                <div
                                  className="mb-2 images flex-none flex flex-column justify-content-start align-center"
                                  style={{ marginTop: 20 }}
                                >
                                  {data?.user_image ? (
                                    <img className="img-fluid"
                                      style={{
                                        border: "solid 2px #fbc200",
                                        borderRadius: "100%",
                                        height: 162,
                                        marginBottom: 10,
                                        objectFit: "cover",
                                        width: 220,
                                      }}
                                      src={
                                        `http://157.66.191.24:3089/uploads/` +
                                        data?.user_image
                                      }
                                      alt="images"
                                    />
                                  ) : (
                                    <img className="img-fluid"
                                      style={{
                                        borderRadius: "100%",
                                        height: 162,
                                        marginBottom: 10,
                                        objectFit: "cover",
                                        width: 220,
                                        border: "solid 3px #fbc200",
                                      }}
                                      src="https://t4.ftcdn.net/jpg/03/25/73/59/360_F_325735908_TkxHU7okor9CTWHBhkGfdRumONWfIDEb.jpg"
                                      alt="images"
                                    />
                                  )}
                                  <Link
                                    to="/agentsdetails"
                                    onClick={() => {
                                      secureLocalStorage.setItem(
                                        "agentdetailsId",
                                        data.agentId
                                      );
                                    }}
                                    style={{
                                      color: "#5f449b",
                                      fontWeight: 600,
                                      fontSize: 12,
                                      borderBottom: "1px solid #5f449b",
                                    }}
                                  >
                                    View Profile
                                  </Link>
                                </div>
                                <div
                                  className="content"
                                  style={{
                                    width: "78vw",
                                    padding: "10px 10px 0 10px",
                                  }}
                                >
                                  <div className="title-item flex justify-space align-center text-capitalize">
                                    <h4 style={{ color: "#5f449b" }}>
                                      {data?.name} 
                                     
                                    </h4>
                                  </div>
                                  
                                  <p style={{ color: "#666" }}>
                                    {data?.company_name
                                      ? data?.company_name
                                      : "Justhing Agent"}{" "}
                                    &nbsp;&nbsp;- {data?.city_name}
                                  </p>
                                  <div
                                    className="agentdetailscontainer flex flex-column justify-content-between"
                                    style={{
                                      backgroundColor: "#fdf9f0",
                                      padding: 10,
                                      flexWrap: "wrap",
                                      gap: 10,
                                      border: "solid 1px #fde4ac",
                                      borderRadius: 6,
                                    }}
                                  >
                                    <div className="flex justify-content-between flex-wrap">
                                      <div className="flex" style={{ gap: 10 }}>
                                        <svg
                                          style={{ marginTop: 3 }}
                                          width={18}
                                          height={18}
                                          viewBox="0 0 18 18"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M4.6369 0.554572C4.60629 0.501193 4.56213 0.456839 4.50889 0.425995C4.45565 0.39515 4.3952 0.378906 4.33367 0.378906C4.27214 0.378906 4.2117 0.39515 4.15845 0.425995C4.10521 0.456839 4.06105 0.501193 4.03045 0.554572L0.1523 7.3706C0.121562 7.42384 0.105408 7.48424 0.105469 7.54572C0.10553 7.60719 0.121802 7.66756 0.152646 7.72074C0.183489 7.77392 0.227812 7.81802 0.281142 7.8486C0.334473 7.87918 0.394925 7.89515 0.4564 7.89491H8.21094C8.27315 7.89673 8.33472 7.8819 8.38929 7.85197C8.44385 7.82203 8.48943 7.77807 8.52132 7.72462C8.55321 7.67117 8.57026 7.61018 8.57069 7.54794C8.57112 7.48571 8.55492 7.42448 8.52378 7.3706L4.6369 0.554572ZM1.05586 7.19583L4.3293 1.42842L7.60973 7.19583H1.05586ZM11.6696 7.89491H15.8641C16.2349 7.89491 16.5906 7.7476 16.8528 7.4854C17.115 7.22319 17.2623 6.86757 17.2623 6.49675V2.30227C17.2623 1.93146 17.115 1.57583 16.8528 1.31362C16.5906 1.05142 16.2349 0.904112 15.8641 0.904112H11.6696C11.2988 0.904112 10.9432 1.05142 10.681 1.31362C10.4188 1.57583 10.2715 1.93146 10.2715 2.30227V6.49675C10.2715 6.86757 10.4188 7.22319 10.681 7.4854C10.9432 7.7476 11.2988 7.89491 11.6696 7.89491ZM10.9706 2.30227C10.9706 2.11686 11.0442 1.93905 11.1753 1.80795C11.3064 1.67684 11.4842 1.60319 11.6696 1.60319H15.8641C16.0495 1.60319 16.2273 1.67684 16.3584 1.80795C16.4895 1.93905 16.5632 2.11686 16.5632 2.30227V6.49675C16.5632 6.68216 16.4895 6.85997 16.3584 6.99107C16.2273 7.12218 16.0495 7.19583 15.8641 7.19583H11.6696C11.4842 7.19583 11.3064 7.12218 11.1753 6.99107C11.0442 6.85997 10.9706 6.68216 10.9706 6.49675V2.30227ZM17.5087 12.542L14.7124 9.74572C14.5882 9.62154 14.4408 9.52303 14.2786 9.45582C14.1164 9.38861 13.9425 9.35402 13.7669 9.35402C13.5913 9.35402 13.4174 9.38861 13.2552 9.45582C13.0929 9.52303 12.9455 9.62154 12.8214 9.74572L10.0251 12.542C9.7751 12.7932 9.63479 13.1332 9.63479 13.4875C9.63479 13.8419 9.7751 14.1819 10.0251 14.4331L12.8214 17.2294C12.9455 17.3536 13.0929 17.4521 13.2552 17.5193C13.4174 17.5865 13.5913 17.6211 13.7669 17.6211C13.9425 17.6211 14.1164 17.5865 14.2786 17.5193C14.4408 17.4521 14.5882 17.3536 14.7124 17.2294L17.5087 14.4331C17.7582 14.1816 17.8983 13.8418 17.8983 13.4875C17.8983 13.1333 17.7582 12.7935 17.5087 12.542ZM17.0141 13.9402L14.2178 16.7365C14.0979 16.8556 13.9358 16.9225 13.7669 16.9225C13.5979 16.9225 13.4358 16.8556 13.316 16.7365L10.5197 13.9402C10.4603 13.8811 10.4131 13.8108 10.381 13.7334C10.3488 13.6561 10.3323 13.5731 10.3323 13.4893C10.3323 13.4055 10.3488 13.3225 10.381 13.2451C10.4131 13.1678 10.4603 13.0975 10.5197 13.0384L13.316 10.2421C13.4371 10.1254 13.5987 10.0603 13.7669 10.0603C13.935 10.0603 14.0966 10.1254 14.2178 10.2421L17.0141 13.0384C17.1336 13.158 17.2008 13.3202 17.2008 13.4893C17.2008 13.6584 17.1336 13.8206 17.0141 13.9402ZM4.3293 9.64261C3.56884 9.64261 2.82546 9.86811 2.19317 10.2906C1.56087 10.7131 1.06806 11.3136 0.777041 12.0162C0.486027 12.7187 0.409884 13.4918 0.558242 14.2377C0.7066 14.9835 1.07279 15.6686 1.61052 16.2063C2.14824 16.7441 2.83335 17.1102 3.57919 17.2586C4.32504 17.407 5.09812 17.3308 5.8007 17.0398C6.50327 16.7488 7.10376 16.256 7.52625 15.6237C7.94874 14.9914 8.17424 14.248 8.17424 13.4875C8.17424 12.9826 8.07479 12.4826 7.88156 12.0162C7.68833 11.5497 7.40512 11.1258 7.04808 10.7688C6.69105 10.4117 6.26719 10.1285 5.8007 9.93529C5.33421 9.74206 4.83423 9.64261 4.3293 9.64261ZM4.3293 16.6334C3.70711 16.6334 3.09889 16.4489 2.58156 16.1032C2.06422 15.7576 1.66101 15.2662 1.42291 14.6914C1.1848 14.1166 1.12251 13.4841 1.24389 12.8738C1.36527 12.2636 1.66489 11.703 2.10484 11.2631C2.5448 10.8231 3.10534 10.5235 3.71557 10.4021C4.32581 10.2808 4.95834 10.3431 5.53317 10.5812C6.108 10.8193 6.59932 11.2225 6.94499 11.7398C7.29066 12.2571 7.47516 12.8654 7.47516 13.4875C7.47516 14.3219 7.14372 15.122 6.55376 15.712C5.9638 16.302 5.16364 16.6334 4.3293 16.6334Z"
                                            fill="#8E8E93"
                                            stroke="#8E8E93"
                                            strokeWidth="0.3"
                                          />
                                        </svg>
                                        <p
                                          style={{
                                            color: "#333",
                                            marginBottom: 10,
                                          }}
                                        >
                                          {data?.total_experience_year
                                            ? data?.total_experience_year +
                                              ` Years`
                                            : "No"}{" "}
                                          Experience{" "}
                                        </p>
                                      </div>
                                      <div className="flex" style={{ gap: 10 }}>
                                        <svg
                                          style={{ marginTop: 3 }}
                                          width={18}
                                          height={16}
                                          viewBox="0 0 18 16"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M0.588634 14.6051H17.4112M16.3933 4.65453V14.6051H1.60654V4.62514M17.4764 4.87532L8.99991 1.3949L0.523438 4.87532M3.72978 8.32286H14.2701M3.72978 10.417H14.2701M3.72978 12.5111H14.2701"
                                            stroke="#8E8E93"
                                            strokeMiterlimit={10}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                          <path
                                            d="M3.73047 6.22876H14.2707V14.6051H3.73047V6.22876Z"
                                            stroke="#8E8E93"
                                            strokeMiterlimit={10}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                        <p
                                          className="text-capitalize"
                                          style={{
                                            color: "#333",
                                            marginBottom: 10,
                                          }}
                                        >
                                          {data?.language
                                            ? data?.language
                                            : "No"}
                                        </p>
                                      </div>
                                      <div className="flex" style={{ gap: 10 }}>
                                        <svg
                                          width={18}
                                          height={18}
                                          viewBox="0 0 18 18"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M15.125 2.25H14.375V1H13.125V2.25H4.875V1H3.625V2.25H2.875C1.84113 2.25 1 3.09113 1 4.125V15.125C1 16.1589 1.84113 17 2.875 17H15.125C16.1589 17 17 16.1589 17 15.125V4.125C17 3.09113 16.1589 2.25 15.125 2.25ZM15.75 15.125C15.75 15.4696 15.4696 15.75 15.125 15.75H2.875C2.53038 15.75 2.25 15.4696 2.25 15.125V6.875H15.75V15.125ZM15.75 5.625H2.25V4.125C2.25 3.78038 2.53038 3.5 2.875 3.5H3.625V4.75H4.875V3.5H13.125V4.75H14.375V3.5H15.125C15.4696 3.5 15.75 3.78038 15.75 4.125V5.625Z"
                                            fill="#8E8E93"
                                            stroke="white"
                                            strokeWidth="0.2"
                                          />
                                          <path
                                            d="M3.375 8.1875H4.625V9.4375H3.375V8.1875ZM5.875 8.1875H7.125V9.4375H5.875V8.1875ZM8.375 8.1875H9.625V9.4375H8.375V8.1875ZM10.875 8.1875H12.125V9.4375H10.875V8.1875ZM13.375 8.1875H14.625V9.4375H13.375V8.1875ZM3.375 10.6875H4.625V11.9375H3.375V10.6875ZM5.875 10.6875H7.125V11.9375H5.875V10.6875ZM8.375 10.6875H9.625V11.9375H8.375V10.6875ZM10.875 10.6875H12.125V11.9375H10.875V10.6875ZM3.375 13.1875H4.625V14.4375H3.375V13.1875ZM5.875 13.1875H7.125V14.4375H5.875V13.1875ZM8.375 13.1875H9.625V14.4375H8.375V13.1875ZM10.875 13.1875H12.125V14.4375H10.875V13.1875ZM13.375 10.6875H14.625V11.9375H13.375V10.6875Z"
                                            fill="#8E8E93"
                                            stroke="white"
                                            strokeWidth="0.2"
                                          />
                                        </svg>
                                        <Link
                                          to="/agentsdetails" onClick={() => {
                                            secureLocalStorage.setItem(
                                              "agentdetailsId",
                                              data.agentId
                                            );
                                          }}
                                          style={{
                                            color: "#333",
                                            marginBottom: 10,
                                          }}
                                        >Listing{" "}<span
                                            style={{
                                              color: "#5f449b",
                                              borderBottom: "1px solid #5f449b",
                                            }}
                                          > View all&gt;
                                          </span>
                                        </Link>
                                      </div>
                                    </div>
                                    <div className="flex justify-content-between flex-wrap">
                                     
                                    {data?.rating ?
                                    <div className="flex" style={{ gap: 10 }}>
                                        <svg
                                          style={{ marginTop: 3 }}
                                          width={18}
                                          height={18}
                                          viewBox="0 0 18 18"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M4.6369 0.554572C4.60629 0.501193 4.56213 0.456839 4.50889 0.425995C4.45565 0.39515 4.3952 0.378906 4.33367 0.378906C4.27214 0.378906 4.2117 0.39515 4.15845 0.425995C4.10521 0.456839 4.06105 0.501193 4.03045 0.554572L0.1523 7.3706C0.121562 7.42384 0.105408 7.48424 0.105469 7.54572C0.10553 7.60719 0.121802 7.66756 0.152646 7.72074C0.183489 7.77392 0.227812 7.81802 0.281142 7.8486C0.334473 7.87918 0.394925 7.89515 0.4564 7.89491H8.21094C8.27315 7.89673 8.33472 7.8819 8.38929 7.85197C8.44385 7.82203 8.48943 7.77807 8.52132 7.72462C8.55321 7.67117 8.57026 7.61018 8.57069 7.54794C8.57112 7.48571 8.55492 7.42448 8.52378 7.3706L4.6369 0.554572ZM1.05586 7.19583L4.3293 1.42842L7.60973 7.19583H1.05586ZM11.6696 7.89491H15.8641C16.2349 7.89491 16.5906 7.7476 16.8528 7.4854C17.115 7.22319 17.2623 6.86757 17.2623 6.49675V2.30227C17.2623 1.93146 17.115 1.57583 16.8528 1.31362C16.5906 1.05142 16.2349 0.904112 15.8641 0.904112H11.6696C11.2988 0.904112 10.9432 1.05142 10.681 1.31362C10.4188 1.57583 10.2715 1.93146 10.2715 2.30227V6.49675C10.2715 6.86757 10.4188 7.22319 10.681 7.4854C10.9432 7.7476 11.2988 7.89491 11.6696 7.89491ZM10.9706 2.30227C10.9706 2.11686 11.0442 1.93905 11.1753 1.80795C11.3064 1.67684 11.4842 1.60319 11.6696 1.60319H15.8641C16.0495 1.60319 16.2273 1.67684 16.3584 1.80795C16.4895 1.93905 16.5632 2.11686 16.5632 2.30227V6.49675C16.5632 6.68216 16.4895 6.85997 16.3584 6.99107C16.2273 7.12218 16.0495 7.19583 15.8641 7.19583H11.6696C11.4842 7.19583 11.3064 7.12218 11.1753 6.99107C11.0442 6.85997 10.9706 6.68216 10.9706 6.49675V2.30227ZM17.5087 12.542L14.7124 9.74572C14.5882 9.62154 14.4408 9.52303 14.2786 9.45582C14.1164 9.38861 13.9425 9.35402 13.7669 9.35402C13.5913 9.35402 13.4174 9.38861 13.2552 9.45582C13.0929 9.52303 12.9455 9.62154 12.8214 9.74572L10.0251 12.542C9.7751 12.7932 9.63479 13.1332 9.63479 13.4875C9.63479 13.8419 9.7751 14.1819 10.0251 14.4331L12.8214 17.2294C12.9455 17.3536 13.0929 17.4521 13.2552 17.5193C13.4174 17.5865 13.5913 17.6211 13.7669 17.6211C13.9425 17.6211 14.1164 17.5865 14.2786 17.5193C14.4408 17.4521 14.5882 17.3536 14.7124 17.2294L17.5087 14.4331C17.7582 14.1816 17.8983 13.8418 17.8983 13.4875C17.8983 13.1333 17.7582 12.7935 17.5087 12.542ZM17.0141 13.9402L14.2178 16.7365C14.0979 16.8556 13.9358 16.9225 13.7669 16.9225C13.5979 16.9225 13.4358 16.8556 13.316 16.7365L10.5197 13.9402C10.4603 13.8811 10.4131 13.8108 10.381 13.7334C10.3488 13.6561 10.3323 13.5731 10.3323 13.4893C10.3323 13.4055 10.3488 13.3225 10.381 13.2451C10.4131 13.1678 10.4603 13.0975 10.5197 13.0384L13.316 10.2421C13.4371 10.1254 13.5987 10.0603 13.7669 10.0603C13.935 10.0603 14.0966 10.1254 14.2178 10.2421L17.0141 13.0384C17.1336 13.158 17.2008 13.3202 17.2008 13.4893C17.2008 13.6584 17.1336 13.8206 17.0141 13.9402ZM4.3293 9.64261C3.56884 9.64261 2.82546 9.86811 2.19317 10.2906C1.56087 10.7131 1.06806 11.3136 0.777041 12.0162C0.486027 12.7187 0.409884 13.4918 0.558242 14.2377C0.7066 14.9835 1.07279 15.6686 1.61052 16.2063C2.14824 16.7441 2.83335 17.1102 3.57919 17.2586C4.32504 17.407 5.09812 17.3308 5.8007 17.0398C6.50327 16.7488 7.10376 16.256 7.52625 15.6237C7.94874 14.9914 8.17424 14.248 8.17424 13.4875C8.17424 12.9826 8.07479 12.4826 7.88156 12.0162C7.68833 11.5497 7.40512 11.1258 7.04808 10.7688C6.69105 10.4117 6.26719 10.1285 5.8007 9.93529C5.33421 9.74206 4.83423 9.64261 4.3293 9.64261ZM4.3293 16.6334C3.70711 16.6334 3.09889 16.4489 2.58156 16.1032C2.06422 15.7576 1.66101 15.2662 1.42291 14.6914C1.1848 14.1166 1.12251 13.4841 1.24389 12.8738C1.36527 12.2636 1.66489 11.703 2.10484 11.2631C2.5448 10.8231 3.10534 10.5235 3.71557 10.4021C4.32581 10.2808 4.95834 10.3431 5.53317 10.5812C6.108 10.8193 6.59932 11.2225 6.94499 11.7398C7.29066 12.2571 7.47516 12.8654 7.47516 13.4875C7.47516 14.3219 7.14372 15.122 6.55376 15.712C5.9638 16.302 5.16364 16.6334 4.3293 16.6334Z"
                                            fill="#8E8E93"
                                            stroke="#8E8E93"
                                            strokeWidth="0.3"
                                          />
                                        </svg>
                                        <p
                                          style={{
                                            color: "#333",
                                            marginBottom: 10,
                                          }}
                                        >Rating &nbsp;&nbsp; 
                                           <span className="star" >{data?.rating}<svg style={{height:'20px',width:'20px'}}
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 512 512"
          xmlSpace="preserve"
        >
          <g>
            <g>
              <polygon points="512,197.816 325.961,185.585 255.898,9.569 
              185.835,185.585 0,197.816 142.534,318.842 95.762,502.431 
              255.898,401.21 416.035,502.431 369.263,318.842 " />
            </g>
          </g>
        </svg></span> 
                                        </p>
                                      </div> : null }



                                     








        <div className="flex" style={{ gap: 10 }}>
                                        <svg
                                          style={{ marginTop: 3 }}
                                          width={18}
                                          height={18}
                                          viewBox="0 0 18 18"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M4.6369 0.554572C4.60629 0.501193 4.56213 0.456839 4.50889 0.425995C4.45565 0.39515 4.3952 0.378906 4.33367 0.378906C4.27214 0.378906 4.2117 0.39515 4.15845 0.425995C4.10521 0.456839 4.06105 0.501193 4.03045 0.554572L0.1523 7.3706C0.121562 7.42384 0.105408 7.48424 0.105469 7.54572C0.10553 7.60719 0.121802 7.66756 0.152646 7.72074C0.183489 7.77392 0.227812 7.81802 0.281142 7.8486C0.334473 7.87918 0.394925 7.89515 0.4564 7.89491H8.21094C8.27315 7.89673 8.33472 7.8819 8.38929 7.85197C8.44385 7.82203 8.48943 7.77807 8.52132 7.72462C8.55321 7.67117 8.57026 7.61018 8.57069 7.54794C8.57112 7.48571 8.55492 7.42448 8.52378 7.3706L4.6369 0.554572ZM1.05586 7.19583L4.3293 1.42842L7.60973 7.19583H1.05586ZM11.6696 7.89491H15.8641C16.2349 7.89491 16.5906 7.7476 16.8528 7.4854C17.115 7.22319 17.2623 6.86757 17.2623 6.49675V2.30227C17.2623 1.93146 17.115 1.57583 16.8528 1.31362C16.5906 1.05142 16.2349 0.904112 15.8641 0.904112H11.6696C11.2988 0.904112 10.9432 1.05142 10.681 1.31362C10.4188 1.57583 10.2715 1.93146 10.2715 2.30227V6.49675C10.2715 6.86757 10.4188 7.22319 10.681 7.4854C10.9432 7.7476 11.2988 7.89491 11.6696 7.89491ZM10.9706 2.30227C10.9706 2.11686 11.0442 1.93905 11.1753 1.80795C11.3064 1.67684 11.4842 1.60319 11.6696 1.60319H15.8641C16.0495 1.60319 16.2273 1.67684 16.3584 1.80795C16.4895 1.93905 16.5632 2.11686 16.5632 2.30227V6.49675C16.5632 6.68216 16.4895 6.85997 16.3584 6.99107C16.2273 7.12218 16.0495 7.19583 15.8641 7.19583H11.6696C11.4842 7.19583 11.3064 7.12218 11.1753 6.99107C11.0442 6.85997 10.9706 6.68216 10.9706 6.49675V2.30227ZM17.5087 12.542L14.7124 9.74572C14.5882 9.62154 14.4408 9.52303 14.2786 9.45582C14.1164 9.38861 13.9425 9.35402 13.7669 9.35402C13.5913 9.35402 13.4174 9.38861 13.2552 9.45582C13.0929 9.52303 12.9455 9.62154 12.8214 9.74572L10.0251 12.542C9.7751 12.7932 9.63479 13.1332 9.63479 13.4875C9.63479 13.8419 9.7751 14.1819 10.0251 14.4331L12.8214 17.2294C12.9455 17.3536 13.0929 17.4521 13.2552 17.5193C13.4174 17.5865 13.5913 17.6211 13.7669 17.6211C13.9425 17.6211 14.1164 17.5865 14.2786 17.5193C14.4408 17.4521 14.5882 17.3536 14.7124 17.2294L17.5087 14.4331C17.7582 14.1816 17.8983 13.8418 17.8983 13.4875C17.8983 13.1333 17.7582 12.7935 17.5087 12.542ZM17.0141 13.9402L14.2178 16.7365C14.0979 16.8556 13.9358 16.9225 13.7669 16.9225C13.5979 16.9225 13.4358 16.8556 13.316 16.7365L10.5197 13.9402C10.4603 13.8811 10.4131 13.8108 10.381 13.7334C10.3488 13.6561 10.3323 13.5731 10.3323 13.4893C10.3323 13.4055 10.3488 13.3225 10.381 13.2451C10.4131 13.1678 10.4603 13.0975 10.5197 13.0384L13.316 10.2421C13.4371 10.1254 13.5987 10.0603 13.7669 10.0603C13.935 10.0603 14.0966 10.1254 14.2178 10.2421L17.0141 13.0384C17.1336 13.158 17.2008 13.3202 17.2008 13.4893C17.2008 13.6584 17.1336 13.8206 17.0141 13.9402ZM4.3293 9.64261C3.56884 9.64261 2.82546 9.86811 2.19317 10.2906C1.56087 10.7131 1.06806 11.3136 0.777041 12.0162C0.486027 12.7187 0.409884 13.4918 0.558242 14.2377C0.7066 14.9835 1.07279 15.6686 1.61052 16.2063C2.14824 16.7441 2.83335 17.1102 3.57919 17.2586C4.32504 17.407 5.09812 17.3308 5.8007 17.0398C6.50327 16.7488 7.10376 16.256 7.52625 15.6237C7.94874 14.9914 8.17424 14.248 8.17424 13.4875C8.17424 12.9826 8.07479 12.4826 7.88156 12.0162C7.68833 11.5497 7.40512 11.1258 7.04808 10.7688C6.69105 10.4117 6.26719 10.1285 5.8007 9.93529C5.33421 9.74206 4.83423 9.64261 4.3293 9.64261ZM4.3293 16.6334C3.70711 16.6334 3.09889 16.4489 2.58156 16.1032C2.06422 15.7576 1.66101 15.2662 1.42291 14.6914C1.1848 14.1166 1.12251 13.4841 1.24389 12.8738C1.36527 12.2636 1.66489 11.703 2.10484 11.2631C2.5448 10.8231 3.10534 10.5235 3.71557 10.4021C4.32581 10.2808 4.95834 10.3431 5.53317 10.5812C6.108 10.8193 6.59932 11.2225 6.94499 11.7398C7.29066 12.2571 7.47516 12.8654 7.47516 13.4875C7.47516 14.3219 7.14372 15.122 6.55376 15.712C5.9638 16.302 5.16364 16.6334 4.3293 16.6334Z"
                                            fill="#8E8E93"
                                            stroke="#8E8E93"
                                            strokeWidth="0.3"
                                          />
                                        </svg>
                                        <p
                                          style={{
                                            color: "#333",
                                            marginBottom: 10,
                                          }}
                                        >
                                          Verified Transactions: &nbsp;0{" "}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    
                                  {loginid ? (
                                    <div
                                      className="mt-2 mb-3 bg-white img-box flex justify-content-end align-center mb-2 mt-1 bg-white"
                                      style={{ margin: "15px 0px" }}
                                    >
                                       
                                      
                                      <div className="flat-bt-top sc-btn-top">
                                        <a 
                                          onClick={(event) => {
                                            event.preventDefault(); 
                                            AddMyagents(data?.agentId);  
                                            window.open(
                                              `https://wa.me/${data?.mobile_no}`,
                                              "_blank"
                                            ); 
                                          }}
                                          href={`https://wa.me/${data?.mobile_no}`} 
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          style={{ borderRadius: 5 }}
                                          className="sc-buttonborder btn-icon "
                                        >
                                          <img
                                            width={20}
                                            height={20}
                                            src="assets/images/icon/whatsappicon.svg"
                                          />
                                          <span> WhatsApp</span>
                                        </a>
                                      </div>
                                      <div
                                        className="flat-bt-top sc-btn-top"
                                        style={{ marginLeft: "2%" }}
                                      >
                                        <a
                                          style={{ borderRadius: 5 }}
                                          className="sc-button btn-icon "
                                          onClick={(event) => {
                                            event.preventDefault(); 
                                            AddMyagents(data?.agentId); 
                                            window.location.href = `tel:${data?.mobile_no}`; 
                                          }}
                                          href={`tel:${data?.mobile_no}`}
                                        >
                                          <img
                                            width={20}
                                            height={20}
                                            src="assets/images/icon/calls.svg"
                                          />
                                          <span style={{ paddingLeft: 10 }}>
                                            Book an Appointment
                                          </span>
                                        </a>
                                      </div>
                                    </div>) : (<div
                                      className="mt-2 mb-3 bg-white img-box flex justify-content-end align-center mb-2 mt-1 bg-white"
                                      style={{ margin: "15px 0px" }}
                                    >
                                       
                                      
                                      <div className="flat-bt-top sc-btn-top">
                                        <a onClick={() => AddMyagents()}
                                          
                                          rel="noopener noreferrer"
                                          style={{ borderRadius: 5 }}
                                          className="sc-buttonborder btn-icon "
                                        >
                                          <img
                                            width={20}
                                            height={20}
                                            src="assets/images/icon/whatsappicon.svg"
                                          />
                                          <span> WhatsApp</span>
                                        </a>
                                      </div>
                                      <div
                                        className="flat-bt-top sc-btn-top"
                                        style={{ marginLeft: "2%" }}
                                      >
                                        <a
                                          style={{ borderRadius: 5 }}
                                          className="sc-button btn-icon "
                                          onClick={() => AddMyagents()}
                                        >
                                          <img
                                            width={20}
                                            height={20}
                                            src="assets/images/icon/calls.svg"
                                          />
                                          <span style={{ paddingLeft: 10 }}>
                                            Book an Appointment
                                          </span>
                                        </a>
                                      </div>
                                    </div>) } 
                                  </div>
                                </div>
                              </li>
                            </ol>
                          </div>
                        </div>
                      </div>
                    );
                  })
                 : (
                  <div style={{ textAlign: "center" }}>
                    <h2>
                    <img
                       width={100}
                       src="https://themesflat.co/html/dreamhomehtml/assets/images/icon/footer-icon-2.png"
                       alt="No Property Found"
                     />
                    </h2>
                    <h3 className="mt-3">No Agent Found</h3>
                  </div>
                
              ) }
              
               
              </div>
              <div className="col-lg-4">
              <h3 className="widget-title title-list" >
                Top Rated Agent List
              </h3>
              <aside
                className="side-bar"
                style={{
                  marginTop: 10,
                  boxShadow: "0px 4px 18px 0px rgba(0, 0, 0, 0.0784313725)",
                  padding: 10,
                  borderTop: "#ffa920 solid 4px",
                  borderRadius: 20,
                  borderBottom: "#ffa920 solid 4px",
                }}
              >
                <div className="inner-side-bar">
                  {topagent?.length > 0 ? 
                  (<div className="widget widget-listings style">
                    {topagent?.map((data) => {
                      return (
                        <div
                          style={{
                            border: "solid 1px #fde4ac",
                            marginBottom: 10,
                            padding: 0,
                            backgroundColor: "#fdf9f0",
                            borderRadius: 30,
                          }}
                          className="box-listings flex justify-content-between align-center"
                        >
                          <div className>
                            <img
                              style={{
                                width: 44,
                                objectFit: "cover",
                                borderRadius: "50%",
                                height: 44,
                              }}
                              src="assets/images/img-box/sidebar-listings-1.jpg"
                              alt="images"
                            />
                          </div>
                          <div className="content link-style-1">
                            <Link
                              style={{
                                fontSize: 14,
                                color: "#333",
                                fontWeight: 600,
                              }}
                              className="fs-16 lh-24"
                              to="/agentsdetails"
                              onClick={() => {
                                secureLocalStorage.setItem(
                                  "agentdetailsId",
                                  data.agentId
                                );
                              }}
                            >
                              {data?.user_name}
                            </Link>
                          </div>
                          <div className>
                            {data?.user_image ? (
                              <img
                                style={{
                                  width: 44,
                                  objectFit: "cover",
                                  borderRadius: "50%",
                                  height: 44,
                                }}
                                src={
                                  `http://157.66.191.24:3089/uploads/` +
                                  data.user_image
                                }
                                alt="images"
                              />
                            ) : (
                              <img
                                style={{
                                  width: 44,
                                  objectFit: "cover",
                                  borderRadius: "50%",
                                  height: 44,
                                }}
                                src="https://t4.ftcdn.net/jpg/03/25/73/59/360_F_325735908_TkxHU7okor9CTWHBhkGfdRumONWfIDEb.jpg"
                                alt="images"
                              />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>) : <div style={{ textAlign: "center" }}>
                  <h2>
                    <img
                      width={100}
                      src="https://themesflat.co/html/dreamhomehtml/assets/images/icon/footer-icon-2.png"
                      alt="No Property Found"
                    />
                  </h2>
                  <h3 className="mt-3">No Agent Found</h3>
                </div>
}
                </div>
              </aside>
            </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default MyAgent;
