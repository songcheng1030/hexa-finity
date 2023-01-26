import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <Svg viewBox="0 0 16 16" {...props}>
      <path
        d="M2 11.3333L4 9.33333M12.6667 11.3333H2H12.6667ZM2 11.3333L4 13.3333L2 11.3333Z"
        stroke="#7645D9"
        fillRule="evenodd"
        clipRule="evenodd"
      />
      <path
        d="M14 4.66667L12 6.66667M3.33337 4.66667H14H3.33337ZM14 4.66667L12 2.66667L14 4.66667Z"
        stroke="#7645D9"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </Svg>
  );
};

export default Icon;
