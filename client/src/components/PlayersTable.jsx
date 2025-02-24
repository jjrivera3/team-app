import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const PlayersTable = ({ players, onEdit, onDelete }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        width: "100%",
        maxWidth: "1200px",
        backgroundColor: "#2A2A2A",
      }}
    >
      <Table
        sx={{
          maxWidth: "100%",
          backgroundColor: "#2A2A2A",
          color: "white",
        }}
        aria-label="players table"
      >
        <TableHead sx={{ background: "#4c4c4c" }}>
          <TableRow>
            <TableCell
              sx={{ color: "#fff", fontSize: "16px", fontWeight: "900" }}
            >
              #
            </TableCell>
            <TableCell
              sx={{ color: "#fff", fontSize: "16px", fontWeight: "900" }}
            >
              Player Name
            </TableCell>
            <TableCell
              sx={{ color: "#fff", fontSize: "16px", fontWeight: "900" }}
            >
              Position
            </TableCell>
            <TableCell
              sx={{ color: "#fff", fontSize: "16px", fontWeight: "900" }}
            >
              Gender
            </TableCell>
            <TableCell
              sx={{ color: "#fff", fontSize: "16px", fontWeight: "900" }}
              align="right"
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {players.length > 0 ? (
            players.map((player, index) => (
              <TableRow
                key={player.id}
                sx={{
                  "& td, & th": { borderBottom: "1px solid #555" },
                  "&:last-child td, &:last-child th": {
                    borderBottom: "none",
                  },
                }}
              >
                <TableCell sx={{ color: "#fff", fontSize: "15px" }}>
                  {index + 1}
                </TableCell>
                <TableCell sx={{ color: "#fff", fontSize: "15px" }}>
                  {player.name}
                </TableCell>
                <TableCell sx={{ color: "#fff", fontSize: "15px" }}>
                  {player.position}
                </TableCell>
                <TableCell sx={{ color: "#fff", fontSize: "15px" }}>
                  {player.gender}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => onEdit(player)}
                    sx={{ color: "#ff9800", marginRight: 1 }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => onDelete(player.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                <Typography color="white">No players found</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PlayersTable;
