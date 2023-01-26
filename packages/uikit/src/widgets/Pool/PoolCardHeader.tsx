import { ReactNode } from "react";
import styled from "styled-components";
import getThemeValue from "../../util/getThemeValue";
import { CardHeader, Flex, Heading, Text, HelpIcon } from "../../components";
import { useTooltip } from "../../hooks";

const Wrapper = styled(CardHeader) <{ isFinished?: boolean; background: string }>`
  background: ${({ isFinished, background, theme }) => getThemeValue(theme, `colors.${background}`)};
  border-radius: ${({ theme }) => `${theme.radii.card} ${theme.radii.card} 0 0`};
`;

export const PoolCardHeader: React.FC<
  React.PropsWithChildren<{
    isFinished?: boolean;
    isStaking?: boolean;
  }>
> = ({ isFinished = false, isStaking = false, children }) => {
  const background = isStaking ? "transparent" : "transparent";

  return (
    <Wrapper isFinished={isFinished} background={background}>
      <Flex alignItems="center" flexDirection={'column'}>
        {children}
      </Flex>
    </Wrapper>
  );
};

export const PoolCardHeaderTitle: React.FC<
  React.PropsWithChildren<{ isFinished?: boolean; title: ReactNode; subTitle: ReactNode, tooltipText: ReactNode }>
> = ({ isFinished, title, subTitle, tooltipText }) => {
  const { targetRef, tooltip, tooltipVisible } = useTooltip(tooltipText, { placement: 'bottom' })
  return (
    <Flex flexDirection="column">
      <Flex>
        <Heading color={"body"} fontSize="22px" textAlign={'center'}>
          {title}
          {tooltipVisible && tooltip}
        </Heading>
        <Flex ref={targetRef}>
          <HelpIcon ml="4px" width="20px" height="20px" color="poolText" />
        </Flex>
      </Flex>
      <Text fontSize="14px" mt="4px" color={isFinished ? "poolText" : "poolText"} textAlign='center'>
        {subTitle}
      </Text>
    </Flex>
  );
};
