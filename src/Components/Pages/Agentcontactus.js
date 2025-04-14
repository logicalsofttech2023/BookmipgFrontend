import React, { useEffect, useState } from 'react'
import AgentSidebar from '../NavFooter/AgentSidebar'
import axios from 'axios'
import localStorage from 'react-secure-storage'
const Agentcontactus = () => {

const [ContactData, setContactData] = useState();
const [ContactDataByuser,setContactDataByuser] = useState();
let loginid = localStorage.getItem("loginuserid");
useEffect(()=>{
  window.scrollTo(0, 0);
ContactUsdata();
},[0])
const ContactUsdata = ()=>{
    const data ={
        agentId:loginid
    }
    axios.post(`${process.env.REACT_APP_API_KEY}website/get_agent_contact_us`,data).then((res)=>{
        setContactData(res.data.data)
    }).catch((error)=>{

    })
}


useEffect(()=>{
  ContactUsdataByuser();
  },[0])
  const ContactUsdataByuser = ()=>{
      const data ={
          agentId:loginid
      }
      axios.post(`${process.env.REACT_APP_API_KEY}website/get_agent_contact_us_list`,data).then((res)=>{
          setContactDataByuser(res.data.data)
      }).catch((error)=>{
  
      })
  }


  return (
    <>
    
    <AgentSidebar />
    <div className="dashboard__content bg-23">
      <section className="flat-title2">
        <div className="container7">
          <div className="row">
            <div className="col-lg-6">
              <div className="title-group fs-30 lh-45 fw-7">Contact seller data</div>
            </div>
            <div className="col-lg-6">
              <div className="title-group fs-30 lh-45 fw-7">User Contact data</div>
            </div>
          </div>
        </div>
      </section>
      <section className="flat-dashboard flat-all-review">
    <div className="container7">
      <div className="row">                      
        <div className="col-lg-6">
          <div className="tf-reviews">
            <div className="reviews-sidebar messages-sidebar bg-white">
              <ul>
              {ContactData?.length > 0 ? 
              ContactData?.map((data)=>{
return(
    <li>
                  <div className="image-box flex align-center">
                    <div className="images">
                      <img src="assets/images/author/author-list-8.jpg" alt="images" /> 
                    </div>
                    <div className="title-flat fw-6">Name : {data?.name} <br/>Email :  {data?.email} <br/> Mobile No.: {data?.mobile_no}</div>
                    
                    {/* <p className="fs-12 lh-18">3 day ago</p> */}
                    
                  </div>
                  <div className="content">
                    <p className="text-color-2">{data?.message}</p>
                    {/* <div className="star flex">
                      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style={{enableBackground: 'new 0 0 512 512'}} xmlSpace="preserve"><g>	<g>		<polygon points="512,197.816 325.961,185.585 255.898,9.569 185.835,185.585 0,197.816 142.534,318.842 95.762,502.431 			255.898,401.21 416.035,502.431 369.263,318.842 		" />	</g></g><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /></svg>
                      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style={{enableBackground: 'new 0 0 512 512'}} xmlSpace="preserve"><g>	<g>		<polygon points="512,197.816 325.961,185.585 255.898,9.569 185.835,185.585 0,197.816 142.534,318.842 95.762,502.431 			255.898,401.21 416.035,502.431 369.263,318.842 		" />	</g></g><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /></svg>
                      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style={{enableBackground: 'new 0 0 512 512'}} xmlSpace="preserve"><g>	<g>		<polygon points="512,197.816 325.961,185.585 255.898,9.569 185.835,185.585 0,197.816 142.534,318.842 95.762,502.431 			255.898,401.21 416.035,502.431 369.263,318.842 		" />	</g></g><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /></svg>
                      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style={{enableBackground: 'new 0 0 512 512'}} xmlSpace="preserve"><g>	<g>		<polygon points="512,197.816 325.961,185.585 255.898,9.569 185.835,185.585 0,197.816 142.534,318.842 95.762,502.431 			255.898,401.21 416.035,502.431 369.263,318.842 		" />	</g></g><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /></svg>
                      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style={{enableBackground: 'new 0 0 512 512'}} xmlSpace="preserve"><g>	<g>		<polygon points="512,197.816 325.961,185.585 255.898,9.569 185.835,185.585 0,197.816 142.534,318.842 95.762,502.431 			255.898,401.21 416.035,502.431 369.263,318.842 		" />	</g></g><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /></svg>                                               
                    </div> */}
                  </div>
                </li>
)
              }) :
              <div style={{textAlign:'center'}}>
 <img className="mt-3"
                       width={100}
                       src="https://themesflat.co/html/dreamhomehtml/assets/images/icon/footer-icon-2.png"
                       alt="No Property Found"
                     />
                <h3 >No data found</h3>

                </div>
                
}
              </ul>
            </div>
            <div className="tf-bottom">
              {/* <div className="title-bottom center text-color-4"> Copyright © 2023 <a href="#" className="text-color-4 fw-6">Justthing.</a> </div> */}
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="tf-reviews">
            <div className="reviews-sidebar messages-sidebar bg-white">
              <ul>
              {ContactDataByuser?.length > 0 ? 
              ContactDataByuser?.map((data)=>{
return(
    <li>
                  <div className="image-box flex align-center">
                    <div className="images">
                      <img src="assets/images/author/author-list-8.jpg" alt="images" /> 
                    </div>
                    <div className="title-flat fw-6">Name : {data?.name} <br/>Email :  {data?.email} <br/> Mobile No.: {data?.mobile_no}</div>
                    
                    {/* <p className="fs-12 lh-18">3 day ago</p> */}
                    
                  </div>
                  <div className="content">
                    <p className="text-color-2">{data?.message}</p>
                    {/* <div className="star flex">
                      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style={{enableBackground: 'new 0 0 512 512'}} xmlSpace="preserve"><g>	<g>		<polygon points="512,197.816 325.961,185.585 255.898,9.569 185.835,185.585 0,197.816 142.534,318.842 95.762,502.431 			255.898,401.21 416.035,502.431 369.263,318.842 		" />	</g></g><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /></svg>
                      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style={{enableBackground: 'new 0 0 512 512'}} xmlSpace="preserve"><g>	<g>		<polygon points="512,197.816 325.961,185.585 255.898,9.569 185.835,185.585 0,197.816 142.534,318.842 95.762,502.431 			255.898,401.21 416.035,502.431 369.263,318.842 		" />	</g></g><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /></svg>
                      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style={{enableBackground: 'new 0 0 512 512'}} xmlSpace="preserve"><g>	<g>		<polygon points="512,197.816 325.961,185.585 255.898,9.569 185.835,185.585 0,197.816 142.534,318.842 95.762,502.431 			255.898,401.21 416.035,502.431 369.263,318.842 		" />	</g></g><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /></svg>
                      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style={{enableBackground: 'new 0 0 512 512'}} xmlSpace="preserve"><g>	<g>		<polygon points="512,197.816 325.961,185.585 255.898,9.569 185.835,185.585 0,197.816 142.534,318.842 95.762,502.431 			255.898,401.21 416.035,502.431 369.263,318.842 		" />	</g></g><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /></svg>
                      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style={{enableBackground: 'new 0 0 512 512'}} xmlSpace="preserve"><g>	<g>		<polygon points="512,197.816 325.961,185.585 255.898,9.569 185.835,185.585 0,197.816 142.534,318.842 95.762,502.431 			255.898,401.21 416.035,502.431 369.263,318.842 		" />	</g></g><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /></svg>                                               
                    </div> */}
                  </div>
                </li>
)
              }) :
              <div style={{textAlign:'center'}}>
 <img className="mt-3"
                       width={100}
                       src="https://themesflat.co/html/dreamhomehtml/assets/images/icon/footer-icon-2.png"
                       alt="No Property Found"
                     />
                <h3 >No data found</h3>

                </div>
                
}
              </ul>
            </div>
            <div className="tf-bottom">
              {/* <div className="title-bottom center text-color-4"> Copyright © 2023 <a href="#" className="text-color-4 fw-6">Justthing.</a> </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
      </div>
    </>
  )
}

export default Agentcontactus
