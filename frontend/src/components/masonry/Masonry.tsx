import React, { ReactNode } from "react";
import { styled, CSS, VariantProps } from "../../theme";

const MasonryStyled = styled("div", {
  display: "block",
  columns: "12rem",
  gap: "1.25rem"
});

type MasonryCSSProp = { css?: CSS };
type ButtonVariants = VariantProps<typeof MasonryStyled> & {
  children?: ReactNode;
  name?: string;
};
type MasonryOwnProps = MasonryCSSProp & ButtonVariants;

const Masonry = React.forwardRef<
  React.ElementRef<typeof MasonryStyled>,
  MasonryOwnProps
>(({ children, ...restProps }, masonryRef) => {

  return (
    <MasonryStyled ref={masonryRef} {...restProps}>
      {children}
    </MasonryStyled>
  );
});

Masonry.toString = () => `.${MasonryStyled}`;
Masonry.displayName = "Masonry";

export default Masonry;
