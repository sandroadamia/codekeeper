import React, { ReactNode } from 'react';
import { styled, CSS, VariantProps } from '../../theme';

const ButtonBase = styled('button', {
  lineHeight: '$base',
  display: 'inline-flex',
  appearance: 'none',
  alignItems: 'center',
  cursor: 'pointer',
  justifyContent: 'center',
  position: 'relative',
  fontWeight: '$normal',
  fontFamily: '$primary',
  whiteSpace: 'nowrap',
  borderRadius: '$1px',
  fontSize: '$md',
  border: '0',
  WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
  WebkitTextSizeAdjust: '100%',
  WebkitFontSmoothing: 'antialiased',
  boxSizing: 'border-box',
  outline: 'none',
  WebkitAppearance: 'button',
  verticalAlign: 'baseline',
  textDecoration: 'none',
  letterSpacing: '1px',
  textAlign: 'center',
  boxShadow: 'none',
  [`& svg`]: {
    display: 'inline-block',
    verticalAlign: 'middle',
    height: '$6',
    fontFamily: '$primary',
    fill: 'white',
    // marginLeft: '0.625rem',
    // marginRight: '0.625rem',
    '&:hover': {
      '& span': {
        color: 'white'
      },
      '& svg': {
        color: 'white'
      }
    }
  },
  variants: {
    variant: {
      primary: {
        fontWeight: '$normal',
        lineHeight: '$base',
        color: 'white',
        backgroundColor: 'black',
        boxShadow: 'none',
        '&:hover': {
          color: '#fff',

        },
        '&:focus': {
          color: "#fff",
          boxShadow: "#3182ce 0px 0px 0px 2px"
        },
        '&:active': {
          color: "#fff",
        },
        [`& svg`]: {
          fill: 'white',
        },
      },
      secondary: {
        fontWeight: '$regular',
        lineHeight: '$base',
        color: 'black',
        backgroundColor: 'white',
        boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.1)',
        '&:hover': {
          boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.5)',
        },
        '&:focus': {
          boxShadow: "#3182ce 0px 0px 0px 2px"
        },
        '&:active': {

        },
        [`& svg`]: {
          fill: '#0071F3',
        },
      },
      ghost: {
        cursor: "pointer",
        WebkitAppearance: "button",
        whiteSpace: "nowrap",
        verticalAlign: "middle",
        textDecoration: "none",
        fontFamily: "$primary",
        fontWeight: '$regular',
        letterSpacing: ".3px",
        color: "#2A333D",
        lineHeight: '$base',
        outline: "none",
        border: "none",
        backgroundColor: "transparent",
        boxShadow: "none",
        textTransform: "none",
        padding: '0px',
        minWidth: 'auto',
        "&:hover": {
        },
        "&:active": {
        },
        "&:focus": {
        }
      },
      link: {
        cursor: "pointer",
        WebkitAppearance: "button",
        whiteSpace: "nowrap",
        verticalAlign: "middle",
        textDecoration: "none",
        fontFamily: "$primary",
        fontWeight: '$semiBold',
        letterSpacing: ".3px",
        color: "#black",
        lineHeight: '$base',
        outline: "none",
        display: "inline-flex",
        border: "none",
        backgroundColor: "transparent",
        boxShadow: "none",
        textTransform: "none",
        padding: '0px',
        minWidth: 'auto',
        "&:hover": {
          textDecoration: 'underline',
        },
        "&:active": {
          textDecoration: 'underline',
        },
        "&:focus": {
        }
      },
      square: {
        background: 'white',
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",
        paddingLeft: "0.5rem",
        paddingRight: "0.5rem",
        [`& svg`]: {
          margin: '0',
        }
      }      
    },
    size: {
      default: {
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem',
        paddingLeft: '1rem',
        paddingRight: '1rem',
      },
      compact: {
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",
        paddingLeft: "0.5rem",
        paddingRight: "0.5rem"
      },
      square: {
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",
        paddingLeft: "0.5rem",
        paddingRight: "0.5rem",
        [`& svg`]: {
          margin: '0',
        }
      },
      large: {
        padding: "0.75rem 2rem",
      }
    },
    full: {
      true: {
        width: '$full',
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",
        paddingLeft: "1rem",
        paddingRight: "1rem"
      },
    },
    iconLeft: {
      true: {},
    },
    iconRight: {
      true: {},
    },
    isDisabled: {
      true: {
        color: '#b1b1b1',
        border: 'solid 1px transparent',
        userSelect: 'none',
        fontWeight: '$regular',
        cursor: 'not-allowed',
        [`& svg`]: {
          opacity: .4,
        },
        '&:hover': {
          color: '#b1b1b1',
        }
      }
    }
  },
  compoundVariants: [
    {
      variant: 'ghost',
      size: 'square',
      css: {
        background: 'transparent'
      },
    },
    {
      size: 'default',
      iconLeft: 'true',
      css: {
        [`& svg`]: {
          marginRight: '0.625rem',
        },
      },
    },
    {
      size: 'compact',
      iconLeft: 'true',
      css: {
        [`& svg`]: {
          marginRight: '0.625rem',
        },
      },
    },
    {
      size: 'default',
      iconRight: 'true',
      css: {
        [`& svg`]: {
          marginLeft: '0.625rem',
        },
      },
    },    
    {
      size: 'compact',
      iconRight: 'true',
      css: {
        [`& svg`]: {
          marginLeft: '0.625rem',
        },
      },
    },
    {
      variant: 'ghost',
      iconLeft: 'true',
      size: 'compact',
      css: {
        [`& svg`]: {
          marginRight: '0.625rem',
        },
      },
    },
    {
      variant: 'secondary',
      size: 'square',
      isDisabled: 'true',
      css: {
        '&:hover': {
          backgroundColor: '#f7fbff'
        }
      }
    }
  ],
  defaultVariants: {
    variant: 'primary',
    size: 'default'
  }
})

type ButtonCSSProp = { css?: CSS };
type ButtonVariants = VariantProps<typeof ButtonBase> &
{
  type?: 'button' | 'submit' | 'reset';
  leftPart?: ReactNode;
  rightPart?: ReactNode;
  children?: ReactNode;
  tabIndex?: number;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  name?: string
};
type ButtonOwnProps = ButtonCSSProp & ButtonVariants;

const Button = React.forwardRef<
  React.ElementRef<typeof ButtonBase>, ButtonOwnProps>(
    ({ leftPart, rightPart, children, ...restProps }, forwardedRef) => {

      return <ButtonBase
        disabled={!!restProps.isDisabled}
        ref={forwardedRef}
        tabIndex={restProps.tabIndex}
        iconLeft={leftPart && true}
        iconRight={rightPart && true}
        {...restProps}
      >
        {leftPart}
        {children}
        {rightPart}
      </ButtonBase>;
    });

Button.toString = () => `.${ButtonBase}`;
Button.displayName = 'Button';

export default Button;
