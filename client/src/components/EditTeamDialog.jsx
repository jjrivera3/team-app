import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";

const EditTeamDialog = ({
  open,
  handleClose,
  editTeam,
  setEditTeam,
  onUpdate,
}) => {
  // Handle changes for both 'name' and 'day' fields
  const handleChange = (e) => {
    setEditTeam({
      ...editTeam,
      [e.target.name]: e.target.value,
    });
  };

  // Called when user clicks the "Save" button
  const handleUpdateTeam = async () => {
    if (editTeam.name.trim()) {
      // Pass both name and day to onUpdate
      await onUpdate(editTeam.id, {
        name: editTeam.name,
        day: editTeam.day,
      });
      handleClose();
    }
  };

  return (
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
      <DialogTitle sx={{ color: "#fff", fontWeight: "bold" }}>
        Edit Team
      </DialogTitle>
      <DialogContent>
        {/* Team Name Field */}
        <TextField
          autoFocus
          margin="dense"
          label="Team Name"
          name="name"
          fullWidth
          variant="outlined"
          value={editTeam.name || ""}
          onChange={handleChange}
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

        {/* Day Dropdown Field */}
        <TextField
          select
          margin="dense"
          label="Day"
          name="day"
          fullWidth
          variant="outlined"
          value={editTeam.day || ""}
          onChange={handleChange}
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
          onClick={handleUpdateTeam}
          variant="contained"
          sx={{
            backgroundColor: "#1976d2",
            "&:hover": { backgroundColor: "#115293" },
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTeamDialog;
