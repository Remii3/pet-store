import AddNewPet from "../../../components/pets/AddNewPet";

import { useHttp } from "../../../hooks/useHttp";
import { fetchAddPet } from "../../../lib/fetchPetApi";

import classes from "./AddNewPetPage.module.css";

function AddNewPetPage() {
  const {
    sendRequest,
    status,
    data: fetchedData,
    errorMessage,
  } = useHttp(fetchAddPet, false);

  if (status === "completed" && errorMessage != null)
    return (
      <div>
        <h1>Error</h1>
        <p>{errorMessage}</p>
      </div>
    );

  return (
    <div className={classes["addPet-outer"]}>
      <AddNewPet sendRequest={sendRequest} />
      {status === "pending" && <h1>Loading</h1>}

      {fetchedData != null && fetchedData.status === 200 && (
        <h4>Successfully added new pet</h4>
      )}
      {fetchedData != null && fetchedData.status !== 200 && (
        <h4>Something went wrong, try again</h4>
      )}
    </div>
  );
}

export default AddNewPetPage;
