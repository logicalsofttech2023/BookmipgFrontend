import React, { useEffect, useState } from "react";
import AgentSidebar from "../NavFooter/AgentSidebar";
import { Link, Navigate, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import swal from "sweetalert";

import toast, { Toaster } from "react-hot-toast";
const Agentcitylistinglead = () => {
  const [Listingdata, setListingdata] = useState();
  const [count, setcount] = useState();
  const [Dashboarddata, setDashboarddata] = useState();
  const [Leads, setLeads] = useState();
  const Navigate = useNavigate();
  let loginid = secureLocalStorage.getItem("loginuserid");

  useEffect(() => {
    window.scrollTo(0, 0);
    GetDashboard();
  }, [0]);
  const GetDashboard = () => {
    const data = {
      userId: loginid,
    };
    axios
      .post(`${process.env.REACT_APP_API_KEY}website/dashboard`, data)
      .then((res) => {
        setDashboarddata(res.data);
      })
      .catch((error) => {});
  };
  useEffect(() => {
    GetProperty();
  }, [0]);

  const GetProperty = () => {
    const data = {
      userId: loginid,
    };

    axios
      .post(`${process.env.REACT_APP_API_KEY}website/get_all_property_by_agent`, data)

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
             `${process.env.REACT_APP_API_KEY}website/delete_get_property/${item}`
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
            property_approve_status: "3",
          };

          // let options = {
          //   headers: {
          //     token: token,
          //   },
          // };
          axios
            .post(
              `${process.env.REACT_APP_API_KEY}website/update_property_status`,
              Data
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

  const Alertfor = () => {
    swal("Error! Your listing can not be sold!", {
      icon: "error",
    });
  };

  const [idd, setIdd] = useState(localStorage.getItem("GetLeadss"));

  useEffect(() => {
    if (idd) {
      GetLeads();
    }
  }, [idd]);

  const GetLeads = () => {
    const data = {
      propertyId: idd,
    };

    axios
      .post(`${process.env.REACT_APP_API_KEY}website/get_lead_property`, data)
      .then((res) => {
        setLeads(res?.data?.data);
      })
      .catch((error) => {});
  };

  const handleClick = (id) => {
    localStorage.setItem("GetLeadss", id);
    setIdd(id);
  };

  const UpdateLeads = (user, item, idd) => {
    const data = {
      userId: user,
      propertyId: idd,
      lead_status: item,
    };

    axios
      .post(`${process.env.REACT_APP_API_KEY}website/update_lead_status`, data)
      .then((res) => {
        GetLeads();
        toast.success(res.data.msg);
      })
      .catch((error) => {});
  };
  return (
    <>
      <Toaster />
      <AgentSidebar />
      <div className="dashboard__content bg-23">
        <section className="flat-title2">
          <div className="container7">
            <div className="row">
              <div className="col-lg-12">
                <div className="title-group fs-30 lh-45 fw-7">
                  My City Listing & Leads
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="flat-dashboard">
          <div className="container7">
            <div className="row">
              <div className="col-lg-6 flex post-col">
                <div
                  className="tf-new-listing"
                  style={{
                    width: "100%",
                    marginRight: 0,
                    overflow: "scroll",
                    height: "450px",
                    overflowX: "hidden",
                    scrollbarWidth: "none",
                  }}
                >
                  <div className="new-listing bg-white">
                    <div className="table-content">
                      <div className="wrap-listing table-responsive">
                        {Listingdata?.length > 0 ? (
                          <table>
                            <tbody>
                              {Listingdata?.map((data) => {
                                return (
                                  <tr className="file-delete">
                                    <td>
                                      <div className="candidates-wrap flex">
                                        <div style={{cursor:'pointer'}} onClick={() => {
                                                secureLocalStorage.setItem(
                                                  "ListingId",
                                                  data?.propertyId
                                                );
                                                Navigate("/PropertyDetail")
                                              }}
                                              className="images">
                                          {data?.images?.length > 0 ? (
                                            <img
                                              style={{
                                                height: "100px",
                                                width: "168px",
                                                borderRadius: "5px",
                                              }}
                                              src={
                                                `http://157.66.191.24:3089/uploads/` +
                                                data?.images[0]
                                              }
                                              alt="images"
                                            />
                                          ) : (
                                            <img
                                              src="assets/images/house/dashboard-house-2.jpg"
                                              alt="images"
                                            />
                                          )}
                                        </div>
                                        <div className="content">
                                          <h4 className="link-style-1 text-capitalize">
                                            <Link
                                              onClick={() => {
                                                secureLocalStorage.setItem(
                                                  "ListingId",
                                                  data?.propertyId
                                                );
                                              }}
                                              to="/PropertyDetail"
                                            >
                                              {data?.building_name}
                                            </Link>
                                          </h4>
                                          <div className="text-date">
                                            <p className="p-12 text-color-2 lh-18">
                                              Posting date:{" "}
                                              {data?.updatedAt?.slice(0, 10)}
                                            </p>
                                          </div>
                                          <div className="money fs-16 fw-6 text-color-3">
                                            ₹
                                            {data?.price
                                              ? `${(
                                                  data?.price / 100000
                                                )?.toFixed(2)} L`
                                              : `${(
                                                  data?.rent_amount / 100000
                                                )?.toFixed(2)} L`}
                                          </div>
                                          <div className="status-wrap mt-1">
                                            {data?.lead_count > 0 ? (
                                              <Link
                                                onClick={() =>
                                                  handleClick(data?.propertyId)
                                                }
                                                to="#"
                                              >
                                                <div className="button-status fs-12 fw-6 lh-18 ">
                                                  {data?.lead_count} Leads
                                                </div>
                                              </Link>
                                            ) : (
                                              <Link to="#">
                                                <div className="button-status fs-12 fw-6 lh-18 style-1">
                                                  {data?.lead_count} Leads
                                                </div>
                                              </Link>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        ) : (
                          <div style={{ textAlign: "center" }}>
                        <img className="mt-3"
                       width={100}
                       src="https://themesflat.co/html/dreamhomehtml/assets/images/icon/footer-icon-2.png"
                       alt="No Property Found"
                     />
                            <h3>No listing post in your city</h3>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 flex post-col">
                <div
                  className="tf-new-listing"
                  style={{
                    width: "100%",
                    marginRight: 0,
                    overflow: "scroll",
                    height: "450px",
                    overflowX: "hidden",
                    scrollbarWidth: "none",
                  }}
                >
                  <div className="new-listing bg-white">
                    <div className="table-content">
                      <div className="wrap-listing table-responsive">
                        {Leads?.length > 0 ? (
                          <table>
                            <thead>
                              <tr>
                                <th className="fw-6">Buyer Details</th>
                                <th className="fw-6">Update Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {Leads?.map((data) => {
                                return (
                                  <tr className="file-delete">
                                    <td>
                                      <div class="image-box flex align-center">
                                        <div
                                          class="images"
                                          style={{ width: "60px" }}
                                        >
                                          {data?.user_image ? (
                                            <img
                                              style={{
                                                height: "60px",
                                                width: "60px",
                                                borderRadius: "50px",
                                              }}
                                              src={
                                                `http://157.66.191.24:3089/uploads/` +
                                                data?.user_image
                                              }
                                            />
                                          ) : (
                                            <img src="https://themesflat.co/html/dreamhomehtml/assets/images/author/author-testimonial.jpg" />
                                          )}
                                        </div>
                                        <div class="content">
                                          <h4 class="link-style-1 text-capitalize">
                                            <a href="#">{data?.user_name}</a>{" "}
                                          </h4>
                                          <div class="text-date">
                                            <p class="p-12 text-color-2 lh-18">
                                              Mobile number : {data?.mobile_no}
                                              <br />
                                              Inquiry date : March 22, 2024
                                              <br />
                                              Lead Status :{" "}
                                              {data?.lead_status == "1" ? (
                                                <span className="fs-12 fw-6">
                                                  Lead is Pending
                                                </span>
                                              ) : data?.lead_status == "2" ? (
                                                <span className="fs-12 fw-6">
                                                  Lead is Hold
                                                </span>
                                              ) : data?.lead_status == "3" ? (
                                                <span className="fs-12 fw-6">
                                                  Lead is Fake
                                                </span>
                                              ) : (
                                                <span className="fs-12 fw-6">
                                                  Lead is Sold
                                                </span>
                                              )}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="box box-1 flex">
                                        <div
                                          className="inner-1"
                                          style={{ cursor: "pointer" }}
                                        >
                                          {" "}
                                          <div
                                            title="the listing is on hold"
                                            onClick={() => {
                                              UpdateLeads(
                                                data?.userId,
                                                "2",
                                                data.propertyId
                                              );
                                            }}
                                            className="button-status fs-12 fw-6 lh-18 style-1 mb-1"
                                          >
                                            Hold
                                          </div>
                                          <div
                                            title="the listing is fake"
                                            onClick={() => {
                                              UpdateLeads(
                                                data?.userId,
                                                "3",
                                                data.propertyId
                                              );
                                            }}
                                            className="mb-1 button-status fs-12 fw-6 lh-18 style-2"
                                          >
                                            Fake
                                          </div>
                                          <div
                                            title="Sold Out the listing"
                                            onClick={() => {
                                              UpdateLeads(
                                                data?.userId,
                                                "4",
                                                data.propertyId
                                              );
                                            }}
                                            className="mb-1 button-status fs-12 fw-6 lh-18 style-1"
                                          >
                                            Sold
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        ) : (
                          <div style={{ textAlign: "center" }}>
                             <img className="mt-3"
                       width={100}
                       src="https://themesflat.co/html/dreamhomehtml/assets/images/icon/footer-icon-2.png"
                       alt="No Property Found"
                     />
                            <h3>No listing select</h3>
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

export default Agentcitylistinglead;
