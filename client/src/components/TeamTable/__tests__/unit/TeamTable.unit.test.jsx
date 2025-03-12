import React from "react";
import "@testing-library/jest-dom";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  act,
} from "@testing-library/react";
import { describe, expect, test, jest, beforeEach } from "@jest/globals";
import TeamTable from "../../TeamTable";

// ✅ Mock EditTeamDialog and ensure it calls onUpdate when "Save" is clicked
jest.mock("../../../EditDialog/EditTeamDialog", () => {
  return {
    __esModule: true,
    default: ({ onUpdate }) => (
      <div>
        Edit Team Dialog
        <button
          onClick={() => onUpdate("1", { name: "Team A", day: "Monday" })}
        >
          Save
        </button>
      </div>
    ),
  };
});

// ✅ Mock DeleteConfirmDialog and ensure it calls onDelete when "Delete" is clicked
jest.mock("../../../DeleteDialog/DeleteConfirmDialog", () => {
  return {
    __esModule: true,
    default: ({ onDelete }) => (
      <div>
        Delete Confirm Dialog
        <button onClick={() => onDelete("1")}>Delete</button>
      </div>
    ),
  };
});

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
      fireEvent.click(screen.getAllByText("View Team")[0]);
    });
    expect(mockOnView).toHaveBeenCalledWith("1");
  });

  test('clicking the "Edit" icon opens the Edit Team dialog', async () => {
    await act(async () => {
      fireEvent.click(screen.getByTestId("edit-team-button-1"));
    });

    await waitFor(() => {
      expect(screen.getByText("Edit Team Dialog")).toBeInTheDocument();
    });
  });

  test('clicking the "Delete" icon opens the Delete Confirm dialog', async () => {
    await act(async () => {
      fireEvent.click(screen.getByTestId("delete-team-button-1"));
    });

    await waitFor(() => {
      expect(screen.getByText("Delete Confirm Dialog")).toBeInTheDocument();
    });
  });

  test("onUpdate is called correctly when updating team", async () => {
    await act(async () => {
      fireEvent.click(screen.getByTestId("edit-team-button-1"));
    });

    // Ensure the modal is visible
    await waitFor(() => {
      expect(screen.getByText("Edit Team Dialog")).toBeInTheDocument();
    });

    // Click the Save button
    await act(async () => {
      fireEvent.click(screen.getByText("Save"));
    });

    await waitFor(() => {
      expect(mockOnUpdate).toHaveBeenCalledWith("1", {
        name: "Team A",
        day: "Monday",
      });
    });
  });

  test("onDelete is called correctly when confirming deletion", async () => {
    await act(async () => {
      fireEvent.click(screen.getByTestId("delete-team-button-1"));
    });

    await waitFor(() => {
      expect(screen.getByText("Delete Confirm Dialog")).toBeInTheDocument();
    });

    // Click the Delete button
    await act(async () => {
      fireEvent.click(screen.getByText("Delete"));
    });

    await waitFor(() => {
      expect(mockOnDelete).toHaveBeenCalledWith("1");
    });
  });
});
