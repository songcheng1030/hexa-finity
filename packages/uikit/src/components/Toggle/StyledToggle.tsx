import styled from "styled-components";
import { ToggleProps, HandleProps, InputProps, ScaleKeys, scales, StyleToggleProps } from "./types";

const scaleKeyValues = {
  sm: {
    handleHeight: "26px",
    handleWidth: "26px",
    handleLeft: "3px",
    handleTop: "-1px",
    checkedLeft: "calc(100% - 30px)",
    toggleHeight: "23px",
    toggleWidth: "50px",
  },
  md: {
    handleHeight: "24px",
    handleWidth: "24px",
    handleLeft: "-3px",
    handleTop: "-3px",
    checkedLeft: "calc(100% - 20px)",
    toggleHeight: "18px",
    toggleWidth: "37px",
  },
  lg: {
    handleHeight: "24px",
    handleWidth: "24px",
    handleLeft: "-3px",
    handleTop: "-3px",
    checkedLeft: "calc(100% - 20px)",
    toggleHeight: "18px",
    toggleWidth: "37px",
  },
};

const getScale =
  (property: ScaleKeys) =>
  ({ scale = scales.LG }: ToggleProps) => {
    return scaleKeyValues[scale][property];
  };

export const Handle = styled.div<HandleProps>`
  background-color: #041647;
  border-radius: 50%;
  cursor: pointer;
  height: ${getScale("handleHeight")};
  left: ${getScale("handleLeft")};
  position: absolute;
  top: ${getScale("handleTop")};
  transition: left 200ms ease-in;
  width: ${getScale("handleWidth")};
  z-index: 1;
`;

export const Input = styled.input<InputProps>`
  cursor: pointer;
  opacity: 0;
  height: 100%;
  position: absolute;
  width: 100%;
  z-index: 3;

  &:checked + ${Handle} {
    left: ${getScale("checkedLeft")};
  }

  /* &:focus + ${Handle} {
    box-shadow: ${({ theme }) => theme.shadows.focus};
  }

  &:hover + ${Handle}:not(:disabled):not(:checked) {
    box-shadow: ${({ theme }) => theme.shadows.focus};
  } */
`;

const StyledToggle = styled.div<StyleToggleProps>`
  align-items: center;
  background-color: ${({ theme, $checked, $checkedColor, $defaultColor }) =>
    $checked ? theme.colors[$checkedColor] : "#C7D6FF"};
  border-radius: 24px;
  box-shadow: ${({ theme }) => theme.shadows.inset};
  cursor: pointer;
  display: inline-flex;
  height: ${getScale("toggleHeight")};
  position: relative;
  transition: background-color 200ms;
  width: ${getScale("toggleWidth")};
  box-shadow: inset 0 0 10px #6ea16e;
`;

export default StyledToggle;
