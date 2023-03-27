import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { styled } from "../../theme";
import Box from "../box/Box";
import { Text } from "../text/Text";
import logo from "../../assets/logo.svg";
import Flex from "../flex/Flex";

const Sticky = styled(Box, {
  position: "sticky",
  top: 0,
  zIndex: "$3",
  backgroundColor: "hsla(0,0%,100%,.9)",
  backdropFilter: "blur(8px)",
  borderBottom: "1px solid #eaeaea",
  py: "0.5rem",
});

const Nav = styled("nav", {
  height: "4rem",
  fontSize: "1rem",
  boxSizing: "border-box",
});

const Image = styled("img", {
  boxSizing: "border-box",
  border: "0",
  width: "120px",
  height: "4rem",
  padding: "0",
  verticalAlign: "top",
});

const Navigation = () => {
  return (
    <Sticky>
      <Nav>
        <Flex
          as={RouterLink}
          to="/"
          css={{
            alignItems: "center",
            fontSize: "$xl",
            textDecoration: "none",
            color: "black",
            fontFamily: "$primary",
            fontWeight: "$normal",
            letterSpacing: "2px",
          }}
        >
          <Image src={logo} />
          <Text>NASA IMAGE GALLERY</Text>
        </Flex>
      </Nav>
    </Sticky>
  );
};

export default Navigation;
