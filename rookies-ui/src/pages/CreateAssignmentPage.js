import CreateAssignment from "../components/assignments/create-assignment/CreateAssignment";
import CreateAssignmentProvider from "../contexts/providers/CreateAssignmentProvider";

const CreateAssignmentPage = props => {
  return (
    <CreateAssignmentProvider>
      <CreateAssignment />    
    </CreateAssignmentProvider>
  )
}

export default CreateAssignmentPage;