import React, { useState } from "react";
import App from "../components/App";
import { withApollo } from "../lib/apollo";
import CategoryTabs from "../components/CategoryTabs/CategoryTabs";
import CategoryList from "../components/CategoryList/CategoryList";
import { gql } from "apollo-server-micro";
import { useQuery } from "@apollo/react-hooks";
import CreateRoomDialog from "../components/CreateRoomDialog/CreateRoomDialog";

const QUERY = gql`
  query toptens($category: String) {
    topTens(category: $category) {
      id
      name
      description
      category
      source
      creationDate
    }
  }
`;

const IndexPage = () => {
  const [open, setOpen] = useState(false);
  const [category, useCategory] = useState("GEOGRAPHY");
  const { loading, data } = useQuery(QUERY, {
    variables: { category },
  });

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
