import Layout from "./statistics/utilities/Layout";
import styled from "styled-components";
import { SelectDate } from './statistics/SelectDate';
import { SelectTab } from './statistics/SelectTab';
import { Items } from './statistics/Items';
import { useState } from 'react';
import { useItems } from './statistics/hooks/useItems';
import { localYear, localMonth } from "./statistics/utilities/help";
import Nav from "../Nav/Nav"
import './statistic.css'

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;



function Statistics() {

  const { items: defaultItems } = useItems();
  const [selectedDate, setSelectedDate] = useState({
    "year": localYear,
    "month": localMonth,
  });

  const defaultIn_out = JSON.parse(localStorage.getItem("in_out")) || 0;
  const [selectedIn_out, setSelectedIn_out] = useState(parseInt(defaultIn_out));

  const selectYear = (value) => {
    setSelectedDate(
      {
        ...selectedDate,
        "year": value,
      }
    )
  };
  const selectMonth = (value) => {
    setSelectedDate(
      {
        ...selectedDate,
        "month": value,
      }
    )
  };
  const selectIncome = () => {
    localStorage.setItem("in_out", JSON.stringify(1));
    setSelectedIn_out(1);
  }
  const selectOutcome = () => {
    localStorage.setItem("in_out", JSON.stringify(0));
    setSelectedIn_out(0);
  }


  return (

    <div className='container-statistics'>
      <Layout>
        <Wrapper>
          <SelectDate selectYear={selectYear} selectMonth={selectMonth} />
          <SelectTab accountItems={defaultItems} selectedDate={selectedDate} selectedIn_out={selectedIn_out} selectIncome={selectIncome} selectOutcome={selectOutcome} />
          <Items accountItems={defaultItems} selectedDate={selectedDate} selectedIn_out={selectedIn_out} />
        </Wrapper>
      </Layout>
      <Nav></Nav>
    </div>

  );
}

export default Statistics;
