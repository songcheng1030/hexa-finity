import styled from 'styled-components'
import { Box, Flex, Text, QuestionHelper, HistoryIcon } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { colors } from '../styles'

const StepContainer = styled(Flex)`
  gap: 24px;
  width: 100%;
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
  }
`
const StyledStepCard = styled(Box)`
  display: flex;
  position: relative;
  border-radius: 20px;
`
const StepCardInner = styled(Box)`
  width: 100%;
  padding: 12px;
  display: flex;
  flex-direction: column;
`
const Title = styled(Text)`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 33px;
  color: #000000;
  padding: 32px 0;
`
const Description = styled(Text)`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: #2F4DA0;
  padding: 8px 0;
`
const Description1 = styled(Text)`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: var(--colors-primary);
  padding: 8px 0;
`
const ListItem = styled.div`
  display: flex;
  img {
    width: 10px;
    height: 10px;
    margin-top: 13px;
    margin-right: 24px;
  }
`
const RuleCard = styled(Box)`
  width: 100%;
`
const CardHeader = styled(Box)`
  background: var(--colors-primary);
  width: 100%;
  padding: 12px 18px;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
  font-size: 14px;
  color: var(--colors-white);
`
const CardBody = styled(Box)`
  width: 100%;
  padding: 12px 18px;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  background: var(--colors-white);
`

const CompetitionRules: React.FC<React.PropsWithChildren> = () => {
  const { t } = useTranslation()

  return (
    <Box width="100%">
      <StepContainer>
        <StyledStepCard width="100%">
          <StepCardInner>
            <Title>{t('Rules')}</Title>
            <Description>
              {t('All the users that have bought at least one lottery ticket during the competition period automatically become the participants of the contest.')}
            </Description>
            <Description />
            <StepContainer>
              <RuleCard>
                <CardHeader>{t('Period')}</CardHeader>
                <CardBody>
                  <Flex>
                    <img src='/img/competition/rocket-black.svg' style={{ marginRight: 12 }} />
                    <Description>17 Apr 2022 9:00 am</Description>
                  </Flex>
                  <Flex>
                    <img src='/img/competition/flag-black.svg' style={{ marginRight: 12 }} />
                    <Description>24 Apr 2022 9:00 am</Description>
                  </Flex>
                </CardBody>
              </RuleCard>
              <RuleCard>
                <CardHeader>{t('Condition For Participation')}</CardHeader>
                <CardBody>
                  <Flex>
                    <Description>{t('A user has to purchase at least one lottery ticket.')}</Description>
                  </Flex>
                  <Description />
                </CardBody>
              </RuleCard>
            </StepContainer>
            <Description />
            <StepContainer>
              <RuleCard>
                <CardHeader>{t('Competition A')}</CardHeader>
                <CardBody>
                  <Flex>
                    <Description>{t('First 100 participants ranked by the highest tickets volume during the competition period will share 94% of the prize.')}</Description>
                  </Flex>
                </CardBody>
              </RuleCard>
            </StepContainer>
            <Description />
            <StepContainer>
              <RuleCard>
                <CardBody style={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}>
                  <Flex justifyContent='space-around'>
                    <Description>{t('Ranking')}</Description>
                    <Description1>{t('Reward')}</Description1>
                  </Flex>
                </CardBody>
              </RuleCard>
            </StepContainer>
            <StepContainer style={{ margin: '4px 0' }}>
              <RuleCard>
                <CardBody style={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}>
                  <Flex justifyContent='space-around'>
                    <Description>1</Description>
                    <Description1>{t('30% of pool')}</Description1>
                  </Flex>
                </CardBody>
              </RuleCard>
            </StepContainer>
            <StepContainer>
              <RuleCard>
                <CardBody style={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}>
                  <Flex justifyContent='space-around'>
                    <Description>2-100</Description>
                    <Description1>{t('64% of pool')}</Description1>
                  </Flex>
                </CardBody>
              </RuleCard>
            </StepContainer>
            <Description />
            <StepContainer>
              <RuleCard>
                <CardHeader>{t('Competition B')}</CardHeader>
                <CardBody>
                  <Flex>
                    <Description>
                      {t('Users ranked on the')} &nbsp;
                      <span style={{color: '#11A9FF'}}>9, 19, 29, 39, 49, 59, 69, 79, 89, 99</span>
                      &nbsp;{t('places based on their tickets volume during the competition period will be eligible for additional reward accounting for 0.6% of the total prize pool.')}
                    </Description>
                  </Flex>
                </CardBody>
              </RuleCard>
            </StepContainer>
          </StepCardInner>
        </StyledStepCard>

        <StyledStepCard width="100%">
          <StepCardInner>
            <Title>{t('Terms & Conditions')}</Title>
            <ListItem>
              <img src='/img/competition/arrow.svg' />
              <Description>
                {t('Condition for participation: a user has to purchase at least one lottery ticket')}
              </Description>
            </ListItem>
            <ListItem>
              <img src='/img/competition/arrow.svg' />
              <Description>
                {t('All the rewards will be distributed within 72 hours and credited to your competition balance after the end of the tournament.')}
              </Description>
            </ListItem>
            <ListItem>
              <img src='/img/competition/arrow.svg' />
              <Description>
                {t('5% from every purchased lottery ticket will be allocated to the prize pool')}
              </Description>
            </ListItem>
            <ListItem>
              <img src='/img/competition/arrow.svg' />
              <Description>
                {t('All the rewards will be credited to the winners in HEXA tokens')}
              </Description>
            </ListItem>
            <ListItem>
              <img src='/img/competition/arrow.svg' />
              <Description>
                {t('The rewards for the Lottery Competition A will be proportionally split depending on each user’s total tickets volume for the following places: 2-100.')}
              </Description>
            </ListItem>
            <ListItem>
              <img src='/img/competition/arrow.svg' />
              <Description>
                {t('For instance, the prize pool for 2-100 positions accounts for $5,000 dollars and the total tickets volume is $1,000,000. A user ranked on the 5th place during the competition period bought lottery tickets for the total amount of $20,000. This accounts for 2% from the total tickets volume for positions 2-100. Hence, the user gets $100 (2% from $5 000)')}
              </Description>
            </ListItem>
            <ListItem>
              <img src='/img/competition/arrow.svg' />
              <Description>
                {t('HexaFinity reserves the right to cancel or amend any Activity or Activity Rules at its sole discretion.')}
              </Description>
            </ListItem>
          </StepCardInner>
        </StyledStepCard>
      </StepContainer>
    </Box>
  )
}

export default CompetitionRules
