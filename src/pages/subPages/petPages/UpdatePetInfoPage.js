import UpdatePetInfo from "../../../components/pets/UpdatePetInfo";

import { useHttp } from "../../../hooks/useHttp";
import { fetchUpdatePet } from "../../../lib/fetchPetApi";

import classes from "./UpdatePetInfoPage.module.css";

function UpdatedPetInfoPage() {
  const {
    sendRequest,
    status,
    data: fetchedData,
    errorMessage,
  } = useHttp(fetchUpdatePet, false);

  if (status === "completed" && errorMessage != null)
    return (
      <div>
        <h1>Error</h1>
        <p>{errorMessage}</p>
      </div>
    );

  return (
    <div className={classes["updatePetInfo-outer"]}>
      <UpdatePetInfo sendRequest={sendRequest} />
      {status === "pending" && <h1>Loading</h1>}

      {fetchedData != null && fetchedData.status === 200 && (
        <h4>Successfully updated information</h4>
      )}
      {fetchedData != null && fetchedData.status !== 200 && (
        <h4>Something went wrong, try again</h4>
      )}
    </div>
  );
}

export default UpdatedPetInfoPage;
