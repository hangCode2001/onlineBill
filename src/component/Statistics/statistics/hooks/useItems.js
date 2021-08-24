import { useEffect, useState, useRef } from "react";
import { useUpdate } from "./useUpdate";
import axios from 'axios'
import store from "../../../../store";
import { useHistory } from "react-router-dom";

const useItems = () => {

  const [items, setItems] = useState([]);
  const history = useHistory();
  const dataSetRef = useRef(true);
  useEffect(() => {
    dataSetRef.current = true;
    let interval = setInterval(() => {
      if (dataSetRef.current && store.getState().billItems.length !== 0) {
        clearInterval(interval);
        let localItems = store.getState().billItems;
        setItems(localItems);
      }
    }, 100);

    //根据缓存的userName来获取首次数据
    let name = localStorage.getItem('username')
    if (store.getState().userName === '') {
      console.log("首次获取数据")
      const action = {
        type: 'saveUserName',
        value: name
      }
      store.dispatch(action)
      axios.post("https://qcw4cy.fn.thelarkcloud.com/getData", { "userName": store.getState().userName })
        .then(res => {
          const action = {
            type: "getBillItems",
            value: res.data.billItems,
          }
          store.dispatch(action);
        })
    }

  }, []);


  const findItem = (id) => items.filter(item => item.id === id)[0];
  const updateItem = (id, newItem) => {
    if (window.confirm("确定要更改吗？")) {
      axios.post('https://qcw4cy.fn.thelarkcloud.com/changeData',
        {
          "userName": store.getState().userName,
          "id": newItem.id,
          "item": newItem
        }).then((res) => {
          if (res.data.isChange) {
            const newItems = items.map(item => item.id === id ? newItem : item);
            const action = {
              type: 'updateData',
              value: newItems
            };
            store.dispatch(action);
            setItems(newItems);
            window.alert("编辑完成");
          } else {
            window.alert("编辑失败");
          }
        });
    }
  }
  const deleteItem = (id) => {
    if (window.confirm("确定要删除吗？")) {
      axios.post('https://qcw4cy.fn.thelarkcloud.com/deleteData',
        {
          "userName": store.getState().userName,
          "id": id
        }).then((res) => {
          if (res.data.isDelete) {
            const newItems = items.filter(item => item.id !== id);
            setItems(newItems);
            const action = {
              type: 'updateData',
              value: newItems
            };
            store.dispatch(action);
            window.alert("删除完成");
            history.push("/Statistics");
          } else {
            window.alert("删除失败");
          }
        });
    }
  };

  return {
    items,
    findItem,
    updateItem,
    deleteItem,
  }
}

export { useItems };
