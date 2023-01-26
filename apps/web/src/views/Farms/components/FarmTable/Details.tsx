import styled from "styled-components";
import { useTranslation } from "@pancakeswap/localization";
import { ChevronDownIcon, useMatchBreakpoints } from "@pancakeswap/uikit";

interface DetailsProps {
  actionPanelToggled: boolean;
}

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
  background: rgba(17, 169, 255, 0.11);
  border-radius: 50px;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 3px 10px
  }
`;

const Label = styled.div`
  font-size: 12px;
  display: flex;
  align-items: center;
`
const ArrowIcon = styled(ChevronDownIcon)<{ toggled: boolean }>`
  transform: ${({ toggled }) => (toggled ? "rotate(180deg)" : "rotate(0)")};
  height: 20px;
`;

const Details: React.FC<React.PropsWithChildren<DetailsProps>> = ({ actionPanelToggled }) => {
  const { t } = useTranslation();

  return (
    <Container>
      <Label>{t("Details")}</Label><ArrowIcon color="primary" toggled={actionPanelToggled} />
    </Container>
  );
};

export default Details;
