import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";

const DeleteConfirmDialog = ({ open, handleClose, teamToDelete, onDelete }) => {
  const handleConfirmDelete = async () => {
    if (teamToDelete) {
      await onDelete(teamToDelete);
      handleClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: "#2A2A2A",
          color: "#ffffff",
          padding: "20px",
        },
      }}
    >
      <DialogTitle sx={{ color: "#fff", fontWeight: "bold" }}>
        Confirm Delete
      </DialogTitle>
      <DialogContent>
        <Typography sx={{ color: "#ddd" }}>
          Are you sure you want to delete this team?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{ color: "#bbb" }}>
          Cancel
        </Button>
        <Button
          onClick={handleConfirmDelete}
          variant="contained"
          sx={{
            backgroundColor: "#d32f2f",
            "&:hover": { backgroundColor: "#b71c1c" },
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmDialog;
