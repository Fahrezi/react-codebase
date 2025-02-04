import { FC, useEffect, useState } from "react";
import { ChevronDown, Menu } from "react-feather";
import { Flex, Box, Button, Dropdown, Text, Avatar } from "@legion-ui/core";

import Logo from "src/assets/Logo-IDO.svg";
import LogoPlain from "src/assets/legion-plain-logo.svg";

// import { AuthState } from "src/services/auth/state";
// import { UserProfileByToken } from "src/services/auth/http";
// import { useAppSelector } from "src/store";
// import { selectUserState } from "src/services/auth/user-slice";
// import { ProfileType } from "src/services/auth/types";
import { useNavigate } from "react-router";

import MENUS from "src/config/menus";
// import { logoutUser } from "src/services/base/api";

interface HeaderProps {
  handleToggleSidebar: (e?: any) => void;
  isSidebarCollapse?: boolean;
  navMode?: string;
}

const Header: FC<HeaderProps> = ({
  handleToggleSidebar,
  isSidebarCollapse,
  navMode,
}) => {
  const navigate = useNavigate();
  // const { profile } = useAppSelector(selectUserState);
  const widhHeaderLeft =
    isSidebarCollapse && navMode === "outsideLogo" ? "69px" : "263px";

  // const [dataUser, setDataUser] = useState<ProfileType>();

  // useEffect(() => {
  //   profile &&
  //     UserProfileByToken(profile.id)
  //       .then((res) => {
  //         setDataUser(res.data.data);
  //       })
  //       .catch((err) => {
  //         throw err;
  //       });
  // }, []);

  return (
    <header className='app-header'>
      <Flex alignX='space-between' alignY='center'>
        <Flex
          data-testid='header-left'
          width={widhHeaderLeft}
          alignY='center'
          alignX={
            isSidebarCollapse && navMode === "outsideLogo"
              ? "center"
              : "space-between"
          }
        >
          <Box
            pl={isSidebarCollapse && navMode === "outsideLogo" ? "0" : "32px"}
          >
            <img
              src={
                isSidebarCollapse && navMode === "outsideLogo"
                  ? LogoPlain
                  : Logo
              }
              loading='lazy'
              height='32'
              alt='logo'
            />
          </Box>
          {navMode === "withLogo" && (
            <Button
              data-testid='menu-button'
              variant='transparent'
              onClick={handleToggleSidebar}
              color='tertiary'
              margin='0 12px 0 0'
            >
              <Menu />
            </Button>
          )}
        </Flex>
        <Flex
          width={`calc(100% - ${widhHeaderLeft})`}
          pr='24px'
          alignY='center'
          padding='4px 0'
          style={{ borderLeft: "1px solid #D0D5DD" }}
        >
          <Flex width='100%' alignY='center' alignX='space-between'>
            <div>
              {navMode === "outsideLogo" && (
                <Button
                  data-testid='menu-button'
                  variant='transparent'
                  onClick={handleToggleSidebar}
                  color='tertiary'
                  margin='0 0 0 12px'
                >
                  <Menu />
                </Button>
              )}
            </div>
            <Flex alignY='center' alignX='flex-end'>
              <Dropdown
                data-testid='user-dropdown'
                onClose={function noRefCheck() {}}
                trigger={
                  <Button
                    data-testid='user-dropdown-button'
                    iconLeft={<Avatar text='A' />}
                    iconRight={<ChevronDown />}
                    variant='transparent'
                    color='tertiary'
                  >
                    <div>
                      <Text color='tertiary800' weight='700' block>
                        {/* {profile?.integration ? profile?.name : dataUser?.name} */}
                        profile
                      </Text>
                    </div>
                  </Button>
                }
              >
                <Box padding='4px 8px' width='198px'>
                  <Button
                    variant='transparent'
                    color='tertiary'
                    margin='4px 0'
                    block
                    onClick={() => navigate(MENUS.PROFILE)}
                  >
                    Profile
                  </Button>
                  <Button
                    variant='transparent'
                    color='tertiary'
                    margin='4px 0'
                    block
                    onClick={() => {}}
                  >
                    Logout
                  </Button>
                </Box>
              </Dropdown>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </header>
  );
};

export default Header;
