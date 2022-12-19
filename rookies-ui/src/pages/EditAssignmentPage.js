import EditAssignment from "../components/assignments/edit-assignment/EditAssignment";
import EditAssignmentProvider from "../contexts/providers/EditAssignmentProvider";

const EditAssignmentPage = props => {
  return (
    <EditAssignmentProvider>
      <EditAssignment />    
    </EditAssignmentProvider>
  )
}

export default EditAssignmentPage;