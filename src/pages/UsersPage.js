import Users from "../components/users/Users";

import { useHttp } from "../hooks/useHttp";
import { fetchGetUser } from "../lib/fetchUserApi";

import classes from "./UsersPage.module.css";

function UsersPage() {
  const {
    sendRequest,
    status,
    data: fetchedData,
    errorMessage,
  } = useHttp(fetchGetUser, false);

  if (status === "completed" && errorMessage != null)
    return (
      <div>
        <h2>Error</h2>
        <p>{errorMessage}</p>
      </div>
    );

  return (
    <div className={classes["users-outer"]}>
      <Users sendRequest={sendRequest} fetchedData={fetchedData} />

      {status === "pending" && <h1>Loading</h1>}

      {fetchedData != null && fetchedData.code === 1 && (
        <div className={classes["errorInfo-space"]}>
          <h2>{fetchedData.message}</h2>
          <p>
            Try to register it first or if you've already registered try
            refreshing the page
          </p>
        </div>
      )}
    </div>
  );
}

export default UsersPage;
