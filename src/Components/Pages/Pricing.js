import React from 'react'
import UserSidebar from '../NavFooter/UserSidebar'
const Pricing = () => {
  return (
    <>
    <UserSidebar/>
<div className="dashboard__content">
  <section className="flat-pricing page">
    <div className="container6">
      <div className="row">
        <div className="col-lg-12 col-md-12">
          <div className="heading-section center">
            <h2 className>Pricing plans for every budget</h2>
            <p className="text-color-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel lobortis justo</p>
          </div>
        </div>
        <div className="col-lg-4 col-md-4">
          <div className="box box-style">
            <div className="sub-title fs-30 fw-7">Basic</div>
            <p className="text-sub fw-6 ">Automatically reach potential customers</p>
            <div className="title-price flex">
              <h2>₹19 </h2><div className="mo fw-4 fs-30 fw-7"> / mo</div>
            </div>
            <p className="texts">Per month, per company or team members</p>
            <ul className="check">
              <li className="flex-three">Listing free</li>
              <li className="flex-three">Support 24/7</li>
              <li className="flex-three">Quick access to customers</li>
              <li className="flex-three">Auto refresh ads</li>
            </ul>
            <div className="button-pricing">
              <a className="sc-button btn-1" href="#">
                <span>Get started</span>
              </a>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-4">
          <div className="box box-style active">
            <div className="sub-title fs-30 fw-7">Business</div>
            <p className="text-sub fw-6 ">Automatically reach potential customers</p>
            <div className="title-price flex">
              <h2>₹87</h2><div className="mo fw-4 fs-30 fw-7">/ mo</div>
            </div>
            <p className="texts">Per month, per company or team members</p>
            <ul className="check">
              <li className="flex-three">Vip listing</li>
              <li className="flex-three">Support 24/7</li>
              <li className="flex-three">Quick access to customers</li>
              <li className="flex-three">Auto refresh ads</li>
            </ul>
            <div className="button-pricing">
              <a className="sc-button" href="#">
                <span>Get started</span>
              </a>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-4">
          <div className="box box-style">
            <div className="sub-title fs-30 fw-7">Enterprise</div>
            <p className="text-sub fw-6">Automatically reach potential customers</p>
            <div className="title-price flex">
              <h2>₹120</h2><div className="mo fw-4 fs-30 fw-7">/ mo</div>
            </div>
            <p className="texts">Per month, per company or team members</p>
            <ul className="check">
              <li className="flex-three">Listing free</li>
              <li className="flex-three">Support 24/7</li>
              <li className="flex-three">Quick access to customers</li>
              <li className="flex-three">Auto refresh ads</li>
            </ul>
            <div className="button-pricing">
              <a className="sc-button btn-1" href="#">
                <span>Get started</span>
              </a>
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

export default Pricing
