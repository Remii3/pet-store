import UpdatePetInStore from "../../../components/pets/UpdatePetInStore";

import { useHttp } from "../../../hooks/useHttp";
import { fetchUpdateExistingPet } from "../../../lib/fetchPetApi";

import classes from "./UpdatePetInStorePage.module.css";

function UpdatePetInStorePage() {
  const {
    sendRequest,
    status,
    data: fetchedData,
    errorMessage,
  } = useHttp(fetchUpdateExistingPet, false);

  if (status === "completed" && errorMessage != null)
    <div>
      <h2>Error</h2>
      <p>{errorMessage}</p>
    </div>;

  return (
    <div className={classes["updatePetInStore-outer"]}>
      <UpdatePetInStore sendRequest={sendRequest} />
      {status === "pending" && <h1>Loading</h1>}

      {fetchedData != null && fetchedData.status === 200 && (
        <h4>Successfully updated information</h4>
      )}
      {fetchedData != null && fetchedData.status !== 200 && (
        <h4>Pet was not found</h4>
      )}
    </div>
  );
}

export default UpdatePetInStorePage;
