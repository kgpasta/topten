import React, { useState } from "react";
import App from "../components/App";
import { withApollo } from "../lib/apollo";
import CategoryTabs from "../components/CategoryTabs/CategoryTabs";
import CategoryList from "../components/CategoryList/CategoryList";

const IndexPage = () => {
  const [category, useCategory] = useState("geography");
  return (
    <App>
      <CategoryTabs value={category} handleChange={(val) => useCategory(val)} />
      <CategoryList category={category} />
    </App>
  );
};

export default withApollo({ ssr: true })(IndexPage);
