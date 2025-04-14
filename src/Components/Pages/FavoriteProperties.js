import React, { useEffect, useState } from "react";
import AgentSidebar from "../NavFooter/AgentSidebar";
import { Link, Navigate, useNavigate } from "react-router-dom";

import axios from "axios";
import swal from "sweetalert";

import toast, { Toaster } from "react-hot-toast";
const FavoriteProperties = () => {
    let loginid = localStorage.getItem("loginuserid");
    const Navigate = useNavigate();
    const [Listingdata, setListingdata] = useState();
  
    const [count, setcount] = useState();
    useEffect(() => {
      window.scrollTo(0, 0);
      GetProperty();
    }, [0]);
  
    const GetProperty = () => {
      const data = {
        userId: loginid,
      };
      axios
        .post(
          "  http://157.66.191.24:3089/website/get_favourite_property_list",
          data
        )
        .then((res) => {
          setListingdata(res?.data?.data?.reverse());
          setcount(res?.data?.data?.length);
        })
        .catch((error) => {});
    };
  
    const addFavorite = (item) => {
      const data = {
        userId: loginid,
        propertyId: item,
        lead_status: "1",
        favourite_status: "0",
      };
  
      axios
        .post(`http://157.66.191.24:3089/website/add_lead_property`, data)
        .then((res) => {
          GetProperty();
  
          toast.success("Favorite status updated");
        })
        .catch(() => {});
    };
  return (
    <>
      <Toaster />
      <AgentSidebar />
      <div className="dashboard__content bg-23">
        <section className="flat-title2 ">
          <div className="container7">
            <div className="row">
              <div className="col-lg-12">
                <div className="title-group fs-30 lh-45 fw-7">My Properties</div>
              </div>
            </div>
          </div>
        </section>
             <section className="flat-dashboard">
          <div className="container7">
            <div className="row">
              <div className="col-lg-12 flex post-col">
                <div
                  className="tf-new-listing"
                  style={{ width: "100%", marginRight: 0 , overflow:'scroll',height:'450px', overflowX:'hidden',scrollbarWidth:'none'}}
                >
                <div className="new-listing bg-white">
                    <h3 className="titles">Favorite listing</h3>
                    <div className="sub-text fs-12 lh-18">
                      <span className="one font-2 fw-7">{count}</span>{" "}
                      <span>results found</span>
                    </div>
                    <div className="table-content">
                      <div
                        className="wrap-listing table-responsive"
                        // style={{
                        //   overflow: "scroll",
                        //   height: "500px",
                        //   overflowX: "hidden",
                        //   scrollbarWidth: "none",
                        // }}
                      >
                        {Listingdata?.length > 0 ? (
                          <table>
                            <tbody>
                              {Listingdata?.map((data) => {
                                return (
                                  <tr className="file-delete ">
                                    <td>
                                      <div
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                          localStorage.setItem(
                                            "ListingId",
                                            data?.propertyId
                                          );
                                          Navigate("/PropertyDetail");
                                        }}
                                        className="candidates-wrap flex"
                                      >
                                        <div className="images">
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
                                            <Link to="">
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
                                        </div>
                                      </div>
                                    </td>

                                    <td>
                                      <div className="status-wrap">
                                        <div
                                          onClick={() =>
                                            addFavorite(data?.propertyId)
                                          }
                                          style={{ cursor: "pointer" }}
                                          className="button-status fs-12 fw-6 lh-18"
                                        >
                                          Un-favorite
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        ) : (
                          <div
                            style={{ textAlign: "center", marginTop: "50px" }}
                          >
                            <img
                              width={100}
                              src="https://themesflat.co/html/dreamhomehtml/assets/images/icon/footer-icon-2.png"
                              alt="No Property Found"
                            />
                            <h3>No favorite post</h3>
                            <div class="button-footer center mt-3">
                              <Link class="sc-button" to="/PropertyListSidebar">
                                <span>See Properties list</span>
                              </Link>
                            </div>
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

export default FavoriteProperties;




