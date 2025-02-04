import React from "react";
import { Text, Box, Image, Flex } from "@legion-ui/core";
import Site from "src/layouts/site";
import ImgCS from "src/assets/customer-service-big.png";
import { AlertCircle, Mail, Server } from "react-feather";

const Maintenance = () => {
  return (
    <Site>
      <Box alignX='center' padding='24px 0'>
        <Image src={ImgCS} width='338px' alt='Maintenance' />
        <Text as='h1' size='36px' weight='700'>
          We are currently performing maintenance
        </Text>
        <Text as='p' color='tertiary500'>
          We're making the system more awesome.We'll be back shortly. Thank you
          for your patience!
        </Text>
      </Box>
      <Flex margin='0 -12px'>
        <Flex
          role='faq-section'
          alignX='space-between'
          width='calc(33.333% - 24px)'
          border='1px solid #ddd'
          padding='16px'
          margin='12px'
          radius='radius4'
          background='#fff'
        >
          <AlertCircle data-testid='section-icon-0' />
          <Box width='calc(100% - 40px)'>
            <Text as='h3' size='20px' color='tertiary900' weight='700'>
              Why is the Site Down?
            </Text>
            <Text color='tertiary500'>
              If several languages coalesce, the grammar of the resulting
              language is more simple.
            </Text>
          </Box>
        </Flex>
        <Flex
          role='faq-section'
          alignX='space-between'
          width='calc(33.333% - 24px)'
          border='1px solid #ddd'
          padding='16px'
          margin='12px'
          radius='radius4'
          background='#fff'
        >
          <Server data-testid='section-icon-1' />
          <Box width='calc(100% - 40px)'>
            <Text as='h3' size='20px' color='tertiary900' weight='700'>
              What is the Downtime?
            </Text>
            <Text color='tertiary500'>
              Everyone realizes why a new common language would be desirable one
              could refuse at the same time.
            </Text>
          </Box>
        </Flex>
        <Flex
          role='faq-section'
          alignX='space-between'
          width='calc(33.333% - 24px)'
          border='1px solid #ddd'
          padding='16px'
          margin='12px'
          radius='radius4'
          background='#fff'
        >
          <Mail data-testid='section-icon-2' />
          <Box width='calc(100% - 40px)'>
            <Text as='h3' size='20px' color='tertiary900' weight='700'>
              Do you need Support?
            </Text>
            <Text color='tertiary500'>
              You need to be sure there isn't anything please contact us via
              email
              <br />
              <a href='mailto:no-reply@domain.com'>no-reply@domain.com</a>
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Site>
  );
};

export default Maintenance;
