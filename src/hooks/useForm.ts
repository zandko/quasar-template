import { ref, reactive } from '@vue/composition-api';

export function useForm(
  defaultValue: Record<string, any>,
  onSave: (...args: any[]) => Promise<any> | void
) {
  const loading = ref<boolean>(false);
  const isUpdating = ref<boolean>(false);
  const isOpen = ref<boolean>(false);

  const value = reactive<Record<string, any>>({ ...defaultValue });

  const closeForm = () => {
    isOpen.value = false;
  };

  const resetForm = () => {
    isUpdating.value = false;
    Object.assign(value, defaultValue);
  };

  const editItem = (item: Record<string, any>) => {
    isUpdating.value = true;
    Object.assign(value, {}, item);
    isOpen.value = true;
  };

  const saveForm = async () => {
    loading.value = true;

    await onSave(value, isUpdating.value);

    loading.value = false;
    closeForm();
    resetForm();
  };

  return {
    loading,
    isUpdating,
    isOpen,
    value,
    saveForm,
    closeForm,
    resetForm,
    editItem,
  };
}
