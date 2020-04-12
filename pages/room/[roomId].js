import React, { useState } from "react";
import App from "../../components/App";
import ErrorSnackbar from "../../components/ErrorSnackbar/ErrorSnackbar";
import { withApollo } from "../../lib/apollo";

const RoomPage = () => {
  const [snack, setSnack] = useState({ open: false });

  return (
    <App>
      <ErrorSnackbar snack={snack} setSnack={setSnack} />
    </App>
  );
};

export default withApollo({ ssr: true })(RoomPage);
