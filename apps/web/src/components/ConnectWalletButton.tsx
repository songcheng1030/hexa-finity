import { useTranslation } from '@pancakeswap/localization'
import { WalletModalV2 } from '@pancakeswap/ui-wallets'
import { Button, ButtonProps,Text } from '@pancakeswap/uikit'
import { createWallets, getDocLink } from 'config/wallet'
import { useActiveChainId } from 'hooks/useActiveChainId'
import useAuth from 'hooks/useAuth'
// @ts-ignore
// eslint-disable-next-line import/extensions
import { useActiveHandle } from 'hooks/useEagerConnect.bmp.ts'
import { useMemo, useState } from 'react'
import { useConnect } from 'wagmi'
import Trans from './Trans'
import Image from 'next/image'

const ConnectWalletButton = ({ children, startIcon, ...props }: ButtonProps) => {
  const handleActive = useActiveHandle()
  const { login } = useAuth()
  const {
    t,
    currentLanguage: { code },
  } = useTranslation()
  const { connectAsync } = useConnect()
  const { chainId } = useActiveChainId()
  const [open, setOpen] = useState(false)

  const docLink = useMemo(() => getDocLink(code), [code])

  const handleClick = () => {
    if (typeof __NEZHA_BRIDGE__ !== 'undefined') {
      handleActive()
    } else {
      setOpen(true)
    }
  }

  const wallets = useMemo(() => createWallets(chainId, connectAsync), [chainId, connectAsync])

  return (
    <>
      <Button minHeight="45px" onClick={handleClick} {...props}>
        {/* {children || <Trans>Connect Wallet</Trans>} */}
        {children || (
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            {/* {startIcon && <Image src="/images/walletButton.png" alt="wallet Image" width={20} height={18} style={{marginRight: 10}} />} */}
            <Image src="/images/walletButton.png" alt="wallet Image" width={20} height={18} />
            <Text color="invertedContrast" bold fontSize="16px" ml="10px">
              <Trans>Connect Wallet</Trans>
            </Text>
          </div>
        )}
      </Button>
      <WalletModalV2
        docText={t('Learn How to Connect')}
        docLink={docLink}
        isOpen={open}
        wallets={wallets}
        login={login}
        onDismiss={() => setOpen(false)}
      />
    </>
  )
}

export default ConnectWalletButton
