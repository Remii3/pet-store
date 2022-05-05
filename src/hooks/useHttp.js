import { useCallback, useReducer } from "react";

const httpReducer = (state, action) => {
  switch (action.type) {
    case "PENDING":
      return { status: "pending", data: null, errorMessage: null };

    case "SUCCESS":
      return { status: "completed", data: action.data, errorMessage: null };

    case "ERROR":
      return {
        status: "completed",
        data: null,
        errorMessage: action.errorMessage,
      };

    default:
      return state;
  }
};

export function useHttp(reqFunction, startWithPending) {
  const [state, dispatch] = useReducer(httpReducer, {
    status: startWithPending ? "pending" : null,
    data: null,
    errorMessage: null,
  });

  const sendRequest = useCallback(
    async function (fetchPrerequisite) {
      dispatch({ type: "PENDING" });
      try {
        const receivedData = await reqFunction(fetchPrerequisite);
        if (receivedData == null) {
          return dispatch({ type: "ERROR", errorMessage: "Error" });
        } else {
          dispatch({ type: "SUCCESS", data: receivedData });
        }
      } catch (err) {
        dispatch({ type: "ERROR", errorMessage: err });
      }
    },
    [reqFunction]
  );
  return {
    ...state,
    sendRequest,
  };
}
