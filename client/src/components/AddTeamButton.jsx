import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  MenuItem,
} from "@mui/material";

const AddTeamButton = ({ onTeamAdded }) => {
  const HOST = "http://localhost:3001";
  const [open, setOpen] = useState(false);
  const [newTeamName, setNewTeamName] = useState("");
  const [newTeamDay, setNewTeamDay] = useState(""); // state for Day

  const queryClient = useQueryClient();

  // Mutation to add a new team, including day
  const addTeamMutation = useMutation({
    mutationFn: async ({ teamName, day }) => {
      const response = await axios.post(`${HOST}/teams`, {
        teamName,
        day,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["teams"]);
      handleClose();
    },
  });

  // Open Modal
  const handleOpen = () => setOpen(true);

  // Close Modal and reset state
  const handleClose = () => {
    setOpen(false);
    setNewTeamName("");
    setNewTeamDay("");
  };

  // Handle Form Submit
  const handleAddTeam = () => {
    if (!newTeamName.trim()) return;
    addTeamMutation.mutate({ teamName: newTeamName, day: newTeamDay });
  };

  return (
    <>
      {/* Add Team Button */}
      <Box display="flex" justifyContent="center" sx={{ marginTop: 3 }}>
        <Button
          variant="contained"
          color="success"
          onClick={handleOpen}
          sx={{ fontSize: "15px", padding: "10px 20px" }}
        >
          Add New Team
        </Button>
      </Box>

      {/* Add Team Modal */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "#2A2A2A",
            color: "#ffffff",
            padding: "20px",
          },
        }}
      >
        <DialogTitle
          sx={{ fontSize: "20px", fontWeight: "bold", color: "#fff" }}
        >
          Add a New Team
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Team Name"
            fullWidth
            variant="outlined"
            value={newTeamName}
            onChange={(e) => setNewTeamName(e.target.value)}
            sx={{
              input: { color: "#fff" },
              label: { color: "#bbb" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#555" },
                "&:hover fieldset": { borderColor: "#777" },
                "&.Mui-focused fieldset": { borderColor: "#fff" },
              },
            }}
          />
          {/* New Day Dropdown Field */}
          <TextField
            select
            margin="dense"
            label="Day"
            fullWidth
            variant="outlined"
            value={newTeamDay}
            onChange={(e) => setNewTeamDay(e.target.value)}
            sx={{
              input: { color: "#fff" },
              label: { color: "#bbb" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#555" },
                "&:hover fieldset": { borderColor: "#777" },
                "&.Mui-focused fieldset": { borderColor: "#fff" },
              },
            }}
          >
            <MenuItem value="Monday">Monday</MenuItem>
            <MenuItem value="Tuesday">Tuesday</MenuItem>
            <MenuItem value="Wednesday">Wednesday</MenuItem>
            <MenuItem value="Sunday">Sunday</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: "#bbb" }}>
            Cancel
          </Button>
          <Button
            onClick={handleAddTeam}
            color="primary"
            variant="contained"
            disabled={addTeamMutation.isLoading}
          >
            {addTeamMutation.isLoading ? "Adding..." : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddTeamButton;
