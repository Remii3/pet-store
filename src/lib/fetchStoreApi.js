export async function fetchOrderPet(fetchPrerequisite) {
  const { id, petId, quantity, shipDate, status, complete } = fetchPrerequisite;

  try {
    const response = await fetch(`https://petstore.swagger.io/v2/store/order`, {
      method: "POST",
      headers: { "Content-type": "application/json", api_key: "asd" },
      body: JSON.stringify({ id, petId, quantity, shipDate, status, complete }),
    });

    return response;
  } catch (err) {
    throw new Error(err.message ? err.message : "Something went wrong");
  }
}

export async function fetchInventoriesPet() {
  try {
    const response = await fetch(
      `https://petstore.swagger.io/v2/store/inventory`,
      {
        method: "GET",
        headers: { "Content-type": "application/json", api_key: "asd" },
      }
    );

    const data = await response.json();

    return data;
  } catch (err) {
    throw new Error(err.message ? err.message : "Something went wrong");
  }
}

export async function fetchFindPurchaseOrder(fetchPrerequisite) {
  const { orderId } = fetchPrerequisite;

  try {
    const response = await fetch(
      `https://petstore.swagger.io/v2/store/order/${orderId}`,
      {
        method: "GET",
        headers: { "Content-type": "application/json", api_key: "asd" },
      }
    );

    const data = await response.json();

    return data;
  } catch (err) {
    throw new Error(err.message ? err.message : "Something went wrong");
  }
}

export async function fetchDeleteOrder(fetchPrerequisite) {
  try {
    const { orderId } = fetchPrerequisite;

    const response = await fetch(
      `https://petstore.swagger.io/v2/store/order/${orderId}`,
      {
        method: "DELETE",
        headers: { "Content-type": "application/json", api_key: "asd" },
      }
    );

    return response;
  } catch (err) {
    throw new Error(err.message ? err.message : "Something went wrong");
  }
}
