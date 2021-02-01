import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { AppStateInterface } from './state';

const getters: GetterTree<AppStateInterface, StateInterface> = {
  getTagView: (state) => state.tagView,
  getBreadcrumbs: (state) => state.breadcrumbs,
  getKeepAliveList: (state) => state.keepAliveList
};

export default getters;
