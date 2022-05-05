import { useState } from "react";

import useAuthVerification from "../../hooks/useAuthVerification";
import {
  lettersAndNumbersCheck,
  lettersOnlyCheck,
  numbersOnlyCheck,
  whiteSpaceCheck,
} from "../../lib/inputCheckTemplates";

import Tag from "../UI/Tag";
import Button from "../UI/Button";
import TagButton from "../UI/TagButton";

import classes from "./UpdatePetInfo.module.css";

function UpdatePetInfo(props) {
  const { sendRequest } = props;

  const {
    enteredValue: enteredPetId,
    isValid: petIdIsValid,
    hasError: petIdHasError,
    changeValueHandler: petIdChangeHandler,
    blurHandler: petIdBlurHandler,
    reset: petIdReset,
  } = useAuthVerification(numbersOnlyCheck);

  const {
    enteredValue: enteredCategory,
    isValid: categoryIsValid,
    hasError: categoryHasError,
    changeValueHandler: categoryChangeHandler,
    blurHandler: categoryBlurHandler,
    reset: categoryReset,
  } = useAuthVerification(lettersOnlyCheck);

  const {
    enteredValue: enteredName,
    isValid: nameIsValid,
    hasError: nameHasError,
    changeValueHandler: nameChangeHandler,
    blurHandler: nameBlurHandler,
    reset: nameReset,
  } = useAuthVerification(lettersOnlyCheck);

  const {
    enteredValue: enteredTags,
    isValid: tagsAreValid,
    hasError: tagsHaveError,
    changeValueHandler: tagsChangeHandler,
    blurHandler: tagsBlurHandler,
    reset: tagsReset,
  } = useAuthVerification(lettersAndNumbersCheck);

  const {
    enteredValue: enteredPhotoUrls,
    changeValueHandler: photoUrlsChangeHandler,
    reset: photoUrlsReset,
  } = useAuthVerification(whiteSpaceCheck);

  const {
    enteredValue: enteredPhotoUrls2,
    changeValueHandler: photoUrlsChangeHandler2,
    reset: photoUrlsReset2,
  } = useAuthVerification(whiteSpaceCheck);

  const [allTags, setAllTags] = useState([]);

  let formValid = false;

  if (petIdIsValid && categoryIsValid && nameIsValid && allTags.length > 0)
    formValid = true;

  const formSubmitHandler = (e) => {
    e.preventDefault();
    let randomId = Math.floor(Math.random() * 100);

    if (!formValid) return;

    let allPhotoUrls = [];

    allPhotoUrls.push(enteredPhotoUrls, enteredPhotoUrls2);

    sendRequest({
      id: enteredPetId,
      category: { id: randomId, name: enteredCategory },
      enteredName,
      photoUrls: allPhotoUrls,
      tags: allTags,
      status: "available",
    });

    petIdReset();
    categoryReset();
    nameReset();
    tagsReset();
    setAllTags([]);
    photoUrlsReset();
    photoUrlsReset2();
  };

  const addTagHandler = () => {
    if (!tagsAreValid) return;

    let id = allTags.length;
    let DUMMY_ARRAY = [];

    DUMMY_ARRAY.push({ id, enteredTags });

    setAllTags(allTags.concat(DUMMY_ARRAY));

    tagsReset();
  };

  const removeTagHandler = (e) => {
    const tagToRemove = allTags.findIndex((item) => {
      return parseInt(item.id) === parseInt(e.target.id);
    });

    let DUMMY_ARRAY = [];

    DUMMY_ARRAY = allTags.filter((item) => {
      return item.id !== tagToRemove;
    });

    DUMMY_ARRAY.forEach((item, index) => {
      return (item.id = index);
    });

    setAllTags(DUMMY_ARRAY);
  };

  const petIdClasses = petIdHasError ? classes.incorrect : "";
  const categoryClasses = categoryHasError ? classes.incorrect : "";
  const nameClasses = nameHasError ? classes.incorrect : "";
  const tagsClasses =
    tagsHaveError && allTags.length <= 0 ? classes.incorrect : "";

  return (
    <div className={classes["updatePetInfo-inner"]}>
      <div className={classes["title-space"]}>
        <h1>Update existing pet information</h1>
      </div>
      <form onSubmit={formSubmitHandler} className={classes["form-space"]}>
        <div>
          <div>
            <label htmlFor="petId">Pet id</label>
            <input
              type="number"
              id="petId"
              className={petIdClasses}
              value={enteredPetId}
              onChange={petIdChangeHandler}
              onBlur={petIdBlurHandler}
            />
          </div>
          {petIdHasError && (
            <p className={classes.invalidInput}>Invalid pet id</p>
          )}
        </div>
        <div>
          <div>
            <label htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              className={categoryClasses}
              value={enteredCategory}
              onChange={categoryChangeHandler}
              onBlur={categoryBlurHandler}
            />
          </div>
          {categoryHasError && (
            <p className={classes.invalidInput}>Invalid category</p>
          )}
        </div>
        <div>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              className={nameClasses}
              value={enteredName}
              onChange={nameChangeHandler}
              onBlur={nameBlurHandler}
            />
          </div>
          {nameHasError && <p className={classes.invalidInput}>Invalid name</p>}
        </div>
        <div>
          <div>
            <div>
              <label htmlFor="tags">Tags</label>
              <div className={classes["tags-space"]}>
                <input
                  type="text"
                  id="tags"
                  className={tagsClasses}
                  value={enteredTags}
                  onChange={tagsChangeHandler}
                  onBlur={tagsBlurHandler}
                />
                <TagButton type="button" onClick={addTagHandler}>
                  Add tag
                </TagButton>
              </div>
            </div>
          </div>
          <div className={classes["tags-inner"]}>
            {allTags.length > 0 &&
              allTags.map((item, index) => (
                <Tag key={index} id={index} onClick={removeTagHandler}>
                  {item.enteredTags}
                </Tag>
              ))}
          </div>
          {tagsHaveError && allTags.length <= 0 && (
            <p className={classes.invalidInput}>
              Must provide at least one tag
            </p>
          )}
        </div>
        <div>
          <div>
            <label htmlFor="photoUrls1">Phots</label>
            <div className={classes["files-space"]}>
              <input
                type="file"
                id="photoUrls1"
                value={enteredPhotoUrls}
                multiple="multiple"
                accept="image/png, image/jpeg, image/jpg"
                name="files[]"
                onChange={photoUrlsChangeHandler}
              />
              {enteredPhotoUrls !== "" && (
                <input
                  type="file"
                  multiple="multiple"
                  accept="image/png, image/jpeg, image/jpg"
                  name="files[]"
                  value={enteredPhotoUrls2}
                  onChange={photoUrlsChangeHandler2}
                />
              )}
            </div>
          </div>
        </div>
        <div className={classes["button-space"]}>
          <Button type="submit" disabled={!formValid}>
            Update!
          </Button>
        </div>
      </form>
    </div>
  );
}

export default UpdatePetInfo;
