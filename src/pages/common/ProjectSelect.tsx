import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Select } from "antd";

const List_Projects = gql`
  {
    table_project(order_by: { name: asc }) {
      id
      name
    }
  }
`;

interface IProjectSelect {
  selectedProject: string;
  setSelectedProject: (id: string) => void;
}

export default ({ selectedProject, setSelectedProject }: IProjectSelect) => {
  const { loading, error, data, refetch } = useQuery(List_Projects, {
    variables: {},
  });

  const [mainData, setMainData] = useState(data);

  useEffect(() => {
    if (data) {
      setMainData(data);
      setSelectedProject(data.table_project[0].id);
    }
  }, [data]);

  if (loading || error || !data) return null;

  return (
    <Select
      style={{ width: "auto" }}
      defaultValue={selectedProject}
      onChange={(e) => setSelectedProject(e)}
      options={data.table_project.map((p: any) => {
        return { value: p?.id, label: p?.name };
      })}
    />
  );
};
