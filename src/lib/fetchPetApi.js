export async function fetchGetAllPets(fetchPrerequisite) {
  const { statusMethod, sortMethod } = fetchPrerequisite;
  try {
    const response = await fetch(
      `https://petstore.swagger.io/v2/pet/findByStatus?&status=${statusMethod}`,
      {
        method: "GET",
        credentials: "same-origin",

        headers: {
          "Content-type": "application/json",
          api_key: "asd",
        },
      }
    );

    let data = await response.json();

    if (sortMethod === "ascending") data.sort((a, b) => a.id - b.id);

    data = data.filter((item) => {
      if (item.category === undefined || item.tags === undefined) {
        return false;
      } else if (item.category.length === 0 || item.tags.length === 0) {
        return false;
      }
      return true;
    });

    return data;
  } catch (err) {
    throw new Error(err ? err.message : "Something went wrong.");
  }
}

export async function fetchGetPet(fetchPrerequisite) {
  const { petId } = fetchPrerequisite;

  try {
    const response = await fetch(
      `https://petstore.swagger.io/v2/pet/${petId}`,
      {
        method: "GET",
        headers: { "Content-type": "application/json", api_key: "asd" },
      }
    );

    const data = await response.json();

    return data;
  } catch (err) {
    throw new Error(err ? err.message : "Something went wrong.");
  }
}

export async function fetchAddPet(fetchPrerequisite) {
  const {
    id,
    category,
    enteredName: name,
    photoUrls,
    tags,
    status,
  } = fetchPrerequisite;

  try {
    const response = await fetch("https://petstore.swagger.io/v2/pet", {
      method: "POST",
      headers: { "Content-type": "application/json", api_key: "asd" },
      body: JSON.stringify({
        id,
        category,
        name,
        photoUrls,
        tags,
        status,
      }),
    });

    return response;
  } catch (err) {
    throw new Error(err ? err.message : "Something went wrong.");
  }
}

export async function fetchDeletePet(fetchPrerequisite) {
  const { enteredPetId } = fetchPrerequisite;
  try {
    const response = await fetch(
      `https://petstore.swagger.io/v2/pet/${enteredPetId}`,
      {
        method: "DELETE",
        headers: { "Content-type": "application/json", api_key: "asd" },
      }
    );
    const data = await response.json();

    return data;
  } catch (err) {
    throw new Error(err ? err.message : "Something went wrong.");
  }
}

export async function fetchUpdatePet(fetchPrerequisite) {
  const {
    id,
    category,
    enteredName: name,
    photoUrls,
    tags,
    status,
  } = fetchPrerequisite;

  try {
    const response = await fetch("https://petstore.swagger.io/v2/pet", {
      method: "PUT",
      headers: { "Content-type": "application/json", api_key: "asd" },
      body: JSON.stringify({
        id,
        category,
        name,
        photoUrls,
        tags,
        status,
      }),
    });

    return response;
  } catch (err) {
    throw new Error(err ? err.message : "Something went wrong.");
  }
}

export async function fetchUploadPetPhoto(fetchPrerequisite) {
  const {
    enteredPetId: petId,
    enteredFile: file,
    enteredAdditionalMetaData: additionalMetaData,
  } = fetchPrerequisite;

  try {
    const response = await fetch(
      `https://petstore.swagger.io/v2/pet/${petId}/uploadImage`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-type":
            "multipart/form-data;boundary=Boundary_1_30199356_1283930553295",
          api_key: "asd",
        },
        body: JSON.stringify({ additionalMetaData, file }),
      }
    );

    return response;
  } catch (err) {
    throw new Error(err ? err.message : "Something went wrong.");
  }
}

export async function fetchUpdateExistingPet(fetchPrerequisite) {
  const { enteredPetId, enteredName, enteredStatus } = fetchPrerequisite;

  try {
    const response = await fetch(
      `https://petstore.swagger.io/v2/pet/${enteredPetId}`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-type": "application/x-www-form-urlencoded",
          api_key: "asd",
        },
        body: JSON.stringify({ enteredName, enteredStatus }),
      }
    );

    return response;
  } catch (err) {
    throw new Error(err ? err.message : "Something went wrong.");
  }
}
