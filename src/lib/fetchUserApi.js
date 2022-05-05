export async function fetchCreateUser(fetchPrerequisite) {
  const {
    id,
    enteredUserName: username,
    enteredFirstName: firstName,
    enteredLastName: lastName,
    enteredEmail: email,
    enteredPassword: password,
    enteredPhone: phone,
    userStatus,
  } = fetchPrerequisite;

  try {
    const response = await fetch(`https://petstore.swagger.io/v2/user`, {
      method: "POST",
      headers: { "Content-type": "application/json", api_key: "asd" },
      body: JSON.stringify({
        id,
        username,
        firstName,
        lastName,
        email,
        password,
        phone,
        userStatus,
      }),
    });

    return response;
  } catch (err) {
    throw new Error(err ? err.message : "Something went wrong.");
  }
}

export async function fetchLogInUser(fetchPrerequisite) {
  const { enteredUserName: username, enteredPassword: password } =
    fetchPrerequisite;

  try {
    const response = await fetch(
      `https://petstore.swagger.io/v2/user/login?username=${username}&password=${password}`,
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

export async function fetchLogoutUser() {
  try {
    const response = await fetch(`https://petstore.swagger.io/v2/user/logout`, {
      method: "GET",
      headers: { "Content-type": "application/json", api_key: "asd" },
    });

    const data = await response.json();

    return data;
  } catch (err) {
    throw new Error(err ? err.message : "Something went wrong.");
  }
}

export async function fetchDeleteUser(fetchPrerequisite) {
  const { username } = fetchPrerequisite;

  try {
    const response = await fetch(
      `https://petstore.swagger.io/v2/user/${username}`,
      {
        method: "DELETE",
        headers: { "Content-type": "application/json", api_key: "asd" },
      }
    );

    return response;
  } catch (err) {
    throw new Error(err ? err.message : "Something went wrong.");
  }
}

export async function fetchUpdateUser(fetchPrerequisite) {
  const {
    enteredOldUsername: oldUsername,
    id,
    enteredUserName: username,
    enteredFirstName: firstName,
    enteredLastName: lastName,
    enteredEmail: email,
    enteredPassword: password,
    enteredPhone: phone,
    userStatus,
  } = fetchPrerequisite;

  try {
    const response = await fetch(
      `https://petstore.swagger.io/v2/user/${oldUsername}`,
      {
        method: "PUT",
        headers: { "Content-type": "application/json", api_key: "asd" },
        body: JSON.stringify({
          id,
          username,
          firstName,
          lastName,
          email,
          password,
          phone,
          userStatus,
        }),
      }
    );

    return response;
  } catch (err) {
    throw new Error(err ? err.message : "Something went wrong.");
  }
}
export async function fetchGetUser(fetchPrerequisite) {
  const { username } = fetchPrerequisite;

  try {
    const response = await fetch(
      `https://petstore.swagger.io/v2/user/${username}`,
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
