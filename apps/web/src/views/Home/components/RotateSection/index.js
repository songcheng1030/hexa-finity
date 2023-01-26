import { useEffect, useState } from 'react'
import { SwitchTransition, CSSTransition } from 'react-transition-group'
import styled from 'styled-components'

const IntroBottom = styled.div`
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
  display: flex;
  background-color: #041647;
  .rotate-image {
    width: 32px;
    height: 32px;
    margin-left: 8px;
  }

  .rotate-price {
    display: block;
    color: rgb(255, 255, 255);
    vertical-align: middle;
    font-weight: 600;
    line-height: 1.5;
    font-size: 16px;
    text-align: start;
  }

  .rotate-name {
    display: block;
    color: rgb(116, 155, 216);
    vertical-align: middle;
    font-weight: 400;
    line-height: 1.5;
    margin-right: 8px;
    font-size: 12px;
  }

  .rotate-percentage {
    display: block;
    vertical-align: middle;
    font-weight: 400;
    line-height: 1.5;
    font-size: 12px;
  }

  .rotate-minus {
    color: rgb(249, 59, 93);
  }

  .rotate-plus {
    color: rgb(29, 200, 114);
  }
  .move {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    row-gap: 30px;
    -webkit-box-flex: 1;
    flex-grow: 1;
  }
  .view-all {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    font-size: 16px;
    color: rgb(255, 255, 255);

    svg {
      fill: rgb(255, 255, 255);
      flex-shrink: 0;
      margin-left: 4px;
      transition: transform 0.3s ease 0s;
    }

    &:hover svg {
      transform: translateX(5px);
    }
  }
  @media (max-width: 576px) {
    .move {
      grid-template-columns: repeat(2, 1fr);
      row-gap: 0px;
      margin-right: 24px;
    }
    .view-all {
      display: none;
    }
  }
`

const RotateSectionComponent = ({}) => {
  const content = [
    {
      hash: '0x965f527d9159dce6288a2219db51fc6eef120dd1',
      avatar: '/images/token/bsw.svg',
      name: 'bsw',
      percentage: 9.65,
      price: 1.1,
    },
    {
      hash: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
      avatar: '/images/token/wbnb.svg',
      name: 'wbnb',
      percentage: -0.06,
      price: 576.14,
    },
    {
      hash: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
      avatar: '/images/token/eth.svg',
      name: 'eth',
      percentage: -0.15,
      price: 4219.38,
    },
    {
      hash: '0xba2ae424d960c26247dd6c32edc70b295c744c43',
      avatar: '/images/token/bfg.svg',
      name: 'bfg',
      percentage: 0.02,
      price: 0.03,
    },
    {
      hash: '0xba2ae424d960c26247dd6c32edc70b295c744c43',
      avatar: '/images/token/dot.svg',
      name: 'dot',
      percentage: -3.84,
      price: 40.26,
    },
    {
      hash: '0x0d8ce2a99bb6e3b7db580ed848240e4a0f9ae153',
      avatar: '/images/token/fil.svg',
      name: 'fil',
      percentage: -2.96,
      price: 52.43,
    },
    {
      hash: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
      avatar: '/images/token/btcb.svg',
      name: 'btcb',
      percentage: -0.63,
      price: 57509.71,
    },
    {
      hash: '0x3ee2200efb3400fabb9aacf31297cbdd1d435d47',
      avatar: '/images/token/ada.svg',
      name: 'ada',
      percentage: 0.19,
      price: 1.87,
    },
    {
      hash: '0xba2ae424d960c26247dd6c32edc70b295c744c43',
      avatar: '/images/token/doge.svg',
      name: 'doge',
      percentage: -3.56,
      price: 0.23,
    },
    {
      hash: '0x85eac5ac2f758618dfa09bdbe0cf174e7d574d5b',
      avatar: '/images/token/trx.svg',
      name: 'trx',
      percentage: 1.1,
      price: 0.1,
    },
    {
      hash: '0xf8a0bf9cf54bb92f17374d9e9a321e6a111a51bd',
      avatar: '/images/token/link.svg',
      name: 'link',
      percentage: -3.65,
      price: 27.52,
    },
    {
      hash: '0x1d2f0da169ceb9fc7b3144628db156f3f6c60dbe',
      avatar: '/images/token/xrp.svg',
      name: 'xrp',
      percentage: -1.38,
      price: 1.07,
    },
    {
      hash: '0xbf5140a22578168fd562dccf235e5d43a02ce9b1',
      avatar: '/images/token/uni.svg',
      name: 'uni',
      percentage: -0.69,
      price: 21.05,
    },
  ]
  var currencyFormatter = require('currency-formatter')
  const [state, setState] = useState(true)
  const [countItem, setCountItem] = useState(0)
  const [startPos, setStartPos] = useState(0)
  const [tokenList, setTokenList] = useState([])
  let priceInterval

  useEffect(() => {
    resizeHandler()
    window.addEventListener('resize', resizeHandler)

    return () => {
      window.removeEventListener('resize', resizeHandler)
    }
  }, [])

  useEffect(() => {
    const getTokenList = async () => {
      fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1&sparkline=true&price_change_percentage=7d',
      )
        .then((response) => response.json())
        .then((data) => {
            setTokenList(data)
        })
    }
    getTokenList()
  }, [])

  useEffect(() => {
    setStartPos((startPos + countItem) % 13)
    // eslint-disable-next-line
    priceInterval = setInterval(changeContent, 5000)
  }, [state])

  function resizeHandler() {
    if (window.innerWidth > 800) {
      setCountItem(5)
    } else if (window.innerWidth > 600) {
      setCountItem(4)
    } else if (window.innerWidth > 476) {
      setCountItem(3)
    } else {
      setCountItem(4)
    }
  }

  function changeContent() {
    setState(!state)
    clearInterval(priceInterval)
  }

  return (
    <IntroBottom>
      <div className="move">
        {new Array(countItem).fill(1).map(function (item, index) {
          return (
            <SwitchTransition mode={'out-in'} key={index}>
              <CSSTransition
                key={state}
                addEndListener={(node, done) => {
                  node.addEventListener('transitionend', done, false)
                }}
                classNames="fade"
              >
                <div className="button-container">
                  <div>
                    <a
                      href={'https://exchange.tally.org/#/swap?outputCurrency=' + tokenList[(startPos + index) % 13]}
                      style={{ display: 'flex', alignItems: 'center' }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <span color="textSubtle" className="rotate-name">
                            {tokenList[(startPos + index) % 13]?.symbol.toUpperCase()}
                          </span>
                          <span
                            color="success"
                            className={
                              tokenList[(startPos + index) % 13]?.market_cap_change_percentage_24h > 0
                                ? 'rotate-percentage rotate-plus'
                                : 'rotate-percentage rotate-minus'
                            }
                          >
                            {tokenList[(startPos + index) % 13]?.market_cap_change_percentage_24h > 0 ? '+' : ''}
                            {currencyFormatter.format(tokenList[(startPos + index) % 13]?.market_cap_change_percentage_24h, {
                              symbol: '%',
                              decimal: '.',
                              thousand: ' ',
                              precision: 2,
                              format: '%v%s',
                            })}
                          </span>
                        </div>
                        <span color="contrast" className="rotate-price">
                          ${tokenList[(startPos + index) % 13]?.current_price}
                        </span>
                      </div>
                      <img src={tokenList[(startPos + index) % 13]?.image} className="rotate-image" alt="svg" />
                    </a>
                  </div>
                </div>
              </CSSTransition>
            </SwitchTransition>
          )
        })}
      </div>

      <a className="view-all" href="/analytics">
        <span>All Markets</span>
        <svg viewBox="0 0 24 24" width="24px" color="contrast" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.29006 15.88L13.1701 12L9.29006 8.12001C8.90006 7.73001 8.90006 7.10001 9.29006 6.71001C9.68006 6.32001 10.3101 6.32001 10.7001 6.71001L15.2901 11.3C15.6801 11.69 15.6801 12.32 15.2901 12.71L10.7001 17.3C10.3101 17.69 9.68006 17.69 9.29006 17.3C8.91006 16.91 8.90006 16.27 9.29006 15.88Z"></path>
        </svg>
      </a>
    </IntroBottom>
  )
}

export default RotateSectionComponent
