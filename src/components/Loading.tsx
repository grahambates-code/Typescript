import React from "react";
import { Spin } from "antd";

interface ILoading {
  children?: React.ReactElement;
  loading?: boolean;
}

const Loading = (props: ILoading) => {
  const { children, loading } = props;

  return <Spin spinning={loading}>{children}</Spin>;
};

export default Loading;
