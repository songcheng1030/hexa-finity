import { useRouter } from "next/router";
import styled from "styled-components";
import { useTranslation } from "@pancakeswap/localization";
import { CustomButtonMenu, CustomButtonMenuItem, Toggle, Text, NotificationDot, NextLinkFromReactRouter } from "../../components";
import { ToggleView, ViewMode } from "../../components/ToggleView";

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 36px;
  box-shadow: none;
  ${Text} {
    margin-left: 8px;
  }
`;
const ViewControls = styled.div`
  flex-wrap: wrap;
  justify-content: space-between;
  display: flex;
  align-items: center;
  width: 100%;
  > div {
    padding: 8px 0px;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-start;
    width: auto;
    > div {
      padding: 0;
    }
  }
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    padding-left: 12px;
    padding-right: 12px;
  }
`;
const LeftItemStyles = {
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
}
const RightItemStyles = {
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
}
interface PoolTableButtonsPropsType {
  stakedOnly: boolean;
  setStakedOnly: (s: boolean) => void;
  viewMode: ViewMode;
  setViewMode: (s: ViewMode) => void;
  hasStakeInFinishedPools: boolean;
  hideViewMode?: boolean;
}
const PoolTabButtons = ({
  stakedOnly,
  setStakedOnly,
  hasStakeInFinishedPools,
  viewMode,
  setViewMode,
  hideViewMode = true,
}: PoolTableButtonsPropsType) => {
  const router = useRouter();

  const { t } = useTranslation();

  const isExact = router.pathname === "/pools" || router.pathname === "/_mp/pools";

  const liveOrFinishedSwitch = (
    <Wrapper>
      <CustomButtonMenu activeIndex={isExact ? 0 : 1} scale="sm" variant="subtle" borderColor="transparent" borderWidth="0" backgroundColor="tranparent">
        <CustomButtonMenuItem as={NextLinkFromReactRouter} to="/pools" replace
          style={LeftItemStyles} backgroundActiveColor="#2F4DA0" backgroundInactiveColor="#AABEF0" inactiveColor='#2F4DA0'>
          {t("Active")}
        </CustomButtonMenuItem>
        <NotificationDot show={hasStakeInFinishedPools}>
          <CustomButtonMenuItem id="finished-pools-button" as={NextLinkFromReactRouter} to="/pools/history" replace
            style={RightItemStyles} backgroundActiveColor="#2F4DA0" backgroundInactiveColor="#AABEF0" inactiveColor='#2F4DA0'>
            {t("Inactive")}
          </CustomButtonMenuItem>
        </NotificationDot>
      </CustomButtonMenu>
    </Wrapper>
  );

  const stakedOnlySwitch = (
    <ToggleWrapper>
      <Toggle checked={stakedOnly} onChange={() => setStakedOnly(!stakedOnly)} scale="sm" activeBackgroundColor="#041647" style={{ boxShadow: 'none', backgroundColor: '#AABEF0' }} />
      <Text style={{ fontFamily: 'Poppins', fontWeight: 400, fontSize: '14px', color: '#000' }}> {t("Staked only")}</Text>
    </ToggleWrapper>
  );

  return (
    <ViewControls>
      {/* {viewModeToggle} */}
      {liveOrFinishedSwitch}
      {stakedOnlySwitch}
    </ViewControls>
  );
};

export default PoolTabButtons;
