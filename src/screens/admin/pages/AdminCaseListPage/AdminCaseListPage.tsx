import { CaseListItem } from '../../../../components/CaseListItem/CaseListItem';
import Loader from '../../../../components/Loader/Loader';
import { useCases } from '../../../../hooks/useCases';
import { CaseFilters } from '../../../../components/CaseFilters/CaseFilters';
import { isEmpty } from 'lodash';
import { T } from '../../../../i18n/translate';
import { NoDataMessage } from '../../../../components/Typography/Typography';
import { GAME_TYPE } from '../../../../types/caseTypes';
import styles from '../../../pages/CaseOpeningPage/CaseOpeningPage.module.scss';
import { getAdminCaseDetailsPath } from '../../../../utils/url.utils';
import { useAdminGetAllCasesQuery } from '@/store/slices/rockethubApi/admin.endpoints';

export const Component = () => {
  const {
    cases,
    loading,
    gameType,
    setGameType,
    sort,
    setSort,
    search,
    setSearch,
    gameSpecific,
    setGameSpecific,
    priceFilter,
    setPriceFilter,
  } = useCases({
    localStorage: true,
    filter: (cases) => cases,
    useApiHook: useAdminGetAllCasesQuery,
  });

  const hasActiveFilters = Boolean(search) || gameType !== GAME_TYPE.ALL;

  return (
    <>
      <CaseFilters
        sort={sort}
        gameType={gameType}
        onSortChange={setSort}
        onGameTypeChange={setGameType}
        search={search}
        onSearchChange={setSearch}
        gameSpecific={gameSpecific}
        setGameSpecific={setGameSpecific}
        priceFilter={priceFilter}
        onPriceFilterChange={setPriceFilter}
      />

      {hasActiveFilters && !loading && isEmpty(cases) && (
        <NoDataMessage>
          <T
            id="createCaseBattle.searchResult.NoCasesFound"
            defaultMessage="No cases found that matches your search criteria"
          />
        </NoDataMessage>
      )}
      {!hasActiveFilters && !loading && isEmpty(cases) && (
        <NoDataMessage>No cases found</NoDataMessage>
      )}

      <div className={styles.caseList}>
        <Loader loading={loading} position="fixed" />

        {cases.map((caseData) => {
          return (
            <CaseListItem
              caseData={caseData}
              key={caseData.id}
              asLink
              getLink={(caseData) => getAdminCaseDetailsPath(caseData.id)}
            />
          );
        })}
      </div>
    </>
  );
};
