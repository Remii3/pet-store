import Button from "../UI/Button";
import useAuthVerification from "../../hooks/useAuthVerification";
import { numbersOnlyCheck } from "../../lib/inputCheckTemplates";
import classes from "./FindPurchaseOrder.module.css";

function FindPurchaseOrder(props) {
  const { sendRequest, fetchedData } = props;

  const {
    enteredValue: enteredOrderId,
    isValid: orderIdIsValid,
    hasError: orderIdHasError,
    changeValueHandler: orderIdChangeHandler,
    blurHandler: orderIdBlurHandler,
    reset: orderIdReset,
  } = useAuthVerification(numbersOnlyCheck, (value) => value > 0);

  let formValid = false;

  if (orderIdIsValid) formValid = true;

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!formValid) return;

    sendRequest({ orderId: enteredOrderId });

    orderIdReset();
  };

  const orderIdClasses =
    (fetchedData == null || fetchedData.code === 1) && orderIdHasError
      ? classes.incorrect
      : "";

  return (
    <div className={classes["findPurchaseOrder-inner"]}>
      <div className={classes["title-space"]}>
        <h1>Find purchase order</h1>
      </div>
      <form onSubmit={formSubmitHandler} className={classes["form-space"]}>
        <div>
          <div>
            <label htmlFor="orderId">Order id</label>
            <input
              type="number"
              id="orderId"
              className={orderIdClasses}
              min={1}
              value={enteredOrderId}
              onChange={orderIdChangeHandler}
              onBlur={orderIdBlurHandler}
            />
          </div>
          {(fetchedData == null || fetchedData.code === 1) &&
            orderIdHasError && (
              <p className={classes.invalidInput}>Invalid order id</p>
            )}
        </div>
        <div className={classes["button-space"]}>
          <Button type="submit" disabled={!formValid}>
            Find
          </Button>
        </div>
      </form>
      {fetchedData != null && fetchedData.id !== undefined && (
        <div className={classes.infoSpace}>
          <div className={classes.infoTitleSpace}>
            <h3>Status: {fetchedData.status || "Not provided"}</h3>
          </div>
          <div>
            <p>
              <span>Order id:</span>
              <span>{fetchedData.id || "Not provided"}</span>
            </p>
            <p>
              <span>Ship date:</span>
              <span>{fetchedData.shipDate.slice(0, 10) || "Not provided"}</span>
            </p>
            <p>
              <span>Assembling:</span>
              <span>
                {(fetchedData.complete && "finished") || "Not provided"}
              </span>
            </p>
          </div>
          <div>
            <p>
              <span>Pet id: </span>
              <span>{fetchedData.petId || "Not provided"}</span>
            </p>
            <p>
              <span>Quantity: </span>
              <span>{fetchedData.quantity || "Not provided"}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default FindPurchaseOrder;
