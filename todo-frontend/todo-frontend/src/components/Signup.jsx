import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/api";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  //const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  //   const handlePasswordChange = (e) => {
  //     setPassword(e.target.value);
  //   };
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  // 🔥 If already logged in → redirect to todos
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/todos", { replace: true });
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await registerUser(form);

      if (data.token) {
        localStorage.setItem("token", data.token); // ✅ Auto login after signup
        navigate("/todos");
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      setError("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen min-w-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-150 h-140 bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Sign Up
        </h2>
        <form
          onSubmit={handleSubmit}
          className="text-red-500 text-xl mb-4 text-center"
        >
          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}
          <div>
            <label className="block text-2xl font-medium text-gray-700 mb-1 mt-4">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Enter your Username"
              value={form.username}
              onChange={handleChange}
              className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500  outline-none transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-2xl font-medium text-gray-700 mb-1 mt-4">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your Email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-2xl font-medium text-gray-700 mb-1 mt-4">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your Password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              required
            />
            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={handleTogglePasswordVisibility}
                className="w-7 h-7 mt-1 flex items-center justify-center bg-white text-white text-center font-medium rounded-lg transition-colors"
              >
                {showPassword ? (
                  <i className="fa-solid fa-eye-slash"></i>
                ) : (
                  <i className="fa-solid fa-eye"></i>
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-8 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors"
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>

          {/* Already have account */}
          <p className="mt-6 text-center text-xl text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
