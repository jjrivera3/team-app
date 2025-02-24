// client/src/api/players.js
import axios from "axios";

const HOST = "http://localhost:3001";

export const fetchPlayers = async (teamId) => {
  const response = await axios.get(`${HOST}/teams/${teamId}/players`);
  return response.data;
};

export const addPlayer = async (teamId, newPlayer) => {
  const response = await axios.post(
    `${HOST}/teams/${teamId}/players`,
    newPlayer
  );
  return response.data;
};

export const updatePlayer = async ({ playerId, updatedPlayer }) => {
  const response = await axios.put(
    `${HOST}/players/${playerId}`,
    updatedPlayer
  );
  return response.data;
};

export const deletePlayer = async (playerId) => {
  await axios.delete(`${HOST}/players/${playerId}`);
};
