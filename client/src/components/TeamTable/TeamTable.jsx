import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditTeamDialog from "../EditDialog/EditTeamDialog"; // Import Edit Modal
import DeleteConfirmDialog from "../DeleteDialog/DeleteConfirmDialog"; // Import Delete Modal

const TeamTable = ({ teams, onView, onDelete, onUpdate }) => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [teamToDelete, setTeamToDelete] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [editTeam, setEditTeam] = useState({ id: "", name: "" });

  // Open Edit Modal
  const handleOpenEdit = (team) => {
    setEditTeam(team);
    setOpenEdit(true);
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ backgroundColor: "#1E1E1E", width: "100%" }}
      >
        <Table
          sx={{ minWidth: "100%", backgroundColor: "#2A2A2A", color: "white" }}
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
                Team Name
              </TableCell>
              {/* NEW: Day Column */}
              <TableCell
                sx={{ color: "#fff", fontSize: "16px", fontWeight: "900" }}
              >
                Day
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
            {teams.map((team, index) => (
              <TableRow
                key={team.id}
                sx={{ "& td, & th": { borderBottom: "1px solid #555" } }}
              >
                <TableCell sx={{ color: "#fff", fontSize: "15px" }}>
                  {index + 1}
                </TableCell>
                <TableCell
                  sx={{ color: "#fff", fontSize: "15px", fontWeight: "600" }}
                >
                  {team.name}
                </TableCell>
                <TableCell
                  sx={{ color: "#fff", fontSize: "15px", fontWeight: "600" }}
                >
                  {team.day || "N/A"}
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onView(team.id)}
                    sx={{ marginRight: 1 }}
                  >
                    View Team
                  </Button>
                  <IconButton
                    sx={{ color: "#ff9800", marginRight: 1, marginLeft: 1 }}
                    onClick={() => handleOpenEdit(team)}
                    data-testid={`edit-team-button-${team.id}`}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => {
                      setTeamToDelete(team.id);
                      setOpenConfirm(true);
                    }}
                    data-testid={`delete-team-button-${team.id}`}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <EditTeamDialog
        open={openEdit}
        handleClose={() => setOpenEdit(false)}
        editTeam={editTeam}
        setEditTeam={setEditTeam}
        onUpdate={onUpdate}
        data-testid="edit-team-dialog"
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        open={openConfirm}
        handleClose={() => setOpenConfirm(false)}
        teamToDelete={teamToDelete}
        onDelete={onDelete}
        data-testid="delete-confirm-dialog"
      />
    </>
  );
};

export default TeamTable;
