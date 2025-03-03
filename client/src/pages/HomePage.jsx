import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Box, Typography, Paper, CircularProgress } from "@mui/material";
import TeamTable from "../components/TeamTable";
import AddTeamButton from "../components/AddTeamButton";
import { fetchTeams, addTeam, updateTeam, deleteTeam } from "../api/teams";

const HomePage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch teams
  const {
    data: teams = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["teams"],
    queryFn: fetchTeams,
    staleTime: 1000 * 60 * 5,
  });

  // Mutations
  const deleteTeamMutation = useMutation({
    mutationFn: deleteTeam,
    onSuccess: () => {
      queryClient.invalidateQueries(["teams"]);
    },
  });

  const updateTeamMutation = useMutation({
    mutationFn: updateTeam,
    onSuccess: () => {
      queryClient.invalidateQueries(["teams"]);
    },
  });

  const addTeamMutation = useMutation({
    mutationFn: addTeam,
    onSuccess: () => {
      queryClient.invalidateQueries(["teams"]);
    },
  });

  const handleViewTeam = (teamId) => {
    const selectedTeam = teams.find((team) => team.id === teamId);
    navigate(`/teams/${teamId}/`, {
      state: { teamName: selectedTeam?.name },
    });
  };

  const handleDeleteTeam = (id) => {
    deleteTeamMutation.mutate(id);
  };

  const handleUpdateTeam = (id, updates) => {
    updateTeamMutation.mutate({ id, ...updates });
  };

  const onTeamAdded = (newTeam) => {
    addTeamMutation.mutate(newTeam);
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundColor: "#1E1E1E",
          width: "100vw",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundColor: "#1E1E1E",
          width: "100vw",
        }}
      >
        <Typography color="error" variant="h6">
          Error loading teams. Please try again.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#1E1E1E",
        width: "100vw",
      }}
    >
      <Typography variant="h3" sx={{ color: "white", marginBottom: 3 }}>
        Team Management
      </Typography>
      <Box
        component={Paper}
        sx={{
          width: "100%",
          maxWidth: "1200px",
          backgroundColor: "#2A2A2A",
        }}
      >
        <TeamTable
          teams={teams}
          onView={handleViewTeam}
          onDelete={handleDeleteTeam}
          onUpdate={handleUpdateTeam}
        />
      </Box>
      <Box sx={{ marginTop: 2 }}>
        <AddTeamButton />
      </Box>
    </Box>
  );
};

export default HomePage;
