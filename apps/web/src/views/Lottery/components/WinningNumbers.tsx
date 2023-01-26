import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Flex, FlexProps } from '@pancakeswap/uikit'
import random from 'lodash/random'
import uniqueId from 'lodash/uniqueId'
import { parseRetrievedNumber } from '../helpers'

interface WinningNumbersProps extends FlexProps {
  number: string
  size?: string
  fontSize?: string
  rotateText?: boolean
}
const DrawNumberImg = styled.img`
  width: 50%;
  height: 50%;
  padding: 0 5px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 100%;
    height: 100%;
  }
`
const WinningNumbers: React.FC<React.PropsWithChildren<WinningNumbersProps>> = ({
  number,
  rotateText,
  ...containerProps
}) => {
  const [rotationValues, setRotationValues] = useState([])
  const reversedNumber = parseRetrievedNumber(number)
  const numAsArray = reversedNumber.split('')

  useEffect(() => {
    if (rotateText && numAsArray && rotationValues.length === 0) {
      setRotationValues(numAsArray.map(() => random(-30, 30)))
    }
  }, [rotateText, numAsArray, rotationValues])

  return (
    <Flex justifyContent="space-between" mt={24} mb={24} {...containerProps}>
      {numAsArray.map((num, index) => {
        return (
          <DrawNumberImg src={`/img/lottery/number-${num}.png`} key={uniqueId()} />
        )
      })}
    </Flex>
  )
}

export default WinningNumbers
