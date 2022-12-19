import { Outlet } from "react-router-dom";
import UserProvider from "../../contexts/providers/UserProvider";

const UserLayout = (props) => {
  return (
    <UserProvider>
      <Outlet />
    </UserProvider>
  );
};

export default UserLayout;
