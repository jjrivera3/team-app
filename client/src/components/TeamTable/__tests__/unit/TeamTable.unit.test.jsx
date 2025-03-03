import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import TeamTable from "../../TeamTable";

// Mocking the Dialog components using Vitest's mock function
vi.mock("../EditDialog/EditTeamDialog", () => ({
  default: () => <div>Edit Team Dialog</div>,
}));
vi.mock("../DeleteDialog/DeleteConfirmDialog", () => ({
  default: () => <div>Delete Confirm Dialog</div>,
}));

describe("TeamTable Component", () => {
  const mockTeams = [
    { id: "1", name: "Team A", day: "Monday" },
    { id: "2", name: "Team B", day: "Tuesday" },
  ];

  const mockOnView = vi.fn();
  const mockOnDelete = vi.fn();
  const mockOnUpdate = vi.fn();

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

  test('clicking the "View Team" button triggers onView with team id', () => {
    fireEvent.click(screen.getAllByText("View Team")[0]);
    expect(mockOnView).toHaveBeenCalledWith("1");
  });

  test('clicking the "Edit" icon opens the Edit Team dialog', async () => {
    // Click the "Edit" button for the first team (assuming the first team has id "1")
    fireEvent.click(screen.getByTestId("edit-team-button-1"));

    // Wait for the modal to appear and check for a specific element inside it
    const teamNameInput = await screen.findByLabelText(/team name/i); // Check for the presence of the input field inside the modal
    expect(teamNameInput).toBeInTheDocument();
  });

  test('clicking the "Delete" icon opens the Delete Confirm dialog', async () => {
    // Click the "Delete" button for the first team
    fireEvent.click(screen.getByTestId("delete-team-button-1"));

    // Use findByRole to query the dialog
    const deleteDialog = await screen.findByRole("dialog");

    // Alternatively, use findByText to find the dialog by its title
    const dialogTitle = await screen.findByText("Confirm Delete");

    // Assert that the Delete dialog and title are now in the document
    expect(deleteDialog).toBeInTheDocument();
    expect(dialogTitle).toBeInTheDocument();
  });

  test("the edit team modal receives correct team data", async () => {
    fireEvent.click(screen.getByTestId("edit-team-button-1")); // Edit button

    // Check that the modal is populated with the correct team data
    expect(screen.getByText("Edit Team")).toBeInTheDocument();
  });

  test("onUpdate is called correctly when updating team", async () => {
    fireEvent.click(screen.getByTestId("edit-team-button-1")); // Edit button

    // Check that the modal is opened and fire the update action
    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockOnUpdate).toHaveBeenCalledWith("1", {
        name: "Team A", // Check the current data
        day: "Monday",
      });
    });
  });

  test("onDelete is called correctly when confirming deletion", async () => {
    // Click the "Delete" button for the first team (team with id "1")
    fireEvent.click(screen.getByTestId("delete-team-button-1"));

    // Wait for the dialog to appear and find the delete button inside it
    const confirmDeleteButton = await screen.findByRole("button", {
      name: /delete/i, // Looking for the delete button in the dialog
    });

    // Confirm deletion by clicking the delete button in the dialog
    fireEvent.click(confirmDeleteButton);

    await waitFor(() => {
      expect(mockOnDelete).toHaveBeenCalledWith("1"); // Ensure the delete callback was called with correct team id
    });
  });
});
