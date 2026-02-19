import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
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

  // 🔥 If already logged in → redirect
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
      const data = await loginUser(form);

      if (data.token) {
        localStorage.setItem("token", data.token); // ✅ store token
        navigate("/todos"); // ✅ redirect
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div class="min-h-screen min-w-screen bg-gray-100 flex items-center justify-center p-4">
      <div class="w-150 h-115 bg-white rounded-xl shadow-lg p-8">
        <h2 class="text-3xl font-bold text-gray-900 mb-6 text-center">
          Log In
        </h2>
        {error && <p class="text-red-500 text-xl text-center">{error}</p>}
        <form onSubmit={handleSubmit} class="space-y-4">
          <div className="mt-6">
            <label class="block text-2xl font-medium text-gray-700 mb-1 mt-4">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={handleChange}
              class="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              required
            />
          </div>
          <div>
            <label class="block text-2xl font-medium text-gray-700 mb-1 mt-4">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="yourpassword"
              value={form.password}
              onChange={handleChange}
              class="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
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
            class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div class="mt-6 text-center text-xl text-gray-600">
          Don't have an account?
          <a
            href="/signup"
            class="text-indigo-600 hover:text-indigo-500 font-medium"
          >
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};
export default Login;
