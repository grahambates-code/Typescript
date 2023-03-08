import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";
import { Formik } from "formik";
import { Row, Input, Form, Button, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import * as Yup from "yup";

import { signin } from "../../../store/auth/action";
import Loading from "../../../components/Loading";

const { Text, Title } = Typography;

type FormDataType = {
  username: string;
  password: string;
};

const SigninForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    <>
      {completeNewPassword ? (
        <Formik
          initialValues={{
            username: "",
            newPassword: "",
          }}
          validationSchema={Yup.object().shape({
            username: Yup.string().email().required().min(3),
            newPassword: Yup.string().required().min(6),
          })}
          onSubmit={(values) => {
            handleCompleteNewPassword(values);
          }}
        >
          {({
            errors,
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            isValid,
          }) => (
            <Form onFinish={handleSubmit}>
              <div className="card-main">
                <Form.Item
                  name="newPassword"
                  rules={[
                    {
                      required: true,
                      message: "Please input your new password!",
                    },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="New Password"
                    size="large"
                    onChange={handleChange("newPassword")}
                    onBlur={handleBlur("newPassword")}
                  />
                </Form.Item>
                {error && (
                  <div>
                    <Text type="danger">{error?.message}</Text>
                  </div>
                )}
                <div className="submit-button">
                  <p>
                    Password must be a minimum length of 8 characters and
                    contain at least 1 number and special character.{" "}
                  </p>
                  <Button
                    size="large"
                    className="button-orange-filled"
                    disabled={!isValid || submitting}
                    block
                    htmlType="submit"
                  >
                    {submitting ? <Loading /> : "Complete New Password"}
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      ) : (
        <Formik
          initialValues={{
            username: "",
            password: "",
            newPassword: "",
          }}
          validationSchema={Yup.object().shape({
            username: Yup.string().email().required().min(3),
            password: Yup.string().required().min(6),
          })}
          onSubmit={(values) => {
            handleSignin(values);
          }}
        >
          {({
            errors,
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            isValid,
          }) => (
            <Form onFinish={handleSubmit}>
              <div className="card-main">
                <Title level={3} className="title">
                  Sign In
                </Title>
                <Form.Item
                  name="Username"
                  rules={[
                    { required: true, message: "Please enter a valid email" },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="Username"
                    size="large"
                    value={values.username}
                    bordered
                    onChange={handleChange("username")}
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "Please enter your password" },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Password"
                    size="large"
                    value={values.password}
                    onChange={handleChange("password")}
                    onBlur={handleBlur("password")}
                  />
                </Form.Item>
                <Row justify="end">
                  <Text
                    className="forgot-text"
                    onClick={() => navigate("/reset")}
                  >
                    Forgot Password?
                  </Text>
                </Row>
                {error && (
                  <div>
                    <Text type="danger">{error?.message}</Text>
                  </div>
                )}
                <div className="submit-button">
                  <Button
                    size="large"
                    className="button-orange-filled"
                    disabled={!isValid || submitting}
                    block
                    htmlType="submit"
                  >
                    {submitting ? <Loading /> : "Sign In"}
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default SigninForm;
