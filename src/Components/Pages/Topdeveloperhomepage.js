import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage'

const Topdeveloperhomepage = () => {

  const [TopDevelopers, setTopDevelopers] = useState();
  const Navigate = useNavigate();

  let cityes = secureLocalStorage.getItem("cityname");
  useEffect(() => {
    GetallPdevelopers();
  }, [cityes]);

  const GetallPdevelopers = () => {
    const data = {
      city_name: cityes ? cityes : "",
    };
   
    axios
      .post("http://157.66.191.24:3089/website/get_city_developer",data)
      .then((response) => {

        setTopDevelopers(response.data.data);
      })
      .catch((error) => {
       
      });
  };

  return (
    <section style={{background:'#faf8ff'}} className="tf-section2 flat-agencies  flat-property style2 pt-5 pb-4">
        <div className="container6">
          <div className="row flex">                      
            <div className="col-lg-12">
            <div className="heading-section center mb-4">
              <h2 style={{ fontSize: 26, lineHeight: "normal", color: "#333" }}>
              Top Developers in {secureLocalStorage.getItem("cityname")}
              </h2>
             
            </div>
            </div> 
            {TopDevelopers?.length > 0 ?  
  TopDevelopers?.slice(0, 6)?.map((data) => {
    return (
            <div style={{cursor:'pointer',}} className="col-lg-4 col-md-6" onClick={(()=>{secureLocalStorage.setItem("agencisesId",data.developerId)
              Navigate("/AgenciesDetails")
            })}>
              <div className="box box-agencies hover-img2" style={{background:'#fff'}}>
                <div className="images relative img-style2">
                  {data?.user_image ?
                <img style={{height:'201px',width:'100%',objectFit:'fill'}} className="img2" src={`http://157.66.191.24:3089/uploads/`+data?.user_image} alt="images" />
                : <img className="img2" src="assets/images/img-box/agencies-9.jpg" alt="images" />}  {/* <img className="img2" src="assets/images/img-box/agencies-9.jpg" alt="images" /> */}
                </div>
                <div className="icon-brand">
                {data?.user_image ?
                  <img style={{height:'90px',width:'90px',objectFit:'fill'}}  src={`http://157.66.191.24:3089/uploads/`+data?.user_image} alt="images" />
                : <img src="assets/images/img-box/agencies-brand-1.jpg" alt="images" />}
                  </div>
                <div className="content">
                  <div className="title-group">
                    <h3 className="link-style-1 text-capitalize"><Link to="/AgenciesDetails">{data?.user_name}</Link></h3>
                    <p className>
{data?.projectCount} Projects by {data?.user_name} in {data?.city_name}</p>
                  </div>
                 
                 
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
  )
}

export default Topdeveloperhomepage
