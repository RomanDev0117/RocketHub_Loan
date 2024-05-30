import { useParams } from 'react-router-dom';
import { CaseForm } from './components/CaseForm/CaseForm';
import Loader from '../../../../components/Loader/Loader';
import { useGetAdminCaseQuery } from '../../../../store/slices/rockethubApi/admin.endpoints';

export const Component = () => {
  const { caseId } = useParams();
  const { currentData, isFetching } = useGetAdminCaseQuery(caseId as string, {
    skip: !caseId,
  });

  const caseData = currentData?.success ? currentData.data : null;

  return (
    <>
      <Loader loading={isFetching} backdrop position="absolute" />
      <CaseForm caseData={caseData} key={caseId} />
    </>
  );
};
