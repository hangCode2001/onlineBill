import { isaNumber, year, month, day, showDay } from './utilities/help';
import { useState } from 'react';
import Icon from './utilities/Icon';
import '../statistic.css'

const { Select } = require("antd");
const { default: styled } = require("styled-components");

const Space = styled.div`
  flex-grow: 1;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: auto;
  height: 0;
  >.centerBar{
    >.type{
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      border-bottom: 1px solid #EEE;
      >.otherType{
        display: flex;
        flex-direction: column;
          >.icon{
          width: 80px;
          height: 80px;
          fill:grey; 
          }   
        >.text{
          font-size:20px;
          text-align: center;
        }
      }
      >.selectedType{
        display: flex;
        flex-direction: column;
          >.icon{
          width: 80px;
          height: 80px;
          fill:#F7C52F; 
          }   
        >.text{
          font-size:20px;
          text-align: center;
        }
      }
    }
    >.date{
      display: flex;
      font-size: 16px;
      margin:10px;
      justify-content: space-between;
    }
    >.in_come{
      font-size: 16px;
      display: flex;
      margin:10px;
      justify-content: space-between;
    }
    >.memo{
      display: flex;
      font-size: 16px;
      margin:10px;
      justify-content: space-between;
    }
    >.money{
      display: flex;
      font-size: 16px;
      margin:10px;
      justify-content: space-between;
    }
  }
  >.footerBar{
    display: flex;
    text-align: center;
    align-items: center;
    font-size: 32px;
    border:1px solid #EEE;
    >.ok{
      width: 50%;
      background:#F7C52F;
      height: 60px;
    }
    >.delete{
      width: 50%;
      height: 60px;
    }

  }
`;

const ItemContent = (props) => {

  const { newItem, deleteItem, updateItem } = props;
  const defaultMonth = newItem.date.month;
  const defaultType = newItem.type;
  const defaultIn_out = newItem.in_out;
  const billTypes = [
    "服饰",
    "餐饮",
    "房租",
    "旅行",
    "医疗",
    "交通",
    "购物",
    "学习",
    "工资",
    "兼职",
    "理财",
    "基金",
    "股票",
    "黄金",
    "期货",
    "其他"
  ];

  const { Option } = Select;
  const [selectDay, setSelectDay] = useState(showDay(defaultMonth));
  const [selectMonth] = useState(month);
  const [selectYear] = useState(year);
  const [selectType, setSelectType] = useState(defaultType);
  const [selectIn_out, setSelectedIn_out] = useState(defaultIn_out);

  const changeYear = (value) => {
    newItem.date.year = value
  }
  const changeMonth = (value) => {
    setSelectDay(showDay(value, newItem.date.year))
    newItem.date.month = value;
  }
  const changeDay = (value) => {
    newItem.date.day = value
  }
  const changeMemo = (e) => {
    const value = e.currentTarget.value;
    newItem.memo = value;
  }
  const changeMoney = (e) => {
    const value = e.currentTarget.value;
    if (isaNumber(value) || value === '\b') {
      newItem.money = parseFloat(value);
    }
    else {
      window.alert("请输入数字");
    }
  }
  const changeIn_out = (value) => {
    newItem.in_out = value;
    setSelectedIn_out(value);
  }
  const changeType = (value) => {
    newItem.type = value;
    setSelectType(value);
  }
  const getTypeClass = (index) => {
    if (selectType === index) {
      return "selectedType";
    } else {
      return "otherType";
    }
  }

  return (
    <Wrapper className='container-statistics' >
      <div className="centerBar">
        <div className="type">
          {
            selectIn_out === 0 ?
              (billTypes.slice(0, 8).map((item, index) => {
                return (
                  <div key={item + 'typeItem'} className={getTypeClass(index)} onClick={() => changeType(index)}>
                    <Icon key={item + 'icon'} name={item} />
                    <div key={item + 'text'} className="text">{item}</div>
                  </div>);
              })) :
              (billTypes.slice(8).map((item, index) => {
                return (
                  <div key={item + 'typeItem'} className={getTypeClass(index + 8)} onClick={() => changeType(index + 8)}>
                    <Icon key={item + 'icon'} name={item} />
                    <div key={item + 'text'} className="text">{item}</div>
                  </div>);
              }))
          }
        </div>
        <div className="date">
          <div>日期</div>
          <div className="select">
            <Select defaultValue={newItem.date.year} onChange={changeYear}>
              {selectYear.map(item => (<Option key={item} value={item}>{item}</Option>))}
            </Select>
            <Select defaultValue={newItem.date.month} onChange={changeMonth}>
              {selectMonth.map(item => (<Option key={item} value={item}>{item}</Option>))}
            </Select>
            <Select defaultValue={newItem.date.day} onChange={changeDay}>
              {selectDay.map(item => (<Option key={item} value={item}>{item}</Option>))}
            </Select>
          </div>
        </div>
        <div className="in_come">
          <div>收支</div>
          <Select defaultValue={selectIn_out} onChange={changeIn_out}>
            <Option value={1}>收入</Option>
            <Option value={0}>支出</Option>
          </Select>
        </div>
        <div className="memo">
          <div>备注</div>
          <input defaultValue={newItem.memo} onInput={changeMemo} />
        </div>
        <div className="money">
          <div>金额</div>
          <input defaultValue={newItem.money} onInput={changeMoney} />
        </div>
      </div>
      <Space />
      <div className="footerBar">
        <div className="ok" onClick={() => updateItem(newItem.id, newItem)}>完成</div>
        <div className="delete" onClick={() => deleteItem(newItem.id)}>删除</div>
      </div>

    </Wrapper>)
};

export { ItemContent };