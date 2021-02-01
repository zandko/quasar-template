import { ErrorTypeEnum } from '../../enums/exceptionEnum';

export interface ErrorInfo {
  type: ErrorTypeEnum;
  file: string;
  name?: string;
  message: string;
  stack?: string;
  detail: string;
  url: string;
  time?: string;
}

export interface ErrorStateInterface {
  errorInfoState: ErrorInfo[] | null;
  errorListCountState: number;
}

function state(): ErrorStateInterface {
  return {
    errorInfoState: [],
    errorListCountState: 0,
  };
}

export default state;
