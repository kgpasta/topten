import React, { useState } from "react";
import ErrorSnackbar from "../../components/ErrorSnackbar/ErrorSnackbar";
import { withApollo } from "../../lib/apollo";
import { getLayout } from "../../layouts/MainLayout";
import TopTenHeader from "../../components/TopTenHeader/TopTenHeader";
import { useQuery } from "@apollo/react-hooks";
import { GET_ROOM } from "../../data/queries";
import { useRouter } from "next/router";
import { CircularProgress, makeStyles, Grid } from "@material-ui/core";
import TopTenList from "../../components/TopTenList/TopTenList";
import MemberList from "../../components/MemberList/MemberList";
import AnswerList from "../../components/AnswerList/AnswerList";
import { getUserId } from "../../data/user";

const useStyles = makeStyles(() => ({
  circular: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    marginTop: 20,
  },
  grid: {
    width: "100%",
  },
}));

const RoomPage = () => {
  const router = useRouter();
  const classes = useStyles();
  const { loading, data } = useQuery(GET_ROOM, {
    variables: { userId: getUserId(), roomId: router.query.roomId },
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
      <Grid container direction="row" spacing={1} className={classes.grid}>
        <Grid item xs={12} sm={6}>
          <MemberList room={data.room} setSnack={setSnack} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TopTenList room={data.room} setSnack={setSnack} />
          <AnswerList room={data.room} setSnack={setSnack} />
        </Grid>
      </Grid>
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
