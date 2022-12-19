import Report from '../components/report/Report';
import ReportProvider from '../contexts/providers/ReportProvider';

function ReportPage() {
    return (
        <ReportProvider>
            <Report />
        </ReportProvider>
    )
}

export default ReportPage