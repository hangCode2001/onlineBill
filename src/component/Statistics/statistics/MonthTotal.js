import styled from "styled-components";

const Wrapper = styled.div`
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  background: #EEE;
  color:#969696;
`;

const MonthTotal = (props) => {

  const { year, month, day, getMonthTotal, in_out } = props;
  return (
    <Wrapper>
      <div>
        {year}年{month}月{day}日
      </div>
      <div>
        {in_out === 1 ? "收入: " : "支出: "} {getMonthTotal(day)}元
      </div>
    </Wrapper>
  );
};

export { MonthTotal };