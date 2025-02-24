import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const EditPlayerDialog = ({
  open,
  handleClose,
  editPlayer,
  setEditPlayer,
  onUpdate,
}) => {
  // Predefined Positions array (same as AddPlayerButton)
  const positions = [
    "Pitcher",
    "Catcher",
    "First Base",
    "Second Base",
    "Shortstop",
    "Third Base",
    "Left",
    "Center Left",
    "Center Right",
    "Right",
  ];

  const handleUpdatePlayer = async () => {
    if (editPlayer.name.trim()) {
      await onUpdate(editPlayer.id, editPlayer);
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
        Edit Player
      </DialogTitle>
      <DialogContent>
        {/* Player Name Input */}
        <TextField
          autoFocus
          margin="dense"
          label="Player Name"
          fullWidth
          variant="outlined"
          value={editPlayer.name}
          onChange={(e) =>
            setEditPlayer({ ...editPlayer, name: e.target.value })
          }
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

        {/* Position Dropdown */}
        <FormControl fullWidth sx={{ mt: 3 }}>
          <InputLabel
            shrink
            sx={{ color: "#fff", backgroundColor: "#2A2A2A", px: 1 }}
          >
            Position
          </InputLabel>
          <Select
            value={editPlayer.position}
            onChange={(e) =>
              setEditPlayer({ ...editPlayer, position: e.target.value })
            }
            displayEmpty
            sx={{
              color: "#fff",
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#555" },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#777",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#fff",
              },
              "& .MuiSvgIcon-root": { color: "#fff" },
            }}
          >
            {positions.map((pos) => (
              <MenuItem key={pos} value={pos}>
                {pos}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Gender Dropdown */}
        <FormControl fullWidth sx={{ mt: 3 }}>
          <InputLabel
            shrink
            sx={{ color: "#fff", backgroundColor: "#2A2A2A", px: 1 }}
          >
            Gender
          </InputLabel>
          <Select
            value={editPlayer.gender}
            onChange={(e) =>
              setEditPlayer({ ...editPlayer, gender: e.target.value })
            }
            displayEmpty
            sx={{
              color: "#fff",
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#555" },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#777",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#fff",
              },
              "& .MuiSvgIcon-root": { color: "#fff" },
            }}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{ color: "#bbb" }}>
          Cancel
        </Button>
        <Button
          onClick={handleUpdatePlayer}
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

export default EditPlayerDialog;
