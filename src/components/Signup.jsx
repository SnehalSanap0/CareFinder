
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isCaretaker, setIsCaretaker] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      const response = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          caretaker: isCaretaker
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      // Show success message
      const result = await response.text();
      console.log(result); // "User registered successfully!"
      
      // Redirect to login page
  //     navigate("/login");
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };
  navigate("/login", { 
    state: { 
      newUserType: isCaretaker ? 'caretaker' : 'user',
      message: `Successfully registered as ${isCaretaker ? 'care provider' : 'care recipient'}! Please log in.`
    }
  });
} catch (err) {
  setError(err.message);
}
};

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Sign in
          </a>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex justify-center space-x-4 mb-6">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="userType"
                  checked={!isCaretaker}
                  onChange={() => setIsCaretaker(false)}
                  className="h-4 w-4 text-blue-600"
                />
                <span className="text-sm font-medium text-gray-700">
                  I need care
                </span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="userType"
                  checked={isCaretaker}
                  onChange={() => setIsCaretaker(true)}
                  className="h-4 w-4 text-blue-600"
                />
                <span className="text-sm font-medium text-gray-700">
                  I provide care
                </span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
                placeholder="johndoe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Must be at least 8 characters and include a number and a special
                character.
              </p>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                required
                className="h-4 w-4 text-blue-600"
              />
              <span className="ml-2 text-sm text-gray-900">
                I agree to the{" "}
                <a href="#" className="text-blue-600">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-600">
                  Privacy Policy
                </a>
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;