import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Fetch team details
const fetchTeam = async (teamId) => {
  const response = await axios.get(`http://localhost:3001/teams/${teamId}`);
  return response.data;
};

// Custom Hook
export const useTeamName = (teamId, initialName) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["team", teamId],
    queryFn: () => fetchTeam(teamId),
    enabled: !initialName, // Only fetch if no initial name is provided
  });

  return {
    teamName: initialName || (data ? data.name : "Loading..."),
    isLoading,
    isError,
  };
};
