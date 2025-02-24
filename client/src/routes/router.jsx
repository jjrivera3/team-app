import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage.jsx";
import TeamPlayerPage from "../pages/TeamPlayerPage.jsx";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> }, // Home page showing all teams
  { path: "/teams/:teamId/", element: <TeamPlayerPage /> }, // Player list for a team
]);

export default router;
