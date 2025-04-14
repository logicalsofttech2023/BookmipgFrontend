import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import localStorage from 'react-secure-storage';

const Footer = () => {
  let role = localStorage.getItem("roleType");
  const [Cointactusdata,setCointactusdata] = useState();

  useEffect(()=>{
    GetContactUs()
  },[0])
  const GetContactUs = () =>{


axios.get("http://157.66.191.24:3089/website/get_admin_contact_us").then((res)=>{
  setCointactusdata(res?.data?.data[0]);
  
}).catch((error)=>{})
  }

  return (
    <>
     {/* Footer */}
<footer id="footer" className="clearfix home" style={{padding: '40px 0 15px'}}>
  <div className="container6">
    <div className="row">
      {/* <div className="col-lg-6 col-md-12 col-12" style={{maxHeight: 210}}>
        <div className="group-icon">
          <div className="box-icons flex">
            <div className="images">
              <img src="assets/images/icon/footer-icon-1.png" alt="images" />
            </div>
            <div className="content">
              <div className="title-icon fs-30 lh-45 fw-7 text-color-2" style={{marginBottom:'4px'}}>You need a house</div>
              <p className="font-2 text-color-2">Tell us your needs, we will give you thousands of suggestions for the Justthing.</p>
            </div>
          </div>
          <div className="button-footer center">
            <Link className="sc-button" to="/ContactUs">
              <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.25 6.75C2.25 15.034 8.966 21.75 17.25 21.75H19.5C20.0967 21.75 20.669 21.5129 21.091 21.091C21.5129 20.669 21.75 20.0967 21.75 19.5V18.128C21.75 17.612 21.399 17.162 20.898 17.037L16.475 15.931C16.035 15.821 15.573 15.986 15.302 16.348L14.332 17.641C14.05 18.017 13.563 18.183 13.122 18.021C11.4849 17.4191 9.99815 16.4686 8.76478 15.2352C7.53141 14.0018 6.58087 12.5151 5.979 10.878C5.817 10.437 5.983 9.95 6.359 9.668L7.652 8.698C8.015 8.427 8.179 7.964 8.069 7.525L6.963 3.102C6.90214 2.85869 6.76172 2.6427 6.56405 2.48834C6.36638 2.33397 6.1228 2.25008 5.872 2.25H4.5C3.90326 2.25 3.33097 2.48705 2.90901 2.90901C2.48705 3.33097 2.25 3.90326 2.25 4.5V6.75Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Contact Seller</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="col-lg-6 col-md-12 col-12" style={{maxHeight: 210}}>
        <div className="group-icon group-2">
          <div className="box-icons flex">
            <div className="images">
              <img src="assets/images/icon/footer-icon-2.png" alt="images" />
            </div>
            <div className="content">
              <div className="title-icon fs-30 lh-45 fw-7 text-color-2">Sell your house</div>
              <p className="font-2 text-color-2">We will connect you to thousands of people who need to buy a home.</p>
            </div>
          </div>
          <div className="button-footer center">
            <Link className="sc-button" to={role === "Agent" ? "/AgentProperty" : "/DeshBoardPropertys"}>
              <svg width={25} height={24} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.25 15.75V15H11.375C10.7547 15 10.25 14.4953 10.25 13.875V12.375C10.25 11.7547 10.7547 11.25 11.375 11.25H11.75V10.5H13.25V11.25H14C14.1989 11.25 14.3897 11.329 14.5303 11.4697C14.671 11.6103 14.75 11.8011 14.75 12C14.75 12.1989 14.671 12.3897 14.5303 12.5303C14.3897 12.671 14.1989 12.75 14 12.75H11.75V13.5H13.625C14.2453 13.5 14.75 14.0047 14.75 14.625V16.125C14.75 16.7453 14.2453 17.25 13.625 17.25H13.25V18H11.75V17.25H11C10.8011 17.25 10.6103 17.171 10.4697 17.0303C10.329 16.8897 10.25 16.6989 10.25 16.5C10.25 16.3011 10.329 16.1103 10.4697 15.9697C10.6103 15.829 10.8011 15.75 11 15.75H13.25Z" fill="white" />
                <path d="M22.469 10.6447L14.315 2.96925C13.8234 2.50736 13.1742 2.25024 12.4996 2.25024C11.825 2.25024 11.1759 2.50736 10.6842 2.96925L8.74998 4.791V3C8.74998 2.80109 8.67096 2.61032 8.53031 2.46967C8.38966 2.32902 8.19889 2.25 7.99998 2.25H4.99998C4.80107 2.25 4.6103 2.32902 4.46965 2.46967C4.329 2.61032 4.24998 2.80109 4.24998 3V9.027L2.55273 10.6252C2.03748 11.0722 1.86348 11.784 2.10798 12.4387C2.34873 13.0837 2.93823 13.5 3.60948 13.5H4.24998V21C4.24998 21.1989 4.329 21.3897 4.46965 21.5303C4.6103 21.671 4.80107 21.75 4.99998 21.75H20C20.1989 21.75 20.3897 21.671 20.5303 21.5303C20.671 21.3897 20.75 21.1989 20.75 21V13.5H21.389C22.061 13.5 22.6512 13.083 22.892 12.438C23.1357 11.7832 22.961 11.0715 22.469 10.6447ZM5.74998 3.75H7.24998V6.2025L5.74998 7.61475V3.75ZM21.4865 11.9138C21.4542 12 21.4047 12 21.389 12H20C19.8011 12 19.6103 12.079 19.4697 12.2197C19.329 12.3603 19.25 12.5511 19.25 12.75V20.25H5.74998V12.75C5.74998 12.5511 5.67096 12.3603 5.53031 12.2197C5.38966 12.079 5.19889 12 4.99998 12H3.60948C3.59373 12 3.54498 12 3.51273 11.9138C3.50022 11.8834 3.49792 11.8498 3.50617 11.818C3.51442 11.7862 3.53278 11.7579 3.55848 11.7375L11.7125 4.062C11.9257 3.86178 12.2071 3.75032 12.4996 3.75032C12.7921 3.75032 13.0735 3.86178 13.2867 4.062L21.4625 11.7578C21.5187 11.8058 21.4977 11.883 21.4865 11.9138Z" fill="white" />
              </svg>
              <span>Sell Property</span>
            </Link>
          </div>
        </div>
      </div> */}
      <div className="col-lg-6 col-md-6 col-12">
        <div className="widget widget-info">
          <h3>Office Address</h3>
          <p className="sub-title">Head office:</p>
          <h5 className="text-color-1">{Cointactusdata?.head_office}</h5>
          <p className="sub-title">Branch:</p>
          <p className="text-1 text-color-8">{Cointactusdata?.branch}</p>
        </div>
      </div>
      <div className="col-lg-3 col-md-6 col-12">
        <div className="widget widget-menu style-3">
          <h3>Our Company</h3>
          <ul className="box-menu">
            <li><Link to="/About">About Us</Link></li>
            {/* <li><a href="careers.html">Careers</a></li> */}
            {/* <li><a href="services.html">Services</a></li> */}
            <li><Link to="/ContactUs">Contact Us</Link></li>
            <li><a href>Refer and Earn</a></li>
            <li><Link to="Faq">F &amp; Q</Link></li>
            {/* <li><a href="blog.html">Blog</a></li> */}
          </ul>
        </div>
      </div>
      <div className="col-lg-3 col-md-6 col-12">
        <div className="widget widget-menu style-3">
          <h3>SOLUTIONS</h3>
          <ul className="box-menu">
            {/* <li><a href="square-connect.html">Justthing Connect</a></li>
                    <li><a href="prime-connect.html">Prime Connect</a></li>
                    <li><a href="smart-agent.html">Smart Agent</a></li>
                    <li><a href="realizing.html">Realizing</a></li>
                    <li><a href="rent-agreement.html">Rent Agreement</a></li>
                    <li><a href="escrow.html">Escrow</a></li> */}
            <li><Link to="/PropertyListSidebar">Book Room Online</Link></li>                    
          </ul>
        </div>
      </div>
      {/* <div class="col-lg-3 col-md-6 col-12">
                <div class="widget widget-menu style-3">
                  <h3>RESOURCES</h3>
                  <ul class="box-menu">
                    <li><a href="data-intelligence.html">Data Intelligence</a></li>
                    <li><a href="square-yards-reviews.html">Just Thing Reviews</a></li>
                    <li><a href="real-estate-guide.html">Real Estate Guide</a></li>
                    <li><a href="cities-real-estate.html">Cities Real Estate</a></li>
                    <li><a href="awards-recognition.html">Awards & Recognition</a></li>
                    <li><a href="media-coverage.html">Media Coverage</a></li>
                    <li><a href="glossary.html">Glossary</a></li>                    
                  </ul>
                </div>
              </div> */}
    </div>
  </div>
</footer>
{/* /#footer */}
<div className="widget-bottom-footer">
  <div className="container6">
    <div className="row">
      <div className="col-lg-12">
        <div className="title-bottom center">
          Copyright © 2024. Designed &amp; Developed by <a target='_blank' href="https://logicalsofttech.com/" className="text-color-1">Logical Softech.</a>
        </div>
      </div>
    </div>
  </div>
</div>
    </>
  )
}

export default Footer
