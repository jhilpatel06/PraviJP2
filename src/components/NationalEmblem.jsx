import React from "react";
import emblemImg from "../assets/emblem.png";

/**
 * State Emblem of India (Official Government Emblem / Logo)
 * Uses the exact emblem image provided.
 */
export function NationalEmblem({ size = 52, className = "", style = {} }) {
  return (
    <img
      src={emblemImg}
      alt="ભારત સરકાર / ગુજરાત સરકાર રાષ્ટ્રીય પ્રતીક (State Emblem of India)"
      className={`nationalEmblemImg ${className}`}
      style={{
        height: `${size}px`,
        width: "auto",
        maxHeight: "100%",
        objectFit: "contain",
        display: "block",
        flexShrink: 0,
        ...style,
      }}
    />
  );
}

export default NationalEmblem;
