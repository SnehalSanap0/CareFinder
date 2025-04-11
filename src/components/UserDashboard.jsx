// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function UserDashboard() {
//   const [user, setUser] = useState({
//     username: "",
//     email: "",
//     isCaretaker: false,
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchUserData = async () => {
//     try {
//       setLoading(true);
      
//       // Get token from storage
//       const token = localStorage.getItem("token");
//       console.log("Token available:", !!token);
      
//       // Check if we have a token
//       if (!token) {
//         setError("No authentication token found. Please log in again.");
//         setLoading(false);
//         return;
//       }
      
//       const response = await axios.get("http://localhost:8080/api/user/me", {
//         headers: {
//           Authorization: `Bearer ${token}`
//         },
//         // Add withCredentials if using cookies
//         withCredentials: true
//       });
      
//       console.log("Response:", response.data);
//       setUser(response.data);
//       setLoading(false);
//     } catch (err) {
//       console.error("Error fetching user data:", err);
      
//       // More detailed error information
//       if (err.response) {
//         console.log("Response status:", err.response.status);
//         console.log("Response data:", err.response.data);
        
//         if (err.response.status === 401) {
//           setError("Your session has expired. Please log in again.");
//         } else if (err.response.status === 500) {
//           setError(`Server error: ${JSON.stringify(err.response.data)}`);
//         } else {
//           setError(`Error (${err.response.status}): ${JSON.stringify(err.response.data)}`);
//         }
//       } else {
//         setError(`Network error: ${err.message}`);
//       }
      
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-xl text-gray-600">Loading user data...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="max-w-md p-4 bg-white rounded-lg shadow-md">
//           <div className="text-xl text-red-600 mb-4">Error</div>
//           <div className="text-gray-700">{error}</div>
//           <button 
//             onClick={fetchUserData}
//             className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-3xl mx-auto mt-8 mb-8 bg-white rounded-lg shadow-md p-8">
//         <div className="flex flex-col md:flex-row items-center mb-8 pb-5 border-b border-gray-200">
//           <div className="mb-4 md:mb-0 md:mr-8">
//             <div className="w-36 h-36 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
//               <img
//                 src="/api/placeholder/150/150"
//                 alt={user.username}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             <div className="mt-2 text-sm text-blue-700 cursor-pointer text-center">
//               Change Photo
//             </div>
//           </div>
//           <div>
//             <h1 className="text-2xl font-bold text-gray-800">{user.username}</h1>
//             <p className="text-gray-600">{user.isCaretaker ? "Caretaker" : "Care Seeker"}</p>
//             <p className="text-gray-600">Member since: January 2025</p>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="mb-6">
//             <h2 className="text-lg font-semibold text-blue-700 mb-4 pb-2 border-b-2 border-gray-100">
//               Personal Information
//             </h2>
//             <div className="mb-4">
//               <label className="block font-semibold text-gray-600 mb-1">
//                Username
//               </label>
//               <div className="p-2 bg-gray-50 rounded text-gray-800">
//                 {user.username}
//               </div>
//             </div>
//             <div className="mb-4">
//               <label className="block font-semibold text-gray-600 mb-1">
//                 Email Address
//               </label>
//               <div className="p-2 bg-gray-50 rounded text-gray-800">
//                 {user.email}
//               </div>
//             </div>
//           </div> 
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UserDashboard;
import React, { useState, useEffect } from "react";
import axios from "axios";

function UserDashboard() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    isCaretaker: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to generate a random color based on username
  const getRandomColor = (username) => {
    if (!username) return 'bg-gray-400';
    
    const colors = [
      'bg-red-400', 'bg-blue-400', 'bg-green-400', 
      'bg-yellow-400', 'bg-purple-400', 'bg-pink-400',
      'bg-indigo-400', 'bg-teal-400', 'bg-orange-400'
    ];
    
    // Use the first character's char code to pick a consistent color
    const charCode = username.charCodeAt(0);
    const colorIndex = charCode % colors.length;
    return colors[colorIndex];
  };

  const fetchUserData = async () => {
    try {
      setLoading(true);
      
      const token = localStorage.getItem("token");
      console.log("Token available:", !!token);
      
      if (!token) {
        setError("No authentication token found. Please log in again.");
        setLoading(false);
        return;
      }
      
      const response = await axios.get("http://localhost:8080/api/user/me", {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      });
      
      console.log("Response:", response.data);
      setUser(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching user data:", err);
      
      if (err.response) {
        console.log("Response status:", err.response.status);
        console.log("Response data:", err.response.data);
        
        if (err.response.status === 401) {
          setError("Your session has expired. Please log in again.");
        } else if (err.response.status === 500) {
          setError(`Server error: ${JSON.stringify(err.response.data)}`);
        } else {
          setError(`Error (${err.response.status}): ${JSON.stringify(err.response.data)}`);
        }
      } else {
        setError(`Network error: ${err.message}`);
      }
      
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading user data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md p-4 bg-white rounded-lg shadow-md">
          <div className="text-xl text-red-600 mb-4">Error</div>
          <div className="text-gray-700">{error}</div>
          <button 
            onClick={fetchUserData}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto mt-8 mb-8 bg-white rounded-lg shadow-md p-8">
        <div className="flex flex-col md:flex-row items-center mb-8 pb-5 border-b border-gray-200">
          <div className="mb-4 md:mb-0 md:mr-8">
            <div className={`w-36 h-36 rounded-full ${getRandomColor(user.username)} flex items-center justify-center text-white text-6xl font-bold`}>
              {user.username.charAt(0).toUpperCase()}
            </div>
            {/* <div className="mt-2 text-sm text-blue-700 cursor-pointer text-center">
              Change Photo
            </div> */}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{user.username}</h1>
            <p className="text-gray-600">{user.isCaretaker ? "Caretaker" : "Care Seeker"}</p>
            <p className="text-gray-600">Member since: January 2025</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-blue-700 mb-4 pb-2 border-b-2 border-gray-100">
              Personal Information
            </h2>
            <div className="mb-4">
              <label className="block font-semibold text-gray-600 mb-1">
               Username
              </label>
              <div className="p-2 bg-gray-50 rounded text-gray-800">
                {user.username}
              </div>
            </div>
            <div className="mb-4">
              <label className="block font-semibold text-gray-600 mb-1">
                Email Address
              </label>
              <div className="p-2 bg-gray-50 rounded text-gray-800">
                {user.email}
              </div>
            </div>
          </div> 
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;