import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { ErrorStateInterface } from './state';

const getters: GetterTree<ErrorStateInterface, StateInterface> = {
  getErrorInfoState: (state) => state.errorInfoState,
  getErrorListCountState: (state) => state.errorListCountState,
};

export default getters;
