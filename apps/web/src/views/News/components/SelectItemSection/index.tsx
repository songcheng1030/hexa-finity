import styled from 'styled-components'
import { Box, Flex, Text, Heading, Link, Image, useMatchBreakpoints, Button } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import Container from 'components/Layout/Container'
import { useState } from 'react'

const SectionWapper = styled(Box)`
  padding-left: 10px;
  padding-right: 10px;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 20px;
    padding-right: 20px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    padding-left: 0;
    padding-right: 0;
  }
`
const ItemsContent = styled(Flex)`
  width: 100%;
  align-items: center;
  grid-gap: auto;
  display: grid;
  grid-template-columns: repeat(1, 100%);
  justify-content: space-between;
  ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: repeat(2, 48.6%);
  }

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(3, 32%);
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    grid-template-columns: repeat(3, 32.2%);
  }
`
const CardContainer = styled.div`
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-top: 15px;
  ${({ theme }) => theme.mediaQueries.sm} {
    margin-top: 17px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    margin-top: 21px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-top: 24px;
  }
`
const StyledItemCard = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ecf1ff;
  :hover {
    background: #eae9fd;
  }
  border-radius: 5px;
  padding-top: 28px;
  padding-bottom: 28px;
  .name {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    ${({ theme }) => theme.mediaQueries.sm} {
      font-size: 16px;
    }
    ${({ theme }) => theme.mediaQueries.md} {
      font-size: 14px;
    }
    ${({ theme }) => theme.mediaQueries.lg} {
      font-size: 18px;
    }
    line-height: 27px;
    color: #11a9ff;
  }
`
type ItemType = {
  item: any
  selectedItem: number
  setSelectedItem: (selectedItem: number) => void
}

const SelectItem: React.FC<React.PropsWithChildren<ItemType>> = (props) => {
  const { t } = useTranslation()
  const { item, selectedItem, setSelectedItem } = props
  return (
    <CardContainer
      onClick={() => {
        setSelectedItem(item.index)
      }}
    >
      {selectedItem !== item.index ? (
        <StyledItemCard width="100%">
          <Text className="name">{item.name}</Text>
        </StyledItemCard>
      ) : (
        <StyledItemCard width="100%" style={{ background: '#11A9FF' }}>
          <Text className="name" style={{ color: '#ffffff' }}>
            {item.name}
          </Text>
        </StyledItemCard>
      )}
    </CardContainer>
  )
}

const SelectItemSection: React.FC<React.PropsWithChildren> = () => {
  const { t } = useTranslation()
  const [selectedItem, setSelectedItem] = useState(0)
  const items: any[] = [
    {
      index: 0,
      name: 'HexaFinity Space Agents Program',
    },
    {
      index: 1,
      name: 'HexaFinity x Binance',
    },
    {
      index: 2,
      name: 'HexaFinity NFT',
    },
    {
      index: 3,
      name: 'Announcement',
    },
    {
      index: 4,
      name: 'HexaFinity Collaborations',
    },
    {
      index: 5,
      name: 'HexaFinity | Project Overview',
    },
    {
      index: 6,
      name: 'Events',
    },
    {
      index: 7,
      name: 'Education Hub',
    },
    {
      index: 8,
      name: 'FAQ',
    },
  ]
  return (
    <SectionWapper width="100%">
      <ItemsContent>
        {items.map((item, index) => (
          <SelectItem key={index} item={item} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
        ))}
      </ItemsContent>
    </SectionWapper>
  )
}

export default SelectItemSection
