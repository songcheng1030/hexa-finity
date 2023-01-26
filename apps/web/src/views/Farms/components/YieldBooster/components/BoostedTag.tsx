import { RocketIcon, Tag, TagProps } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { memo } from 'react'

interface BoostedTag extends TagProps {
  // Add Object to bypass typescript warning
  style?: object
}

const BoostedTag: React.FC<BoostedTag> = (props) => {
  const { t } = useTranslation()
  return (
    <Tag      
      style={{ background: '#F7931A', color: 'white', paddingLeft: '12px', paddingRight: '12px' }}         
      {...props}
    >
      {t('Boosted')}
    </Tag>
  )
}

export default memo(BoostedTag)
