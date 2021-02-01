import { boot } from 'quasar/wrappers';
import { Route, NavigationGuardNext } from 'vue-router';
import LoadingBar from '@/components/LoadingBar';
import { addTagView, setTagView } from '@/components/TagView/src/utils';
import { setBreadcrumbs } from '@/components/Breadcrumbs/src/utils';

import { Store } from 'vuex';
import { StateInterface } from '@/store';
import Vue from 'vue';

import constantRoutes from '@/router/constantRoutes';

export default boot(({ router, store }) => {
  router.beforeEach((to: Route, _from: Route, next: NavigationGuardNext<Vue>) => {
    handleTagViewAndBreadcrumbsAndKeepAlive(to, store);

    // const token = sessionStorage.getItem('access_token');

    // if (token) {
    //   if (to.path === '/login') {
    //     next({ path: '/' });
    //   }
    //   next();
    // } else {
    //   if (to.path !== '/logon') {
    //     next({ path: '/logon' });
    //   } else {
    //     next();
    //   }
    // }
    next();
  });

  router.afterEach(() => {
    LoadingBar.stop();
    LoadingBar.stop();
  });
});

function handleTagViewAndBreadcrumbsAndKeepAlive(to: Route, store: Store<StateInterface>) {
  if (to.name != null) {
    document.title = to.meta.title;
    LoadingBar.start();
    for (let i = 0; i < constantRoutes.length; i++) {
      if (constantRoutes[i].path === to.path) {
        return;
      }
    }
    let tagViewOnSS = [];
    const sessionStorage = (<any>window).sessionStorage;
    JSON.parse(sessionStorage.getItem('tagView')) === null
      ? sessionStorage.setItem('tagView', '[]')
      : (tagViewOnSS = JSON.parse(sessionStorage.getItem('tagView')));
    if (store.getters['app/getTagView'].length === 0 && tagViewOnSS.length !== 0) {
      setTagView(tagViewOnSS, store);
      store.commit('app/SET_KEEPALIVE_LIST', tagViewOnSS);
    } else {
      addTagView(to, store);
    }
    setBreadcrumbs(to.matched, store);
    handleKeepAlive(to);
  }
}

function handleKeepAlive(to: Route) {
  if (to.matched && to.matched.length > 2) {
    for (let i = 0; i < to.matched.length; i++) {
      const element = to.matched[i];
      if (element.components.default.name === 'Layout') {
        to.matched.splice(i, 1);
        handleKeepAlive(to);
      }
    }
  }
}
