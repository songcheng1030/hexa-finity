import styled from "styled-components";
import { useTranslation } from "@pancakeswap/localization";
import { FarmTableLiquidityProps, HelpIcon, Skeleton, Text, useTooltip } from "@pancakeswap/uikit";

const ReferenceElement = styled.div`
  display: inline-block;
`;

const LiquidityWrapper = styled.div`
  min-width: 90px;
  font-weight: 600;
  text-align: right;
  margin-right: 14px;
  font-size: 11px;
  color: #2F4DA0;
  ${({ theme }) => theme.mediaQueries.lg} {
    text-align: left;
    margin-right: 0;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Liquidity: React.FunctionComponent<React.PropsWithChildren<FarmTableLiquidityProps>> = ({ liquidity }) => {
  const displayLiquidity =
    liquidity && liquidity.gt(0) ? (
      `$${Number(liquidity).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
    ) : (
      <Skeleton width={60} />
    );
  const { t } = useTranslation();
  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    t("Total value of the funds in this farm’s liquidity pool"),
    { placement: "top-end", tooltipOffset: [20, 10] }
  );

  return (
    <Container>
      <LiquidityWrapper>
        <Text color="#2F4DA0" style={{fontSize: '13px'}}>{displayLiquidity}</Text>
      </LiquidityWrapper>
      <ReferenceElement ref={targetRef}>
        <img src="/images/farms/question.png" alt="question" />
      </ReferenceElement>
      {tooltipVisible && tooltip}
    </Container>
  );
};

export default Liquidity;
