import React, { useState } from "react";
import ErrorSnackbar from "../../components/ErrorSnackbar/ErrorSnackbar";
import { withApollo } from "../../lib/apollo";
import { getLayout } from "../../layouts/MainLayout";

const RoomPage = () => {
  const [snack, setSnack] = useState({ open: false });

  return (
    <>
      <ErrorSnackbar snack={snack} setSnack={setSnack} />
    </>
  );
};

const RoomApollo = withApollo({ ssr: true })(RoomPage);
RoomApollo.getLayout = getLayout;
export default RoomApollo;
