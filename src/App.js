import { Fragment } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/layout/Layout";

import ContextProvider from "./context/ContextProvider";

import MainPage from "./pages/MainPage";
import PetsPage from "./pages/PetsPage";
import PetDetailsPage from "./pages/PetDetailsPage";
import ProfilePage from "./pages/ProfilePage";
import StorePage from "./pages/StorePage";
import UsersPage from "./pages/UsersPage";

import AddNewPetPage from "./pages/subPages/petPages/AddNewPetPage";
import DeletePetPage from "./pages/subPages/petPages/DeletePetPage";
import UpdatePetInStorePage from "./pages/subPages/petPages/UpdatePetInStorePage";
import UpdatePetInfoPage from "./pages/subPages/petPages/UpdatePetInfoPage";
import UploadPetImagePage from "./pages/subPages/petPages/UploadPetImagePage";

import FindPurchaseOrderPage from "./pages/subPages/storePages/FindPurchaseOrderPage";
import DeletePurchaseOrderPage from "./pages/subPages/storePages/DeletePurchaseOrderPage";

import DeleteUserPage from "./pages/subPages/userPages/DeleteUserPage";
import UpdateUserPage from "./pages/subPages/userPages/UpdateUserPage";

function App() {
  return (
    <Fragment>
      <ContextProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<MainPage />} />

            <Route path="/Pets/*" element={<PetsPage />} />
            <Route path="/Pets/:petId/*" element={<PetDetailsPage />} />
            <Route path="/Store" element={<StorePage />} />
            <Route path="/Users" element={<UsersPage />} />
            <Route path="/Profile/*" element={<ProfilePage />} />

            <Route path="/Profile/AddNewPet" element={<AddNewPetPage />} />
            <Route path="/Profile/DeletePet" element={<DeletePetPage />} />
            <Route
              path="/Profile/DeletePurchaseOrder"
              element={<DeletePurchaseOrderPage />}
            />
            <Route path="/Profile/DeleteUser" element={<DeleteUserPage />} />
            <Route
              path="/Profile/FindPurchaseOrder"
              element={<FindPurchaseOrderPage />}
            />
            <Route
              path="/Profile/UpdatedPetInfo"
              element={<UpdatePetInfoPage />}
            />
            <Route path="/Profile/UpdatedUser" element={<UpdateUserPage />} />
            <Route
              path="/Profile/UpdatePetInStore"
              element={<UpdatePetInStorePage />}
            />
            <Route
              path="/Profile/UploadPetImage"
              element={<UploadPetImagePage />}
            />
            <Route path="/*" element={<Navigate to={"/"} replace />} />
          </Routes>
        </Layout>
      </ContextProvider>
    </Fragment>
  );
}

export default App;
