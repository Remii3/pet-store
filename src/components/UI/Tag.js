import classes from "./Tag.module.css";

function Tag(props) {
  const deleteHandler = (e) => {
    props.deleteTag(e);
  };

  return (
    <p id={props.id} className={classes.tag} onClick={deleteHandler}>
      {props.children}
    </p>
  );
}

export default Tag;
