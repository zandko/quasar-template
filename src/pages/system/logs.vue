<template>
  <basic-container>
    <basic-table :entity="entity" :data="items" :columns="columns" :pagination="pagination">
      <template v-slot:body-cell-avatar="props">
        <q-td :props="props">
          <q-img :src="props.row.avatar" width="100px" spinner-color="primary" :ratio="1" />
        </q-td>
      </template>
    </basic-table>
  </basic-container>
</template>

<script lang="ts">
  import { defineComponent, ref } from '@vue/composition-api';
  import { BasicContainer } from '@/components/Container';
  import { BasicTable, ITableItem } from '@/components/Table';
  import userModel, { IUserModel } from '@/api/user';
  import { IPaginationProps } from '@/hooks/useServerSideProcessedTable';

  export default defineComponent({
    name: 'SystemLogs',
    components: {
      BasicContainer,
      BasicTable,
    },
    setup(_, context) {
      const items = ref<IUserModel[]>([]);
      const { columns } = useColumns();
      const pagination = ref<IPaginationProps>({
        page: 1,
        sortBy: 'desc',
        descending: false,
        rowsPerPage: context.root.$q.screen.xs ? 12 : 24,
        rowsNumber: 0,
      });

      const entity = {
        key: 'id',
        name: '会员列表',
        displayName: () => '会员',
        route: (key = '') => `/user/${key}`,
        service: userModel,
        defaultValue() {
          return {};
        },
      };

      return {
        items,
        columns,
        pagination,
        entity,
      };
    },
  });

  function useColumns() {
    const columns = ref<ITableItem>([
      {
        name: 'avatar',
        label: '头像',
        field: 'avatar',
      },
      {
        name: 'nickname',
        label: '昵称',
        field: 'nickname',
      },
      {
        name: 'title',
        label: '头衔',
        field: 'title',
      },
      {
        name: 'intro',
        label: '简介',
        field: 'intro',
      },
      {
        name: 'created_at',
        label: '添加时间',
        field: 'created_at',
      },
      {
        name: 'updated_at',
        label: '修改时间',
        field: 'updated_at',
      },
      { name: 'actions', label: '操作', align: 'right' },
    ]);

    return { columns };
  }
</script>
