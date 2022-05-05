import { useEffect, useState } from "react";

import Pets from "../components/pets/Pets";

import { useHttp } from "../hooks/useHttp";
import { fetchGetAllPets } from "../lib/fetchPetApi";

import classes from "./PetsPage.module.css";

function PetsPage() {
  const [statusMethod, setStatusMethod] = useState("available");
  const [sortMethod, setSortMethod] = useState("ascending");

  const {
    status,
    sendRequest,
    data: fetchedData,
    errorMessage,
  } = useHttp(fetchGetAllPets, true);

  useEffect(() => {
    sendRequest({ statusMethod, sortMethod });
  }, [sendRequest, statusMethod, sortMethod]);

  if (status === "pending") return <h2>Loading</h2>;

  if (status === "completed" && errorMessage != null)
    return (
      <div>
        <h2>Error</h2>
        <p>{errorMessage}</p>
      </div>
    );

  return (
    <div className={classes["pets-outer"]}>
      <div className={classes["select-space"]}>
        <select
          name="searchStatusMethods"
          id={classes["status-input"]}
          value={statusMethod}
          onChange={(e) => setStatusMethod(e.target.value)}
        >
          <option value="available">available</option>
          <option value="pending">pending</option>
          <option value="sold">sold</option>
        </select>
        <select
          name="sortMethods"
          id={classes["sort-input"]}
          value={sortMethod}
          onChange={(e) => setSortMethod(e.target.value)}
        >
          <option value="descending">descending</option>
          <option value="ascending">ascending</option>
        </select>
      </div>
      {fetchedData != null && fetchedData !== undefined && (
        <Pets fetchedData={fetchedData} allowPagination={true} />
      )}
    </div>
  );
}

export default PetsPage;
