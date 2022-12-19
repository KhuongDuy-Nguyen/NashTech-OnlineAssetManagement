import { Outlet } from "react-router-dom";
import AssignmentProvider from "../../contexts/providers/AssignmentProvider";

const AssignmentLayout = (props) => {
  return (
    <AssignmentProvider>
      <Outlet />
    </AssignmentProvider>
  );
};

export default AssignmentLayout;
