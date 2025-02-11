import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Loader.css";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://paytm-nu-pink.vercel.app/api/v1/user/bulk?filter=" + filter)
      .then((response) => {
        setUsers(response.data.user);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [filter]);

  return (
    <section className="relative py-16 bg-blueGray-50">
      <div className="w-full mb-12 px-4">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-pink-900 text-white">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-lg text-white text-center">Users</h3>
              </div>
            </div>
          </div>
          <div className="block w-full overflow-x-auto">
            <table className="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700"></th>
                  {/* <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">Actions</th> */}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="2" className="text-center py-4">
                      <div className="loader">
                        <div className="inner one"></div>
                        <div className="inner two"></div>
                        <div className="inner three"></div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <User key={user._id} user={user} />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <footer className="relative pt-8 pb-6 mt-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-6/12 px-4 mx-auto text-center">
              <div className="text-sm text-blueGray-500 font-semibold py-1">
                Dashboard Ends.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
};

// User Component
function User({ user }) {
  const navigate = useNavigate();

  return (
    <tr className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex flex-col items-start">
      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
        <div className="rounded-full h-12 w-12 bg-gradient-to-r from-blue-500 to-purple-500 flex justify-center items-center text-white text-xl font-bold mr-4 shadow-md">
          {user.firstName[0]}
        </div>
        <span className="ml-3 font-bold text-white">
          {user.firstName} {user.lastName}
        </span>
      </th>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left w-full">
        <Button
          onClick={() => navigate(`/send?id=${user._id}&name=${user.firstName}`)}
          label="Send Money"
          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-all duration-200 shadow-md w-full text-center"
        />
      </td>
    </tr>
  );
}
