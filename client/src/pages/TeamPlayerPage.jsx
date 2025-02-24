import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Box, Typography, CircularProgress, Button } from "@mui/material";
import AddPlayerButton from "../components/AddPlayerButton";
import DeletePlayerDialog from "../components/DeletePlayerDialog";
import EditPlayerDialog from "../components/EditPlayerDialog";
import PlayersTable from "../components/PlayersTable";
import {
  fetchPlayers,
  addPlayer,
  updatePlayer,
  deletePlayer,
} from "../api/players";

const TeamPlayersPage = () => {
  const { teamId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const location = useLocation();

  const teamName = location.state?.teamName || "Unknown Team";

  // Fetch players for the given team
  const {
    data: players = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["teamPlayers", teamId],
    queryFn: () => fetchPlayers(teamId),
    staleTime: 1000 * 60 * 5,
  });

  // Mutation to add a new player
  const addPlayerMutation = useMutation({
    mutationFn: (newPlayer) => addPlayer(teamId, newPlayer),
    onSuccess: () => {
      queryClient.invalidateQueries(["teamPlayers", teamId]);
    },
  });

  // Mutation to update a player
  const updatePlayerMutation = useMutation({
    mutationFn: ({ playerId, updatedPlayer }) =>
      updatePlayer({ playerId, updatedPlayer }),
    onSuccess: () => {
      queryClient.invalidateQueries(["teamPlayers", teamId]);
    },
  });

  // Mutation to delete a player
  const deletePlayerMutation = useMutation({
    mutationFn: (playerId) => deletePlayer(playerId),
    onSuccess: () => {
      queryClient.invalidateQueries(["teamPlayers", teamId]);
    },
  });

  const handleAddPlayer = (newPlayer) => {
    addPlayerMutation.mutate(newPlayer);
  };

  const [openConfirm, setOpenConfirm] = useState(false);
  const [playerToDelete, setPlayerToDelete] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [playerToEdit, setPlayerToEdit] = useState({
    id: "",
    name: "",
    position: "",
    gender: "",
  });

  const handleOpenConfirm = (playerId) => {
    setPlayerToDelete(playerId);
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
    setPlayerToDelete(null);
  };

  const handleConfirmDelete = async (playerId) => {
    await deletePlayerMutation.mutateAsync(playerId);
    handleCloseConfirm();
  };

  const handleOpenEdit = (player) => {
    setPlayerToEdit(player);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setPlayerToEdit({ id: "", name: "", position: "", gender: "" });
  };

  const handleConfirmEdit = async (playerId, updatedPlayer) => {
    await updatePlayerMutation.mutateAsync({ playerId, updatedPlayer });
    handleCloseEdit();
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
          Error loading players. Please try again.
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
      <Typography variant="h4" sx={{ marginBottom: 3, color: "#fff" }}>
        {teamName} Roster
      </Typography>

      {/* Render the PlayersTable component */}
      <PlayersTable
        players={players}
        onEdit={handleOpenEdit}
        onDelete={handleOpenConfirm}
      />

      <DeletePlayerDialog
        open={openConfirm}
        handleClose={handleCloseConfirm}
        playerToDelete={playerToDelete}
        onDelete={handleConfirmDelete}
      />

      <EditPlayerDialog
        open={openEdit}
        handleClose={handleCloseEdit}
        editPlayer={playerToEdit}
        setEditPlayer={setPlayerToEdit}
        onUpdate={handleConfirmEdit}
      />

      <Box
        sx={{ marginTop: 3, display: "flex", gap: 2, justifyContent: "center" }}
      >
        <Button
          variant="contained"
          onClick={() => navigate("/")}
          sx={{
            fontSize: "15px",
            fontWeight: "500",
            padding: "10px 20px",
            minWidth: "180px",
            backgroundColor: "#1976d2",
            "&:hover": { backgroundColor: "#115293" },
          }}
        >
          ← Back to All Teams
        </Button>
        <AddPlayerButton
          teamId={teamId}
          onAddPlayer={handleAddPlayer}
          isLoading={addPlayerMutation.isLoading}
        />
      </Box>
    </Box>
  );
};

export default TeamPlayersPage;
