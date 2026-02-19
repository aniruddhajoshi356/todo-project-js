import { Routes, Route, Navigate } from "react-router-dom";
import TodoContainer from "./components/TodoContainer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./routes/ProtectedRoute";
function App() {
  return (
    //   <TodoContainer />

    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/todos"
        element={
          <ProtectedRoute>
            <div className="bg-gray-200 h-screen w-screen flex items-center justify-center">
              <TodoContainer />
            </div>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
export default App;