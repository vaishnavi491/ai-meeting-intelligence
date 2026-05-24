import { BrowserRouter, Routes, Route } from "react-router-dom";
import MeetingChat from "./pages/MeetingChat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UploadMeeting from "./pages/UploadMeeting";
import MeetingHistory from "./pages/MeetingHistory";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>

  {/* Public Routes */}

  <Route
    path="/"
    element={<Login />}
  />

  <Route
    path="/register"
    element={<Register />}
  />

  {/* Layout Routes */}

  <Route element={<Layout />}>

    <Route
      path="/dashboard"
      element={<Dashboard />}
    />

    <Route
      path="/chat"
      element={<MeetingChat />}
    />

    <Route
      path="/upload"
      element={<UploadMeeting />}
    />

    <Route
      path="/meetings"
      element={<MeetingHistory />}
    />

  </Route>

</Routes>
    </BrowserRouter>
  );
}

export default App;