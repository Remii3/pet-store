import useAuthVerification from "../../hooks/useAuthVerification";
import { numbersOnlyCheck } from "../../lib/inputCheckTemplates";

import Button from "../UI/Button";

import classes from "./PetDetails.module.css";

function PetDetails(props) {
  const { fetchedStoreData, fetchedPetData, sendStoreRequest } = props;

  const {
    enteredValue: enteredQuantityToOrder,
    isValid: quantityToOrderIsValid,
    hasError: quantityToOrderHasError,
    changeValueHandler: quantityToOrderChangeHandler,
    blurHandler: quantityToOrderBlurHandler,
    reset: quantityToOrderReset,
  } = useAuthVerification(numbersOnlyCheck, (value) => value > 0);

  let formValid = false;

  if (quantityToOrderIsValid) formValid = true;

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (!formValid) return;

    const shipDate = new Date().toISOString();
    const id = Math.floor(Math.random() * 100);

    sendStoreRequest({
      id,
      petId: fetchedPetData.id,
      quantity: enteredQuantityToOrder,
      shipDate,
      status: "placed",
      complete: true,
    });

    quantityToOrderReset();
  };

  const quantityToOrderClasses = quantityToOrderHasError
    ? classes.incorrect
    : "";

  return (
    <div className={classes["petDetails-inner"]}>
      <div className={classes["title-space"]}>
        <h1>About the pet</h1>
      </div>
      <div className={classes["information-space"]}>
        <h3>Main information</h3>
        <p>
          <span>Name:</span>
          <span>{fetchedPetData.name || "Not provided"}</span>
        </p>
        <p>
          <span>Pet id:</span>
          <span>{fetchedPetData.id || "Not provided"}</span>
        </p>
        <p>
          <span>Status:</span>
          <span>{fetchedPetData.status || "Not provided"}</span>
        </p>
      </div>

      <div className={classes["information-space"]}>
        <h3>Photos</h3>
        {(fetchedPetData.photoUrls !== undefined &&
          fetchedPetData.photoUrls.map((el) => {
            return (
              <p key={el}>
                <span>Photos:</span> <span>{el}</span>
              </p>
            );
          })) ||
          "Not provided"}
      </div>

      <div className={classes["information-space"]}>
        <h3>Tags</h3>
        {(fetchedPetData.tags !== undefined &&
          fetchedPetData.tags.map((el) => {
            return (
              <div key={el.id}>
                <p>
                  <span>Tag id:</span> <span>{el.id}</span>
                </p>
                <p>
                  <span>Tag:</span> <span>{el.name}</span>
                </p>
              </div>
            );
          })) ||
          "Not provided"}
      </div>

      <div className={classes["information-space"]}>
        <h3>Category</h3>
        {fetchedPetData.category !== undefined && (
          <div>
            <p>
              <span>Category id:</span>
              <span>{fetchedPetData.category.id || "Not provided"}</span>
            </p>
            <p>
              <span>Category:</span>
              <span>{fetchedPetData.category.name || "Not provided"}</span>
            </p>
          </div>
        )}
      </div>

      {fetchedStoreData == null && (
        <form onSubmit={formSubmitHandler} className={classes["form-space"]}>
          <div className={classes["secondTitle-space"]}>
            <h2>Would you like to order this type of pet?</h2>
          </div>
          <div>
            <div>
              <label htmlFor="quantity">How many of them </label>
              <input
                type="number"
                id="quantity"
                className={quantityToOrderClasses}
                value={enteredQuantityToOrder}
                min={1}
                onChange={quantityToOrderChangeHandler}
                onBlur={quantityToOrderBlurHandler}
              />
            </div>
            {quantityToOrderHasError && (
              <p className={classes.invalidInput}>
                Provided invalid quantity, min: 1
              </p>
            )}
          </div>
          <div className={classes["button-space"]}>
            <Button type="submit" disabled={!formValid}>
              Order!
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

export default PetDetails;
