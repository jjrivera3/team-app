import { useState } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";

const AddPlayerButton = ({ teamId, onAddPlayer }) => {
  const [open, setOpen] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [position, setPosition] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);

  // Predefined Positions
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

  // Open Modal
  const handleOpen = () => setOpen(true);

  // Close Modal
  const handleClose = () => {
    if (!loading) {
      setOpen(false);
      setPlayerName("");
      setPosition("");
      setGender("");
    }
  };

  // Handle Form Submit
  const handleAddPlayer = async () => {
    if (!playerName.trim() || !position || !gender) return;

    setLoading(true);
    try {
      await onAddPlayer({
        name: playerName,
        position,
        gender,
      });
      handleClose(); // Close modal after success
    } catch (error) {
      console.error("Error adding player:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Add Player Button */}
      <Box display="flex" justifyContent="center">
        <Button
          variant="contained"
          color="success"
          onClick={handleOpen}
          sx={{
            fontSize: "15px",
            padding: "10px 20px",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <PersonAddIcon sx={{ fontSize: "20px" }} />
          Add New Player
        </Button>
      </Box>

      {/* Add Player Modal */}
      <Dialog
        open={open}
        onClose={!loading ? handleClose : undefined} // Prevent closing while loading
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
          Add a New Player
        </DialogTitle>
        <DialogContent>
          {/* Player Name Input */}
          <TextField
            autoFocus
            margin="dense"
            label="Player Name"
            fullWidth
            variant="outlined"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
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

          {/* Position Selection */}
          <FormControl fullWidth sx={{ mt: 3 }}>
            <InputLabel
              shrink
              sx={{ color: "#fff", backgroundColor: "#2A2A2A", px: 1 }}
            >
              Position
            </InputLabel>
            <Select
              value={position}
              onChange={(e) => setPosition(e.target.value)}
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

          {/* Gender Selection */}
          <FormControl fullWidth sx={{ mt: 3 }}>
            <InputLabel
              shrink
              sx={{ color: "#fff", backgroundColor: "#2A2A2A", px: 1 }}
            >
              Gender
            </InputLabel>
            <Select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
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
          <Button
            onClick={!loading ? handleClose : undefined}
            sx={{ color: "#bbb" }}
          >
            Cancel
          </Button>
          <LoadingButton
            onClick={handleAddPlayer}
            color="primary"
            variant="contained"
            loading={loading}
            loadingIndicator={
              <CircularProgress size={20} sx={{ color: "#fff" }} />
            }
            sx={{
              minWidth: "110px",
              minHeight: "40px",
              backgroundColor: "#1976d2",
              "&:hover": { backgroundColor: "#115293" },
            }}
          >
            Submit
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddPlayerButton;
