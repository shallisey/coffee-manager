export const fetchPost = async (url: string, data = {}) => {
  const options: RequestInit = {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, options);
    return response;
  } catch (error) {
    console.log("error in fetchPost: ==>", error);
  }
};
