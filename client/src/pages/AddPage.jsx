import React from "react";
import AddAgent from "../components/AddAgent";
export default function AddPage() {
  return (
    <section>
      <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
        <div className="row gx-lg-5 align-items-center mb-5">
          <div className="col-lg-6 mb-5 mb-lg-0 " style={{ zIndex: 10 }}></div>
          <div className="col-lg-12 mb-5 mb-lg-0 ml-4 mr-4 mt-5 position-relative">
            <div
              id="radius-shape-1"
              className="position-absolute rounded-circle shadow-5-strong"
            />
            <div
              id="radius-shape-2"
              className="position-absolute shadow-5-strong"
            />
            <AddAgent />
          </div>
        </div>
      </div>
    </section>
  );
}