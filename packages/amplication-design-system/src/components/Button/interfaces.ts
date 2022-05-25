export enum EnumButtonStyle {
  Primary = "primary",
  Secondary = "secondary",
  CallToAction = "call-to-action",
  Clear = "clear",
  Danger = "danger",
}

export enum ButtonVariant {
  Text = 'text',
  Contained = 'contained',
  OutLined = 'outlined',
  Link = 'link'
}

export enum ButtonSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large'
}

export type ButtonProps = {
  useStyle?: string
  /** The display style of the button */
  color?: EnumButtonStyle;
  variant?: ButtonVariant;
  size?: ButtonSize;
  startIcon?: string;
  endIcon?: string;
  'aria-label'?: string;
  dataId?: string
  dataKey?: string
  css?: string;
}

export interface BaseObj {
  [key: string]: any
}