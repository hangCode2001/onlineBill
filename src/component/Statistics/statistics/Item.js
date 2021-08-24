import styled from "styled-components";
import Icon from './utilities/Icon'

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  background-color: white;
  justify-content: space-around;
  align-items: center;
  >.type{
    font-size: 20x;
    white-space: nowrap;
    >.icon {
          width: 60px;
          height: 60px;
          fill:#F7C52F;
        }
  }
  >.text{
    display: flex;
    flex-direction: column;
    overflow: hidden;
    margin:0 10px;
    width: 100%;
    word-wrap:break-word;
    word-break:break-all;
    color:black;
    .type{
      font-size: 20px;
    }
    .memo{
      font-size: 12px;
      color:#A9A9A9;
    }
  }
  >.money{
    font-size: 20px;
    white-space: nowrap;
    color:black;
  }
`;

const Item = (props) => {
  const { type, in_out, memo, money } = props;
  return (
    <Wrapper>
      <div className="type">
        <Icon name={type} />
      </div>
      <div className="text">
        <div className="type">
          {type}
        </div>
        <div className="memo">
          {memo}
        </div>
      </div>
      <div className="money">{in_out === 1 ? "+" : "-"}{money}元</div>
    </Wrapper>
  )
};

export { Item };