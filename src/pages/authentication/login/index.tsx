import { useState, ChangeEvent, useCallback, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { Flex, Textfield, Button, Text, Box, Checkbox } from "@legion-ui/core";
import { Eye, EyeOff } from "react-feather";
import MENUS from "src/config/menus";
import Auth from "../auth";
// import { AuthState } from "src/services/auth/state";
// import ReCAPTCHA from "react-google-recaptcha";
// import { setLocalStorage } from "src/services/base/localStorage";
import dayjs from "dayjs";
import { useLogin } from "src/api/queries";
import { error } from "console";

const LoginPage = () => {
  const navigate = useNavigate();
  // const loginMutation = useLogin();
  const { mutate: loginUser, isLoading, errorMessage } = useLogin();
  const [payload, setPayload] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [showTypePass, setShowTypePass] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [isError, setIsError] = useState(false);
  // const recaptchaRef = useRef<ReCAPTCHA>(null);

  // const handleRecaptchaChange = () => {
  //   setButtonDisabled(false);
  // };

  // const handleRecaptchaExpired = () => {
  //   setButtonDisabled(true);
  // };

  // const handleRecaptchaError = () => {
  //   setButtonDisabled(true);
  // };

  const changeInput = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setPayload({ ...payload, [event.target.name]: event.target.value });
    setIsError(false);
  };

  const handleLogin = useCallback(
    async(e: { preventDefault: () => void }) => {
      e.preventDefault();

      console.log('halo halo bandung')
      loginUser(payload);

      // Enable for Login using OTP
      // loginUserOtp(formData, false);

      // if (!rememberMe) {
      //   setLocalStorage(
      //     "expired_session",
      //     dayjs().add(1, "day").startOf("day")
      //   );
      // }
    },
    [payload]
  );

  useEffect(() => {
    if (errorMessage) {
      setIsError(true);
    }
  }, [errorMessage]);

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

  return (
    <Auth
      data-testid='authentication-login'
      title='Sign In'
      desc='Enter your email address and password to access dashboard panel.'
    >
      <Textfield
        padding='16px 0'
        label='Email Address'
        placeholder='hello@mail.com'
        name='email'
        type='email'
        onChange={changeInput}
        block
      />
      <Textfield
        label='Password'
        placeholder='password'
        type={showTypePass ? "text" : "password"}
        name='password'
        onChange={changeInput}
        iconRight={iconTogglePass()}
        block
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
      {/* <Box mb='12px'>
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={process.env.VITE_KEY_CAPTCHA || "default_value"}
          onChange={handleRecaptchaChange}
          onExpired={handleRecaptchaExpired}
          onErrored={handleRecaptchaError}
        />
      </Box> */}

      <Button
        margin='0 0 24px 0'
        onClick={handleLogin}
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
    </Auth>
  );
};

export default LoginPage;
