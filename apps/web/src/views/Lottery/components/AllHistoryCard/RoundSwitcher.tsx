import styled from 'styled-components'
import { IconButton, ArrowForwardIcon, ArrowBackIcon, ArrowLastIcon, Flex, Heading, Input, Text, Skeleton, ChevronLeftIcon, ChevronRightIcon } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { getDrawnDate } from '../../helpers'

const StyledInput = styled(Input)`
  width: 80px;
  height: 45px;
  border: 1px solid #FFFFFF;
  border-radius: 10px;
  background-color: transparent;
  color: #FFF;
  text-align: center;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
`
const StyledIconWrapper = styled.div<{ active: boolean }>`
  width: 45px;
  height: 45px;
  border-radius: 9px;
  background-color: ${({ active }) => active ? '#11A9FF' : '#FFF'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 3px;
`
const StyledIconButton = styled(IconButton)`
  width: 32px;
  :disabled {
    background: none;
    svg {
      fill: ${({ theme }) => theme.colors.textDisabled};

      path {
        fill: ${({ theme }) => theme.colors.textDisabled};
      }
    }
  }
`
const RoundHeading = styled(Heading)`
  display: none;
  margin-right: 8px;
  fontFamily: 'Poppins',
  fontStyle: 'normal',
  font-size: 20px;
  color: #FFF;
  font-weight: 600;
  ${({ theme }) => theme.mediaQueries.md} {
    display: unset;
  }
`
const DrawnText = styled(Text)`
  display: none;
  padding-left: 12px;
  fontFamily: 'Poppins',
  fontStyle: 'normal',
  font-size: 14px;
  color: #FFF;
  font-weight: 400;
  ${({ theme }) => theme.mediaQueries.md} {
    display: unset;
  }
`
interface RoundSwitcherProps {
  isLoading: boolean
  selectedRoundId: string
  mostRecentRound: number
  handleInputChange: (event: any) => void
  handleArrowButtonPress: (targetRound: number) => void
  selectedLotteryNodeData: any
}

const RoundSwitcher: React.FC<React.PropsWithChildren<RoundSwitcherProps>> = ({
  isLoading,
  selectedRoundId,
  mostRecentRound,
  handleInputChange,
  handleArrowButtonPress,
  selectedLotteryNodeData
}) => {
  const { t, currentLanguage: { locale } } = useTranslation()
  const selectedRoundIdAsInt = parseInt(selectedRoundId, 10)

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.validity.valid) {
      handleInputChange(e)
    }
  }

  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Flex alignItems="center">
        <RoundHeading>{t('Round')}</RoundHeading>
        <StyledInput
          pattern="^[0-9]+$"
          inputMode="numeric"
          disabled={isLoading}
          id="round-id"
          name="round-id"
          value={selectedRoundId}
          scale="lg"
          onChange={handleOnChange}
        />
        {selectedRoundId ? (
          selectedLotteryNodeData?.endTime ? (
            <DrawnText>
              {t('Drawn')} {getDrawnDate(locale, selectedLotteryNodeData.endTime)}
            </DrawnText>
          ) : (
            <Skeleton width="185px" height="21px" />
          )
        ) : null}
      </Flex>
      <Flex alignItems="center">
        <StyledIconWrapper active={(selectedRoundIdAsInt > 1)}>
          <StyledIconButton
            disabled={!selectedRoundIdAsInt || selectedRoundIdAsInt <= 1}
            onClick={() => handleArrowButtonPress(selectedRoundIdAsInt - 1)}
            variant="text"
            scale="sm"
            mr="4px"
          >
            <ChevronLeftIcon color='white' />
          </StyledIconButton>
        </StyledIconWrapper>
        <StyledIconWrapper active={!(selectedRoundIdAsInt >= mostRecentRound)}>
          <StyledIconButton
            disabled={selectedRoundIdAsInt >= mostRecentRound}
            onClick={() => handleArrowButtonPress(selectedRoundIdAsInt + 1)}
            variant="text"
            scale="sm"
            mr="4px"
          >
            <ChevronRightIcon color={selectedRoundIdAsInt >= mostRecentRound ? '#000' : '#FFF'} />
          </StyledIconButton>
        </StyledIconWrapper>
        <StyledIconWrapper active={!(selectedRoundIdAsInt >= mostRecentRound)}>
          <StyledIconButton
            disabled={selectedRoundIdAsInt >= mostRecentRound}
            onClick={() => handleArrowButtonPress(mostRecentRound)}
            variant="text"
            scale="sm"
          >
            {selectedRoundIdAsInt >= mostRecentRound ? <img src='/img/lottery/arrow-last.svg' /> : <img src='/img/lottery/arrow-last-active.svg' />}
          </StyledIconButton>
        </StyledIconWrapper>
      </Flex>
    </Flex>
  )
}

export default RoundSwitcher
