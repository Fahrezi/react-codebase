import { Flex, Text } from "@legion-ui/core";
import { PERMISSION } from "src/config/permissions";
import { selectUserState } from "src/services/auth/user-slice";
import { useAppSelector } from "src/store";
import Site from "../site";

type Props = {
  children: JSX.Element;
  role: PERMISSION;
};

const RolePermission = ({ children, role }: Props): JSX.Element => {
  const { profile } = useAppSelector(selectUserState);

  if (profile?.permissions && profile?.permissions.includes(role as never)) {
    return <div className='main'>{children}</div>;
  }

  return (
    <Site>
      <Flex alignX='center' alignY='center' height='100vh'>
        <Text as='h6'>You dont have access to this page</Text>
      </Flex>
    </Site>
  );
};

export default RolePermission;
