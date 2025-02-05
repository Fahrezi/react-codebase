import { FC, ReactNode, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { ChevronDown, Menu } from "react-feather";
import {
  Sidebar,
  Flex,
  Button,
  Avatar,
  Box,
  Dropdown,
  Text,
} from "@legion-ui/core";
import Header from "./header";
import Footer from "./footer";
// import { store, useAppSelector } from "src/store";
// import { selectUserState } from "src/services/auth/user-slice";
// import { Icon } from "src/components/Icon";
// import { storeDataSelectedFilter } from "src/services/filter/populate-data";
import dayjs from "dayjs";
import { ProfileType } from "src/services/auth/types";
import { UserProfileByToken } from "src/services/auth/http";
import MENUS from "src/config/menus";
import { logoutUser } from "src/services/base/api";
import { Icon } from "src/components/Icon";

type SiteProps = {
  children: ReactNode;
};

const Site: FC<SiteProps> = ({ children }) => {
  const navigate = useNavigate();
  // const { profile } = useAppSelector(selectUserState);
  const profile = {
    permissions: ['INFRASTRUCTURE_VIEW'],
    menu: [],
  };
  const { pathname } = useLocation();
  const [navMode] = useState("withLogo");
  const [isSidebarCollapse, setIsSidebarCollapse] = useState<boolean>(false);
  const widthSidebar = isSidebarCollapse ? "70px" : "264px";
  const handleToogleSidebar = () => {
    setIsSidebarCollapse((prev) => !prev);
  };

  // For User Profile in Sidebar
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

  const renderMenuItems = (menuData: any, pathname: string) => {
    return menuData.map((item: any, i: any) => ({
      iconTitle: item.icon ? <Icon name={item.icon} /> : "",
      active:
        item.child.length > 0
          ? pathname.includes(`${item.path}`)
          : pathname.split("/").pop() === item.path.split("/").pop(),
      title:
        item.child?.length > 0 ? (
          item.resource_name
        ) : (
          <Link onClick={() => {}} to={`/${item.path}`}>
            {item.resource_name}
          </Link>
        ),
      childrens:
        item.child?.length > 0 && renderMenuItems(item.child, pathname),
    }));
  };

  // const redirectMenuItems = () => {
  //   store.dispatch(
  //     storeDataSelectedFilter({
  //       dateStart: dayjs("2023-01-01").format("YYYY-MM-DD"),
  //       dateEnd: dayjs("2023-10-31").format("YYYY-MM-DD"),
  //       product: [],
  //     })
  //   );
  // };
  return (
    <div className='app'>
      <Header
        isSidebarCollapse={isSidebarCollapse}
        navMode={navMode}
        handleToggleSidebar={handleToogleSidebar}
      />
      <div
        className={`app-sidebar ${isSidebarCollapse ? "collapse" : ""}`}
        style={{ width: widthSidebar }}
      >
        {/* 
        // For User Profile in Sidebar
        <Dropdown
          data-testid='user-dropdown'
          position='left'
          id='user-dropdown'
          style={{ width: "100%" }}
          onClose={function noRefCheck() {}}
          trigger={
            <Button
              center={isSidebarCollapse}
              margin={!isSidebarCollapse ? "16px 0" : "16px auto"}
              data-testid='user-dropdown-button'
              iconLeft={
                <Avatar
                  size='sm'
                  text={
                    profile?.integration
                      ? profile?.name[0].toUpperCase()
                      : dataUser?.name[0].toUpperCase()
                  }
                />
              }
              iconRight={!isSidebarCollapse && <ChevronDown />}
              variant='transparent'
              color='tertiary'
              block={isSidebarCollapse}
            >
              {!isSidebarCollapse && (
                <div>
                  <Text color='tertiary800' weight='700' block>
                    {profile?.integration ? profile?.name : dataUser?.name}
                  </Text>
                </div>
              )}
            </Button>
          }
        >
          <Box padding='4px 8px' width='140px'>
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
              onClick={logoutUser}
            >
              Logout
            </Button>
          </Box>
        </Dropdown> */}
        {navMode === "bottomLogo" && (
          <Flex
            alignY='center'
            alignX='space-between'
            padding='24px 8px 8px 8px'
          >
            <Button
              variant='transparent'
              onClick={handleToogleSidebar}
              color='tertiary'
            >
              <Menu />
            </Button>
          </Flex>
        )}
        <Sidebar
          items={renderMenuItems(profile?.menu, pathname)}
          collapse={isSidebarCollapse}
        />
      </div>
      <div
        className='app-main'
        style={{
          width: `calc(100% - ${widthSidebar})`,
          marginLeft: widthSidebar,
        }}
      >
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default Site;
