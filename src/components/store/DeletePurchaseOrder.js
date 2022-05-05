import useAuthVerification from "../../hooks/useAuthVerification";
import { numbersOnlyCheck } from "../../lib/inputCheckTemplates";

import Button from "../UI/Button";

import classes from "./DeletePurchaseOrder.module.css";

function DeletePurchaseOrder(props) {
  const { sendRequest } = props;
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
  const orderIdClasses = orderIdHasError ? classes.incorrect : "";

  return (
    <div className={classes["deletePurchaseOder-inner"]}>
      <div className={classes["title-space"]}>
        <h1>Delete purchase order</h1>
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
          {orderIdHasError && (
            <p className={classes.invalidInput}>Invalid order id</p>
          )}
        </div>
        <div className={classes["button-space"]}>
          <Button type="submit" disabled={!formValid}>
            Delete
          </Button>
        </div>
      </form>
    </div>
  );
}

export default DeletePurchaseOrder;
