import axios from "axios";

const token = "Ex9yLyRU7wvyxfblpq5HAhfQqUP1vIyo";
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
export const ApiCall = async (API, params) => {
  // try {
  const { data } = await axios.get(API, {
    ...params,
  });
  return data;
};
