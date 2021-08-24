import styled from "styled-components";
import { Select } from 'antd';

const Wrapper = styled.div` 
  display: flex;
  background: #F7C52F;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  .ant-select .ant-select-selector{
          height: 40px !important;
          font-size: 30px !important;
          background:#F7C52F !important;
          color:white !important;
          border:none !important;
         }
`;

const SelectDate = (props) => {
  const { selectYear, selectMonth } = props;
  const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const year = [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021];
  const { Option } = Select;
  const localDate = new Date();
  const LocalYear = localDate.getFullYear();
  const LocalMonth = localDate.getMonth() + 1;
  return (
    <Wrapper >
      <Select size="large" defaultValue={LocalYear} onChange={selectYear}>
        {year.map((item) =>
          (<Option key={item + 'year'} value={item}>{item}</Option>)
        )}
      </Select >
      <Select size="large" defaultValue={LocalMonth} onChange={selectMonth}>
        {month.map((item) =>
          (<Option key={item + 'month'} value={item}>{item}</Option>)
        )}
      </Select>
    </Wrapper>
  );
}

export { SelectDate };
