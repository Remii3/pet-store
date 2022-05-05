import DeletePet from "../../../components/pets/DeletePet";

import { useHttp } from "../../../hooks/useHttp";
import { fetchDeletePet } from "../../../lib/fetchPetApi";

import classes from "./DeletePetPage.module.css";

function DeletePetPage() {
  const {
    sendRequest,
    status,
    data: fetchedData,
    errorMessage,
  } = useHttp(fetchDeletePet, false);

  return (
    <div className={classes["deletePet-outer"]}>
      <DeletePet sendRequest={sendRequest} />
      {status === "pending" && <h1>Loading</h1>}

      {fetchedData != null && fetchedData.code === 200 && (
        <h4>Pet successfully removed</h4>
      )}

      {errorMessage != null && <h4>Pet was not found </h4>}
    </div>
  );
}

export default DeletePetPage;
