import classes from "./Card.module.css";

function Card(props) {
  const { className } = props;

  return <div className={classes[className]}>{props.children}</div>;
}

export default Card;
