import Icon from './utilities/Icon';
import { ItemContent } from './ItemContent';
import '../statistic.css'

const { useItems } = require("./hooks/useItems");
const { useParams, useHistory } = require("react-router-dom");
const { default: styled } = require("styled-components");

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Topbar = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 20px;
  padding: 14px;
  background: #F7C52F;
  color: white;
  .icon{
    height: 20px;
    width: 20px;
    fill: white;
  }
  .text{
    white-space: nowrap;
    text-align: center;
    margin-left: -20px;
    flex:1;
  }
`;

function deepClone(obj) {
  let newObj = Array.isArray(obj) ? [] : {}
  if (obj && typeof obj === "object") {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        newObj[key] = (obj && typeof obj[key] === 'object') ? deepClone(obj[key]) : obj[key];
      }
    }
  }
  return newObj;
}

const EditItem = (props) => {
  const { updateItem, deleteItem, findItem } = useItems();

  const { id: stringId } = useParams();
  const item = findItem(parseInt(stringId));
  const newItem = deepClone(item);
  const history = useHistory();
  const onClickBack = () => {
    history.goBack();
  }

  return (
    <Wrapper className='container-statistics'>
      <Topbar>
        <Icon name="left" onClick={onClickBack} />
        <Icon />
        <span className="text">编辑</span>
      </Topbar>
      {item ? <ItemContent newItem={newItem} updateItem={updateItem} deleteItem={deleteItem} /> : <div>页面加载中</div>}
    </Wrapper >
  );
}

export default EditItem;