export interface IUserTabsProps {
  name: string
  label: string
}

export const userTabs: IUserTabsProps[] = [
  {
    name: 'basicSettings',
    label: '基本设置'
  },
  {
    name: 'safeSettings',
    label: '安全设置'
  },
  {
    name: 'accountBind',
    label: '账号绑定'
  },
  {
    name: 'newMsg',
    label: '新消息通知'
  }
];


export const ACCOUNT_SETTINGS_DATA = {
  basicSetting: {
    email: 'push_over@163.com',
    nickName: 'Praise',
    personDesc: '世界没有难写的代码',
    country: '中国',
    province: '山东省',
    city: '滕州市',
    address: '墨香圣府',
    phonePrefix: '+86',
    phone: '19525793597'
  },
  safeData: {
    password: '123456',
    phone: '195****3597',
    passwordQuestion: '我的生日是什么时候',
    slaveEmail: 'push***over@163.com',
    mfaEquipment: null
  },
  accountBindData: {
    bindTaoBaoNo: '123442',
    bindZfbNo: '19525793597',
    bindWechatNo: '12344'
  },
  newMsgData: {
    passwordMsg: true,
    systemMsg: false,
    waitTaskMsg: true
  }
};
