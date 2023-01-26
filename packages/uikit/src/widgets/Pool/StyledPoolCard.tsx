import styled from "styled-components";
import { Card } from "../../components";

export const StyledPoolCard = styled(Card)<{ isFinished?: boolean }>`
  min-width: 240px;
  max-width: 100%;
  margin: 0 0 24px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-self: baseline;
  position: relative;
  color: #000;
  background: none;

  ${({ theme }) => theme.mediaQueries.sm} {
    max-width: 270px;
    margin: 0 6px 24px;
  }
`;
