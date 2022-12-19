import EditUser from "../components/users/edit-user/EditUser";
import EditUserProvider from "../contexts/providers/EditUserProvider";

const EditUserPage = (props) => {
  return (
    <EditUserProvider>
      <EditUser />
    </EditUserProvider>
  );
};

export default EditUserPage;
