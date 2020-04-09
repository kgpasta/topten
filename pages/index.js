import React from "react";
import App from "../components/App";
import { withApollo } from "../lib/apollo";
import CategoryTabs from "../components/CategoryTabs/CategoryTabs";

const IndexPage = () => (
  <App>
    <CategoryTabs />
  </App>
);

export default withApollo({ ssr: true })(IndexPage);
