import React, { FunctionComponent } from 'react';
import { gql, useQuery } from '@apollo/client';

const LIST_FieldS = gql`
  query{
  table_field{
    id
  }
}
`;

const Page: FunctionComponent = () => {

  const { loading, error, data } = useQuery(LIST_FieldS, {
    variables: {}
  });

  if (!data || loading) return <div>no data</div>;
  if (error) return <div>error</div>

  return <div>
    {JSON.stringify(data)}
  </div>
}

export default Page;