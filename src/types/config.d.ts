export interface GlobConfig {
  // 网站标题
  title: string;
  // 项目路径
  apiUrl: string;
  uploadUrl?: string;
  urlPrefix?: string;
  shortName: string;
}
export interface GlobEnvConfig {
  // 网站标题
  GLOB_APP_TITLE: string;
  // 项目路径
  GLOB_API_URL: string;
  GLOB_API_URL_PREFIX?: string;
  GLOB_APP_SHORT_NAME: string;
  GLOB_UPLOAD_URL?: string;
}

interface GlobWrap {
  globSetting: Readonly<GlobConfig>;
}
