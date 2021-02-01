import { extend } from 'quasar';
import { computed } from '@vue/composition-api';
import { IActions } from '../types';

export function useAction(props: any) {
  const actionsDefaults: IActions = {
    create: {
      enabled: true,
      icon: 'eva-plus-outline',
      label: `新增${props.entity.displayName(true) as string}`,
    },
    quickEdit: {
      enabled: true,
      icon: 'las la-pen',
      label: 'Quick Edit',
    },
    edit: {
      enabled: true,
      icon: 'las la-edit',
      label: 'Edit',
    },
    delete: {
      enabled: true,
      icon: 'las la-trash-alt',
      label: 'Delete',
    },
    deleteBatch: {
      enabled: true,
      icon: 'eva-trash-2-outline',
      label: '批量删除',
    },
    search: {
      enabled: true,
      icon: 'eva-search-outline',
      label: 'Search',
    },
    screen: {
      enabled: true,
      icon: ['eva-expand-outline', 'eva-collapse-outline'],
      label: '全屏',
    }
  };

  const actionConfig = computed<IActions>(() => extend(true, actionsDefaults, props.actions));

  return { actionConfig };
}
