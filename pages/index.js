import React, { useState } from "react";
import App from "../components/App";
import { withApollo } from "../lib/apollo";
import CategoryTabs from "../components/CategoryTabs/CategoryTabs";
import CategoryList from "../components/CategoryList/CategoryList";
import { gql } from "apollo-server-micro";
import { useQuery } from "@apollo/react-hooks";
import CreateRoomDialog from "../components/CreateRoomDialog/CreateRoomDialog";

const QUERY = gql`
  {
    topTens {
      id
      name
      description
      category
    }
  }
`;

const IndexPage = () => {
  const { loading, data } = useQuery(QUERY);
  const [category, useCategory] = useState("geography");
  const [open, setOpen] = useState(false);

  return (
    <App>
      <CategoryTabs value={category} handleChange={(val) => useCategory(val)} />
      <CategoryList
        loading={loading}
        category={category}
        topTens={data ? data.topTens : []}
        setOpen={setOpen}
      />
      <CreateRoomDialog open={open} setOpen={setOpen} />
    </App>
  );
};

export default withApollo({ ssr: true })(IndexPage);
