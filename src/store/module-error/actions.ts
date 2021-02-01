import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { ErrorInfo, ErrorStateInterface } from './state';
import { ErrorTypeEnum } from '../../enums/exceptionEnum';

const actions: ActionTree<ErrorStateInterface, StateInterface> = {
  setupErrorHandle(content, error: any) {
    const errInfo: Partial<ErrorInfo> = {
      message: error.message,
      type: ErrorTypeEnum.AJAX,
    };
    if (error.response) {
      const {
        config: { url = '', data: params = '', method = 'get', headers = {} } = {},
        data = {},
      } = error.response;
      errInfo.url = url;
      errInfo.name = 'Ajax Error!';
      errInfo.file = '-';
      errInfo.stack = JSON.stringify(data);
      errInfo.detail = JSON.stringify({ params, method, headers });
    }
    content.commit('commitErrorInfoState', errInfo as ErrorInfo);
  },
};

export default actions;
