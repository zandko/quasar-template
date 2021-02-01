import { PropType } from 'vue';

import { IActions } from './types';

export const basicProps = {
  entity: {
    type: Object as PropType<Recordable>,
    default: {},
    required: true,
  },

  actions: {
    type: Object as PropType<IActions>,
    default: () => {},
  },
};
