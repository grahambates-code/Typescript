import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";
import {
  Box,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
} from "@mantine/core";

import { useForm } from "@mantine/form";

import { signin } from "../../../store/auth/action";
import Loading from "../../../components/Loading";

type FormDataType = {
  username: string;
  password: string;
};

const SigninForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const newPasswordForm = useForm({
    initialValues: {
      username: "",
      newPassword: "",
    },

    validate: {
      username: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      newPassword: (value) =>
        value.length > 5 ? null : "Invalid password. At least 6 letters.",
    },
  });

  const signinForm = useForm({
    initialValues: {
      username: "",
      password: "",
    },

    validate: {
      username: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid username",
      password: (value) =>
        value.length > 5 ? null : "Invalid password. At least 6 letters.",
    },
  });

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [completeNewPassword, setCompleteNewPassword] =
    useState<boolean>(false);
  const [cognitoUser, setCognitoUser] = useState();

  const handleSignin = async (values: FormDataType) => {
    setError(null);
    setSubmitting(true);

    let response;

    try {
      response = await Auth.signIn(values.username, values.password);
      if (response.username) {
        const authenticatedUser = await Auth.currentAuthenticatedUser();
        const session = await Auth.currentSession();

        dispatch(
          signin({
            userInfo: authenticatedUser,
            userToken: session.getIdToken().getJwtToken(),
            isLoggedin: true,
          })
        );

        navigate("/fields");
      } else {
      }
    } catch (e) {
      setError(e);
      setSubmitting(false);
      if (response?.challengeName === "NEW_PASSWORD_REQUIRED") {
        setCompleteNewPassword(true);
        setCognitoUser(response);
      }
    }
  };

  const handleCompleteNewPassword = async (values: {
    username: string;
    newPassword: string;
  }) => {
    setError(null);
    setSubmitting(true);
    try {
      await Auth.completeNewPassword(cognitoUser, values.newPassword, {});

      // alert('Log in again for now');
      navigate("/fields");
    } catch (e: unknown) {
      setError(e);
      setSubmitting(false);
    }
  };

  return (
    <Box
      maw={480}
      m="auto"
      w="100%"
      p="xl"
      sx={(theme) => ({
        border: `1px solid ${theme.colors.dark[2]}`,
        borderRadius: 5,
      })}
    >
      {completeNewPassword ? (
        <form
          onSubmit={newPasswordForm.onSubmit((values) =>
            handleCompleteNewPassword(values)
          )}
        >
          <Title align="center" mb="lg" order={2} color="cyan.9">
            New Password
          </Title>

          <PasswordInput
            withAsterisk
            label="New Password"
            placeholder="Enter your New Password"
            {...newPasswordForm.getInputProps("newPassword")}
            mb="lg"
          />

          {error && (
            <div>
              <Text c="red">{error.message}</Text>
            </div>
          )}

          <Button type="submit" w="100%">
            {submitting ? <Loading /> : "Complete New Password"}
          </Button>
        </form>
      ) : (
        <form onSubmit={signinForm.onSubmit((values) => handleSignin(values))}>
          <Title align="center" mb="lg" order={2} color="cyan.9">
            Sign In
          </Title>

          <TextInput
            withAsterisk
            label="Email"
            placeholder="Enter your Email"
            {...signinForm.getInputProps("username")}
            mb="lg"
          />

          <PasswordInput
            withAsterisk
            label="Password"
            placeholder="Enter your Password"
            {...signinForm.getInputProps("password")}
            mb="lg"
          />

          {error && (
            <div>
              <Text c="red">{error.message}</Text>
            </div>
          )}

          <Button type="submit" w="100%" color="cyan.9">
            {submitting ? <Loading /> : "Sign In"}
          </Button>
        </form>
      )}
    </Box>
  );
};

export default SigninForm;
