import { ref } from '@vue/composition-api';

export interface IPaginationProps {
  rowsNumber: number;
  page: number;
  rowsPerPage: number;
  sortBy?: string;
  descending?: boolean;
}

interface IRequestProps {
  pagination: IPaginationProps;
  filter?: any;
}

interface IResponseProps {
  items: Recordable[];
  count: number | string;
}

export function useServerSideProcessedTable(
  pagination: IPaginationProps,
  fetchData: (params: any) => any
) {
  const loading = ref<boolean>(false);
  const items = ref<Recordable[]>([]);

  const onRequest = async ({ pagination: newPagination, filter }: IRequestProps) => {
    loading.value = true;

    const { page, rowsPerPage, rowsNumber, sortBy, descending } = newPagination;

    const fetchCount = rowsPerPage === 0 ? rowsNumber : rowsPerPage;

    const startRow = (page - 1) * rowsPerPage;

    let data: IResponseProps;
    try {
      data = await fetchData({ startRow, count: fetchCount, filter, sortBy, descending });
    } catch (error) {
      loading.value = false;

      return;
    }

    items.value.splice(0, items.value.length, ...data.items);
    pagination.rowsNumber = parseInt(data.count);

    pagination.page = page;
    pagination.rowsPerPage = rowsPerPage;
    pagination.sortBy = sortBy;
    pagination.descending = descending;

    loading.value = false;
  };

  return {
    items,
    loading,
    onRequest,
  };
}
