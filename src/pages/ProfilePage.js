import { Routes, Route, Link } from "react-router-dom";

import classes from "./ProfilePage.module.css";

function ProfilePage() {
  const sessionNumber = localStorage.getItem("session");
  const sessionUser = localStorage.getItem("username");

  return (
    <div className={classes["profile-outer"]}>
      <div className={classes["title-space"]}>
        <h1>Session user: {sessionUser}</h1>
        <h4>Session number: {sessionNumber}</h4>
      </div>
      <Routes>
        <Route
          path=""
          element={
            <section className={classes["profile-inner"]}>
              <Link to={"/Profile/AddNewPet"}>
                <div>
                  <p>Add new pet</p>
                </div>
              </Link>
              <Link to={"/Profile/UpdatedPetInfo"}>
                <div>
                  <p>Update pet information</p>
                </div>
              </Link>
              <Link to={"/Profile/UpdatePetInStore"}>
                <div>
                  <p>Update Pet In Store</p>
                </div>
              </Link>
              <Link to={"/Profile/DeletePet"}>
                <div>
                  <p>Delete pet</p>
                </div>
              </Link>
              <Link to={"/Profile/FindPurchaseOrder"}>
                <div>
                  <p>Find purchase order</p>
                </div>
              </Link>
              <Link to={"/Profile/DeletePurchaseOrder"}>
                <div>
                  <p>Delete purchase order</p>
                </div>
              </Link>
              <Link to={"/Profile/UpdatedUser"}>
                <div>
                  <p>Update user</p>
                </div>
              </Link>
              <Link to={"/Profile/DeleteUser"}>
                <div>
                  <p>Delete user</p>
                </div>
              </Link>
              <Link to={"/Profile/UploadPetImage"}>
                <div>
                  <p>Upload pet image</p>
                </div>
              </Link>
            </section>
          }
        />
      </Routes>
    </div>
  );
}

export default ProfilePage;
