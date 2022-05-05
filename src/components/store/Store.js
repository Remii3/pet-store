import classes from "./Store.module.css";

function Store(props) {
  const { fetchedData } = props;
  let arrangedData = [];

  for (let prop in fetchedData) {
    arrangedData.push({ name: prop, value: fetchedData[prop] });
  }

  return (
    <div className={classes["store-inner"]}>
      <div className={classes.titleSpace}>
        <h1>Statuses</h1>
      </div>

      {fetchedData == null || (fetchedData.length <= 0 && <h2>No data</h2>)}

      <div className={classes["data-space"]}>
        {arrangedData.map((data, index) => {
          return (
            <div key={index}>
              <p className={classes.nameSpace}>{data.name}</p>
              <p className={classes.valueSpace}>{data.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Store;
