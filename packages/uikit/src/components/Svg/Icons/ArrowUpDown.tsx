import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <Svg width="13" height="14" viewBox="0 0 13 14" {...props}>
      <path xmlns="http://www.w3.org/2000/svg" d="M3 11.6667L3 1M3 1L1 3M3 1L5 3" stroke="#29ABE2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path xmlns="http://www.w3.org/2000/svg" d="M9.66675 12.9997L7.66675 10.9997M9.66675 2.33301L9.66675 12.9997L9.66675 2.33301ZM9.66675 12.9997L11.6667 10.9997L9.66675 12.9997Z" stroke="#29ABE2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </Svg>
  );
};

export default Icon;
