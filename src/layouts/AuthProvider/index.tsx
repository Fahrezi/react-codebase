import { Flex, Spinner } from "@legion-ui/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import MENUS from "src/config/menus";
// import { selectUserState } from "src/services/auth/user-slice";
// import { useAppSelector } from "src/store";

type Props = {
  children: JSX.Element;
};

const AuthProvider = ({ children }: Props): JSX.Element => {
  const [isAuthenticated] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(MENUS.AUTHENTICATION_LOGIN);
    }
  }, [isAuthenticated]);

  if (isAuthenticated) {
    return <div className='main'>{children}</div>;
  }

  return (
    <Flex alignX='center' alignY='center' height='100vh'>
      <Spinner data-testid='spinner' />
    </Flex>
  );
};

export default AuthProvider;
