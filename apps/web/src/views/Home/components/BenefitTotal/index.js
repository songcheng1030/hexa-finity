import { Flex, Heading, Skeleton, Text, Balance } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { useTranslation } from '@pancakeswap/localization'
import { ArrowForwardIcon, RowType } from '@pancakeswap/uikit'

const BenefitTotalPage = styled.div`
  background-color: #DAE4FF;
  border-radius: 20px;
  padding 30px 30px; 
  margin: 0;
  ${({ theme }) => theme.mediaQueries.md} {
    margin-top: 20px;
    margin-bottom: 40px;
    padding 24px 0 40px; 
  }
`

const Grid = styled.div`
  display: unset;
  margin-top: 24px;

  ${({ theme }) => theme.mediaQueries.md} {
    display: grid;
    grid-template-areas: 'a b c d e';
    grid-gap: 32px;
    grid-template-columns: repeat(5, auto);
  }
`

const ItemTitle = styled.div`
  text-align: center;
  font-size: 16px;
  color: #798DC6;
  font-weight: 400; 
  margin-bottom: 0;
  margin-right: 20px;

  ${({ theme }) => theme.mediaQueries.md} {
    text-align: center;
    font-size: 14px;
    color: #798DC6;
    font-weight: 400;
    margin-bottom: 10px;
  } 
`

const ItemValue = styled.div`
  text-align: center;
  font-size: 16px;
  color: #000000;
  font-weight: 600;
`

const ItemImage = styled.div`
  display: unset;
  margin-right: 10px;

  ${({ theme }) => theme.mediaQueries.md} {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 10px;
  } 
`

const ItemImageGround = styled.div`
  width: 40px;
  height: 40px;
  background-color: #224DDA;
  padding: 8px 7px;
  border-radius: 50%;
`

const Item = styled.div`
  border: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  ${({ theme }) => theme.mediaQueries.md} {
    display: unset;
    border-right: 1px solid #061E63;
  }
`

const ItemLast = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${({ theme }) => theme.mediaQueries.md} {
    display: unset;
  }
`

const BenefitTotal = () => {
  const { t } = useTranslation()

  return (
    <BenefitTotalPage>
      <Grid>
        <Flex flexDirection="column" style={{ gridArea: 'a' }}>
          <Item>
            <ItemImage>
              <ItemImageGround>
                <img style={{height: 24, width: 24}} src="/images/hexa/benefit/benefit21.png" />
              </ItemImageGround>
            </ItemImage>
            <ItemTitle color="textSubtle">{t('Total Volume')}</ItemTitle>
            <ItemValue color="textSubtle">$47.91B</ItemValue>
          </Item>
        </Flex>
        <Flex flexDirection="column" style={{ gridArea: 'b' }}>
          <Item>
            <ItemImage>
              <ItemImageGround>
                <img style={{height: 24, width: 24}} src="/images/hexa/benefit/benefit22.png" />
              </ItemImageGround>
            </ItemImage>
            <ItemTitle color="textSubtle">{t('24H Volume')}</ItemTitle>
            <ItemValue color="textSubtle">$189.80M</ItemValue>
          </Item>
        </Flex>
        <Flex flexDirection="column" style={{ gridArea: 'c' }}>
          <Item>
            <ItemImage>
              <ItemImageGround>
                <img style={{height: 24, width: 24}} src="/images/hexa/benefit/benefit23.png" />
              </ItemImageGround>
            </ItemImage>
            <ItemTitle color="textSubtle">{t('Active users')}</ItemTitle>
            <ItemValue color="textSubtle">433.72K</ItemValue>
          </Item>
        </Flex>
        <Flex flexDirection="column" style={{ gridArea: 'd' }}>
          <Item>
            <ItemImage>
              <ItemImageGround>
                <img style={{height: 24, width: 24}} src="/images/hexa/benefit/benefit24.png" />
              </ItemImageGround>
            </ItemImage>
            <ItemTitle color="textSubtle">{t('Trade Fee Saved')}</ItemTitle>
            <ItemValue color="textSubtle">$115.12M</ItemValue>
          </Item>
        </Flex>
        <Flex flexDirection="column" style={{ gridArea: 'e' }}>
          <ItemLast>
            <ItemImage>
              <ItemImageGround>
                <img style={{height: 24, width: 24}} src="/images/hexa/benefit/benefit25.png" />
              </ItemImageGround>
            </ItemImage>
            <ItemTitle color="textSubtle">{t('LP Earned')}</ItemTitle>
            <ItemValue color="textSubtle">$23.98M</ItemValue>
          </ItemLast>
        </Flex>
      </Grid>
    </BenefitTotalPage>
   
  )
}

export default BenefitTotal
