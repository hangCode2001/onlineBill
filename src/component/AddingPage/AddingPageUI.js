import React from 'react';
import './AddingPage.css'
import '../../common.css'
import 'antd/dist/antd.css'
import { InputNumber, DatePicker, Space, Select, Input } from 'antd';
//moment 设施datePicker的默认值
import moment from 'moment';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Nav from "../Nav/Nav"
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';


//Ant-Design 选择集 日期样式
const { Option } = Select
const dateFormat = 'YYYY/MM/DD';

const AddingPageUI = (props) => {

  return (
    <div className='AddingPage' >
      <div className='header-add'>
        <Link to='/Statistics' >
          <li>
            <ArrowLeftOutlined className='ArrowLeftOutlined' />
          </li>
        </Link >

        <span>详情</span>
      </div>
      <div className='outcomes'>
        {/* 根据收入/支出，渲染不同的图标，支出，渲染不同的图标，把收入支出两个组件合并到一起 */}
        {
          // 如果现在是支出，就渲染支出的图标
          props.type === 0 ?
            props.categoryTypes[0].map((item, idx) => {
              if (idx === props.index) {
                return (
                  <li onClick={props.chooseItem.bind(this, [idx, item.name])} key={idx} >
                    <item.iconName className='rounded-circle chosen' style={{ color: '#fff' }} />
                    <p>{item.name}</p>
                  </li>
                )
              } else {
                return (
                  <li onClick={props.chooseItem.bind(this, [idx, item.name])} key={idx} >
                    <item.iconName className='rounded-circle unchosen' style={{ color: '#888' }} />
                    <p>{item.name}</p>
                  </li>
                )
              }
            }) :
            props.categoryTypes[1].map((item, idx) => {
              if (idx === props.index) {
                return (
                  <li onClick={props.chooseItem.bind(this, [idx, item.name])} key={idx} >
                    <item.iconName className='rounded-circle chosen' style={{ color: '#fff' }} />
                    <p>{item.name}</p>
                  </li>
                )
              } else {
                return (
                  <li onClick={props.chooseItem.bind(this, [idx, item.name])} key={idx} >
                    <item.iconName className='rounded-circle unchosen' style={{ color: '#888' }} />
                    <p>{item.name}</p>
                  </li>
                )
              }

            })
        }

      </div>
      <div className='detail'>
        <div className='amount-detail'>
          {props.type === 0 ? props.categoryTypes[0].map((item, idx) => {
            if (idx === props.index) {
              return (
                <li key={idx} >
                  <item.iconName className='rounded-circle chosen' style={{ color: '#fff' }} />
                  <p>{item.name}</p>
                </li>
              )
            }
          }) :
            props.categoryTypes[1].map((item, idx) => {
              if (idx === props.index) {
                return (
                  <li key={idx} >
                    <item.iconName className='rounded-circle chosen' style={{ color: '#fff' }} />
                    <p>{item.name}</p>
                  </li>
                )
              }
            })
          }
          <InputNumber
            className='InputNumber'
            defaultValue={0}
            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
            onChange={props.numberChange}
          />
        </div>
        <div className='outcomeType'>
          <span>收支类型</span>
          <Select defaultValue="支出" onChange={props.typeChange}>
            <Option value="0">支出</Option>
            <Option value="1">收入</Option>
          </Select>
        </div>
        <div className='outcomeDate'>
          <span>日期</span>
          <Space direction="vertical" size={12}>
            <DatePicker defaultValue={moment(props.getDate_add(), dateFormat)} format={dateFormat} onChange={props.getDate} />
          </Space>
        </div>
        <div className='outcomeMemo'>
          <span>备注</span>
          <Input onChange={props.MemoChange} />
        </div>

      </div>
      <div className='footer-add' >
        <button className='finish-btn' onClick={props.confirm} >完成</button>
        {/* <button className='delete-btn' >删除</button> */}
      </div>

    </div>
  )
}





export default AddingPageUI;