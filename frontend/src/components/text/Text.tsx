import { styled } from '../../theme';

export const Text = styled('span', {
  fontFamily: '$primary',
  fontSize: '$md',
  color: '#2A333D',
  variants: {
    variant: {
      'heading': {
        fontSize: "$5xl",
        fontWeight: '$semiBold',
        lineHeight: '36px',
      },      
      'subHeading': {
        fontSize: "$2xl",
        fontWeight: "$extraLight",
        lineHeight: '36px',
      },      
    }
  }
})