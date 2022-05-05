import DeleteUser from "../../../components/users/DeleteUser";

import { useHttp } from "../../../hooks/useHttp";
import { fetchDeleteUser } from "../../../lib/fetchUserApi";

import classes from "./DeleteUserPage.module.css";

function DeleteUserPage() {
  const {
    sendRequest,
    status,
    data: fetchedData,
    errorMessage,
  } = useHttp(fetchDeleteUser, false);

  if (status === "completed" && errorMessage != null)
    return (
      <div>
        <h2>Error</h2>
        <p>{errorMessage}</p>
      </div>
    );

  return (
    <div className={classes["deleteUser-outer"]}>
      <DeleteUser sendRequest={sendRequest} fetchedData={fetchedData} />

      {status === "pending" && <h1>Loading</h1>}

      {fetchedData != null && fetchedData.status === 200 && (
        <h4>User successfully removed</h4>
      )}

      {fetchedData != null && fetchedData.status !== 200 && (
        <h4>User was not found</h4>
      )}
    </div>
  );
}

export default DeleteUserPage;
