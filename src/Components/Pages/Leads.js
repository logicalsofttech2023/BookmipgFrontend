import React, { useEffect, useState } from "react";
import AgentSidebar from "../NavFooter/AgentSidebar";
import { Link } from "react-router-dom";

import axios from "axios";
import swal from "sweetalert";

import { Toaster } from "react-hot-toast";
const Leads = () => {
  const [Listingdata, setListingdata] = useState();
  const [count, setcount] = useState();
  const [Dashboarddata, setDashboarddata] = useState();
const [Leads, setLeads] = useState();

  let loginid = localStorage.getItem("loginuserid");
  let listingID = localStorage.getItem("ListingId");
  useEffect(()=>{
    window.scrollTo(0, 0);
    GetDashboard()
    },[0])
    const GetDashboard = () =>{
      const data = {
        userId:loginid
      }
      axios.post("http://157.66.191.24:3089/website/dashboard",data).then((res)=>{
        setDashboarddata(res.data)
        
      }).catch((error)=>{
    
      })
    }
  useEffect(() => {
    GetProperty();
  }, [0]);

  const GetProperty = () => {
    const data = {
      userId: loginid,
    };
    axios
      .post("http://157.66.191.24:3089/website/get_property", data)
      .then((res) => {
        setListingdata(res?.data?.data?.reverse());
        setcount(res?.data?.data?.length);
      })
      .catch((error) => {});
  };


  let DeleteListing = (item) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this listing!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        let DeleteListings = () => {
          // let bannerdata = {
          //   propertyId: item,
          // };

          // let options = {
          //   headers: {
          //     token: token,
          //   },
          // };
          axios
            .get(
              `http://157.66.191.24:3089/website/delete_get_property/${item}`
            )
            .then((res) => {
              GetProperty();
            })
            .catch((error) => {});
        };
        DeleteListings();
        swal("Poof! Your listing has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your listing is safe!");
      }
    });
  };


  let SoldOutProperty = (item) => {
    swal({
      title: "Are you sure?",
      text: "Once sold, you will not be able to change this listing status!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        let Statuss = () => {
          let Data = {
            propertyId: item,
            property_approve_status:"3"
          };

          // let options = {
          //   headers: {
          //     token: token,
          //   },
          // };
          axios
            .post(
              `http://157.66.191.24:3089/website/No_property_status`,Data
            )
            .then((res) => {
              GetProperty();
            })
            .catch((error) => {});
        };
        Statuss();
        swal("Poof! Your listing status has been changed!", {
          icon: "success",
        });
      } else {
        swal("Your listing status is not changes!");
      }
    });
  };

  const Alertfor = ()=>{
    swal("Error! Your listing can not be sold!", {
      icon: "error",
    });
  }






  useEffect(() => {
    GetLeads();
  }, [0]);

  const GetLeads = () => {
    const data = {
      propertyId: listingID,
    };

    axios
      .post("http://157.66.191.24:3089/website/get_lead_property", data)
      .then((res) => {

        setLeads(res?.data?.data);
      })
      .catch((error) => {
   
      });
  };

  const UpdateLeads =(user,item)=>{
    const data = {
      userId:user,
      propertyId:listingID,
      lead_status:item

    }

    axios.post("http://157.66.191.24:3089/website/update_lead_status",data).then(()=>{
      GetLeads();
    }).catch((error)=>{

    })
  }
  return (
    <>
      <Toaster />
      <AgentSidebar />
      <div className="dashboard__content bg-1">
        <section className="flat-title2">
          <div className="container7">
            <div className="row">
              <div className="col-lg-12">
                <div className="title-group fs-30 lh-45 fw-7">My Leads</div>
              </div>
            </div>
          </div>
        </section>
       <section className="flat-counter">
          <div className="container7">
            <div className="row">
              <div className="col-lg-12">
                <div className="wrap-count flex-wrap flex">
                  <div className="box tf-counter flex bg-white">
                    <div className="icons">
                      <svg
                        width={36}
                        height={36}
                        viewBox="0 0 36 36"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_1523_44774)">
                          <path
                            d="M27.4092 14.0149H18.6185C17.9319 14.0149 17.3626 13.4456 17.3626 12.7591C17.3626 12.0726 17.9319 11.5033 18.6185 11.5033H27.4092C27.7422 11.5033 28.0616 11.6356 28.2971 11.8711C28.5327 12.1066 28.665 12.426 28.665 12.7591C28.665 13.0921 28.5327 13.4116 28.2971 13.6471C28.0616 13.8826 27.7422 14.0149 27.4092 14.0149ZM9.82775 15.2875C9.50961 15.2875 9.19148 15.1702 8.94031 14.9191L7.6845 13.6633C7.19892 13.1777 7.19892 12.374 7.6845 11.8884C8.17008 11.4028 8.9738 11.4028 9.45938 11.8884L9.82775 12.2568L12.7078 9.37676C13.1933 8.89118 13.9971 8.89118 14.4826 9.37676C14.9682 9.86234 14.9682 10.6661 14.4826 11.1516L10.7152 14.9191C10.4799 15.1547 10.1607 15.2872 9.82775 15.2875ZM27.4092 25.7358H18.6185C17.9319 25.7358 17.3626 25.1665 17.3626 24.48C17.3626 23.7935 17.9319 23.2242 18.6185 23.2242H27.4092C27.7422 23.2242 28.0616 23.3565 28.2971 23.592C28.5327 23.8275 28.665 24.147 28.665 24.48C28.665 24.8131 28.5327 25.1325 28.2971 25.368C28.0616 25.6035 27.7422 25.7358 27.4092 25.7358ZM9.82775 27.0084C9.50961 27.0084 9.19148 26.8912 8.94031 26.64L7.6845 25.3842C7.19892 24.8986 7.19892 24.0949 7.6845 23.6093C8.17008 23.1237 8.9738 23.1237 9.45938 23.6093L9.82775 23.9777L12.7078 21.0977C13.1933 20.6121 13.9971 20.6121 14.4826 21.0977C14.9682 21.5833 14.9682 22.387 14.4826 22.8726L10.7152 26.64C10.4799 26.8756 10.1607 27.0081 9.82775 27.0084Z"
                            fill="#1C1C1E"
                            stroke="white"
                            strokeWidth="0.7"
                          />
                          <path
                            d="M23.0233 36H12.9767C3.88465 36 0 32.1153 0 23.0233V12.9767C0 3.88465 3.88465 0 12.9767 0H23.0233C32.1153 0 36 3.88465 36 12.9767V23.0233C36 32.1153 32.1153 36 23.0233 36ZM12.9767 2.51163C5.25767 2.51163 2.51163 5.25767 2.51163 12.9767V23.0233C2.51163 30.7423 5.25767 33.4884 12.9767 33.4884H23.0233C30.7423 33.4884 33.4884 30.7423 33.4884 23.0233V12.9767C33.4884 5.25767 30.7423 2.51163 23.0233 2.51163H12.9767Z"
                            fill="#1C1C1E"
                            stroke="white"
                            strokeWidth="0.7"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1523_44774">
                            <rect width={36} height={36} fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div className="counter-box one">
                      <div className="title-count fw-6 fs-16 text-color-4">
                       Sold Out
                      </div>
                      <div className="count-number flex">
                        <div
                          className="number number-one"
                          data-speed={2000}
                          data-to={32}
                          data-inviewport="yes"
                        />
                       <div className="count-number">
                        <div
                          className="number number-one"
                          data-speed={2000}
                          data-to={6}
                          data-inviewport="yes"
                        >
                          10
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="box tf-counter flex bg-white">
                    <div className="icons">
                      <svg
                        width={36}
                        height={36}
                        viewBox="0 0 36 36"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_1523_44745)">
                          <path
                            d="M17.9453 36C17.3628 36 16.8906 35.5278 16.8906 34.9453C16.8906 34.3628 17.3628 33.8906 17.9453 33.8906C26.7074 33.8906 33.8359 26.7621 33.8359 18C33.8359 9.23787 26.7074 2.10938 17.9453 2.10938C17.3628 2.10938 16.8906 1.63716 16.8906 1.05469C16.8906 0.472219 17.3628 0 17.9453 0C22.7533 0 27.2735 1.87235 30.6733 5.27203C34.073 8.67178 35.9453 13.192 35.9453 18C35.9453 22.808 34.073 27.3281 30.6733 30.728C27.2735 34.1276 22.7533 36 17.9453 36Z"
                            fill="#1C1C1E"
                          />
                          <path
                            d="M26.4162 27.5273C26.2777 27.5275 26.1405 27.5003 26.0125 27.4473C25.8845 27.3943 25.7683 27.3165 25.6705 27.2184L17.1978 18.7457C17 18.548 16.8889 18.2797 16.8889 18V7.40918C16.8889 6.82672 17.3611 6.3545 17.9436 6.3545C18.526 6.3545 18.9982 6.82672 18.9982 7.40918V17.5632L27.162 25.7269C27.5738 26.1388 27.5738 26.8066 27.162 27.2185C27.0641 27.3165 26.9479 27.3943 26.8199 27.4473C26.6919 27.5003 26.5547 27.5275 26.4162 27.5273ZM11.8158 3.25245C11.946 3.25245 12.0785 3.22819 12.2068 3.17693C12.2106 3.17546 12.5861 3.0259 12.9903 2.89955C13.4221 2.76462 13.9327 2.6202 13.9378 2.61879C14.4984 2.46045 14.8244 1.87763 14.666 1.3171C14.5077 0.756567 13.9253 0.430458 13.3644 0.588872C13.3425 0.595059 12.8213 0.742434 12.3611 0.886223C12.0447 0.986087 11.7319 1.09692 11.4233 1.21852C10.8826 1.43494 10.6199 2.04849 10.8361 2.58919C11.001 3.00157 11.3971 3.25245 11.8158 3.25245ZM7.55679 3.2952C7.53837 3.3087 7.10194 3.62918 6.72133 3.92499C6.4599 4.12931 6.20569 4.3427 5.95915 4.56476C5.52855 4.95682 5.4974 5.62353 5.88926 6.05426C5.98804 6.16305 6.10852 6.24994 6.24293 6.30933C6.37734 6.36872 6.52271 6.39929 6.66965 6.39908C6.93207 6.39937 7.18511 6.30151 7.37904 6.12472C7.38206 6.12197 7.68124 5.85043 8.01565 5.59062C8.37298 5.31296 8.80062 4.99887 8.8049 4.99578C9.27452 4.65111 9.37577 3.99108 9.03117 3.52147C8.68643 3.05185 8.0264 2.95053 7.55679 3.2952ZM4.52498 7.55958C4.03765 7.24043 3.38402 7.3767 3.0648 7.86397C3.05229 7.88302 2.75571 8.33604 2.50272 8.74653C2.32946 9.02948 2.16609 9.31839 2.01293 9.61271C1.74694 10.1308 1.95119 10.7662 2.46912 11.0323C2.6179 11.109 2.78287 11.1491 2.95026 11.1491C3.3329 11.1491 3.70219 10.9401 3.88922 10.5765C3.89097 10.5729 4.07618 10.2137 4.2983 9.85332C4.53581 9.46807 4.82641 9.02412 4.8293 9.01969C5.14851 8.53243 5.01218 7.87873 4.52498 7.55958ZM1.00915 16.893C1.05036 16.8978 1.09182 16.9003 1.13332 16.9003C1.66087 16.9003 2.11657 16.5052 2.1795 15.9684C2.17999 15.9644 2.22703 15.567 2.30958 15.1478C2.39705 14.704 2.51376 14.1865 2.51496 14.1813C2.64335 13.6131 2.28687 13.0485 1.71867 12.9201C1.1504 12.7916 0.585936 13.1482 0.457475 13.7164C0.452412 13.7386 0.333162 14.2669 0.239998 14.7401C0.176825 15.0657 0.124973 15.3934 0.0845374 15.7227C0.0166155 16.3012 0.430545 16.8252 1.00915 16.893ZM2.46623 21.6175C2.40179 21.3482 2.34659 21.0767 2.30072 20.8036C2.22717 20.3571 2.15524 19.8314 2.15454 19.8262C2.07572 19.2491 1.54493 18.8448 0.966819 18.9239C0.389694 19.0027 -0.0142517 19.5344 0.0644983 20.1116C0.067592 20.1341 0.140998 20.6707 0.219326 21.1463C0.274184 21.4736 0.340412 21.7989 0.417889 22.1215C0.536225 22.6025 0.9671 22.9245 1.44122 22.9245C1.52468 22.9245 1.6094 22.9145 1.69406 22.8937C2.25972 22.7545 2.60545 22.1832 2.46623 21.6175ZM4.27326 26.1044C4.04805 25.7119 3.79655 25.2447 3.79401 25.24C3.51804 24.727 2.87826 24.535 2.36562 24.8108C1.85262 25.0867 1.66045 25.7263 1.93643 26.2392C1.94719 26.2593 2.2039 26.7362 2.44387 27.1543C2.60985 27.4415 2.78577 27.723 2.97129 27.998C3.1754 28.2971 3.5063 28.4581 3.84309 28.4581C4.04777 28.4581 4.2547 28.3986 4.43646 28.2746C4.91761 27.9464 5.04157 27.2903 4.71356 26.8091C4.71124 26.8057 4.48399 26.4716 4.27326 26.1044ZM8.6363 30.8845C8.41096 30.7233 8.19111 30.5546 7.97712 30.3786C7.62872 30.0899 7.22955 29.7404 7.22562 29.7368C6.78764 29.353 6.12115 29.3968 5.73731 29.835C5.3534 30.2731 5.39735 30.9394 5.8354 31.3233C5.85255 31.3384 6.25994 31.6951 6.63119 32.0028C7.02269 32.3272 7.40463 32.597 7.42073 32.6083C7.59812 32.7338 7.81006 32.8011 8.02732 32.801C8.35856 32.801 8.68467 32.6454 8.89012 32.3542C9.22573 31.8783 9.1121 31.2203 8.6363 30.8845ZM13.7377 33.3279C13.4702 33.2561 13.2053 33.175 12.9434 33.0851C12.5159 32.9366 12.0197 32.749 12.0147 32.7471C11.4701 32.5409 10.8613 32.8154 10.655 33.3602C10.4488 33.905 10.7233 34.5137 11.2681 34.7199C11.2895 34.728 11.796 34.9195 12.2515 35.0776C12.7317 35.2444 13.1839 35.3633 13.2029 35.3684C13.2925 35.3919 13.3825 35.4031 13.4709 35.4031C13.9388 35.4031 14.3663 35.0894 14.4904 34.6155C14.6382 34.052 14.3012 33.4756 13.7377 33.3279Z"
                            fill="#1C1C1E"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1523_44745">
                            <rect width={36} height={36} fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div className="counter-box one">
                      <div className="title-count fw-6 fs-16 text-color-4">
                        Pending
                      </div>
                      <div className="count-number">
                        <div
                          className="number number-one"
                          data-speed={2000}
                          data-to={2}
                          data-inviewport="yes"
                        >
                          {Dashboarddata?.total_pending}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="box tf-counter flex bg-white">
                    <div className="icons">
                      <svg
                        width={36}
                        height={36}
                        viewBox="0 0 36 36"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_1523_44755)">
                          <path
                            d="M8.24026 35.2271C7.78238 35.2271 7.32901 35.0831 6.93863 34.7985C6.60484 34.5576 6.34612 34.2271 6.19241 33.8452C6.03871 33.4633 5.99631 33.0457 6.07013 32.6408L7.73626 22.9151L0.667882 16.0391C0.370511 15.7505 0.160689 15.3838 0.0625688 14.9811C-0.0355513 14.5785 -0.017981 14.1563 0.113257 13.7633C0.239719 13.3729 0.473671 13.0261 0.788271 12.7626C1.10287 12.4992 1.48537 12.3297 1.89188 12.2738L11.6513 10.8506L16.0253 1.99801C16.3965 1.24426 17.1548 0.772888 18.0008 0.772888C18.8468 0.772888 19.6039 1.24314 19.9774 1.99914L24.3503 10.8506L34.1153 12.2749C34.9421 12.3908 35.6228 12.9611 35.8883 13.7633C36.0194 14.1556 36.0372 14.5769 35.9397 14.9788C35.8422 15.3808 35.6333 15.7471 35.337 16.0358L31.98 19.2904C31.7641 19.4884 31.4795 19.5944 31.1867 19.5859C30.8939 19.5773 30.616 19.4549 30.412 19.2447C30.2081 19.0344 30.0942 18.7529 30.0945 18.4599C30.0949 18.167 30.2095 17.8858 30.414 17.676L33.7665 14.4248L23.4413 12.9926C23.2609 12.9665 23.0895 12.897 22.9419 12.79C22.7944 12.683 22.675 12.5417 22.5941 12.3784L17.9591 2.99589L13.4063 12.3784C13.3255 12.5416 13.2063 12.6828 13.0589 12.7898C12.9116 12.8967 12.7405 12.9664 12.5603 12.9926L2.21026 14.5001L9.72863 21.7159C9.8597 21.8429 9.9579 21.9999 10.0147 22.1734C10.0716 22.3469 10.0854 22.5315 10.0549 22.7115L8.28638 33.03L17.4754 28.1093C17.6474 28.0185 17.84 27.9739 18.0345 27.9798C18.2289 27.9858 18.4184 28.042 18.5846 28.143C19.1145 28.467 19.3125 29.1758 18.9896 29.7068C18.8209 29.9824 18.5599 30.1658 18.2741 30.2321L9.26513 34.9718C8.94917 35.1397 8.59693 35.2277 8.23913 35.2283L8.24026 35.2271Z"
                            fill="#1C1C1E"
                            stroke="white"
                            strokeWidth="0.5"
                          />
                          <path
                            d="M28.125 36C23.7825 36 20.25 32.4675 20.25 28.125C20.25 23.7825 23.7825 20.25 28.125 20.25C32.4675 20.25 36 23.7825 36 28.125C36 32.4675 32.4675 36 28.125 36ZM28.125 22.5C25.0234 22.5 22.5 25.0234 22.5 28.125C22.5 31.2266 25.0234 33.75 28.125 33.75C31.2266 33.75 33.75 31.2266 33.75 28.125C33.75 25.0234 31.2266 22.5 28.125 22.5Z"
                            fill="#1C1C1E"
                            stroke="white"
                            strokeWidth="0.5"
                          />
                          <path
                            d="M28.125 31.5C27.8266 31.5 27.5405 31.3815 27.3295 31.1705C27.1185 30.9595 27 30.6734 27 30.375V25.875C27 25.5766 27.1185 25.2905 27.3295 25.0795C27.5405 24.8685 27.8266 24.75 28.125 24.75C28.4234 24.75 28.7095 24.8685 28.9205 25.0795C29.1315 25.2905 29.25 25.5766 29.25 25.875V30.375C29.25 30.6734 29.1315 30.9595 28.9205 31.1705C28.7095 31.3815 28.4234 31.5 28.125 31.5Z"
                            fill="#1C1C1E"
                            stroke="white"
                            strokeWidth="0.5"
                          />
                          <path
                            d="M30.375 29.25H25.875C25.5766 29.25 25.2905 29.1315 25.0795 28.9205C24.8685 28.7095 24.75 28.4234 24.75 28.125C24.75 27.8266 24.8685 27.5405 25.0795 27.3295C25.2905 27.1185 25.5766 27 25.875 27H30.375C30.6734 27 30.9595 27.1185 31.1705 27.3295C31.3815 27.5405 31.5 27.8266 31.5 28.125C31.5 28.4234 31.3815 28.7095 31.1705 28.9205C30.9595 29.1315 30.6734 29.25 30.375 29.25Z"
                            fill="#1C1C1E"
                            stroke="white"
                            strokeWidth="0.5"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1523_44755">
                            <rect width={36} height={36} fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div className="counter-box one">
                      <div className="title-count fw-6 fs-16 text-color-4">
                        Closed
                      </div>
                      <div className="count-number">
                        <div
                          className="number number-one"
                          data-speed={2000}
                          data-to={6}
                          data-inviewport="yes"
                        >
                          00
                        </div>
                      </div>
                    </div>
                  </div> 
                  <div className="box tf-counter flex bg-white">
                    <div className="icons">
                      <svg
                        width={36}
                        height={36}
                        viewBox="0 0 36 36"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_1523_44765)">
                          <path
                            d="M32.121 0H3.87893C1.74009 0 0 1.74002 0 3.87886V27.6023C0 29.7411 1.74009 31.4812 3.87893 31.4812H13.0444L17.2541 35.691C17.3521 35.789 17.4683 35.8667 17.5963 35.9197C17.7243 35.9727 17.8614 36 17.9999 36C18.1384 36 18.2756 35.9727 18.4036 35.9197C18.5315 35.8667 18.6478 35.789 18.7457 35.691L22.9556 31.4812H32.1211C34.26 31.4812 36.0001 29.7411 36.0001 27.6023V3.87886C36 1.74002 34.2599 0 32.121 0ZM33.8906 27.6023C33.8906 28.578 33.0968 29.3719 32.121 29.3719H22.5187C22.2389 29.3719 21.9707 29.4829 21.773 29.6808L17.9999 33.4538L14.227 29.6808C14.1291 29.5829 14.0128 29.5052 13.8849 29.4521C13.7569 29.3991 13.6197 29.3719 13.4812 29.3719H3.87893C2.9032 29.3719 2.10938 28.578 2.10938 27.6023V3.87886C2.10938 2.90313 2.9032 2.10938 3.87893 2.10938H32.1211C33.0968 2.10938 33.8906 2.90313 33.8906 3.87886V27.6023Z"
                            fill="#1C1C1E"
                            stroke="white"
                            strokeWidth="0.7"
                          />
                          <path
                            d="M27.0589 12.1321L21.4524 11.3171L18.9444 6.23621C18.8573 6.05976 18.7225 5.9112 18.5554 5.80732C18.3883 5.70345 18.1954 5.6484 17.9986 5.64841C17.8018 5.64841 17.609 5.70347 17.4419 5.80736C17.2747 5.91125 17.14 6.05982 17.0529 6.23628L14.5451 11.3171L8.93814 12.1321C8.7434 12.1604 8.56046 12.2426 8.41 12.3694C8.25955 12.4963 8.14759 12.6627 8.08678 12.8499C8.02596 13.037 8.01873 13.2375 8.06589 13.4285C8.11305 13.6196 8.21272 13.7936 8.35364 13.931L12.4111 17.8859L11.4534 23.4702C11.4202 23.6641 11.4419 23.8635 11.5161 24.0458C11.5902 24.228 11.7139 24.3859 11.8731 24.5016C12.0323 24.6172 12.2207 24.6861 12.4169 24.7003C12.6132 24.7145 12.8095 24.6735 12.9837 24.582L17.9986 21.9455L23.014 24.582C23.1653 24.6616 23.3337 24.7032 23.5046 24.7032H23.509C24.0902 24.7017 24.5609 24.23 24.5609 23.6485C24.5609 23.5675 24.5517 23.4886 24.5345 23.4128L23.5861 17.8859L27.6434 13.9311C27.7844 13.7937 27.8841 13.6197 27.9313 13.4286C27.9784 13.2376 27.9712 13.0371 27.9104 12.8499C27.8496 12.6628 27.7376 12.4963 27.5872 12.3694C27.4367 12.2426 27.2537 12.1603 27.0589 12.1321ZM21.7166 16.7623C21.5941 16.8817 21.5025 17.0291 21.4497 17.1917C21.3968 17.3544 21.3843 17.5274 21.4133 17.696L22.1039 21.7204L18.4894 19.8204C18.338 19.7408 18.1696 19.6993 17.9986 19.6993C17.8276 19.6993 17.6592 19.7408 17.5078 19.8204L13.8937 21.7204L14.5839 17.6959C14.6128 17.5274 14.6003 17.3543 14.5474 17.1917C14.4946 17.0291 14.403 16.8818 14.2806 16.7624L11.3564 13.9122L15.3972 13.3248C15.5664 13.3002 15.7271 13.2349 15.8654 13.1344C16.0037 13.0339 16.1156 12.9012 16.1912 12.7479L17.9987 9.08598L19.8063 12.748C19.882 12.9013 19.9938 13.0339 20.1322 13.1344C20.2705 13.2349 20.4312 13.3003 20.6004 13.3248L24.6408 13.9122L21.7166 16.7623Z"
                            fill="#1C1C1E"
                            stroke="white"
                            strokeWidth="0.7"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1523_44765">
                            <rect width={36} height={36} fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div className="counter-box one">
                      <div className="title-count fw-6 fs-16 text-color-4">
                        Reviews
                      </div>
                      <div className="count-number">
                        <div
                          className="number number-one"
                          data-speed={2000}
                          data-to={6}
                          data-inviewport="yes"
                        >
                          10
                        </div>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
              <div className="col-lg-3" />
            </div>
          </div>
        </section> 
        <section className="flat-dashboard">
          <div className="container7">
            <div className="row">
              <div className="col-lg-12 flex post-col">
                <div
                  className="tf-new-listing"
                  style={{ width: "100%",marginRight:'0' }}
                >
                  <div className="new-listing bg-white">
                    <h3 className="titles">New leads</h3>

                    <div className="sub-text fs-12 lh-18">
                      <span className="one font-2 fw-7">{count} </span>
                      <span>results found</span>
                    </div>
                    <div className="table-content">
                      <div className="wrap-listing table-responsive">
                        {Leads?.length > 0 ? (
                          <table>
                            <thead>
                              <tr>
                                <th className="fw-6">Buyer Details</th>
                                <th className="fw-6 ">Conversational</th>
                                <th className="fw-6">Hold</th>
                                <th className="fw-6">Fake</th>
                                <th className="fw-6">Sold Out</th>
                                <th className="fw-6">Cusrrent Status &nbsp;&nbsp;</th>
                              </tr>
                            </thead>
                            <tbody>
                            {Leads?.map((data)=>{
return(
  <tr className="file-delete">
                                    <td>
                                    <div class="image-box flex align-center">
                                        <div class="">
                                          {data?.user_image ? 
                                            <img style={{height:'66px', width:'65px',borderRadius:'50px'}}  src={`http://157.66.191.24:3089/uploads/`+ data?.user_image}/> :                                             <img  src="https://themesflat.co/html/dreamhomehtml/assets/images/author/author-testimonial.jpg"/> }
                                            </div> 
                                            <div class="content">
                                                <h4 class="link-style-1"><a href="#">{data?.user_name}</a> </h4>
                                                <div class="text-date"><p class="p-12 text-color-2 lh-18">
                                                    Mobile number: {data?.mobile_no}<br/>
                                                    Inquiry date: March 22, 2024</p>
                                                </div>

                                            </div>
                                            </div>
                                     
                                    </td>
                                    <td className="text-center">
                                      <div className="status-wrap">
                                        
                                          <div onClick={(()=>{UpdateLeads(data?.userId,"2")})} className="button-status fs-12 fw-6 lh-18 style-1">
                                            No
                                          </div>
                                          </div>
                                          </td>
                                          <td className="text-center">
                                      <div className="status-wrap">
                                        
                                          <div onClick={(()=>{UpdateLeads(data?.userId,"3")})} className="button-status fs-12 fw-6 lh-18 style-2">
                                          No
                                          </div>
                                          </div></td>
                                          <td className="text-center">
                                      <div className="status-wrap">
                                        
                                          <div onClick={(()=>{UpdateLeads(data?.userId,"3")})} className="button-status fs-12 fw-6 lh-18 style-1">
                                          No
                                          </div>
                                          </div></td>
                                          <td className="text-center">
                                      <div className="status-wrap">
                                        
                                          <div onClick={(()=>{UpdateLeads(data?.userId,"4")})} className="button-status fs-12 fw-6 lh-18 style-2">
                                          No
                                          </div>
                                          </div></td>
                                          <td className="text-center">
                                      <div className="status-wrap">
                                        
                                      {data?.lead_status ==
                                        "1" ? (
                                          <div className="button-status fs-12 fw-6 lh-18">
                                            Pending
                                          </div>
                                        ) : data?.lead_status ==
                                        "2" ? (
                                          <div className="button-status fs-12 fw-6 lh-18 style-1">
                                            Hold
                                          </div>) : data?.lead_status ==
                                        "3" ? (
                                          <div className="button-status fs-12 fw-6 lh-18 style-1">
                                            Fake
                                          </div>) :(
                                          <div className="button-status fs-12 fw-6 lh-18 style-1">
                                            Sold
                                          </div>
                                        )}
                                          </div></td>
                                         
                                        
                                   
                                  </tr>
)
                            })
                          }
                                  
                                  
                                
                            </tbody>
                          </table>
                        ) : (
                          <div style={{ textAlign: "center" }}>
                            <img
                       width={100}
                       src="https://themesflat.co/html/dreamhomehtml/assets/images/icon/footer-icon-2.png"
                       alt="No Property Found"
                     />
                            <h3>No listing post</h3>
                          </div>
                        )}
                      </div>
                      
                    </div>
                  </div>
                </div>
               
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Leads;


