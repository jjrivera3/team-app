import axios from "axios";

const HOST = "http://localhost:3001";

export const fetchTeams = async () => {
  const response = await axios.get(`${HOST}/teams`);
  return response.data;
};

export const addTeam = async (newTeam) => {
  const response = await axios.post(`${HOST}/teams`, newTeam);
  return response.data;
};

export const updateTeam = async ({ id, name, day }) => {
  const response = await axios.put(`${HOST}/teams/${id}`, { name, day });
  return response.data;
};

export const deleteTeam = async (id) => {
  await axios.delete(`${HOST}/teams/${id}`);
};
