import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import DashboardPage from "./pages/DashboardPage";
import AllExpensePage from "./pages/AllExpensePage";

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { refreshUser } from "./redux/authOperations";

import RestrictedRoute from "./components/Routes/RestrictedRoute";
import { PrivateRoute } from "./components/Routes/PrivateRoute";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      dispatch(refreshUser());
    }
  }, [dispatch]);

  return (
    <div className="container mx-auto py-8 lg:px-[100px] md:px-[32px]">
      <Routes>
        <Route
          path="/dashboard"
          element={<PrivateRoute redirectTo="/" component={DashboardPage} />}
        />
        <Route
          path="/"
          element={
            <RestrictedRoute redirectTo="/dashboard" component={HomePage} />
          }
        />
        <Route
          path="/signup"
          element={
            <RestrictedRoute redirectTo="/dashboard" component={SignUpPage} />
          }
        />
        <Route
          path="/signin"
          element={
            <RestrictedRoute redirectTo="/dashboard" component={SignInPage} />
          }
        />

        <Route
          path="/all-expense"
          element={<PrivateRoute redirectTo="/" component={AllExpensePage} />}
        />
        <Route
          path="/all-income"
          element={<PrivateRoute redirectTo="/" component={AllExpensePage} />}
        />
      </Routes>
    </div>
  );
};

export default App;
