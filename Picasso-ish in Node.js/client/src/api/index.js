export async function generateArtworksRequest(prompt, email) {
  try {
    const response = await fetch(`/api/homepage/postArtworks/${prompt}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        email,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(`Error generating artwork: ${data.error}`);
    }

    return data.imageUrls;
  } catch (error) {
    throw new Error(`Error generating artwork: ${error}`);
  }
}

export async function getArtworksRequest() {
  try {
    const response = await fetch(`/api/homepage/getnineimages`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        "HTTP status " + response.status + " failed to get images"
      );
    }
    const images = await response.json(); // parse JSON data
    //console.log(images);
    return images;
  } catch (err) {
    console.log(err);
  }
}

export async function getOneArtworksRequest() {
  try {
    const response = await fetch(`/api/homepage/getOneImages`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        "HTTP status " + response.status + " failed to get images"
      );
    }
    const images = await response.json(); // parse JSON data
    //console.log(images);
    return images;
  } catch (err) {
    console.log(err);
  }
}

export async function getSharedArtworksRequest() {
  try {
    const response = await fetch(`/api/homepage/getninesharedimages`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        "HTTP status " + response.status + " failed to get images"
      );
    }
    const images = await response.json(); // parse JSON data
    //console.log(images);
    return images;
  } catch (err) {
    console.log(err);
  }
}

export async function getSmallImagesRequest(id) {
  try {
    const response = await fetch(`/api/homepage/getsmallimages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });

    if (!response.ok) {
      throw new Error(
        "HTTP status " + response.status + " failed to get images"
      );
    }
    const images = await response.json(); // parse JSON data
    //console.log(images);
    return images;
  } catch (err) {
    console.log(err);
  }
}

export async function getLargeImagesRequest(id) {
  try {
    const response = await fetch(`/api/homepage/getlargeimages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });

    if (!response.ok) {
      throw new Error(
        "HTTP status " + response.status + " failed to get images"
      );
    }
    const images = await response.json(); // parse JSON data
    //console.log(images);
    return images;
  } catch (err) {
    console.log(err);
  }
}

export async function getLastImagesRequest() {
  try {
    const response = await fetch(`/api/homepage/getlastfourimages`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        "HTTP status " + response.status + " failed to get images"
      );
    }
    const images = await response.json(); // parse JSON data
    //console.log(images);
    return images;
  } catch (err) {
    console.log(err);
  }
}

export async function postProfileRequest(email) {
  try {
    const response = await fetch(`/api/profile/postprofile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    if (!response.ok) {
      throw new Error(
        "HTTP status " + response.status + " failed to get profile"
      );
    }

    const profile = await response.json(); // parse JSON data
    return profile[0];
  } catch (err) {
    console.log(err);
  }
}

export async function updateProfileRequest(
  email,
  password,
  firstname,
  lastname
) {
  const response = await fetch(`/api/profile/updateprofile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      firstname,
      lastname,
    }),
  });

  if (!response.ok) {
    throw new Error(
      "HTTP status " + response.status + " failed to update profile"
    );
  }

  const result = await response.text();
  console.log(result);
}

export async function postSaved(email) {
  try {
    const response = await fetch(`/api/profile/postsaved`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    if (!response.ok) {
      throw new Error(
        "HTTP status " + response.status + " failed to get saved"
      );
    }

    const profile = await response.json(); // parse JSON data
    return profile;
  } catch (err) {
    console.log(err);
  }
}

export async function postShared(email) {
  try {
    const response = await fetch(`/api/profile/postshared`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    if (!response.ok) {
      throw new Error(
        "HTTP status " + response.status + " failed to get saved"
      );
    }

    const profile = await response.json(); // parse JSON data
    return profile;
  } catch (err) {
    console.log(err);
  }
}

export async function postSignIn(email, password) {
  try {
    const response = await fetch(`/api/signinpage/postsigninpage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error("HTTP status " + response.status + " failed to sign in");
    }

    const result = await response.text(); 
    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function postSignUp(
  email,
  password,
  firstname,
  lastname,
  dateofbirth
) {
  try {
    const response = await fetch(`/api/signuppage/postsignuppage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        firstname,
        lastname,
        dateofbirth,
      }),
    });

    if (response.status === 409) {
      return 409;
    }
    if (!response.ok) {
      throw new Error(response.status);
    }

    const result = await response.status;
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function putSaveImage(id) {
  try {
    const response = await fetch(`/api/genneratedpage/putSave`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });

    if (!response.ok) {
      throw new Error(
        "HTTP status " + response.status + " failed to update profile"
      );
    }

    const result = await response.text();
    console.log(result);
  } catch (err) {
    console.log(err);
  }
}

export async function putShareImage(id) {
  try {
    const response = await fetch(`/api/genneratedpage/putShare`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });

    if (!response.ok) {
      throw new Error(
        "HTTP status " + response.status + " failed to update profile"
      );
    }

    const result = await response.text();
    console.log(result);
  } catch (err) {
    console.log(err);
  }
}

export async function postCreditCard(cardNumber, cvc, expirationDate, address) {
  try {
    const response = await fetch(`/api/checkout/validatecard`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cardNumber,
        cvc,
        expirationDate,
        address,
      }),
    });

    if (!response.ok) {
      throw new Error(
        "HTTP status " + response.status + " failed to get credit card"
      );
    }

    const result = await response.text();
    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function insertCard(
  cardNumber,
  cvc,
  expirationDate,
  type,
  address,
  email
) {
  try {
    const response = await fetch(`/api/checkout/insertcard`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cardNumber,
        cvc,
        expirationDate,
        type,
        address,
        email,
      }),
    });

    if (response.status === 409) {
      return 409;
    }
    if (!response.ok) {
      throw new Error(response.status);
    }

    const result = await response.status;
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function postSaveShareStutus(id) {
  try {
    const response = await fetch(`/api/genneratedpage/postSaveShareStutus`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });

    if (!response.ok) {
      throw new Error(response.status);
    }

    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
  }
}

export async function postTwelveSavedImages(email, iterations) {
  try {
    const response = await fetch(`/api/savedimagespage/postsavedimages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        iterations,
      }),
    });

    if (!response.ok) {
      throw new Error(
        "HTTP status " + response.status + " failed to get saved images"
      );
    }

    const images = await response.json(); // parse JSON data
    return images;
  } catch (err) {
    console.log(err);
  }
}

export async function resizeTest() {
  try {
    const response = await fetch(`/api/resize/resizeimagers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
  } catch (err) {
    console.log(err);
  }
}

export async function postTwelveSharedImages(email, iterations) {
  try {
    const response = await fetch(`/api/sharedimagespage/postsharedimages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        iterations,
      }),
    });

    if (!response.ok) {
      throw new Error(
        "HTTP status " + response.status + " failed to get shared images"
      );
    }

    const images = await response.json(); // parse JSON data
    return images;
  } catch (err) {
    console.log(err);
  }
}

export async function postOrders(email) {
  try {
    const response = await fetch(`/api/orderspage/postorderspage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    if (!response.ok) {
      throw new Error(
        "HTTP status " + response.status + " failed to get shared images"
      );
    }

    const images = await response.json(); // parse JSON data
    return images;
  } catch (err) {
    console.log(err);
  }
}

export async function postImageOwner(email, id) {
  try {
    const response = await fetch(`/api/genneratedpage/postImageOwner`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        id,
      }),
    });

    if (!response.ok) {
      throw new Error(response.status);
    }

    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
  }
}

export async function postLastOrderRequest(price, email) {
  try {
    const response = await fetch(`/api/orderspage/insertorders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price,
        email,
      }),
    });

    if (!response.ok) {
      throw new Error(
        "HTTP status " + response.status + " failed to insert order"
      );
    }
    const id = await response.json(); // parse JSON data
    return id.orderId;
  } catch (err) {
    console.log(err);
  }
}

export async function postOrderintoImageTable(email, orderId, imageId) {
  try {
    const response = await fetch(`/api/checkout/orderinimage`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        orderId,
        imageId,
      }),
    });

    if (!response.ok) {
      throw new Error(
        "HTTP status " +
          response.status +
          " failed to insert order in image table"
      );
    }
  } catch (err) {
    console.log(err);
  }
}

export async function postCards(email) {
  try {
    console.log("in index");
    const response = await fetch(`/api/profile/postCards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    if (!response.ok) {
      throw new Error(
        "HTTP status " + response.status + " failed to get shared images"
      );
    }

    const cards = await response.json(); // parse JSON data
    return cards;
  } catch (err) {
    console.log(err);
  }
}

export async function updateLikesRequest(numLikes, id) {
  try {
    const response = await fetch(`/api/genneratedpage/updatelikes`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        numLikes,
        id,
      }),
    });
    if (!response.ok) {
      throw new Error(
        "HTTP status " + response.status + " failed to update like"
      );
    }
  } catch (err) {
    console.log(err);
  }
}
