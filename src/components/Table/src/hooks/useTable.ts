import { ref, computed, watch, SetupContext } from '@vue/composition-api';
import { useServerSideProcessedTable, IPaginationProps } from '@/hooks/useServerSideProcessedTable';
import { ITableItem } from '../types';

export function useTable(props: any, context: SetupContext) {
  const filter = ref<string>();
  const rowsPerPageOptions: number[] = [12, 24, 36, 48];

  const searchableFields = computed(() => {
    return ((context.attrs.columns as unknown) as ITableItem[])
      .filter((column: Recordable) => column.searchable)
      .map((column: Recordable) => column.field);
  });

  const { items, loading, onRequest } = useServerSideProcessedTable(
    (context.attrs.pagination as unknown) as IPaginationProps,
    async ({ startRow, count, filter, sortBy, descending }) => {
      const search = {
        term: filter,
        fields: searchableFields.value,
      };

      try {
        const { data, total } = await props.entity.service.get({
          search,
          startRow,
          count,
          filter,
          sortBy,
          descending,
        });

        return {
          items: data,
          count: total,
        };
      } catch (error) {
        context.root.$q.notify({
          type: 'negative',
          message: '从服务器获取数据时发生错误',
          caption: error.message,
        });

        throw error;
      }
    }
  );

  watch(items, (value: any) => {
    const data: any  = context.attrs.data;
    data.splice(0, data.length, ...value);
  });

  const refreshTable = async() => {
    await onRequest({
      pagination: (context.attrs.pagination as unknown) as IPaginationProps,
      filter: filter.value,
    });
  };

  return {
    filter,
    loading,
    items,
    rowsPerPageOptions,
    onRequest,
    refreshTable,
  };
}
