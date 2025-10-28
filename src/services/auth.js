function mockPost(url, payload, buildData) {
  console.log("Mock POST →", url, payload);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: buildData(payload),
        status: 200,
        statusText: "OK",
        headers: {},
      });
    }, 600);
  });
}

export async function login(credentials) {
  const response = await mockPost("/auth/login", credentials, (data) => ({
    token: "mock-token-123",
    user: {
      email: data.email,
      name: "Mağaza Üyesi",
    },
  }));

  return response.data;
}

export async function signup(formData) {
  const response = await mockPost("/auth/signup", formData, (data) => ({
    token: "mock-token-registered",
    user: {
      email: data.email,
      name: data.name,
    },
  }));

  return response.data;
}
