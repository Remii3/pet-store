import { useEffect } from "react";

import Store from "../components/store/Store";

import { useHttp } from "../hooks/useHttp";
import { fetchInventoriesPet } from "../lib/fetchStoreApi";

import classes from "./StorePage.module.css";

function StorePage() {
  const {
    sendRequest,
    status,
    data: fetchedData,
    errorMessage,
  } = useHttp(fetchInventoriesPet, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") return <h1>Loading</h1>;

  if (status === "complete" && errorMessage != null)
    return (
      <div>
        <h2>Error</h2>
        <p>{errorMessage}</p>
      </div>
    );

  return (
    <div className={classes["store-outer"]}>
      <Store fetchedData={fetchedData} />
    </div>
  );
}

export default StorePage;
