import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'

const TabContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-around;
  padding: 20px;
  padding-bottom: 0px;
`
const TabItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 12px 30px;
  border-radius: 10px;
  color: white;
  font-size: 18px;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 674px) {
    padding: 7px 10px;
    font-size: 14px;
  }
`
const DeActivedTabItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px 30px;
  border-radius: 10px;
  color: black;
  font-size: 18px;
  align-items: center;
  background-color: white;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 674px) {
    padding: 7px 10px;
    font-size: 14px;
  }
`

export default function SwapTab() {
  const router = useRouter()

  const [tapIndex, setTapIndex] = useState(10)

  useEffect(() => {
    console.log(router.pathname)
    if (router.pathname == '/swap') {
      setTapIndex(0)
    } else if (router.pathname == '/liquidity' || router.pathname == '/add/[[...currency]]') {
      setTapIndex(1)
    } else if (router.pathname == '/transactions') {
      setTapIndex(2)
    }
  }, [])

  const handleClick = (href) => {
    let url = href.toLowerCase()
    router.push(`/${url}`)
  }

  return (
    <TabContainer>
      {['Swap', 'Liquidity', 'Transactions'].map((item, index) => {
        return (
          <div onClick={() => handleClick(item)}>
            {tapIndex == index ? (
              <TabItem onClick={() => setTapIndex(index)} key={item}>
                {item}
              </TabItem>
            ) : (
              <DeActivedTabItem onClick={() => setTapIndex(index)} key={item}>
                {item}
              </DeActivedTabItem>
            )}
          </div>
        )
      })}
    </TabContainer>
  )
}
