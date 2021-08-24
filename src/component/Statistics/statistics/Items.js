import styled from "styled-components";
import { Item } from "./Item"
import { MonthTotal } from "./MonthTotal";
import { dayFilter, monthFilter } from "./utilities/help"
import { Link } from 'react-router-dom';

const Wrapper = styled.div` 
  width: 100%;
  >.placeholder{
    height: 60px;
  }
`;

const Items = (props) => {
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
  const { accountItems, selectedDate, selectedIn_out } = props;
  const newItems = monthFilter(accountItems, selectedDate, selectedIn_out).sort((a, b) => a.date.day - b.date.day);
  let lastDay = 0;
  const getMonthTotal = (day) => {
    return dayFilter(newItems, day).reduce(
      (acc, current) => acc + current.money, 0);
  };

  return (
    <Wrapper>
      {
        newItems.map((item) => {
          let day = item.date.day;
          if (lastDay === day) {
            return (
              <div key={item.id + 'div'}>
                <Link to={'/edititem/' + item.id}>
                  <Item key={item.id + 'item'} type={billTypes[item.type]} memo={item.memo} money={item.money} in_out={item.in_out} />
                </Link>
              </div>
            );
          } else {
            lastDay = day;
            return (
              <div key={item.id + 'div'}>
                <MonthTotal key={item.id + 'monthTotal'} year={item.date.year} month={item.date.month} day={item.date.day} in_out={item.in_out} getMonthTotal={getMonthTotal} />
                <Link to={'/edititem/' + item.id}>
                  <Item key={item.id + 'item'} type={billTypes[item.type]} memo={item.memo} money={item.money} in_out={item.in_out} />
                </Link>
              </div>
            )
          }
        })}
      <div className="placeholder"></div>
    </Wrapper >
  );
}

export { Items };
