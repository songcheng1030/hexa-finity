import { CardBody, Flex, CardRibbon, Skeleton, Pool } from "@pancakeswap/uikit";
import { useTranslation } from "@pancakeswap/localization";
import { ReactElement } from "react";
import { StyledPoolCard } from "./StyledPoolCard";
import { DeserializedPool } from "./types";

interface PoolCardPropsType<T> {
  pool: DeserializedPool<T>;
  cardContent: ReactElement;
  aprRow: ReactElement;
  cardFooter: ReactElement;
  tokenPairImage: ReactElement;
  isStaked: boolean;
}

export function PoolCard<T>({ pool, cardContent, aprRow, isStaked, cardFooter, tokenPairImage }: PoolCardPropsType<T>) {
  const { sousId, stakingToken, earningToken, isFinished, totalStaked } = pool;
  const { t } = useTranslation();

  const isCakePool = earningToken?.symbol === "CAKE" && stakingToken?.symbol === "CAKE";

  return (
    <StyledPoolCard
      isActive={isCakePool}
      isFinished={isFinished && sousId !== 0}
    >
      {aprRow}
      <Pool.PoolCardHeader isStaking={isStaked} isFinished={isFinished && sousId !== 0}>
        {totalStaked && totalStaked.gte(0) ? (
          <>
            {tokenPairImage}
            <Pool.PoolCardHeaderTitle
              title={isCakePool ? t("Manual") : t("Auto Compound")}
              subTitle={
                isCakePool ? t("Earn CAKE, stake CAKE") : t("Stake %symbol% - Earn %asset%", { symbol: stakingToken?.symbol || "", asset: earningToken?.symbol || "" })
              }
              tooltipText={t('Tooltip Text')}
            />

          </>
        ) : (
          <Flex width="100%" justifyContent="space-between">
            <Flex flexDirection="column">
              <Skeleton width={100} height={26} mb="4px" />
              <Skeleton width={65} height={20} />
            </Flex>
            <Skeleton width={58} height={58} variant="circle" />
          </Flex>
        )}
      </Pool.PoolCardHeader>
      <CardBody style={{padding: '0 12px'}}>
        <Flex flexDirection="column">
          {cardContent}
        </Flex>
      </CardBody>
      {cardFooter}
    </StyledPoolCard>
  );
}
