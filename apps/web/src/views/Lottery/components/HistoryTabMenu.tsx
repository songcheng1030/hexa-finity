import { ButtonMenu, ButtonMenuItem, CustomButtonMenu } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'

const HistoryTabMenu = ({ setActiveIndex, activeIndex }) => {
  const { t } = useTranslation()

  return (
    <CustomButtonMenu activeIndex={activeIndex} onItemClick={setActiveIndex} scale="sm" backgroundColor='white' borderColor='white' borderWidth='1px' >
      <ButtonMenuItem>{t('All History')}</ButtonMenuItem>
      <ButtonMenuItem>{t('Your History')}</ButtonMenuItem>
    </CustomButtonMenu>
  )
}

export default HistoryTabMenu
