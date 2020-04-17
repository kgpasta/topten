import React, { useState } from "react";
import ErrorSnackbar from "../../components/ErrorSnackbar/ErrorSnackbar";
import { withApollo } from "../../lib/apollo";
import { getLayout } from "../../layouts/MainLayout";
import TopTenHeader from "../../components/TopTenHeader/TopTenHeader";
import { useQuery } from "@apollo/react-hooks";
import { GET_ROOM } from "../../data/queries";
import { useRouter } from "next/router";
import { CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  circular: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    marginTop: 20,
  },
}));

const RoomPage = () => {
  const router = useRouter();
  const classes = useStyles();
  const { loading, data } = useQuery(GET_ROOM, {
    variables: { roomId: router.query.roomId },
  });
  const [snack, setSnack] = useState({ open: false });

  if (loading) {
    return (
      <div className={classes.circular}>
        <CircularProgress color="secondary" />
      </div>
    );
  }

  return (
    <>
      <TopTenHeader room={data.room} />
      <ErrorSnackbar snack={snack} setSnack={setSnack} />
    </>
  );
};

RoomPage.getInitialProps = () => {
  return {};
};

const RoomApollo = withApollo({ ssr: true })(RoomPage);
RoomApollo.getLayout = getLayout;
export default RoomApollo;
