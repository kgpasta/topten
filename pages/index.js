import React from "react";
import App from "../components/App";
import { withApollo } from "../lib/apollo";

const IndexPage = () => <App></App>;

export default withApollo({ ssr: true })(IndexPage);
