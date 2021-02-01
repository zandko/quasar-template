import { RouteRecord } from 'vue-router';
import { StateInterface } from '@/store';
import { Store } from 'vuex';

/**
 * 获取 matched 中的路径 title，并生成面包屑
 * @param matched to.matched[]
 * @param store
 */
export function setBreadcrumbs(matched: RouteRecord[], store: Store<StateInterface>) {
  const temp = [];
  for (let i = 0; i < matched.length; i++) {
    temp.push({
      ...matched[i].meta,
      path: matched[i].path,
    });
  }
  store.commit('app/SET_BREADCRUMBS', temp);
}
