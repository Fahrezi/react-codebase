import * as z from 'zod';
import { Box, Button, Checkbox, Flex, Text, Textfield } from '@legion-ui/core';
import { ChangeEvent, useEffect, useState } from 'react';
import { EyeOff, Eye } from 'react-feather';
import { useForm, Controller } from 'react-hook-form'
import { Link, useNavigate } from 'react-router';
import { useLogin } from 'src/api/queries';
import MENUS from 'src/config/menus';
import { zodResolver } from '@hookform/resolvers/zod';

type LoginForm = {
  email: string
  password: string
};

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string(),
});

function LoginForm() {
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  });
  const { mutate: loginUser, isLoading, errorMessage } = useLogin();
  const [rememberMe, setRememberMe] = useState(false);
  const [showTypePass, setShowTypePass] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleRememberMe = (e: ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
  };

  const toggleShowPassword = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    setShowTypePass((prev) => !prev);
  };

  const iconTogglePass = () => (
    <button
      onClick={toggleShowPassword}
      style={{ background: "transparent", border: "0" }}
    >
      {showTypePass ? <EyeOff /> : <Eye />}
    </button>
  );

  useEffect(() => {
    if(errorMessage) {
      setIsError(true);
    }
  }, [errorMessage])

  return (
    <form onSubmit={handleSubmit((data) => loginUser(data))}>
      <Controller 
        control={control}
        name="email"
        render={({ field: { onChange, name } }) => (
          <Textfield
            padding='16px 0'
            label='Email Address'
            placeholder='hello@mail.com'
            name={name}
            type='email'
            onChange={onChange}
            block
          />
        )}
      />
      <Controller 
        control={control}
        name="password"
        render={({ field: { onChange, name } }) => (
          <Textfield
            label='Password'
            placeholder='password'
            type={showTypePass ? "text" : "password"}
            name={name}
            onChange={onChange}
            iconRight={iconTogglePass()}
            block
          />
        )}
      />
      <Flex padding='24px 0' alignX='space-between'>
        <Checkbox
          data-testid='remember-me'
          label='Remember Me'
          onChange={handleRememberMe}
        />
        <Link to={MENUS.AUTHENTICATION_FORGOT_PASSWORD}>Forgot Password</Link>
      </Flex>
      {(isError && errorMessage) && (
        <Box alignX='center'>
          <Text as='span' color='#FF0000' mb='8px' block>
            {errorMessage}
          </Text>
        </Box>
      )}
      <Button
        margin='0 0 24px 0'
        type="submit"
        center
        block
        disabled={buttonDisabled || isLoading}
      >
        Sign In
      </Button>

      <Button
        variant='soft'
        onClick={() => navigate(MENUS.AUTHENTICATION_REGISTER)}
        center
        block
      >
        Sign Up
      </Button>
    </form>
  )
}

export default LoginForm