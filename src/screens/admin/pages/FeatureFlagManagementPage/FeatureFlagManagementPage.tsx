import { useState, useEffect } from 'react';
import styles from './FeatureFlagManagementPage.module.scss';
import {
  useGetFeatureFlagsQuery,
  useUpdateFeatureFlagMutation
} from '../../../../store/slices/rockethubApi/featureflag.endpoints.ts';
import { TFeatureFlag } from '../../../../types/api/api.types.ts';
import GenericTable from '../../../../components/GenericTable/GenericTable.tsx';
import { Switch } from '../../../../components/Form/Switch/Switch.tsx';
import { Box } from '../../../../components/Box/Box.tsx';
import { Flex } from '../../../../components/Flex/Flex.tsx';
import { toast } from 'react-hot-toast';

export const Component = () => {
  const [featureFlagsDataSource, setFeatureFlagsDataSource] = useState<TFeatureFlag[]>([]);

  const {
    data: fetchedFeatureFlags,
    refetch
  } = useGetFeatureFlagsQuery();

  const [updateFeatureFlagApi] = useUpdateFeatureFlagMutation();

  useEffect(() => {
    if (fetchedFeatureFlags && 'featureFlags' in fetchedFeatureFlags) {
      setFeatureFlagsDataSource(fetchedFeatureFlags.featureFlags);
    }
  }, [fetchedFeatureFlags]);

  useEffect(() => {
    refetch()
      .catch(error => {
        toast.error(`Error fetching the feature flags: ${error}`);
      });
  }, []);

  const toggleFeatureFlag = async (type: string, enabled: boolean) => {
    await updateFeatureFlagApi({ featureFlagType: type, body: { enabled } });
    const updatedFlags = featureFlagsDataSource.map(flag =>
      flag.type === type ? { ...flag, enabled } : flag
    );
    setFeatureFlagsDataSource(updatedFlags);
  };

  const COLUMNS = {
    name: 'Feature flag name',
    enabled: (featureFlag: any) => {
      return <Switch
        checked={featureFlag.enabled}
        onChange={(checked) => toggleFeatureFlag(featureFlag.type as string, checked)}
      />;
    }
  };

  const HEADERS = [
    'Feature Flag',
    'Status'
  ];

  return (
    <Box direction="column" className={styles.container}>
      <Flex container gap={6} alignItems="center" className={styles.title}>
        Feature Flag Management
      </Flex>
      <div className={styles.content}>
        <div className={styles.table}>
          <GenericTable
            items={featureFlagsDataSource.map((data, index) => {
              return {
                id: index,
                ...data
              };
            })}
            columnNames={HEADERS}
            disablePagination={true}
            columns={COLUMNS}
          />
        </div>
      </div>
    </Box>
  );
};

