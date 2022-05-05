import { useState } from "react";
import { Link } from "react-router-dom";

import Card from "../UI/Card";
import Button from "../UI/Button";

import image1 from "../../assets/dog1.jpg";
import image2 from "../../assets/dog2.jpg";
import image3 from "../../assets/dog3.jpg";

import classes from "./Pets.module.css";

function Pets(props) {
  const { fetchedData } = props;
  const [pagination, setPagination] = useState(1);
  const maximumFetchesOnPage = 20;
  const imgLink = [image1, image2, image3];

  let paginationFinished = false;

  const slicedFetchedData = fetchedData.slice(
    (pagination - 1) * maximumFetchesOnPage,
    pagination * maximumFetchesOnPage
  );

  const nextPageHandler = () => {
    setPagination((prevState) => prevState + 1);
  };

  const previousPageHandler = () => {
    setPagination((prevState) => prevState - 1);
  };

  if (pagination * maximumFetchesOnPage > fetchedData.length) {
    paginationFinished = true;
  }

  return (
    <div className={classes["pets-inner"]}>
      {slicedFetchedData.map((el, index) => {
        const randomImg = Math.floor(Math.random() * 3);
        return (
          <Card key={index} className="home-card">
            <div className={classes.petWindow}>
              <div className={classes["photo-container"]}>
                {/* <Link to={`/Pets/${el.id}`}>
                  <img src={imgLink[randomImg]} alt="dog_photo" />
                </Link> */}
              </div>
              <h3>{el.name}</h3>
              <p>Status: {el.status}</p>
            </div>
          </Card>
        );
      })}
      {props.allowPagination && (
        <div className={classes["button-space"]}>
          {pagination > 1 && (
            <Button onClick={previousPageHandler}>Previous</Button>
          )}
          {!paginationFinished && (
            <Button onClick={nextPageHandler}>Next</Button>
          )}
        </div>
      )}
    </div>
  );
}

export default Pets;
