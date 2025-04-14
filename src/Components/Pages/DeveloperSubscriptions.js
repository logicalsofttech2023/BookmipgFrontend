import React, { useEffect, useState } from 'react'
import AgentSidebar from '../NavFooter/AgentSidebar'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'
import localStorage from 'react-secure-storage'

const DeveloperSubscriptions = () => {
  const [PlainData,setPlainData] = useState();
  const Navigate = useNavigate();
  let loginid = localStorage.getItem("loginuserid");

  useEffect(()=>{
    window.scrollTo(0, 0);
    GepPlains();
  },[0])
  const GepPlains = ()=>{
    axios.get("http://157.66.191.24:3089/website/subscriptions_plan_list").then((res)=>{
      setPlainData(res.data.data)
    }).catch((error)=>{})
  }


  const addPlain = (item,type)=>{
    const data = {
      userId:loginid, 
    planId:item,
    plan_type:type   
    }

axios.post("http://157.66.191.24:3089/website/add_agent_subscriptions",data).then((res)=>{
  swal(res.data.msg, {
    icon: "success",
  }).then(()=> {
    Navigate("/AgentProperty")
  })
}).catch((error)=>{
  
})
  }

  return (
    <>
    <AgentSidebar />
 <div className="dashboard__content bg-23">
  {/* <section className="flat-title2 ">
    <div className="container7">
      <div className="row">                      
        <div className="col-lg-12">
          <div className="title-group fs-30 lh-45 fw-7">Add properties</div>
        </div> 
      </div>
    </div>
  </section> */}
   <section className="flat-title2">
          <div className="container7">
            <div className="row">
              <div className="col-lg-12">
                <div className="title-group fs-30 lh-45 fw-7">Pricing plans for every budget</div>
              </div>
            </div>
          </div>
        </section>
  <section className="flat-pricing page mb-5 p-0">
    <div className="container6">
      <div className="row">
        {/* <div className="col-lg-12 col-md-12">
          <div className="heading-section center">
            <h2 className>Pricing plans for every budget</h2>
            <p className="text-color-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel lobortis justo</p>
          </div>
        </div> */}
        <div className="col-lg-4 col-md-4">
          <div className="box box-style ">
            <div className="sub-title fs-30 fw-7">3 Listing Free</div>
            <p className="text-sub fw-6 ">Automatically reach potential customers</p>
            <div className="title-price flex">
              <h2>₹0 </h2><div className="mo fw-4 fs-30 fw-7"> / mo</div>
            </div>
            <p className="texts">Per month, per company or team members</p>
            <ul className="check">
              <li className="flex-three">Listing free</li>
              <li className="flex-three">Support 24/7</li>
              <li className="flex-three">Quick access to customers</li>
              <li className="flex-three">Auto refresh ads</li>
            </ul>
            <div className="button-pricing">
              <Link to='/AgentProperty' className="sc-button btn-1" href="#">
                <span>Get started</span>
              </Link>
            </div>
          </div>
        </div>
        {PlainData?.slice(1,2)?.map((data)=>{
          return(
        <div className="col-lg-4 col-md-4">
          <div className="box box-style active">
            <div className="sub-title fs-30 fw-7">Business</div>
            <p className="text-sub fw-6 ">Automatically reach potential customers</p>
            <div className="title-price flex">
              <h2>₹{data?.ammount}</h2><div className="mo fw-4 fs-30 fw-7">/{data?.plan_validity} days</div>
            </div>
            <p className="texts">Per month, per company or team members</p>
            <ul className="check">
              <li className="flex-three">Vip listing</li>
              <li className="flex-three">Support 24/7</li>
              <li className="flex-three">Quick access to customers</li>
              <li className="flex-three">Auto refresh ads</li>
            </ul>
            <div className="button-pricing">
              <a onClick={(()=>addPlain(data?._id,"Business"))} className="sc-button" href="#">
                <span>Get started</span>
              </a>
            </div>
          </div>
        </div>
        )
      })}
      {PlainData?.slice(2,3)?.map((data)=>{
          return(
        <div className="col-lg-4 col-md-4">
          <div className="box box-style">
            <div className="sub-title fs-30 fw-7">Enterprise</div>
            <p className="text-sub fw-6">Automatically reach potential customers</p>
            <div className="title-price flex">
              <h2>₹{data?.ammount}</h2><div className="mo fw-4 fs-30 fw-7">/{data?.plan_validity}</div>
            </div>
            <p className="texts">Per month, per company or team members</p>
            <ul className="check">
              <li className="flex-three">Listing free</li>
              <li className="flex-three">Support 24/7</li>
              <li className="flex-three">Quick access to customers</li>
              <li className="flex-three">Auto refresh ads</li>
            </ul>
            <div className="button-pricing">
              <a onClick={(()=>addPlain(data?._id,"Enterprise"))} className="sc-button btn-1" href="#">
                <span>Get started</span>
              </a>
            </div>
          </div>
        </div>
         )
        })}
      </div>
    </div>
  </section>
</div>

    </>
  )
}

export default DeveloperSubscriptions



