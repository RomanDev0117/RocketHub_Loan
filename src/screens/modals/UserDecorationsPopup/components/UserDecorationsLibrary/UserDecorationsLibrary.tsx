import { useGetUploadsQuery, useGetUserDecorationsQuery } from '@/store/slices/rockethubApi/admin.endpoints';

export const UserDecorationsLibrary = () => {
  const { data } = useGetUploadsQuery();


  return (
    <div>
      {JSON.stringify(data)}
    </div>
  );
};