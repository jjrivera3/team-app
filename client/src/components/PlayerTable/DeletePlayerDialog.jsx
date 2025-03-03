import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { LoadingButton } from "@mui/lab"; // Import LoadingButton

const DeletePlayerDialog = ({
  open,
  handleClose,
  playerToDelete,
  onDelete,
}) => {
  const [loading, setLoading] = useState(false);

  const handleConfirmDelete = async () => {
    if (playerToDelete) {
      setLoading(true); // Show loading state
      await onDelete(playerToDelete);
      setLoading(false); // Hide loading state
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
          Are you sure you want to delete this player?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{ color: "#bbb" }}>
          Cancel
        </Button>
        <LoadingButton
          onClick={handleConfirmDelete}
          variant="outlined"
          loading={loading}
          loadingIndicator={
            <CircularProgress size={20} sx={{ color: "#d32f2f" }} />
          } // Red spinner
          sx={{
            color: "#d32f2f",
            borderColor: "#d32f2f",
            minWidth: "100px", // Prevents shrinking
            minHeight: "40px", // Ensures height consistency
            "&:hover": {
              color: "#fff",
              backgroundColor: "#b71c1c",
              borderColor: "#b71c1c",
            },
            "&.Mui-disabled": {
              color: "#d32f2f",
              borderColor: "#d32f2f",
              opacity: 0.5, // Keeps outline visible when disabled
            },
          }}
        >
          {!loading ? (
            "Delete"
          ) : (
            <span style={{ visibility: "hidden" }}>Delete</span>
          )}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default DeletePlayerDialog;
