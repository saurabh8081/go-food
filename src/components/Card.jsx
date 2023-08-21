import React from "react";

const Card = () => {
  return (
    <div>
      <div>
        <div
          className="card mt-3"
          style={{ width: "16rem", maxHeight: "360px" }}
        >
          <img src="https://source.unsplash.com/random/200x200?food" />
          <div className="card-body">
            <h5 className="card-title"></h5>
            <div className="container w-100 p-0" style={{ height: "38px" }}>
              <select
                className="m-2 h-100 w-20 bg-success text-black rounded"
                style={{ select: "#FF0000" }}
              >
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>
              <select
                className="m-2 h-100 w-20 bg-success text-black rounded"
                style={{ select: "#FF0000" }}
              >
                <option value="half">half</option>
                <option value="full">full</option>
              </select>{" "}
              <div className=" d-inline ms-2 h-100 w-20 fs-5">₹xxx</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
