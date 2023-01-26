import { ReactElement } from "react";
import { Button, ButtonProps } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { useTheme } from 'styled-components'

interface CustomButtonProps extends ButtonProps {
  disabled?: boolean
  themeMode?: string
  buttonText?: string
  isIcon?: boolean
  icon?: ReactElement
}

const ButtonCustom: React.FC<React.PropsWithChildren<CustomButtonProps>> = ({
  disabled,
  themeMode,
  buttonText = "More Details",
  isIcon = false,
  icon,
  ...props
}) => {
  const { t } = useTranslation()
  const { isDark } = useTheme()

  const themeStr = themeMode ?? (isDark ? 'dark' : 'light')

  return (
    <Button data-theme={themeStr} {...props} disabled={disabled} onClick={props.onClick}>
      {buttonText}
      {isIcon && <div style={{ paddingLeft: 5}}>{icon}</div>}
    </Button>
  )
}

export default ButtonCustom
