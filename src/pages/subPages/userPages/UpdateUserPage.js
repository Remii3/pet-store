import UpdateUser from "../../../components/users/UpdateUser";

import { useHttp } from "../../../hooks/useHttp";
import { fetchUpdateUser } from "../../../lib/fetchUserApi";

import classes from "./UpdateUserPage.module.css";

function UpdatedUserPage() {
  const {
    sendRequest,
    status,
    data: fetchedData,
    errorMessage,
  } = useHttp(fetchUpdateUser, false);

  if (status === "completed" && errorMessage != null)
    return (
      <div>
        <h4>Error</h4>
        <p>{errorMessage}</p>
      </div>
    );

  return (
    <div className={classes["updateUserPage-outer"]}>
      <UpdateUser sendRequest={sendRequest} />
      {status === "pending" && <h2>Loading</h2>}

      {fetchedData != null && fetchedData.status === 200 && (
        <h3>Successfully updated user</h3>
      )}
      {fetchedData != null && fetchedData.status !== 200 && (
        <h3>User was not found</h3>
      )}
    </div>
  );
}

export default UpdatedUserPage;
