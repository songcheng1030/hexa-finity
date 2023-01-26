import { useState, ReactNode } from 'react'
import styled from 'styled-components'
import { ExpandableLabel, Flex, FlexProps, Text } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'

interface FoldableTextProps extends Omit<FlexProps, 'title'> {
  title?: ReactNode
}

const MainCard = styled(Flex)`
  display: flex;
  justify-content: center;
  background: #ffffff;
  box-shadow: 2px 14px 68px rgba(26, 35, 74, 0.11);
  border-radius: 20px;  
  padding-top: 5px;
  padding-bottom: 1px;
  margin-bottom: 12px;
`
const Wrapper = styled(Flex)`
  cursor: pointer;
  padding: 0 34px;
  justify-content: space-between;
  display: grid;
  grid-template-columns: 90% 10%;
`
const StyledChildrenFlex = styled(Flex)<{ isExpanded?: boolean }>`
  margin-top: 10px;
  overflow: hidden;
  height: ${({ isExpanded }) => (isExpanded ? '100%' : '0px')};
  padding-bottom: ${({ isExpanded }) => (isExpanded ? '16px' : '0px')};
  padding-left: 34px;
  padding-right: 34px;
`
const QuestionText = styled(Text)`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 20px;
  }
  line-height: 33px;
  color: #061e63;
`
const ShowButton = styled.div`
  height: 100%;
  margin-top: 10px;
  img{
    widht: 20px;
    height: 20px;
    float: right;  
  }
  
`
const QuestionCard: React.FC<React.PropsWithChildren<FoldableTextProps>> = ({ title, children, ...props }) => {
  const { t } = useTranslation()
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <MainCard {...props} flexDirection="column">
      <Wrapper justifyContent="space-between" alignItems="center" onClick={() => setIsExpanded((s) => !s)}>
        <QuestionText>{title}</QuestionText>
        <ShowButton>  
          <img src={isExpanded ?'/images/referral/hide.png' : '/images/referral/show.png'} alt="show" />
        </ShowButton>
      </Wrapper>
      <StyledChildrenFlex isExpanded={isExpanded} flexDirection="column">
        {children}
      </StyledChildrenFlex>
    </MainCard>
  )
}

export default QuestionCard
