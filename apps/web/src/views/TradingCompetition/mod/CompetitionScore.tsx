import styled from 'styled-components'
import { Box, Flex, Text } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { useAccount } from 'wagmi'
import { useActiveChainId } from 'hooks/useActiveChainId'
import Image from 'next/image'
import Trans from 'components/Trans'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { localiseTradingVolume } from '../helpers'
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
  position: relative;
  border-radius: 20px;
`
const StepCardInner1 = styled(Box)`
  width: 100%;
  padding: 12px;
  background-image: url(/img/competition/background-score.png);
  background-size: cover;
  background-position: center;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  min-height: 200px;
  position: relative;
  overflow: hidden;
  padding: 10px;
  .card-title {
    position: absolute;
    top: 40px;
    left: 40px;
    z-index: 9;
  }
  .card-text {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding 20% 0 28%;
    padding-left: 32px;
    z-index: 9;
  }
  .card-button {
    position: absolute;
    bottom: 40px;
    left: 40px;
    z-index: 9;
  }
`
const CardGift = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(0, -50%);
  width: 240px;
  z-index: 7;
`
const StepCardInner2 = styled(Box)`
  width: 100%;
  padding: 12px;
  background: #FFF;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  padding: 10px;
`
const RankingTable = styled.table`
  width: 100%;
  thead {
    border-bottom: 1px solid #DAE4FF;
    // display: block;
    tr {
      // display: flex;
      width: 100%;
      // justify-content: space-around;
    }
    th {
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 21px;
      color: #798DC6;
    }
  }
  tbody {
    // display: block;
    max-height: 500px;
    overflow-y: auto;
    tr {
      border-bottom: 1px solid #DAE4FF;
      // display: flex;
      width: 100%;
      // justify-content: space-around;
      td {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 21px;
        color: #2F4DA0;
        padding: 7px 0;
        text-align: center;
      }
    }
  } 
`

const CompetitionScore = (props) => {
  const { t } = useTranslation()
  const { address: account } = useAccount()
  const { isWrongNetwork } = useActiveChainId()
  const ellipsisAddress = (_address: string) => {
    return _address ? `${_address.substring(0, 2)}...${_address.substring(_address.length - 4)}` : '';
  }
  const { rankingData } = props;
  console.log("rankingData: ", rankingData)
  return (
    <Box width="100%">
      <StepContainer>
        <StyledStepCard width="100%">
          <StepCardInner1>
            <CardGift>
              <img src='/img/competition/cup.png' />
            </CardGift>
            <Flex className='card-title'>
              <Text style={{ ...colors.textFamily1, fontSize: 18, color: '#FFF' }}>{t('My Score')}</Text>
            </Flex>
            <Flex className='card-text'>
              <Text style={{ ...colors.textFamily3, fontSize: 32, color: '#FFF' }}>{t('Check your Rank')}</Text>
              <Text style={{ ...colors.textFamily3, fontSize: 18, color: '#FFF' }}>{t('Connect wallet to View')}</Text>
            </Flex>
            {(!account || isWrongNetwork) && <div className='card-button'>
              <ConnectWalletButton scale="sm">
                <Box display={['none', , , 'block']}>
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Text color="invertedContrast" bold fontSize="16px" mr="10px">
                      <Trans>Connect Wallet</Trans>
                    </Text>
                    <Image src="/images/walletButton.png" alt="wallet Image" width={20} height={18} />
                  </div>
                </Box>
                <Box display={['block', , , 'none']}>
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Text color="invertedContrast" bold fontSize="16px" mr="10px">
                      <Trans>Connect</Trans>
                    </Text>
                    <Image src="/images/walletButton.png" alt="wallet Image" width={20} height={18} />
                  </div>
                </Box>
              </ConnectWalletButton>
            </div>}

          </StepCardInner1>
        </StyledStepCard>

        <StyledStepCard width="100%">
          <StepCardInner2>
            <Text style={{ ...colors.textFamily2, color: '#000', fontSize: 22, padding: '20px' }}>{t('Ranking List')}</Text>
            <div style={{ position: 'relative', height: 500, overflow: 'auto' }}>
              <RankingTable>
                <thead>
                  <tr style={{ position: 'sticky', top: 0, backgroundColor: 'white' }}>
                    <th>Place</th>
                    <th>Wallet</th>
                    <th>Tickets Volume</th>
                    <th>Rewards</th>
                  </tr>
                </thead>
                <tbody>
                  {rankingData && rankingData.data.map((data, index) => (
                    <tr key={index}>
                      <td>{data.rank}</td>
                      <td>{ellipsisAddress(data.address)}</td>
                      <td>{localiseTradingVolume(data.volume)} $</td>
                      <td>+134.50 $</td>
                    </tr>
                  ))}
                </tbody>
              </RankingTable></div>
          </StepCardInner2>
        </StyledStepCard>
      </StepContainer>
    </Box>
  )
}

export default CompetitionScore
