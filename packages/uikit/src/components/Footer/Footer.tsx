import { vars } from "@pancakeswap/ui/css/vars.css";
import { useIsMounted } from "@pancakeswap/hooks";
import React from "react";
import { Box, Flex } from "../Box";
import { Link } from "../Link";
import {
  StyledFooter,
  StyledIconMobileContainer,
  StyledList,
  StyledListItem,
  SupportItem,
  StyledSocialLinks,
  StyledText,
  StyledToolsContainer,
  FotterLeft,
  BuyBtn,
} from "./styles";

import { Button } from "../Button";
import CakePrice from "../CakePrice/CakePrice";
import LangSelector from "../LangSelector/LangSelector";
import { ArrowForwardIcon, LogoWithTextIcon, ContactUs } from "../Svg";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { FooterProps } from "./types";
import { SkeletonV2 } from "../Skeleton";

const MenuItem: React.FC<React.PropsWithChildren<FooterProps>> = ({
  items,
  isDark,
  toggleTheme,
  currentLang,
  langs,
  setLang,
  cakePriceUsd,
  buyCakeLabel,
  ...props
}) => {
  const isMounted = useIsMounted();
  return (
    <StyledFooter
      data-theme="dark"
      p={["40px 16px", null, "56px 40px 32px 40px"]}
      position="relative"
      {...props}
      justifyContent="center"
    >
      <Flex flexDirection="column" width={["100%", null, "1200px;"]}>
        {/* <StyledIconMobileContainer display={["block", null, "none"]}>
          <LogoWithTextIcon width="130px" />
        </StyledIconMobileContainer> */}
        <Flex
          order={[2, null, 1]}
          flexDirection={["column", "column", "row"]}
          justifyContent="space-between"
          alignItems="flex-start"
          mb={["42px", null, "36px"]}
        >
          <FotterLeft>
            <Flex display="flex" flexDirection="column"  mr={["0", null, "50px"]}>
              <Flex display="flex" alignItems="center" flexDirection="row" mb={["20px", null, "60px"]}>
                <img src="/images/footerLogo.png" alt="footerLogo" />
                <Flex ml="20px" flexDirection="column">
                  <h2 className="tokePrice">HEXA Price</h2>
                  <p className="tokenValue">$0.625</p>
                </Flex>
              </Flex>
              <Flex display="flex" alignItems="center" flexDirection="row">
                <img src="/images/footerLogo.png" alt="footerLogo" />
                <BuyBtn>Buy HEXA</BuyBtn>
              </Flex>
            </Flex>
            <Flex display="flex" flexDirection="column">
              <Flex display="flex" alignItems="center" mt="10px" flexDirection="row" justifyContent="space-between" width={["100%", null, "200px"]}>
                <h2 className="tokePrice1">Max supply:</h2>
                <p className="tokenValue2">700 000 000</p>
              </Flex>
              <Flex display="flex" alignItems="center" mt="20px" flexDirection="row" justifyContent="space-between" width={["100%", null, "200px"]}>
                <h2 className="tokePrice1">Total supply:</h2>
                <p className="tokenValue2">118 545 997</p>
              </Flex>
              <Flex display="flex" alignItems="center" mt="20px" flexDirection="row" justifyContent="space-between" width={["100%", null, "200px"]}>
                <h2 className="tokePrice1">Circulating supply:</h2>
                <p className="tokenValue2">112 253 474</p>
              </Flex>
              <Flex display="flex" alignItems="center" mt="20px" flexDirection="row" justifyContent="space-between" width={["100%", null, "200px"]}>
                <h2 className="tokePrice1">Total Burned:</h2>
                <p className="tokenValue2">6 292 523</p>
              </Flex>
              <Flex display="flex" alignItems="center" mt="20px" flexDirection="row" justifyContent="space-between" width={["100%", null, "200px"]}>
                <h2 className="tokePrice1">Market Cap:</h2>
                <p className="tokenValue2">$70 321 974</p>
              </Flex>
            </Flex>
          </FotterLeft>
          {items?.map((item) => (
            <StyledList key={item.label}>
              <StyledListItem>{item.label}</StyledListItem>
              {item.items?.map(({ label, href, isHighlighted = false }) => (
                <StyledListItem key={label}>
                  {href ? (
                    <Link
                      data-theme="dark"
                      href={href}
                      target="_blank"
                      rel="noreferrer noopener"
                      // color={isHighlighted ? vars.colors.warning : "text"}
                      color="#798DC6"
                      bold={false}
                    >
                      {label}
                    </Link>
                  ) : (
                    <StyledText>{label}</StyledText>
                  )}
                </StyledListItem>
              ))}
            </StyledList>
          ))}
          <div>
            <StyledSocialLinks order={[2]} pb={["10px", null, "10px"]} mb={["20px", null, "20px"]} />
            <SupportItem>Support 24/7</SupportItem>
            <Flex order={[1, null, 2]} mb={["24px", null, "0"]} justifyContent="space-between" alignItems="center">
              <Button
                data-theme={isDark ? "dark" : "light"}
                as="a"
                href="https://pancakeswap.finance/swap?outputCurrency=0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82&chainId=56"
                target="_blank"
                scale="sm"
                endIcon={<ContactUs color="backgroundAlt" />}
              >
                Contact us
              </Button>
            </Flex>
          </div>
        </Flex>
      </Flex>
    </StyledFooter>
  );
};

export default MenuItem;
