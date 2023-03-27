import React from 'react'
import { styled, CSS } from '../../theme';

import Flex from '../flex/Flex';
import Grid from '../grid'
import CaretIcon from '../../icons/CaretIcon';

const StyledSelect = styled('select', {
  boxSizing: "border-box",
  font: "inherit",
  margin: "0",
  textTransform: "none",
  verticalAlign: "baseline",
  width: "100%",
  fontFamily: "$primary",
  fontSize: "$md",
  fontWeight: '$semiBold',
  lineHeight: 1.5,
  letterSpacing: ".3px",
  padding: "8px 16px",
  borderRadius: "4px",
  border: "1px solid #b9ccc5",
  backgroundColor: "#fff",
  opacity: 1,
  appearance: "none",
  outline: "none",
  '&:hover': {

  },
  '&:focus': {
    borderColor: '#8aaba1',
  },
  '&:active': {

  },
  '&:disabled': {

  },

})

const Wrapper = styled(Grid, {
  gridTemplateAreas: '"input"',
})

type SelectProps = React.ComponentProps<typeof Wrapper> &
{ css?: CSS } &
{ options: T 
  letterCount?: number,
  value?: string,
  labelText?: string
  placeholder?: string,
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
};

export const Select = React.forwardRef<
  React.ElementRef<typeof StyledSelect>, SelectProps>(
    (props, forwardedRef) => {
      return (

        <Flex css={{
          position: 'relative',
          minWidth: '100px',
        }}>
          <StyledSelect
            name={props.labelText}
            value={props.value}
            ref={forwardedRef}
            onChange={props.onChange}
          >
            {props.placeholder && (
              <option label={props.placeholder} value="">
                {props.placeholder}
              </option>
            )}

            {props.options?.map((item, index: number) =>
              <option key={index} value={item.id}>
                {item.name}
              </option>
            )}
          </StyledSelect>

          <Flex css={{
            position: 'absolute',
            right: '1rem',
            alignItems: 'center',
            top: "50%",
            transform: "translateY(-50%)",
            pointerEvents: 'none',
          }}>
            <CaretIcon />
          </Flex>
        </Flex>

      )
    });

Select.toString = () => `.${StyledSelect.className}`;
Select.displayName = 'Select';


