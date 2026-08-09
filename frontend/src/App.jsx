import { Navigate, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import TransactionPage from "./pages/TransactionPage";
import NotFoundPage from "./pages/NotFoundPage";
import Header from "./components/ui/Header";

import { useQuery } from "@apollo/client";
import { GET_AUTHENTICATED_USER } from "./graphql/queries/user.query";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { loading, data } = useQuery(GET_AUTHENTICATED_USER);

  if (loading) return null;

  const authUser = true;
  return (
    <>
      {data?.authUser && <Header />}
      <Routes>
        <Route
          path="/"
          element={data.authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!data.authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!data.authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/transaction/:id"
          element={
            data.authUser ? <TransactionPage /> : <Navigate to="/login" />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "#ffffff",
            color: "#0f172a",
            boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
            borderRadius: "9999px",
            padding: "16px 24px",
            fontSize: "14px",
            fontWeight: "600",
            border: "1px solid #f1f5f9",
          },

          success: {
            duration: 3000,
            iconTheme: {
              primary: "#7c3aed",
              secondary: "#ffffff",
            },
          },

          error: {
            duration: 4000,
            iconTheme: {
              primary: "#e11d48",
              secondary: "#ffffff",
            },
          },
        }}
      />
    </>
  );
};

export default App;
