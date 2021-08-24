import { GET_BILL_ITEMS, SUBMIT_DATA, CHANGE_ITEM_LIST, UPDATE_DATA } from './actionType'

const defaultState = {
  userName: '',
  billtypes: [
    "餐饮",
    "服饰",
    "房租",
    "旅行",
    "医疗",
    "交通",
    "购物",
    "学习",
    "工资",
    "兼职",
    "理财",
    "其他"
  ],
  billItems: [],
 
}



export default (state = defaultState, action) => {
  //获取账单列表
  if (action.type === GET_BILL_ITEMS) {
    let newState = JSON.parse(JSON.stringify(state))
    newState.billItems = action.value;
    return newState
  }
  //增加新的账单项
  if (action.type === SUBMIT_DATA) {
    let newState = JSON.parse(JSON.stringify(state))
    newState.billItems.push(action.value)
    console.log(newState.billItems);
    return newState
  }
  // 更新账单项目（添加或删除）
  if (action.type === UPDATE_DATA) {
    let newState = JSON.parse(JSON.stringify(state));
    newState.billItems = action.value;
    return newState;
  }
  if(action.type == "saveUserName"){
    console.log("修改name成功")
    let newState = JSON.parse(JSON.stringify(state));
    newState.userName = action.value;
    return newState;
  }
  return state;
}