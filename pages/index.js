import { useQuery } from "@apollo/react-hooks";
import React, { useState } from "react";
import App from "../components/App";
import CategoryList from "../components/CategoryList/CategoryList";
import CategoryTabs from "../components/CategoryTabs/CategoryTabs";
import CreateRoomDialog from "../components/CreateRoomDialog/CreateRoomDialog";
import ErrorSnackbar from "../components/ErrorSnackbar/ErrorSnackbar";
import { GET_TOP_TENS } from "../data/queries";
import { withApollo } from "../lib/apollo";

const IndexPage = () => {
  const [roomDialog, setRoomDialog] = useState({ open: false });
  const [snack, setSnack] = useState({ open: false });
  const [category, useCategory] = useState("GEOGRAPHY");
  const { loading, data, refetch } = useQuery(GET_TOP_TENS, {
    variables: { category },
  });

  const handleChange = (val) => {
    refetch({ category: val });
    useCategory(val);
  };

  return (
    <App>
      <CategoryTabs value={category} handleChange={handleChange} />
      <CategoryList
        loading={loading}
        category={category}
        topTens={data ? data.topTens : []}
        setRoomDialog={setRoomDialog}
      />
      <CreateRoomDialog
        roomDialog={roomDialog}
        setRoomDialog={setRoomDialog}
        setSnack={setSnack}
      />
      <ErrorSnackbar snack={snack} setSnack={setSnack} />
    </App>
  );
};

export default withApollo({ ssr: true })(IndexPage);
