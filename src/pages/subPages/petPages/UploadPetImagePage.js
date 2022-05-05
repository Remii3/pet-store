import UploadPetImage from "../../../components/pets/UploadPetImage";

import { useHttp } from "../../../hooks/useHttp";
import { fetchUploadPetPhoto } from "../../../lib/fetchPetApi";

import classes from "./UploadPetImagePage.module.css";

function UploadPetImagePage() {
  const {
    sendRequest,
    status,
    data: fetchedData,
    errorMessage,
  } = useHttp(fetchUploadPetPhoto, false);

  if (status === "completed" && errorMessage != null)
    <div>
      <h2>Error</h2>
      <p>{errorMessage}</p>
    </div>;

  return (
    <div className={classes["uploadPetImage-outer"]}>
      <UploadPetImage sendRequest={sendRequest} />
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

export default UploadPetImagePage;
