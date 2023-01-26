import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="14" viewBox="0 0 17 14" fill="none">
      <path
        d="M4.55559 8.20699L0.780101 7.02744C-0.0360578 6.7776 -0.0405922 6.21432 0.962981 5.81003L15.6735 0.116696C16.5274 -0.231566 17.0111 0.209061 16.7345 1.3129L14.2301 13.1538C14.0548 13.9972 13.5485 14.1986 12.8457 13.8095L8.99006 10.9507L7.193 12.689C7.0086 12.8676 6.85897 13.0206 6.57483 13.0584C6.2922 13.0978 6.05944 13.013 5.88865 12.5436L4.57373 8.19639L4.55559 8.20699Z"
        fill="white"
      />
    </svg>
  );
};

export default Icon;
