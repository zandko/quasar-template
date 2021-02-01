export interface ITableItem {
  name?: string;
  label?: string;
  field?: string;
  required?: boolean;
  align?: string;
  sortable?: boolean;
  sort?: Fn;
  format?: Fn;
  style?: string;
  classes?: string;
  headerStyle?: string;
  headerClasses?: string;

  [x: string]: any;
}

export interface IActionItem {
  enabled?: boolean;
  icon: string | string[];
  label?: string;
}

export interface IActions {
  [x: string]: IActionItem;
}
