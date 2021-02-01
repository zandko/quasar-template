import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { ErrorStateInterface } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const ErrorModule: Module<ErrorStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};

export default ErrorModule;
