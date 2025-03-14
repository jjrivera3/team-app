// src/mocks/handlers.js
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/teams-test", () => {
    return HttpResponse.json([
      { id: "1", name: "Team A", day: "Monday" },
      { id: "2", name: "Team B", day: "Tuesday" },
      { id: "3", name: "Team B", day: "Thursday" },
    ]);
  }),
];
