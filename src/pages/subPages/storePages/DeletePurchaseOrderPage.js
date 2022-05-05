import DeletePurchaseOrder from "../../../components/store/DeletePurchaseOrder";

import { useHttp } from "../../../hooks/useHttp";
import { fetchDeleteOrder } from "../../../lib/fetchStoreApi";

import classes from "./DeletePurchaseOrderPage.module.css";

function DeletePurchaseOrderPage() {
  const {
    sendRequest,
    status,
    data: fetchedData,
    errorMessage,
  } = useHttp(fetchDeleteOrder, false);

  if (status === "completed" && errorMessage != null)
    <div>
      <h2>Error</h2>
      <p>{errorMessage}</p>
    </div>;

  return (
    <div className={classes["deletePurchase-outer"]}>
      <DeletePurchaseOrder sendRequest={sendRequest} />
      {status === "pending" && <h1>Loading</h1>}

      {fetchedData != null && fetchedData.status === 200 && (
        <h4>Successfully deleted</h4>
      )}
      {fetchedData != null && fetchedData.status !== 200 && (
        <h4>Purchase order was not found</h4>
      )}
    </div>
  );
}

export default DeletePurchaseOrderPage;
