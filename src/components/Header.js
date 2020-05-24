import React from "react";

export default function Header() {
  return (
    <div
      style={{
        // width: "100%",
        // height: "100px",
        backgroundImage: "linear-gradient(-90deg, #a64dff, #ff0055)",
        //position: "fixed",
      }}
    >
      <div
        style={{
          textAlign: "left",
          fontWeight: "bold",
          color: "white",
          fontSize: "50px",
          padding: "20px",
        }}
      >
        Project
      </div>
    </div>
  );
}
