export interface AppStateInterface {
  tagView: Recordable[];
  breadcrumbs: Recordable[];
  keepAliveList: string[];
}

function state(): AppStateInterface {
  return {
    tagView: [],
    breadcrumbs: [],
    keepAliveList: [],
  };
}

export default state;
