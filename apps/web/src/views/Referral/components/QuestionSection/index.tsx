import { useTranslation } from '@pancakeswap/localization'
import { Box, Container, Flex, Heading, Text } from '@pancakeswap/uikit'
import styled from 'styled-components'
import QuestionCard from './QuestionCard'
import { questions_l, questions_r } from './data'

const QuestionContainer = styled(Flex)`
  width: 100%;
  justify-content: space-between;
  display: grid;
  grid-template-columns: repeat(1, 100%);
  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(2, 48.5%);
  }
`
const AnswerText = styled(Text)`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 17px;
  }
  line-height: 24px;
  color: #2f4da0;
`
const TextStyle = {
  fontFamily: 'Poppins',
  fontStyle: 'normal',
}

const LeftContent = styled.div``
const RightContent = styled.div`
  float: right;
`
const QuestinSection: React.FC<React.PropsWithChildren> = () => {
  const { t } = useTranslation()
  return (
    <>
      <Container>
        <Box width="100%">
          <Heading
            mt="50px"
            mb="48px"
            style={{
              ...TextStyle,
              textAlign: 'center',
              color: '#000',
              fontSize: '26px',
              lineHeight: '39px',
              fontWeight: 600,
            }}
          >
            {t('Frequently Asked Questions')}
          </Heading>
          <QuestionContainer>
            <LeftContent>
              {questions_l.map((item, index) => {
                return (
                  <QuestionCard key={index} title={item.question}>
                    <AnswerText>{item.answer}</AnswerText>
                  </QuestionCard>
                )
              })}
            </LeftContent>
            <RightContent>
              {questions_r.map((item, index) => {
                return (
                  <QuestionCard key={index} title={item.question}>
                    <AnswerText>{item.answer}</AnswerText>
                  </QuestionCard>
                )
              })}
            </RightContent>
          </QuestionContainer>
        </Box>
      </Container>
    </>
  )
}

export default QuestinSection
