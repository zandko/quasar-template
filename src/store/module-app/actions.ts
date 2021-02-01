import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { AppStateInterface } from './state';

const actions: ActionTree<AppStateInterface, StateInterface> = {
  someAction (/* context */) {
    // your code
  }
};

export default actions;
