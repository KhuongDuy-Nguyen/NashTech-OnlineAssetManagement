import ListAssignment from '../components/assignments/list-assignment/ListAssignment';
import ListAssignmentProvider from '../contexts/providers/ListAssignmentProvider';

const ListAssignmentPage = props => {
  return (
    <ListAssignmentProvider>
      <ListAssignment />
    </ListAssignmentProvider>
  )
}

export default ListAssignmentPage;