import { MutationTree } from 'vuex';
import { AppStateInterface } from './state';
import { removeATagView, removeOneSide } from '@/components/TagView';

const mutation: MutationTree<AppStateInterface> = {
  ADD_TAG_VIEW: (state, payload) => {
    const size = state.tagView.length;
    if (!size && payload.fullPath !== '/') {
      state.tagView.push(payload);
    }
    const t = [];
    for (let i = 0; i < size; i++) {
      t.push(state.tagView[i].fullPath);
    }
    if (t.indexOf(payload.fullPath) < 0 && size) {
      state.tagView.push(payload);
    }
  },

  SET_TAG_VIEW: (state, payload) => {
    state.tagView = payload;
  },

  REMOVE_TAG_VIEW: (state, { payload, root }) => {
    switch (payload.type) {
      case 'all':
        state.tagView = [];
        window.sessionStorage.setItem('tagView', '[]');
        root.$router.push('/');
        break;
      case 'current':
        removeATagView(state, { payload, root });
      default:
        removeOneSide(state, { payload, root });
        break;
    }
  },

  SET_BREADCRUMBS: (state, payload) => {
    state.breadcrumbs = payload;
  },

  SET_KEEPALIVE_LIST: (state, payload) => {
    state.keepAliveList = [];
    for (let i = 0; i < payload.length; i++) {
      if (payload[i].keepAlive) {
        state.keepAliveList.push(payload[i].name);
      }
    }
    return state.keepAliveList;
  },
};

export default mutation;
