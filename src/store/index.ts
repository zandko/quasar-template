import { store } from 'quasar/wrappers';
import Vuex from 'vuex';

import app from './module-app';
import { AppStateInterface } from './module-app/state';
import error from './module-error';
import { ErrorStateInterface } from './module-error/state';

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export interface StateInterface {
  // Define your own store structure, using submodules if needed
  app: AppStateInterface;
  error: ErrorStateInterface;
  // Declared as unknown to avoid linting issue. Best to strongly type as per the line above.
  example: unknown;
}

export default store(function({ Vue }) {
  Vue.use(Vuex);

  const Store = new Vuex.Store<StateInterface>({
    modules: {
      app,
      error,
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: !!process.env.DEBUGGING,
  });

  return Store;
});
