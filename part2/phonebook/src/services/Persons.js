import axios from "axios";

const baseUrl = "http://localhost:3001/api/persons";

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const addPerson = (personObject) => {
  const request = axios.post(baseUrl, personObject);
  return request.then((response) => response.data);
};
const changeNum = (id, changedPerson) => {
  const request = axios.put(`${baseUrl}/${id}`, changedPerson);
  return request.then((response) => response.data);
};
const handleDelete = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

export default { getAll, addPerson, changeNum, handleDelete };
