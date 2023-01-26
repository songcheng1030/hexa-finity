import styled from "styled-components";
import { darkColors } from "../../theme/colors";
import { Box, Flex } from "../Box";
import SocialLinks from "./Components/SocialLinks";

export const StyledFooter = styled(Flex)`
  background: ${darkColors.backgroundAlt};
`;

export const StyledList = styled.ul`
  list-style: none;
  margin-bottom: 40px;

  ${({ theme }) => theme.mediaQueries.md} {
    margin-bottom: 0px;
  }
`;

export const StyledListItem = styled.li`
  font-size: 16px;
  margin-bottom: 8px;
  text-transform: capitalize;

  &:first-child {
    color: ${darkColors.white};
    font-weight: 600;
    text-transform: uppercase;
  }
`;
export const SupportItem = styled.p`
  font-size: 16px;
  margin-bottom: 30px;
  text-transform: capitalize;
  color: white;
`;

export const StyledIconMobileContainer = styled(Box)`
  margin-bottom: 24px;
`;

export const StyledToolsContainer = styled(Flex)`
  border-color: ${darkColors.cardBorder};
  /* border-top-width: 1px; */
  /* border-bottom-width: 1px; */
  border-style: solid;
  padding: 24px 0;
  margin-bottom: 24px;

  ${({ theme }) => theme.mediaQueries.sm} {
    border-top-width: 0;
    border-bottom-width: 0;
    padding: 0 0;
    margin-bottom: 0;
  }
`;

export const StyledSocialLinks = styled(SocialLinks)`
  /* border-bottom: 1px solid ${darkColors.cardBorder}; */
`;

export const StyledText = styled.span`
  color: #798dc6;
`;

export const FotterLeft = styled.div`
  padding: 30px 20px;
  margin-top: -10px;
  display: flex;
  flex-direction: row;
  background-color: #01081b;
  border-radius: 15px;
  img {
    width: 45px;
    height: 45px;
  }
  .tokePrice {
    font-size: 14px;
    color: #5e78b2;
    font-weight: 400;
  }
  .tokenValue {
    color: white;
    font-size: 14px;
    margin-top: 10px;
    font-weight: 700;
  }
  .tokePrice1 {
    font-size: 12px;
    color: #5e78b2;
    font-weight: 500;
  }
  .tokenValue2 {
    color: white;
    font-size: 12px;
    font-weight: 500;
  }
  @media (max-width: 770px) {
    flex-direction: column;
    margin-bottom: 20px;
    width:100%
  }
`;
export const BuyBtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f93b5d;
  color: white;
  font-size: 12px;
  width: 78px;
  height: 32px;
  border-radius: 10px;
  margin-left: 20px;
`;
