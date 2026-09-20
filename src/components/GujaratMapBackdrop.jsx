import React from "react";
import mapImg from "../assets/gujarat-map-trans.png";

/**
 * Translucent Gujarat Map Backdrop for Home Page Hero
 * Uses the exact district map image provided by the user.
 * Kept very light and translucent in the far background so it never overpowers the content.
 */
export function GujaratMapBackdrop({ className = "" }) {
  return (
    <div
      className={`gujaratMapBackdrop ${className}`}
      aria-hidden="true"
      style={{
        position: "absolute",
        right: "3%",
        top: "50%",
        transform: "translateY(-50%)",
        width: "min(620px, 75vw)",
        height: "90%",
        maxHeight: "500px",
        pointerEvents: "none",
        zIndex: 1,
        overflow: "hidden",
        opacity: 0.10,
        userSelect: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src={mapImg}
        alt=""
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          filter: "contrast(1.05)",
        }}
      />
    </div>
  );
}

export default GujaratMapBackdrop;
