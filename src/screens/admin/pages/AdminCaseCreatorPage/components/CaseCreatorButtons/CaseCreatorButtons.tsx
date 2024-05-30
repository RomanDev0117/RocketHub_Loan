import { useFormContext } from 'react-hook-form';
import { Button } from '../../../../../../components/Button/Button';
import { Flex } from '../../../../../../components/Flex/Flex';
import { useAdminDeleteCaseMutation, useAdminFeatureCaseMutation } from '../../../../../../store/slices/rockethubApi/admin.endpoints';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from '../../../../../../types/routeTypes';

export const CaseCreatorButtons = () => {
  const navigate = useNavigate();
  const { formState, watch, setValue } = useFormContext();
  const isEditing = watch('isEditing');
  const featured = watch('featured');
  const id: string = watch('id');

  const [featureCaseApi, { isLoading: isFeatureApiLoading }] =
    useAdminFeatureCaseMutation();

  const [deleteCaseApi] = useAdminDeleteCaseMutation();

  const deleteCase = () => {

    if (window.confirm('Do you really want to delete this case?')) {
      void deleteCaseApi(id);
      navigate(ROUTE.ADMIN_CASES);
    }
  };


  const toggleFeatured = async () => {
    if (isFeatureApiLoading) return;

    try {
      const result = await featureCaseApi({ id, featured: !featured }).unwrap();

      if (!result.success) {
        toast.error(result.msg);
      } else {
        setValue('featured', !featured);
      }
    } catch (e: any) {
      const message: string =
        e.data?.message || 'Unexpected error. Please try again.';
      toast.error(message);
    }
  };

  return (
    <Flex container flexDirection="column" gap={16} style={{ paddingTop: 3 }}>
      <Button type="submit" pressable loading={formState.isSubmitting}>
        {isEditing ? 'Update case' : 'Create case'}
      </Button>

      {isEditing && (
        <>
          <Button
            pressable
            color="secondary-v3"
            disabled={formState.isSubmitting}
            onClick={() => toggleFeatured()}
          >
            {featured ? 'Make unfeatured' : 'Make featured'}
          </Button>

          <Button pressable color="danger" disabled={formState.isSubmitting} onClick={deleteCase}>
            Delete case
          </Button>
        </>
      )}
    </Flex>
  );
};
