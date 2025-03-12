import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, jest, beforeEach } from "@jest/globals";
import TeamTable from "../../TeamTable";

// No mock for DeleteConfirmDialog, test the actual component
describe("TeamTable Component", () => {
  const mockTeams = [
    { id: "1", name: "Team A", day: "Monday" },
    { id: "2", name: "Team B", day: "Tuesday" },
  ];

  const mockOnView = jest.fn();
  const mockOnDelete = jest.fn();
  const mockOnUpdate = jest.fn();

  beforeEach(() => {
    render(
      <TeamTable
        teams={mockTeams}
        onView={mockOnView}
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
      />
    );
  });

  test("renders the team table with correct data", () => {
    expect(screen.getByText("Team A")).toBeInTheDocument();
    expect(screen.getByText("Team B")).toBeInTheDocument();
    expect(screen.getByText("Monday")).toBeInTheDocument();
    expect(screen.getByText("Tuesday")).toBeInTheDocument();
  });

  test('clicking the "View Team" button triggers onView with team id', async () => {
    await act(async () => {
      await userEvent.click(screen.getAllByText("View Team")[0]);
    });
    expect(mockOnView).toHaveBeenCalledWith("1");
  });

  test('clicking the "Edit" icon opens the Edit Team dialog', async () => {
    await act(async () => {
      await userEvent.click(screen.getAllByRole("button")[1]); // Edit button
    });

    // Wait for the modal content to appear
    const teamNameInput = await screen.findByLabelText(/team name/i);
    expect(teamNameInput).toBeInTheDocument();
  });

  test('clicking the "Delete" icon opens the Delete Confirm dialog', async () => {
    await act(async () => {
      await userEvent.click(screen.getAllByRole("button")[2]); // Delete button
    });

    // Wait for the DeleteConfirmDialog to appear
    const confirmDeleteDialog = await screen.findByText(/confirm delete/i);
    expect(confirmDeleteDialog).toBeInTheDocument();
  });

  test("the edit team modal receives correct team data", async () => {
    await act(async () => {
      await userEvent.click(screen.getAllByRole("button")[1]); // Edit button
    });

    // Wait for the modal content to appear and check for the Team Name field
    const teamNameInput = await screen.findByLabelText(/team name/i);
    expect(teamNameInput).toHaveValue("Team A"); // Ensure the value is correct
  });

  // Test if onUpdate gets called with correct data (for Edit modal)
  test("onUpdate is called correctly when updating team", async () => {
    await act(async () => {
      await userEvent.click(screen.getAllByRole("button")[1]); // Edit button
    });

    // Wait for the dialog to appear, then get the "Team Name" input field
    const teamNameInput = await screen.findByLabelText(/team name/i);
    await act(async () => {
      await userEvent.clear(teamNameInput);
      await userEvent.type(teamNameInput, "New Team");
    });

    // Find the "Save" button and click it
    const saveButton = screen.getByText("Save");
    await act(async () => {
      await userEvent.click(saveButton);
    });

    await waitFor(() => {
      expect(mockOnUpdate).toHaveBeenCalledWith("1", {
        name: "New Team",
        day: "Monday",
      });
    });
  });

  // Test if onDelete is called correctly when confirming deletion
  test("onDelete is called correctly when deleting team", async () => {
    await act(async () => {
      await userEvent.click(screen.getAllByRole("button")[2]); // Delete button
    });

    // Wait for the dialog to appear
    const confirmDeleteButton = await screen.findByRole("button", {
      name: /delete/i,
    });

    await act(async () => {
      await userEvent.click(confirmDeleteButton);
    });

    await waitFor(() => {
      expect(mockOnDelete).toHaveBeenCalledWith("1");
    });
  });
});
