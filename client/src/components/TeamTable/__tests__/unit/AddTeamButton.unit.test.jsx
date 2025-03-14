import React from "react";

import { jest } from "@jest/globals";
import {
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddTeamButton from "../../AddTeamButton";

// ✅ Store the mock function separately
const mockMutate = jest.fn();

jest.mock("@tanstack/react-query", () => {
  const actualReactQuery = jest.requireActual("@tanstack/react-query");
  return {
    ...actualReactQuery,
    useMutation: jest.fn(() => ({
      mutate: mockMutate,
      isLoading: false,
    })),
    useQueryClient: jest.fn(() => ({
      invalidateQueries: jest.fn(),
    })),
  };
});

const renderComponent = () =>
  render(
    <QueryClientProvider client={new QueryClient()}>
      <AddTeamButton />
    </QueryClientProvider>
  );

test("calls useMutation when submitting the form", async () => {
  renderComponent();
  userEvent.click(screen.getByText("Add New Team"));

  await screen.findByText("Add a New Team");

  const nameInput = screen.getByLabelText(/Team Name/i);
  userEvent.type(nameInput, "New Team");

  await waitFor(() => {
    expect(nameInput).toHaveValue("New Team"); // ✅ Ensure input updates
  });

  // ✅ Fix: Ensure dropdown selection before submitting
  const daySelect = screen.getByLabelText(/Day/i);
  userEvent.click(daySelect);

  const listbox = await screen.findByRole("listbox");
  const mondayOption = await within(listbox).findByText("Monday");
  userEvent.click(mondayOption);

  await waitFor(() => {
    expect(screen.getByText("Monday")).toBeInTheDocument(); // ✅ Confirm selection
  });

  // ✅ Ensure "Submit" button exists and is clicked
  const submitButton = screen.getByText("Submit");
  userEvent.click(submitButton);

  // ✅ Fix: Use `mockMutate` and wait for it to be called
  await waitFor(() => {
    expect(mockMutate).toHaveBeenCalledTimes(1); // Ensure it's called once
    expect(mockMutate).toHaveBeenCalledWith({
      teamName: "New Team",
      day: "Monday",
    });
  });
});
