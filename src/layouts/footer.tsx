import React from "react";
import { Box, Flex, Anchor, Divider } from "@legion-ui/core";
import dayjs from "dayjs";

const Footer = () => {
  return (
    <Box as='footer' padding='20px 0 0 0'>
      <Divider data-testid='divider' padding='0' />
      <Flex alignX='space-between' padding='20px 0 0 0'>
        <Box width={{ xl: "50%", md: "50%", sm: "100%" }}>
          <span>
            {dayjs().year()} © Dashboard Standard by Chapter DPE | Design by{" "}
          </span>
          <Anchor href='https://legion.telkom.design'>
            Legion Design System
          </Anchor>
        </Box>
      </Flex>
    </Box>
  );
};

export default Footer;
