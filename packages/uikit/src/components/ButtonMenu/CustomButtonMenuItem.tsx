import styled from "styled-components";
import { PolymorphicComponent } from "../../util/polymorphic";
import Button from "../Button/Button";
import { BaseButtonProps, variants } from "../Button/types";
import { ButtonMenuItemProps } from "./types";

interface InactiveButtonProps extends BaseButtonProps {
  forwardedAs: BaseButtonProps["as"];
}

const InactiveButton: PolymorphicComponent<InactiveButtonProps, "button"> = styled(Button)<InactiveButtonProps>`
  background-color: ${({ backgroundInactiveColor }) => (backgroundInactiveColor ? backgroundInactiveColor : "#FFF")};
  height: 100%;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: #000;
  border-radius: 8px;
  &:hover:not(:disabled):not(:active) {
    background-color: transparent;
    color: ${({ inactiveColor }) => (inactiveColor ? inactiveColor : "#000")};
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 12px;
  }
`;

interface ActiveButtonProps extends BaseButtonProps {
  forwardedAs: BaseButtonProps["as"];
}

const ActiveButton: PolymorphicComponent<ActiveButtonProps, "button"> = styled(Button)<ActiveButtonProps>`
  background-color: ${({ backgroundActiveColor }) => (backgroundActiveColor ? backgroundActiveColor : "#11A9FF")};
  height: 100%;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: #FFFFFF;
  border-radius: 8px;
  &:hover:not(:disabled):not(:active) {
    background-color: transparent;
    color: #11A9FF;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 12px;
  }
`;

interface TabButtonMenuItemProps extends ButtonMenuItemProps {
  backgroundActiveColor: string;
  backgroundInactiveColor: string;
  inactiveColor: string;
}
const CustomButtonMenuItem: PolymorphicComponent<TabButtonMenuItemProps, "button"> = ({
  isActive = false,
  variant = variants.PRIMARY,
  as,
  ...props
}: TabButtonMenuItemProps) => {
  if (!isActive) {
    return <InactiveButton forwardedAs={as} variant={variant} {...props} />;
  }

  return <ActiveButton forwardedAs={as} variant={variant} {...props} />;
};

export default CustomButtonMenuItem;
