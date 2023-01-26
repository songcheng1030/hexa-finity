import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path
        d="M1 1V12C1 12.5304 1.21071 13.0391 1.58579 13.4142C1.96086 13.7893 2.46957 14 3 14H14"
        stroke="#7645D9"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path d="M3 10L6 7L8 9L13 4" stroke="#7645D9" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M13 7V4H10" stroke="#7645D9" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  );
};

export default Icon;
