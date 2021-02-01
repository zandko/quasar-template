import { Route } from 'vue-router';
import { Store } from 'vuex';
import { StateInterface } from '@/store';
import { getFirst } from '@/utils/clone';
import { AppStateInterface } from '@/store/module-app/state';

export function addTagView(to: Route, store: Store<StateInterface>) {
  const t = {
    fullPath: to.fullPath,
    name: to.name,
    title: to.meta.title,
    icon: to.meta.icon,
    keepAlive: to.meta.keepAlive || false,
  };
  if (getFirst(to.params) !== undefined) {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    t.title = t.title + '：' + getFirst(to.params);
  }
  if (
    t.title !== null &&
    t.title !== undefined &&
    t.fullPath !== '/' &&
    t.fullPath.indexOf('#') === -1
  ) {
    store.commit('app/ADD_TAG_VIEW', t);
  }
}

export function setTagView(tagView: Route, store: Store<StateInterface>) {
  store.commit('app/SET_TAG_VIEW', tagView);
}

export function removeATagView(state: AppStateInterface, { payload, root }: any) {
  const removedTagView = state.tagView[payload.index].fullPath;
  state.tagView.splice(payload.index, 1);
  if (state.tagView.length === 0) {
    window.sessionStorage.setItem('tagView', '[]');
    root.$router.push('/');
  } else {
    if (payload.index === state.tagView.length && root.$route.path === removedTagView) {
      root.$router.push(state.tagView[payload.index - 1].fullPath);
      return;
    }
    if (payload.index === 0 && root.$route.path === removedTagView) {
      root.$router.push(state.tagView[0].fullPath);
      return;
    }
    if (root.$route.path === removedTagView) {
      root.$router.push(state.tagView[payload.index - 1].fullPath);
    }
  }
}

export function removeOneSide(state: AppStateInterface, { payload, root }: any) {
  switch (payload.side) {
    case 'right':
      state.tagView = state.tagView.slice(0, Number(payload.index) + 1);
      if (state.tagView.length === 1) {
        root.$router.push(state.tagView[0].fullPath);
      }
      if (state.tagView.length === Number(payload.index) + 1) {
        root.$router.push(state.tagView[payload.index].fullPath);
      }
      break;
    case 'left':
      state.tagView = state.tagView.slice(payload.index, state.tagView.length);
      if (state.tagView.length === 1) {
        root.$router.push(state.tagView[0].fullPath);
      }
      if (state.tagView.length <= payload.index) {
        root.$router.push(state.tagView[0].fullPath);
      }
      break;
    case 'others':
      state.tagView = state.tagView.splice(payload.index, 1);
      root.$router.push(state.tagView[0].fullPath);
      break;
    default:
      break;
  }
}
