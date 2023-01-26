import styled from 'styled-components'
import { useAccount } from 'wagmi'
import { useTranslation } from '@pancakeswap/localization'
import { usePoolsPageFetch, usePoolsWithVault } from 'state/pools/hooks'
import PoolRow, { VaultPoolRow } from './components/PoolsTable/PoolRow'
import { ArrowForwardIcon, Link } from '@pancakeswap/uikit'

const StyledTable = styled.div`
  border-radius: ${({ theme }) => theme.radii.default};
  scroll-margin-top: 64px;

  background-color: ${({ theme }) => theme.card.background};
  > div:not(:last-child) {
    border-bottom: 2px solid ${({ theme }) => theme.colors.disabled};
  }
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
`;

const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
  padding: 32px 32px;
`;

const Title = styled.div`
  font-size: 22px;
  font-weight: 600;
`;

const ArrowButton = styled.div`
  corsor: pointer;
  border-radius: ${({ theme }) => theme.radii.small};
  padding: 7px 5px 1px 5px;
  background-color: #EBEFF9;
`;

// const StyledTableBorder = styled.div`
//   border-radius: ${({ theme }) => theme.radii.default};
//   background-color: ${({ theme }) => theme.colors.cardBorder};
//   width: 100%;
//   padding: 1px 1px 1px 1px;
//   background-size: 400% 400%;
// `;

const Pools: React.FC<React.PropsWithChildren> = () => {
  const { t } = useTranslation()
  const { address: account } = useAccount()
  const { pools, userDataLoaded } = usePoolsWithVault()

  usePoolsPageFetch()

  return (
      <StyledTable>
        <TableHeader>
          <Title>Launchpools</Title>
          <Link href="/pools" external>
            <ArrowButton>
              <ArrowForwardIcon color="#798DC6" />
            </ArrowButton>
          </Link>
        </TableHeader>
        
        {pools.map((pool, index) =>
          pool.vaultKey ? (
            // <VaultPoolRow
            //   key={pool.vaultKey}
            //   vaultKey={pool.vaultKey}
            //   account={account}
            // />
            <></>
          ) : ( index <= 5 && (
              <PoolRow
                key={pool.sousId}
                sousId={pool.sousId}
                account={account}
              />
            )
          ),
        )}
      </StyledTable>
  )
}

export default Pools
