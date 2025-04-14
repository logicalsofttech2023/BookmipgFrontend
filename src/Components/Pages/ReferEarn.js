import React from "react";
import UserSidebar from "../NavFooter/UserSidebar";
const ReferEarn = () => {
  return (
    <>
      <div className="dashboard show">
        <UserSidebar/>
    <div className="dashboard__content bg-23">
  <section className="flat-pricing page mb-4">
    <div className="container6">
      <div className="row">
        <div className="col-lg-12 col-md-12">
          {/* <div class="heading-section center">
                      <h2 class="">Pricing plans for every budget</h2> */}
          {/* <p class="text-color-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel lobortis justo</p> */}
          {/* </div> */}
          <img src="https://www.squareyards.com/assets/images/refer-banner.png" />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-5 col-md-5">
          <div className="box box-style">
            <img src="https://www.squareyards.com/assets/images/refer-earn-app-screen.png" />                      </div>
        </div>
        <div className="col-lg-7 col-md-7">
          <div className="box box-style active">
            {/* <div class="sub-title fs-30 fw-7">Share </div>
                      <p class="text-sub fw-6 ">Download our Website to unlock this feature</p> */}
            <div className="title-price flex">
              <h2>With our Website, spend less time searching and more time at your dream home. Share now!</h2>
            </div>
            <ul className="check">
              <li className="flex-three">Vip listing</li>
              <li className="flex-three">Support 24/7</li>
              <li className="flex-three">Quick access to customers</li>
              <li className="flex-three">Auto refresh ads</li>
              <li className="flex-three">Vip listing</li>
              <li className="flex-three">Support 24/7</li>
              <li className="flex-three">Quick access to customers</li>
              <li className="flex-three">Auto refresh ads</li>
              <li className="flex-three">Quick access to customers</li>
            </ul>
            <div className="button-pricing">
              <a className="sc-button" href="#">
                <span>Get started</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>

      </div>
    </>
  );
};

export default ReferEarn;
