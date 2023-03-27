import React from 'react';
import { styled, CSS, VariantProps } from '../../theme';
import type { UseFormRegister } from 'react-hook-form';


const DEFAULT_TAG = 'input';

const StyledInput = styled(DEFAULT_TAG, {
  appearance: 'none',
  borderWidth: '0',
  boxSizing: 'border-box',
  fontFamily: '$primary',
  margin: '0',
  outline: 'none',
  width: '100%',

  WebkitTapHighlightColor: 'rgba(0,0,0,0)',
  '&::before': {
    boxSizing: 'border-box',
  },
  '&::after': {
    boxSizing: 'border-box',
  },
  padding: "12px 16px",

  WebkitTextSizeAdjust: "100%",
  WebkitFontSmoothing: "antialiased",
  overflow: "visible",
  verticalAlign: "baseline",
  fontSize: "$md",
  fontWeight: '$medium',
  lineHeight: '$short',
  letterSpacing: "0.3px",
  color: "#2A333D",
  borderRadius: "$1px",
  boxShadow: '0 0 0 2px #e0e0e0',
  backgroundColor: "white",
  opacity: 1,

  '&:focus': {
    boxShadow: '#3182ce 0px 0px 0px 2px',
    borderColor: "#A0BCDB",
    '&:-webkit-autofill': {

    },
  },
  '&:active': {
    borderColor: "#A0BCDB",
    boxShadow: "none",
  },
  '&::placeholder': {
    fontSize: "$sm",
  },
  '&:disabled': {
    backgroundColor: "white",
    borderColor: "#A0BCDB",
    boxShadow: "none",
    color: "#bec3c5",
    pointerEvents: 'none',
    '&::placeholder': {
      color: '#A3ACB8',
    },
  },

  variants: {
    state: {
      invalid: {
        border: "1px solid #c73b0d"
      },
    },
    variant: {
      ghost: {
        border: 'none',
        outline: 'none',
        boxShadow: 'none',
        '&:focus': {
          boxShadow: 'none',
        }
      }
    }
  },
  defaultVariants: {
  },
});

type InputCSSProp = { css?: CSS };
type InputVariants = Omit<VariantProps<typeof StyledInput>, 'size'>;
type InputOwnProps = InputCSSProp & InputVariants &
{
  size?: string,
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void, 
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void,
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void,
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void,
  value?: string
  placeholder?: string
  validation?: UseFormRegister<TFieldValues>;
  type?: HTMLInputTypeAttribute
};


export const Input = React.forwardRef<
  React.ElementRef<typeof StyledInput>, InputOwnProps
>((props, forwardedRef) => {
  return <StyledInput
    ref={forwardedRef}
    onClick={props.onClick}
    onChange={props.onChange}
    onKeyDown={props.onKeyDown}
    onFocus={props.onFocus}
    onBlur={props.onBlur}
    css={props.css}
    value={props.value}
    placeholder={props.placeholder}
    type={props.type || 'text'}
    {...props}
  />;
});

Input.displayName = 'Input';

Input.toString = () => `.${StyledInput.className}`;