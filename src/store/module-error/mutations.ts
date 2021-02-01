import { MutationTree } from 'vuex';
import { ErrorInfo, ErrorStateInterface } from './state';
import { formatToDateTime } from '../../utils/dateUtil';

const mutation: MutationTree<ErrorStateInterface> = {
  commitErrorInfoState(state, info): void {
    const item = {
      ...info,
      time: formatToDateTime(new Date()),
    };
    state.errorInfoState = [item, ...(state.errorInfoState as ErrorInfo[])];
    state.errorListCountState += 1;
  },
  commitErrorListCountState(state, count: number): void {
    state.errorListCountState = count;
  },
};

export default mutation;
