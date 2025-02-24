// Loads Express.js into the express variable.
const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cors());

// POST teams - Create a new team in the database
app.post("/teams", async (req, res) => {
  try {
    const { teamName, day } = req.body; // Destructure day from the body
    const newTeam = await prisma.team.create({
      data: {
        name: teamName,
        day, // Include the day field
      },
    });
    res.json(newTeam);
  } catch (error) {
    console.error("Error creating team:", error);
    res.status(500).json({ error: "Failed to create team" });
  }
});

// GET teams - Retrieve all teams from the DB
app.get("/teams", async (req, res) => {
  try {
    const teams = await prisma.team.findMany({
      orderBy: { createdAt: "asc" }, // Sorts teams by newest first
    });

    res.json(teams);
  } catch (error) {
    console.error("Error fetching teams:", error);
    res.status(500).json({ error: "Failed to retrieve teams" });
  }
});

// GET single team - Retrieve a single team by ID
app.get("/teams/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const team = await prisma.team.findUnique({
      where: { id },
    });

    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }
    res.json(team);
  } catch (error) {
    console.error("Error fetching team:", error);
    res.status(500).json({ error: "Failed to retrieve team" });
  }
});

// PUT a single team - Update single team name
app.put("/teams/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, day } = req.body; // Destructure day from the body
    const updatedTeam = await prisma.team.update({
      where: { id },
      data: { name, day },
    });
    res.json(updatedTeam);
  } catch (error) {
    console.error("Error updating team:", error);
    res.status(500).json({ error: "Failed to update team" });
  }
});

// DELETE single team - Delet4e a single team from the DB
app.delete("/teams/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.team.delete({
      where: { id },
    });
    res.json({ message: "Team deleted successfully" });
  } catch (error) {
    console.error("Error deleting team:", error);
    res.status(500).json({ error: "Failed to delete team" });
  }
});

app.post("/teams/:teamId/players", async (req, res) => {
  try {
    const { teamId } = req.params;
    const { name, position, gender } = req.body;

    // Count the number of players already in the team
    const playerCount = await prisma.player.count({
      where: { teamId },
    });

    // Set order to (current player count + 1)
    const newPlayer = await prisma.player.create({
      data: {
        name,
        position,
        gender,
        order: playerCount + 1,
        team: {
          connect: { id: teamId },
        },
      },
    });

    res.json(newPlayer);
  } catch (error) {
    console.error("Error adding player:", error);
    res.status(500).json({ error: "Failed to add player" });
  }
});

app.get("/teams/:teamId/players", async (req, res) => {
  try {
    const { teamId } = req.params;

    // Check if the team exists
    const existingTeam = await prisma.team.findUnique({
      where: { id: teamId },
    });

    if (!existingTeam) {
      return res.status(404).json({ error: "Team not found" });
    }

    // Fetch all players for the team
    const players = await prisma.player.findMany({
      where: { teamId },
      orderBy: { order: "asc" }, // Ensure players are sorted by kicking order
    });

    res.json(players);
  } catch (error) {
    console.error("Error fetching players:", error);
    res.status(500).json({ error: "Failed to retrieve players" });
  }
});

app.put("/players/:playerId", async (req, res) => {
  try {
    const { playerId } = req.params;
    const { name, position, gender } = req.body;

    // Update the player in the database
    const updatedPlayer = await prisma.player.update({
      where: { id: playerId }, // Find player by ID
      data: { name, position, gender }, // Update the fields
    });

    res.json(updatedPlayer);
  } catch (error) {
    console.error("Error updating player:", error);

    // Handle "Record not found" error (if player does not exist)
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Player not found" });
    }

    res.status(500).json({ error: "Failed to update player" });
  }
});

app.delete("/players/:playerId", async (req, res) => {
  try {
    const { playerId } = req.params;

    // Find the player to delete
    const playerToDelete = await prisma.player.findUnique({
      where: { id: playerId },
    });

    if (!playerToDelete) {
      return res.status(404).json({ error: "Player not found" });
    }

    // Delete the player
    await prisma.player.delete({ where: { id: playerId } });

    // Update order of remaining players
    await prisma.player.updateMany({
      where: {
        teamId: playerToDelete.teamId,
        order: { gt: playerToDelete.order },
      },
      data: {
        order: { decrement: 1 }, // Shift all orders down
      },
    });

    res.json({ message: "Player deleted and order updated" });
  } catch (error) {
    console.error("Error deleting player:", error);
    res.status(500).json({ error: "Failed to delete player" });
  }
});

if (require.main === module) {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
