import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const About = () => {

 const [About, setAbout] = useState();

useEffect(() => {
  window.scrollTo(0, 0);
  GetAbout();
}, [0]);

const GetAbout = () => {
 

  axios
    .get(`${process.env.REACT_APP_API_KEY}website/about_us`)
    .then((res) => {
      setAbout(res?.data?.data[0]);
    })
    .catch((error) => {});
};
  return (
    <>
<div>
  
  <section className="flat-title flat-title52">
    <div className="container6">
      <div className="row">
        <div className="col-lg-12">
          <div className="title-inner style">
            <div className="title-group fs-12">
              <Link className="home fw-6 text-color-3" to="/">
                Home
              </Link>
              <span>About</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  <section className="flat-about" style={{marginTop: '-100px', padding: '60px 0 30px'}}>
    <div className="container6">
      <div className="row">
        <div className="col-lg-12 col-md-12">
          <div className="heading-about">
            <h2 style={{marginBottom: 10}}></h2>
            <h4>
              {About?.title}
            </h4>
            <div className>
              
              

              <p
                                className="font-2 fw-5 font-italic text-color-2"
                                dangerouslySetInnerHTML={{
                                  __html: About?.description,
                                }}
                              />
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

export default About;
