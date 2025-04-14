import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

const Toplocalty = () => {
  const [Property, setProperty] = useState();
  const Navigate = useNavigate();

  let cityes = secureLocalStorage.getItem("cityname");
  useEffect(() => {
    GetallProperty();
  }, [cityes]);

  const GetallProperty = () => {
    const data = {
      city_name: cityes ? cityes : "",
    };
   
    axios
      .post("http://157.66.191.24:3089/website/get_top_locality",data)
      .then((response) => {

        setProperty(response.data.data);
      })
      .catch((error) => {
       
      });
  };

  return (
    <section className="flat-blog home2 pt-0 mb-5 pt-5">
      <div className="container6">
        <div className="row">
          <div className="col-lg-12">
            <div className="heading-section center mb-4">
              <h2
                style={{
                  fontSize: 26,
                  lineHeight: "normal",
                  color: "#333",
                }}
              >
                Top Localities in Cities
              </h2>
            </div>
          </div>

          {Property?.length > 0  ?
          Property?.slice(0, 4)?.map((data) => {
            return (
              <div onClick={(()=>{secureLocalStorage.setItem("ListingId",data?.propertyId)
                Navigate("/PropertyDetail")
              })}
                className="col-lg-3 col-md-3 box box-agencies hover-img2 "
                style={{
                  
                  
                  borderRadius: 16,
                }}
              >
                <div className="box hover-img">
                  <div className="images img-style relative">
                    <img
                      style={{ height: "182px" }}
                      src={
                        `http://157.66.191.24:3089/uploads/` + data?.images[0]
                      }
                      alt="images"
                    />
                    <div className="sub-box flex align-center fs-10 fw-6">
                      <div className="title-1 text-color-3">
                        {data?.city_name}
                      </div>
                      <Link className="title-2 text-color-3 star flex">
                        {data?.rating}{" "} <svg className="mt-1" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style={{enableBackground: 'new 0 0 512 512'}} xmlSpace="preserve"><g>	<g>		<polygon points="512,197.816 325.961,185.585 255.898,9.569 185.835,185.585 0,197.816 142.534,318.842 95.762,502.431 			255.898,401.21 416.035,502.431 369.263,318.842 		" />	</g></g><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /></svg>
      
                      </Link>
                    </div>
                  </div>
                  <div className="content">
                    <h3 className="link-style-1">
                      <Link 
                        to='/ProjectsList'
                        onClick={() => {
                          secureLocalStorage.setItem(
                            "propertysid",
                            data?.propertyId
                          );
                        }}
                      >
                        {data?.locality} {data?.city_name}
                      </Link>
                    </h3>
                  </div>
                </div>
              </div>
            );
          }) :  <div style={{ textAlign: "center" ,marginBottom:'30px' }}>
          <h2>
          <img
                       width={100}
                       src="https://themesflat.co/html/dreamhomehtml/assets/images/icon/footer-icon-2.png"
                       alt="No Property Found"
                     />
          </h2>
          <h3 className="mt-3">No Data Found</h3>
        </div>}
        </div>
      </div>
    </section>
  );
};

export default Toplocalty;
