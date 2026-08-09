import { useQuery, useMutation } from "@apollo/client";
import { GET_AUTHENTICATED_USER } from "../../graphql/queries/user.query";
import { LOGOUT } from "../../graphql/mutations/user.mutation";
import { Link } from "react-router-dom";

const Header = () => {
  const { data } = useQuery(GET_AUTHENTICATED_USER);
  const [logout, { loading, client }] = useMutation(LOGOUT, {
    refetchQueries: ["GetAuthenticatedUser"],
  });

  const handleLogout = async () => {
    try {
      await logout();
      client.resetStore();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <header className="flex items-center justify-between py-6 mb-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <Link
        to="/"
        className="text-2xl font-black tracking-tight text-slate-900"
      >
        Expense<span className="text-violet-600">GQL</span>
      </Link>

      {data?.authUser && (
        <button
          onClick={handleLogout}
          disabled={loading}
          className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold py-2.5 px-6 rounded-full transition-all duration-300 shadow-lg shadow-slate-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Logging out..." : "Logout"}
        </button>
      )}
    </header>
  );
};

export default Header;
