import React from 'react'


const Footer = () => {
  return (
    <div>
        <footer className="footer">
            <div className="d-sm-flex justify-content-center justify-content-sm-between">
              <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">
                Copyright © 2023{" "}
                <a target="_blank">
                  Logcalsofttech
                </a>
                . All rights reserved.
              </span>
              <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">
                BookMiPG{" "}
                <i className="mdi mdi-heart text-danger" />
              </span>
            </div>
          </footer>
    </div>
  )
}

export default Footer