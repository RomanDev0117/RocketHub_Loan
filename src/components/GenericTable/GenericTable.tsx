import React, { HTMLAttributes } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from './GenericTableUIElements';
// import Scrollbar from './Scrollbar';

// import { RemoveAlert } from './dashboard/product';
// import { LoadingElement } from 'src/components/LoadingElement';
import { CaseIcon } from '../icons/CaseIcon';
import Loader from '../Loader/Loader';
import { useTable } from '../../hooks/useTable';
import { Button } from '../Button/Button';
import { TablePagination } from '../TablePagination/TablePagination';
import styles from './GenericTable.module.scss';
import { isEmpty } from 'lodash';
import clsx from 'clsx';
import { useMeasure } from 'react-use';
import { Columns } from './genericTable.types';
import { MobileTable } from './components/MobileTable/MobileTable';


export type GenericTableProps<T, A = undefined> = {
  items: T[];
  onItemRemove?: (item: T) => Promise<void>;
  columnNames?: string[];
  columns: Columns<T>; // TODO: define interface
  selectable?: boolean;
  initialLimit?: number;
  disablePagination?: boolean;
  loading?: boolean;
  minHeight?: number;
  noData?: React.ReactNode;
  tableProps?: HTMLAttributes<HTMLTableElement>;
  stateStrategy?: 'state' | 'url'; // Save pagination and other filters in the url or use only state
  generateUniqueKey?: (item: T, index: number) => string | number;
  RootElement?: any;
  mobileBreakpoint?: number;
  onRowClick?: (item: T, index: number) => void;
  dynamicDataConfig?: {
    fetchData: (config: { page: number, perPage: number } & A) => void;
    requestData?: A;
    total: number;
  };
  actions?:
  | TActionsConfig<T>
  | ((item: T) => React.ReactNode);
};

type TActionsConfig<T> = {
  delete?:
  | boolean
  | {
    type: string;
    buttonText: string;
    icon: false | React.ReactNode;
  };
  edit?:
  | boolean
  | {
    onClick: (item: T) => void;
    icon?: React.ReactElement;
  }
  | {
    link: (item: T) => string;
    icon?: React.ReactElement;
  };
}


const GenericTable = <T extends { id: string }, A extends Record<string, string>>(
  props: GenericTableProps<T, A>
) => {

  const {
    items = [],
    columnNames,
    // onItemRemove,
    tableProps,
    columns,
    actions,
    selectable,
    loading,
    stateStrategy = 'url',
    initialLimit = 20,
    RootElement = 'div',
    generateUniqueKey = (item) => item.id,
    disablePagination,
    dynamicDataConfig,
    // minHeight,
    noData,
    onRowClick,
    mobileBreakpoint = 1,
  } = props;

  // track width of empty div
  const [ref, { width }] = useMeasure<HTMLDivElement>();
  const resizeObserverElement = <div ref={ref} data-sasha />;

  const isSmallDevice = width <= mobileBreakpoint;


  const {
    page,
    perPage,
    loading: tableLoading,
    // itemToRemove,
    // selectedItems,
    // selectedItemsIds,
    enableBulkActions,
    // selectedSomeItems,
    // selectedAllItemsOnThePage,
    setPage,
    // setPerPage,
    // setItemToRemove,
    // handleSelectAllItems,
    // handleSelectOneItem,
    // handleItemRemove,
  } = useTable({
    items,
    initialLimit,
    disablePagination,
    stateStrategy,
    dynamicDataConfig,
  });

  const columnsArray = Object.entries(columns);
  const filteredColumnNames = columnNames
    ? columnNames.filter((cn) => cn !== undefined)
    : undefined;

  const _loading = loading || tableLoading;
  const showNoData = noData && !_loading && isEmpty(items);
  const noDataAndLoading = _loading && isEmpty(items);

  const footerContent = (
    <>
      {!disablePagination && (
        <TablePagination
          total={dynamicDataConfig?.total || items.length}
          page={page}
          perPage={perPage}
          perPageOptions={[5, 10, 25, 50, 100]}
          onPageChange={setPage}
          className={clsx(styles.pagination, {
            [styles.smallDevicePagination]: isSmallDevice,
          })}
        />
      )}
      {showNoData && <div className={styles.noDataContainer}>{noData}</div>}</>
  );

  if (isSmallDevice) {
    return (
      <>
        {resizeObserverElement}
        <MobileTable
          items={items}
          columnNames={filteredColumnNames as string[]}
          columns={columns as any}
          onItemClick={onRowClick}
        />
        {footerContent}
      </>
    );
  }

  const renderActions = (item: T) => {
    if (typeof actions === 'function') {
      const result = actions(item);

      // if (typeof result === 'object' && !React.isValidElement(result)) {
      //   return renderActionsFromConfig({
      //     actions: result,
      //     item,
      //   });
      // }

      return (
        <TableCell>
          <div>
            {result}
          </div>
        </TableCell>
      );
    }

    if (typeof actions === 'object') {
      return renderActionsFromConfig({ actions, item });
    }

    return null;
  };

  const renderActionsFromConfig = ({ actions, item }: { actions: TActionsConfig<T>, item: T }) => {
    return (
      <TableCell>
        <div>
          {typeof actions.edit === 'object' && 'link' in actions.edit && (
            <Button Component={RouterLink} href={actions.edit.link(item)}>
              {actions.edit.icon || <CaseIcon />}
            </Button>
          )}
          {/* {typeof actions.edit === 'object' && 'onClick' in actions.edit && (
            <Button onClick={() => actions.edit.onClick(item)}>
              {actions.edit.icon || <CaseIcon />}
            </Button>
          )}
          {actions.delete &&
            (actions.delete.type === 'button' ? (
              <Button
                color="secondary"
                disabled={actions.delete.disabled}
                onClick={() => setItemToRemove(item)}
              >
                {actions.delete.buttonText}
              </Button>
            ) : (
              <Button
                disabled={actions.delete.disabled}
                color="secondary"
                onClick={() => setItemToRemove(item)}
              >
                <DeleteIcon />
              </Button>
            ))} */}
        </div>
      </TableCell>
    );
  };

  return (
    <div style={{ position: 'relative' }}>
      {resizeObserverElement}
      <Loader loading={_loading} zIndex={1200} position='absolute' />
      <RootElement className={clsx(styles.root, {
        [styles.tableNoData]: showNoData,
        [styles.tableLoadingNoData]: noDataAndLoading,
      })}>
        {enableBulkActions && (
          <div>
            <div>
              {/* <Checkbox
                checked={selectedAllItemsOnThePage}
                color="primary"
                indeterminate={selectedSomeItems}
                onChange={(event) => handleSelectAllItems(event.target.checked)}
              /> */}
              {/* <Button
                color="primary"
                variant="outlined"
                disabled={selectedItems.length === 0}
                // onClick={() => { setRemoveAlert(true) }}
              >
                Delete
              </Button> */}
            </div>
          </div>
        )}

        <Table {...tableProps}>
          {filteredColumnNames && (
            <TableHead>
              <TableRow>
                {selectable && (
                  <TableCell>
                    {/* <Checkbox
                        checked={selectedAllItemsOnThePage}
                        color="primary"
                        indeterminate={selectedSomeItems}
                        onChange={(event) =>
                          handleSelectAllItems(event.target.checked)
                        }
                      /> */}
                  </TableCell>
                )}
                {filteredColumnNames
                  .filter(Boolean)
                  .map((columnName, index) => {
                    if (index === filteredColumnNames.length - 1) {
                      return <TableCell key={index}>{columnName}</TableCell>;
                    }

                    return <TableCell key={index}>{columnName}</TableCell>;
                  })}
              </TableRow>
            </TableHead>
          )}

          <TableBody>
            {items.map((item, index) => {
              return (
                <TableRow
                  className={clsx({
                    [styles.clickable]: Boolean(onRowClick),
                  })}
                  key={generateUniqueKey(item, index)}
                  onClick={() => onRowClick?.(item, index)}
                >
                  {selectable && (
                    <TableCell>
                      {/* <Checkbox
                          checked={isItemSelected}
                          color="primary"
                          onChange={(event) => handleSelectOneItem(item)}
                        /> */}
                    </TableCell>
                  )}
                  {columnsArray.map(([key, column], idx) => {
                    let content = null;

                    if (
                      typeof column === 'string' ||
                      typeof column === 'undefined'
                    ) {
                      content = item[key as keyof T];
                    } else if (typeof column === 'function') {
                      content = column(item, { isSmallDevice, idx });
                    } else {
                      throw new Error(
                        `unsupported column type ${key}`
                      );
                    }

                    const cellProps: any = {};

                    // if (index === columnsArray.length - 1 && !actions) {
                    //   cellProps.align = 'right';
                    // }

                    return (
                      <TableCell key={key} {...cellProps}>
                        {content}
                      </TableCell>
                    );
                  })}
                  {renderActions(item)}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {footerContent}
      </RootElement>
    </div >
  );
};

export default GenericTable;
