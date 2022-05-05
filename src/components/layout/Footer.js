import classes from "./Footer.module.css";

function Footer() {
  return (
    <div className={classes["footer-outer"]}>
      <div>
        <i className="fas fa-paw"></i>
      </div>
      <p>Created by Remigiusz Woźniak</p>
    </div>
  );
}

export default Footer;
