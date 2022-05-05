import { useHttp } from "../../../hooks/useHttp";
import { fetchFindPurchaseOrder } from "../../../lib/fetchStoreApi";

import FindPurchaseOrder from "../../../components/store/FindPurchaseOrder";

import classes from "./FindPurchaseOrderPage.module.css";

function FindPurchaseOrderPage() {
  const {
    sendRequest,
    status,
    data: fetchedData,
    errorMessage,
  } = useHttp(fetchFindPurchaseOrder, false);

  if (status === "completed" && errorMessage != null)
    return (
      <div>
        <h1>Error</h1>
        <p>{errorMessage}</p>
      </div>
    );

  return (
    <div className={classes["findPurchaseOrder-outer"]}>
      <FindPurchaseOrder sendRequest={sendRequest} fetchedData={fetchedData} />

      {status === "pending" && <h1>Loading</h1>}

      {fetchedData != null && fetchedData.code === 1 && (
        <h4>Purchase order was not found</h4>
      )}
    </div>
  );
}

export default FindPurchaseOrderPage;
