import { FC, ReactNode, useEffect, useState } from "react";
import { Box, Flex, Image, Text, Divider, Anchor } from "@legion-ui/core";
import ImgLogo from "src/assets/Logo-IDO.svg";
import ImgBgLogin from "src/assets/bg-login.jpg";
import { useNavigate } from "react-router";
import MENUS from "src/config/menus";
import dayjs from "dayjs";
import { getLocalStorage } from "src/utils/storage";

interface AuthProps {
  title: string;
  desc: ReactNode;
  children: ReactNode;
  // onSubmit?: (event: any) => void;
}

const Auth: FC<AuthProps> = ({ title, desc, children }) => {
  const navigate = useNavigate();
  const isAuthenticated = getLocalStorage(import.meta.env.VITE_USER_DATA);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(MENUS.DASHBOARD);
    }
  }, [isAuthenticated]);

  return (
    <Flex>
      <Box width={{ xl: "50%", md: "100%" }}>
        <Flex
          height='calc(100vh - 77px)'
          alignY='center'
          style={{ overflow: "auto" }}
        >
          <Box
            as='div'
            margin='auto'
            padding='44px 24px'
            width={{ xl: "464px", lg: "100%" }}
            // onSubmit={onSubmit}
          >
            <Image src={ImgLogo} width='146px' height='45px' />
            <Text as='h1' size='36px' weight='700' margin='70px 0 0 0'>
              {title}
            </Text>
            <Text size='16px' color='tertiary500'>
              {desc}
            </Text>
            {children}
          </Box>
        </Flex>
        <Divider padding='0' />
        <Box padding='24px' alignX='center' background='#fff'>
          <span>{dayjs().year()} © Dashboard Template by</span>
          <Anchor href='https://legion.telkom.design/' target='_blank'>
            Legion Design System
          </Anchor>
        </Box>
      </Box>
      <Box width={{ xl: "50%", md: "100%" }} className='md-none'>
        <Box
          height='100vh'
          background={`url(${ImgBgLogin}) center / cover no-repeat`}
        />
      </Box>
    </Flex>
  );
};

export default Auth;
