import { useContext, useEffect } from "react";

import Pets from "../components/pets/Pets";

import { UserContext } from "../context/UserContext";
import { useHttp } from "../hooks/useHttp";
import { fetchGetAllPets } from "../lib/fetchPetApi";

import classes from "./MainPage.module.css";

function MainPage() {
  const {
    status,
    sendRequest,
    data: fetchedData,
    errorMessage,
  } = useHttp(fetchGetAllPets, true);

  const { isLogged } = useContext(UserContext);

  useEffect(() => {
    sendRequest({ statusMethod: "available", sortMethod: "ascending" });
  }, [sendRequest]);

  if (status === "pending") return <h2>Loading</h2>;

  if (status === "completed" && errorMessage != null)
    return (
      <div>
        <h2>Error</h2>
        <p>{errorMessage}</p>
      </div>
    );

  return (
    <div className={classes["mainSection-outer"]}>
      <div className={classes["title-space"]}>
        {!isLogged && (
          <h4>
            Your're not logged in! Try signing in to see the full potential of
            the website
          </h4>
        )}
        <h1>Latest offers</h1>
      </div>
      {fetchedData != null && (
        <Pets fetchedData={fetchedData} allowPagination={false} />
      )}
    </div>
  );
}

export default MainPage;
