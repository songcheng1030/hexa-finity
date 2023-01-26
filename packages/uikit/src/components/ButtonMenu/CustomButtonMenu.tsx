import React, { cloneElement, Children, ReactElement } from "react";
import styled from "styled-components";
import { space } from "styled-system";
import { scales, variants } from "../Button/types";
import { ButtonMenuProps } from "./types";

interface StyledButtonMenuProps extends ButtonMenuProps {
  backgroundColor: string;
  borderColor: string;
  borderWidth: string;
}

const StyledButtonMenu = styled.div<StyledButtonMenuProps>`
  background-color: ${({ backgroundColor }) => (backgroundColor ? backgroundColor : "transparent")};
  border-radius: 8px;
  display: ${({ fullWidth }) => (fullWidth ? "flex" : "inline-flex")};
  border-color: ${({ borderColor }) => (borderColor ? borderColor : "transparent")};
  border-width: ${({ borderWidth }) => (borderWidth ? borderWidth : "1px")};
  border-style: solid;
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};

  & > button,
  & > a {
    flex: ${({ fullWidth }) => (fullWidth ? 1 : "auto")};
  }

  & > button + button,
  & > a + a {
    margin-left: 2px; // To avoid focus shadow overlap
  }

  & > button,
  & a {
    box-shadow: none;
  }

  ${({ disabled, theme, variant }) => {
    if (disabled) {
      return `
        opacity: 0.5;

        & > button:disabled {
          background-color: transparent;
          color: ${variant === variants.PRIMARY ? theme.colors.primary : theme.colors.textSubtle};
        }
    `;
    }
    return "";
  }}
  ${space}
`;

const CustomButtonMenu: React.FC<React.PropsWithChildren<StyledButtonMenuProps>> = ({
  activeIndex = 0,
  scale = scales.MD,
  variant = variants.PRIMARY,
  backgroundColor = 'transparent',
  borderColor = 'transparent',
  onItemClick,
  disabled,
  children,
  fullWidth = false,
  ...props
}) => {
  return (
    <StyledButtonMenu disabled={disabled} variant={variant} fullWidth={fullWidth} backgroundColor={backgroundColor} borderColor={borderColor} {...props}>
      {Children.map(children, (child: ReactElement, index) => {
        return cloneElement(child, {
          isActive: activeIndex === index,
          onClick: onItemClick ? () => onItemClick(index) : undefined,
          scale,
          variant,
          disabled,
        });
      })}
    </StyledButtonMenu>
  );
};

export default CustomButtonMenu;
