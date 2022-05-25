import React, { isValidElement } from 'react'
import MUIButton from '@mui/material/Button'
import isEqual from 'lodash/isEqual'
import { BaseObj, ButtonProps, ButtonSize, ButtonVariant, EnumButtonStyle } from './interfaces'

// import Icon from './components'

export const setDataAttribute = (str: string, key?: string) =>
  process.env.NODE_ENV !== 'production' && str ? (!key ? { 'data-testid': str } : { [`data-${key}`]: str }) : {}


const AMPButton: React.FC<ButtonProps> = (props) => {
  const {
    useStyle = 'useDefaultStyle',
    color = EnumButtonStyle.Primary,
    variant = ButtonVariant.Contained,
    size = ButtonSize.Medium,
    startIcon,
    dataId = 'amplication-btn',
    dataKey,
    endIcon,
    children,
    'aria-label': ariaLabel,
    css,
    ...RestProps
  } = props
  const { useRootStyle } = require(`./useStyles/${useStyle}`).default;
  const classes = useRootStyle(props);

  const aria_label = ariaLabel && ariaLabel.length ? ariaLabel : typeof children === 'string' ? children : 'button'
  // we need to address the color issue:
  //   * convert material ui theme to Amplication design system color pallet.
  //   * run over css with classes and css variables
  // Regard classes issue:
  //  * use props and makeStyle to change css within material ui
  //  * use class names and css/sass files to change configuration


  // <FormControl {...restProps} className={classes.root}>
  //   <InputLabel useStyle={useStyle} shrink htmlFor={id} {...labelProps} />
  //   <Input useStyle={useStyle} id={id} disableUnderline {...InputProps} />
  //   <HelperText useStyle={useStyle} {...helperTextProps} />
  // </FormControl>
  return children ? (
    <MUIButton
     {...RestProps}
     {...setDataAttribute(dataId, dataKey)}
     aria-label={aria_label}
     className={`${}`}
     startIcon={startIcon && <Icon />}
     endIcon={endIcon && <Icon />}
     >
       {children}
     </MUIButton>
  ) : <></>
}

export default React.memo(AMPButton, (prevProps: BaseObj, nextProps: BaseObj) => isEqual(prevProps, nextProps))
