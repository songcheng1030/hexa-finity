import { atoms } from '@pancakeswap/ui/css/atoms'
import { responsiveStyle } from '@pancakeswap/ui/css/responsiveStyle'
import { style, keyframes } from '@vanilla-extract/css'

const promotedGradientKf = keyframes({
  '0%': {
    backgroundPosition: '50% 0%',
  },
  '50%': {
    backgroundPosition: '50% 100%',
  },
  '100%': {
    backgroundPosition: '50% 0%',
  },
})

export const promotedGradientClass = style([
  atoms({
    // background: 'gradientBold',
  }),
  style({
    animation: `${promotedGradientKf} 3s ease infinite`,
    backgroundSize: '400% 400%',
  }),
])

export const modalWrapperClass = style([
  style({
    display: 'flex',
  }),
  responsiveStyle({
    xs: {
      width: '100%',
      marginBottom: 0,
    },
    md: {
      height: '490px',
    },
    lg: {
      width: '792px',
    },
  }),
])

export const AskArea = style(
  { 
    display: 'flex', 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginLeft: 32, 
    marginTop:20,
  }
)

export const desktopWalletSelectionClass = style(
  responsiveStyle({
    xs: {
      maxWidth: '100%',
      width:'100%'
    },
    sm: {
      maxWidth: '100%',
      width:'100%'
    },
    lg: {
      maxWidth: '600px',
      width:'500px'
    },
  }),
)

export const walletSelectWrapperClass = style(
  responsiveStyle({
    xs: {
      gridTemplateColumns: '1fr 1fr',
      rowGap: '10px',
      columnGap: '8px',
    },
    sm: {
      rowGap: '16px',
      columnGap: '16px',
      gridTemplateColumns: '1fr 1fr',
    },
    lg: {
      gridTemplateColumns: '1fr 1fr',
    },
  }),
)

export const walletIconClass = style({
  width: '150px',
  height: '60px',
  borderRadius: '12px',
  backgroundColor:'#E9F7FF'
})
