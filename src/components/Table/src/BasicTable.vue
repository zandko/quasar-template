<template>
  <div>
    <q-table
      v-bind.sync="$attrs"
      v-on="$listeners"
      :title="entity.displayName(true)"
      :row-key="entity.key"
      :loading="loading"
      :filter="filter"
      :rows-per-page-options="rowsPerPageOptions"
      :selected.sync="selected"
      :dense="$q.screen.lt.md"
      selection="multiple"
      @request="onRequest"
      binary-state-sort
      color="primary"
      bordered
      class="no-shadow"
      :table-header-style="{ backgroundColor: '#f5f7fa' }"
    >
      <template #top-left>
        <q-input
          v-if="actionConfig.search.enabled"
          v-model="filter"
          debounce="500"
          :placeholder="actionConfig.search.label"
        >
          <template v-slot:append>
            <q-icon :name="actionConfig.search.icon" />
          </template>
        </q-input>
      </template>
      <template #top-right="table">
        <div class="q-gutter-sm">
          <table-top-btn :action="actionConfig.create" />
          <table-top-btn
            :action="actionConfig.screen"
            @click="table.toggleFullscreen"
            :switch-icon="
              table.inFullscreen ? actionConfig.screen.icon[1] : actionConfig.screen.icon[0]
            "
          />
          <table-top-btn color="negative" :action="actionConfig.deleteBatch" @click="deleteBatch" />
        </div>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <table-cell-btn
            :action="actionConfig.quickEdit"
            @click="$refs.form.editItem(props.row)"
          />
          <table-cell-btn :action="actionConfig.edit" :to="entity.route(props.row.Id)" />
          <table-cell-btn :action="actionConfig.delete" @click="deleteItem(props.row)" />
        </q-td>
      </template>

      <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope">
        <slot :name="slot" v-bind="scope" />
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from '@vue/composition-api';
import PopupForm from './components/PopupForm.vue';
import TableTopBtn from './components/TableTopBtn.vue';
import TableCellBtn from './components/TableCellBtn.vue';

import { useAction } from './hooks/useAction';
import { useTable } from './hooks/useTable';

import { basicProps } from './props';

export default defineComponent({
  name: 'BaseTable',
  components: { PopupForm, TableTopBtn, TableCellBtn },
  props: basicProps,
  inheritAttrs: false,
  setup: function(props, context) {
    const { actionConfig } = useAction(props);

    const {
      items, loading, filter, rowsPerPageOptions, onRequest, refreshTable
    } = useTable(
      props,
      context
    );

    const selected = ref<Recordable[]>([]);

    const onSave = async (data: any, isUpdating: boolean) => {
      if (!isUpdating) await props.entity.service.post(data);
      else await props.entity.service.put(data);

      await refreshTable();
    };

    const useDelete = (callback: Function) => {
      context.root.$q
        .dialog({
          title: 'Confirm',
          message: '确定要删除吗？',
          cancel: true,
          persistent: true
        })
        .onOk(async () => {
          loading.value = true;
          await callback();
          loading.value = false;
          await refreshTable();
        });
    };

    const deleteItem = (item: any) => {
      useDelete(async () => {
        await props.entity.service.delete(item.id);
      });
    };
    const deleteBatch = () => {
      useDelete(async () => {
        const ids: number[] = [];
        selected.value.forEach(({ id }) => ids.push(id));
        await props.entity.service.delete(ids);
        selected.value = [];
      });
    };
    onMounted(() => {
      refreshTable();
    });

    return {
      defaultValue: props.entity.defaultValue(),
      onSave,
      deleteItem,
      deleteBatch,
      onRequest,
      items,
      filter,
      loading,
      rowsPerPageOptions,
      selected,
      actionConfig
    };
  }
});
</script>
