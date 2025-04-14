import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Faq = () => {
  const [faqData, setFaqData] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    GetFaqs();
  }, []);

  const GetFaqs = () => {
    axios
      .get("http://157.66.191.24:3089/website/faq_list")
      .then((res) => {
        setFaqData(res?.data?.data || []);
      })
      .catch((error) => {});
  };

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <section className="flat-title ">
        <div className="container6">
          <div className="row">
            <div className="col-lg-12">
              <div className="title-inner style-detail">
                <div className="title-group fs-12">
                  <a className="home fw-6 text-color-3" href="index.html">
                    Home
                  </a>
                  <span>Faq</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flat-faq flat-accordion fl-faq-content">
        <div className="container6">
          <div className="row">
            <div className="col-lg-12">
              <div className="heading-section center">
                <h2>Frequently asked questions</h2>
                <div className="text-box flex justify-center flex-wrap">
                  <span className="text-color-4">
                    Quick answers to questions you may have. Can't find what
                    you're looking for? Check out 
                  </span>
                  {/* <a className="fw-7 font-2 text-color-4 text-line" href="#">
                    {" "}
                    full documentation
                  </a> */}
                </div>
              </div>
            </div>

            {faqData?.length > 0 ? (
              faqData?.map((item, index) => (
                <div className="col-lg-6" key={item._id}>
                  <div className="flat-toggle">
                    <div
                      className="toggle-title flex align-center"
                      onClick={() => toggleAnswer(index)}
                    >
                      <i className="fal fa-question-circle" />
                      <div className="fw-6">{item?.question}</div>
                      <div
                        className="btn-toggle"
                        onClick={() => toggleAnswer(index)}
                      />
                    </div>
                    {openIndex === index && (
                      <div className="toggle-title flex align-center">
                        <i className="fal fa-answer-circle" />
                        <div className="fw-6">{item?.answer}</div>
                        <div className="btn-toggle" />
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div>No FAQs available</div>
            )}
          </div>
        </div>
      </section>

      <section className="flat-contact2 relative">
        <div className="container6">
          <div className="row">
            <div className="col-lg-12">
              <div className="heading-section">
                <h2>
                  Find for your dream home and increase your investment
                  opportunities
                </h2>
                <p className="text-color-2 font-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                  sed tristique metus proin id lorem odio
                </p>
                <div className="button-footer">
                  <Link className="sc-button center btn-icon" to="/ContactUs">
                    <svg
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.25 6.75C2.25 15.034 8.966 21.75 17.25 21.75H19.5C20.0967 21.75 20.669 21.5129 21.091 21.091C21.5129 20.669 21.75 20.0967 21.75 19.5V18.128C21.75 17.612 21.399 17.162 20.898 17.037L16.475 15.931C16.035 15.821 15.573 15.986 15.302 16.348L14.332 17.641C14.05 18.017 13.563 18.183 13.122 18.021C11.4849 17.4191 9.99815 16.4686 8.76478 15.2352C7.53141 14.0018 6.58087 12.5151 5.979 10.878C5.817 10.437 5.983 9.95 6.359 9.668L7.652 8.698C8.015 8.427 8.179 7.964 8.069 7.525L6.963 3.102C6.90214 2.85869 6.76172 2.6427 6.56405 2.48834C6.36638 2.33397 6.1228 2.25008 5.872 2.25H4.5C3.90326 2.25 3.33097 2.48705 2.90901 2.90901C2.48705 3.33097 2.25 3.90326 2.25 4.5V6.75Z"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>Contact Seller</span>
                  </Link>
                </div>
              </div>
              <div className="mark-img">
                <img src="assets/images/mark/mark-contact2.png" alt="images" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Faq;
