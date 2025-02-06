import React from "react";
import { Text, Box, Image, Button, Flex } from "@legion-ui/core";
import { Home } from "react-feather";
import Site from "src/layouts/site";
import ImgNotFound from "src/assets/not-found.png";

const ErrorServer = () => {
  return (
    <Site>
      <Box alignX='center' padding='24px 0'>
        <Image src={ImgNotFound} width='338px' alt='Server Error' />
        <Text as='h1' size='36px' weight='700'>
          Opps, something went wrong
        </Text>
        <Text as='p' color='tertiary500'>
          Server Error. We apologies and are fixing the problem.Please try again
          at a later stage.
        </Text>
      </Box>
      <Flex alignX='center'>
        <Button data-testid='home-icon' iconLeft={<Home />}>
          Back to Home
        </Button>
      </Flex>
    </Site>
  );
};

export default ErrorServer;
