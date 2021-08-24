import { monthFilter } from "./utilities/help";
import styled from "styled-components";
import Icon from "./utilities/Icon";

const Wrapper = styled.div` 
  display: flex;
  flex-direction:column;
  width: 100%;
  height: 90px;
  justify-content: center;
  align-items: center;
  background: #F7C52F;
  color:white;
  >.in_outCome{
    font-size:30px;
  }
  >.tab{
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`;

const Tab = styled.div`
  display: flex;
  width: 50%;
  &.outcomeTab{
    flex-direction: row-reverse;
    border-left: 1px solid #EEE;
  }
  >.text{  
    font-size: 24px;
    text-align: center;
    color: white;
  }
  >.icon{
      width: 36px;
      height: 36px;
      fill:white;
    }
`;

const SelectTab = (props) => {

  const { accountItems, selectedDate, selectedIn_out, selectIncome, selectOutcome } = props;

  const getTotal = () => {
    return monthFilter(accountItems, selectedDate, selectedIn_out).reduce(
      (acc, current) => acc + current.money, 0);
  };

  return (
    <Wrapper>
      <div className="in_outCome">
        {selectedIn_out === 1 ? '+' : '-'}{getTotal()}元</div>
      <div className="tab">
        <Tab className="incomeTab" onClick={() => selectIncome()}>
          <Icon name="income" />
          <div className="text">收入</div>
        </Tab>
        <Tab className="outcomeTab" onClick={() => selectOutcome()}>
          <Icon name="outcome" />
          <div className="text">支出</div>
        </Tab>
      </div>
    </Wrapper>
  );
}

export { SelectTab };
