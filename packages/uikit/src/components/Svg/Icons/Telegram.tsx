import * as React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="16" viewBox="0 0 19 16" fill="none">
      <path
        d="M4.99211 9.37942L0.677259 8.03136C-0.255495 7.74583 -0.260677 7.10208 0.886264 6.64004L17.6983 0.133367C18.6742 -0.264647 19.227 0.238927 18.9109 1.50046L16.0487 15.033C15.8483 15.9968 15.2697 16.227 14.4665 15.7823L10.0601 12.5151L8.00628 14.5017C7.79555 14.7059 7.62454 14.8807 7.29981 14.9239C6.9768 14.9689 6.71079 14.872 6.5156 14.3356L5.01283 9.3673L4.99211 9.37942Z"
        fill="#798DC6"
      />
    </svg>
  );
};

export default Icon;
