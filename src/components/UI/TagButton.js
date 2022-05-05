import classes from "./TagButton.module.css";

function TagButton(props) {
  return (
    <button
      type={props.type}
      className={classes.tagButton}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export default TagButton;
