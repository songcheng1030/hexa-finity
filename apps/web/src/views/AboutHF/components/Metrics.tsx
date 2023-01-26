import { useEffect, useState } from 'react';
import { Box, Button, Flex, Heading, Text, LinkExternal, ArrowForwardIcon } from '@pancakeswap/uikit'
import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
import styled from 'styled-components'
import { useTranslation } from '@pancakeswap/localization'
import Container from 'components/Layout/Container'
import Link from 'next/link'
import ButtonCustom from 'views/Lottery/components/ButtonCustom'

const StyledHero = styled(Box)`
  background: #ECF1FF;
  padding-bottom: 32px;
  padding-top: 32px;
  font-family: 'Poppins';
  font-style: normal;
`
const MetricsCard = styled(Box)`
  flex: 1;
  background: #FFF;
  box-shadow: 2px 14px 68px rgba(26, 35, 74, 0.11);
  border-radius: 20px;
  padding: 36px 24px;
  .hf-header {
    text-align: center;
    color: #000;
    font-size: 22px;
    padding: 12px 0;
  }
`
const MetricsList = styled(Flex)`
  padding: 4px;
  * {
    font-size: 14px;
  }
`
const MetricsLeft = styled(Flex)`
  flex: 3;
  color: var(--colors-poolText);
  padding-top: 12px;
`
const MetricsRight = styled(Flex)`
  flex: 2;
  color: var(--colors-aboutText);
  font-weight: bold;
  padding-top: 12px;
  .pre-icon {
    height: 14px;
    margin-right: 3px;
    margin-left: -20px;
  }
`
const ExternalLinkIcon = styled(LinkExternal)`
  cursor: pointer;
  svg {
    width: 14px;
    height: 14px;
  }
`

const ChartCard = styled(Box)`
  flex: 1;
  background: linear-gradient(270deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 82.34%);
  filter: drop-shadow(2px 14px 68px rgba(26, 35, 74, 0.11));
  border-radius: 20px;
  padding: 24px 8px;
  margin-top: 12px;
  margin-bottom: 12px;
  .recharts-wrapper {
    transform: scale(0.7);
  }
  ${({ theme }) => theme.mediaQueries.md} {
    margin-top: 0;
    margin-bottom: 0;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 36px;
    .recharts-wrapper {
      transform: scale(1);
    }
  }
`
const ChartContainer = styled(Flex)`
  align-items: center;
`
const ChartLegend = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const StyledLegend = styled.div`
  padding: 6px 0;
`
type Item = {title: string, subtitle: string, color: string, subcolor: string}
const LegendItem: React.FC<React.PropsWithChildren<{ item: Item }>> = ({ item }) => {
  return (
    <StyledLegend>
      <Heading color={item.color} style={{fontSize: '24px', fontWeight: 'bold'}}>{item.title}</Heading>
      <Text color={item.subcolor} style={{fontSize: '12px'}}>{item.subtitle}</Text>
    </StyledLegend>
  )
}
const Metrics = () => {
  const { t } = useTranslation()
  const ellipsisAddress = (_address: string) => {
    return _address ? `${_address.substring(0, 4)}...${_address.substring(_address.length - 4)}` : '';
  }
  const onExternal = () => {
    window.open("https://bscscan.com/address/0xe2d3a739effcd3a99387d015e260eefac72ebea1", "_blank");
  }
  let chartSeries = [80.07, 4.3, 9, 1, 5]
  let chartOptions = {
    labels: ["Farms/Launchpools", "Referral Program", "Team", "SAFU", "Investment Fund"],
    legend: { show: false },
    fill: {
      type: 'solid',
      colors: ['#041647', '#8950CF', '#D42F68', '#E6C665', '#72B88D']
    },
    plotOptions: {
      radialBar: {
        size: undefined,
        inverseOrder: false,
        startAngle: 0,
        endAngle: 360,
        offsetX: 0,
        offsetY: 0,
        hollow: {
          margin: 5,
          size: "40%",
          background: "transparent",
        },
        dataLabels: {
          show: true,
          name: {
            fontSize: '24px',
            fontWeight: 'bold'
          },
          value: {
            color: '#2F4DA0',
            offsetY: 5
          },
          total: {
            show: true,
            label: "6T",
            fontSize: '20px',
            color: '#061E63',
            fontWeight: 600,
            formatter: function () { return ("Distribution of"); }
          }
        }
      }
    }
  }
  const [legends, setLegends] = useState<Item[]>([]);
  useEffect(() => {
    let subtitles = chartOptions.labels;
    let titles = chartSeries;
    let colors = chartOptions.fill.colors;
    let subcolors = ['#2F4DA0', '#2F4DA0', '#2F4DA0', '#2F4DA0', '#2F4DA0']
    let newLegends = [];
    for (let i = 0; i < titles.length; i++) {
      newLegends.push({
        title: titles[i] + "%",
        subtitle: subtitles[i],
        color: colors[i],
        subcolor: subcolors[i]
      })
    }
    setLegends(newLegends);
  }, [])
  return (
    <StyledHero>
      <Container>
        <Flex alignItems="center" justifyContent="space-between" flexDirection={['column', 'column', 'column', 'row']}>
          <MetricsCard>
            <Heading className='hf-header'>{t('Hexa Finity Token Metrics')}</Heading>
            <MetricsList>
              <MetricsLeft>{t('Price')}</MetricsLeft>
              <MetricsRight>$1.12</MetricsRight>
            </MetricsList>
            <MetricsList>
              <MetricsLeft>{t('Ticker Symbol')}</MetricsLeft>
              <MetricsRight><img className='pre-icon' src='/img/about_hf/hexa-token-logo.svg' alt='hexa' /> Hexa</MetricsRight>
            </MetricsList>
            <MetricsList>
              <MetricsLeft>{t('Chain')}</MetricsLeft>
              <MetricsRight><img className='pre-icon' src='/img/about_hf/bnb-token-logo.svg' alt='bnb' /> BNB(BEP-20)</MetricsRight>
            </MetricsList>
            <MetricsList>
              <MetricsLeft>{t('Contract Address')}</MetricsLeft>
              <MetricsRight>{ellipsisAddress('0x968C818CA8B9251b393131C08a736A67ccB10dD1')}<ExternalLinkIcon onClick={() => onExternal()} /></MetricsRight>
            </MetricsList>
            <MetricsList>
              <MetricsLeft>{t('Max Supply')}</MetricsLeft>
              <MetricsRight>700 000 000</MetricsRight>
            </MetricsList>
            <MetricsList>
              <MetricsLeft>{t('Total Supply')}</MetricsLeft>
              <MetricsRight>274 787 288</MetricsRight>
            </MetricsList>
            <MetricsList>
              <MetricsLeft>{t('Circulation Supply')}</MetricsLeft>
              <MetricsRight>226 648 386</MetricsRight>
            </MetricsList>
            <MetricsList>
              <MetricsLeft>{t('Burned')}</MetricsLeft>
              <MetricsRight>30 369 628</MetricsRight>
            </MetricsList>
          </MetricsCard>
          <ChartCard>
            {/* <img src='/img/about_hf/metrics-chart.svg' alt='metrics' /> */}
            <ChartContainer justifyContent="space-around" flexDirection={['column', 'column', 'column', 'row']}>
              <Chart
                series={chartSeries}
                // width={320}
                height={320}
                options={chartOptions}
                type="radialBar"
              />
              <ChartLegend>
              {legends.map((legend) => (
                  <LegendItem key={legend.title} item={legend} />
                ))}
              </ChartLegend>
            </ChartContainer>

            <Text color='poolButtonText' style={{ fontSize: 12, textAlign: 'center' }}>{t('Hexa Finity will also allocate 100 million Hexa Finity tokens for Transaction Fee Mining.')}</Text>
          </ChartCard>
        </Flex>
      </Container>
    </StyledHero>
  )
}

export default Metrics
