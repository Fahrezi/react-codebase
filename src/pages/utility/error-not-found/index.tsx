import { Text, Box, Image, Flex } from "@legion-ui/core";
import ImgNotFound from "src/assets/not-found.png";

const ErrorNotFound = () => {
  return (
    <>
      <Box alignX='center' padding='24px 0'>
        <Image src={ImgNotFound} width='338px' alt='Error Not Found' />
        <Text as='h1' size='36px' weight='700'>
          We couldn’t connect the dots
        </Text>
        <Text as='p' color='tertiary500'>
          This page was not found.You may have mistyped the address or the page
          may have moved.
        </Text>
      </Box>
      <Flex alignX='center'>
        {/* <Button iconLeft={<Home />}>Back to Home</Button> */}
      </Flex>
    </>
  );
};

export default ErrorNotFound;
