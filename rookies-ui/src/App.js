import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import MainLayout from "./components/common/MainLayout";
import { AppContext } from "./contexts/providers/AppProvider";
import CreateUserPage from "./pages/CreateUserPage";

import HomePage from "./pages/HomePage";

import NewListUserPage from "./pages/NewListUserPage";
import EditUserPage from "./pages/EditUserPage";
import LoginPage from "./pages/LoginPage";
import UserLayout from "./components/users/UserLayout";
import Loading from "./components/common/loading/Loading";
import AssetLayout from "./components/assets/AssetLayout";
import CreateAssetPage from "./pages/CreateAssetPage";
import ListAssetPage from "./pages/ListAssetPage";
import EditAssetPage from "./pages/EditAssetPage";
import AssignmentLayout from "./components/assignments/AssignmentLayout";
import CreateAssignmentPage from "./pages/CreateAssignmentPage";
import EditAssignmentPage from "./pages/EditAssignmentPage";
import ListAssignmentPage from "./pages/ListAssignmentPage";
import RequestReturningPage from "./pages/RequestReturningPage";
import ReportPage from "./pages/ReportPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const { appState } = useContext(AppContext);
  if (appState.user != null) {
      if (appState.user.role == "ADMIN") {
        return (
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route path="" element={<HomePage />} />
  
              <Route path="users" element={<UserLayout />}>
                <Route path="" element={<NewListUserPage />} />
                <Route path="create" element={<CreateUserPage />} />
                <Route path="edit/:id" element={<EditUserPage />} />
              </Route>
              <Route path="assets" element={<AssetLayout />}>
                <Route path="" element={<ListAssetPage />}></Route>
                <Route path="create" element={<CreateAssetPage />} />
                <Route path="edit/:id" element={<EditAssetPage />} />
              </Route>
              <Route path="assignments" element={<AssignmentLayout />}>
                <Route path="" element={<ListAssignmentPage />}></Route>
                <Route path="create" element={<CreateAssignmentPage />} />
                <Route path="edit/:id" element={<EditAssignmentPage />} />
              </Route>
              <Route path="/returnings" element={<RequestReturningPage />} />
              <Route path="/reports" element={<ReportPage />} />
              {appState.user == null && (
                <Route path="/login" element={<LoginPage />} />
              )}
              <Route path="*" element={<Navigate to="/" />} />
            </Route>
            <Route path="/404" element={<NotFoundPage />} />
          </Routes>
        );
      } else if (appState.user.role == "STAFF") {
        return (
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route path="" element={<HomePage />} />
            </Route>
            {appState.user == null && (
              <Route path="/login" element={<LoginPage />} />
            )}
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/404" element={<NotFoundPage />} />
          </Routes>
        );
      } else {
        return <LoginPage />;
      }  
  } else {
      return (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          {
            !appState.status.isLoading &&
            <Route path="*" element={<Navigate to="/login" />} />
          }
        </Routes>
      );  
    }  
}

export default App;
