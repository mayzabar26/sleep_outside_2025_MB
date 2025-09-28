const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  //Week 04 - assignment starts here
  const jsonResponse = await res.json();
  //ends here

  if (res.ok) {
    console.log(res)
    return jsonResponse;
  } else {
    throw { name: 'servicesError', message: jsonResponse };
  }
}

export default class ExternalServices {
  constructor() {
  }

  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async checkout(payload) {
    const url = `${baseURL}checkout`;
    const options = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };
    const response = await fetch(url, options);
    return convertToJson(response);
  }
}