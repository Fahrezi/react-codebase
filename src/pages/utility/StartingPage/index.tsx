import React from "react";
import { Text } from "@legion-ui/core";
import Site from "src/layouts/site";

const StartingPage = () => {
  return (
    <Site>
      <Text as='h1' size='24px' height='36px' color='tertiary900' weight='700'>
        Title Page
      </Text>
    </Site>
  );
};

export default StartingPage;
