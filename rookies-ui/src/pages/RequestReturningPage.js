import RequestReturning from '../components/returning/RequestReturning';
import RequestReturningProvider from '../contexts/providers/RequestReturningProvider';

const RequestReturningPage = props => {
  return (
    <RequestReturningProvider>
      <RequestReturning />
    </RequestReturningProvider>
  )
}

export default RequestReturningPage;