import axios from 'axios';

const baseUrl = 'https://fullstack-backend-exercise.herokuapp.com/api/persons';

const getAll = () => {
  const request = axios.get(baseUrl);
  // console.log(request);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

const del = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

export {
  getAll,
  create,
  update,
  del,
};
