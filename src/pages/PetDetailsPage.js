import { useEffect } from "react";
import { useParams, Routes, Route, Link } from "react-router-dom";

import PetDetails from "../components/petDetails/PetDetails";
import Button from "../components/UI/Button";

import { useHttp } from "../hooks/useHttp";
import { fetchGetPet } from "../lib/fetchPetApi";
import { fetchOrderPet } from "../lib/fetchStoreApi";

import classes from "./PetDetailsPage.module.css";

function PetDetailsPage() {
  const params = useParams();

  const {
    sendRequest: sendPetRequest,
    status: petStatus,
    data: fetchedPetData,
    errorMessage: petErrorMessage,
  } = useHttp(fetchGetPet, true);

  const {
    sendRequest: sendStoreRequest,
    status: storeStatus,
    data: fetchedStoreData,
    errorMessage: storeErrorMessage,
  } = useHttp(fetchOrderPet, false);
  useEffect(() => {
    sendPetRequest(params);
  }, [sendPetRequest, params]);

  if (petStatus === "pending") return <h1>Loading</h1>;

  if (petStatus === "completed" && petErrorMessage != null)
    return (
      <div>
        <h2>Error</h2>
        <p>{petErrorMessage}</p>
      </div>
    );

  if (storeStatus === "completed" && storeErrorMessage != null)
    return (
      <div>
        <h2>Error</h2>
        <p>{storeErrorMessage}</p>
      </div>
    );

  return (
    <div className={classes["petDetails-outer"]}>
      {fetchedPetData != null && fetchedPetData.code !== 1 && (
        <PetDetails
          fetchedPetData={fetchedPetData}
          fetchedStoreData={fetchedStoreData}
          storeStatus={storeStatus}
          sendStoreRequest={sendStoreRequest}
        />
      )}

      {fetchedStoreData != null && fetchedStoreData.status === 200 && (
        <div className={classes["successMessage-space"]}>
          <div className={classes["title-space"]}>
            <h2>Successfully placed an order</h2>
          </div>
          <Routes>
            <Route
              path=""
              element={
                <div className={classes["exitButton-space"]}>
                  <Link to={"/"}>
                    <Button>Home</Button>
                  </Link>
                  <Link to={"/Pets"}>
                    <Button>Continue</Button>
                  </Link>
                </div>
              }
            />
          </Routes>
        </div>
      )}

      {fetchedPetData != null && fetchedPetData.code === 1 && (
        <div>
          <h5>
            Due to many pets having the same id on the server side, sometimes
            wrong pet data is being downloaded, resulting in now having
            insufficient data to correctly load the page.
          </h5>
          <h3>Please refresh the page</h3>
        </div>
      )}
    </div>
  );
}

export default PetDetailsPage;
