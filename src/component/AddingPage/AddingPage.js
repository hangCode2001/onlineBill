import React, {useState } from 'react';
import './AddingPage.css'
import '../../common.css'
import 'antd/dist/antd.css'
import axios from 'axios';
//支出图标
import { SkinOutlined, ShoppingCartOutlined, HomeOutlined, ForkOutlined, CarOutlined ,
    DesktopOutlined, GlobalOutlined, CoffeeOutlined} from '@ant-design/icons';
//收入图标
import { RiseOutlined, StockOutlined, LineChartOutlined, DollarCircleOutlined, EuroCircleOutlined ,
    GiftOutlined, TransactionOutlined} from '@ant-design/icons';

import AddingPageUI from './AddingPageUI';
import store from '../../store';
import { useHistory } from 'react-router';
import { Alert } from 'antd';

const AddingPage = () => {
    //Ant-Design LOGO
    const categoryTypes = [
        [
            {
                'name': '服饰',
                'iconName': SkinOutlined
            }, {
                'name': '餐饮',
                'iconName': CoffeeOutlined
            }, {
                'name': '房租',
                'iconName': HomeOutlined
            }, {
                'name': '旅行',
                'iconName': GlobalOutlined
            }, {
                'name': '医疗',
                'iconName': ForkOutlined
            }, {
                'name': '交通',
                'iconName': CarOutlined
            }, {
                'name': '购物',
                'iconName': ShoppingCartOutlined
            }, {
                'name': '学习',
                'iconName': DesktopOutlined
            }   
        ],[
            {
                'name': '工资',
                'iconName': DollarCircleOutlined
            }, {
                'name': '兼职',
                'iconName': GiftOutlined
            }, {
                'name': '理财',
                'iconName': LineChartOutlined
            }, {
                'name': '基金',
                'iconName': StockOutlined
            }, {
                'name': '股票',
                'iconName': RiseOutlined
            }, {
                'name': '期货',
                'iconName': GiftOutlined
            }, {
                'name': '黄金',
                'iconName': TransactionOutlined
            }, {
                'name': '其他',
                'iconName': EuroCircleOutlined
            }
        ]
    ]
    const billTypes_add = [
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
    const transtion = {}

    billTypes_add.forEach((item, idx) => {
        transtion[item] = idx
    })

    //用状态存放确认返回的数据
    let d = new Date()
    const [index, setIndex] = useState(0)
    const [money, setMoney] = useState(0)
    const [type, setType] = useState(0)
    const [memo, setMemo] = useState('')
    //新增默认日期
    const [year, setYear] = useState(d.getFullYear())
    const [month, setMonth] = useState(d.getMonth() + 1)
    const [day, setDay] = useState(d.getDate())
    const [category, setCategory] = useState(0)
    //把添加的数据打包成data
    // const [data, setData] = useState({})
    let data = {}

    //选择的是第几个图标
    //为什么idx能打印，却不能用来获取数据结构中idx下面的值
    //通过函数把item.name的值传回来父组件
    const chooseItem = ([idx, name]) => {
        setIndex(idx)
        // console.log(name);
        setCategory(transtion[name])
    }

    //切换收入支出
    const typeChange = (value) => {
        setType(parseInt(value))
    }

    //监听输入，改变money
    const numberChange = (value) => {
        setMoney(value)
        
    }

    //监听memo，改变memo状态
    const MemoChange = (e) => {
        setMemo(e.target.value)
    }

    //监听date
    const getDate = (e, date) => {
        console.log(date);
        console.log(date.slice(0,4));
        console.log(date.slice(5, 7));
        console.log(date.slice(8,10));
        setYear(date.slice(0,4))
        setMonth(date.slice(5, 7))
        setDay(date.slice(8, 10))
    }

    //页面跳转
    const history = useHistory()
    
    //把当前页的数据同步到data中
    const confirm = () => {

        let id=new Date().getTime()
        data = {
            "id": id,
            "money": money,
            //!!!!!!类型
            "type": category,
            "in_out": type,
            "memo": memo,
            "date": {
                "year": parseInt(year),
                "month": parseInt(month),
                "day": parseInt(day)
            }
        }
        console.log(data);
        //新增表单判空
        if (data.money === 0) {
            alert('请输入收支金额')
        } else {
            
            
            axios.post(
                'https://qcw4cy.fn.thelarkcloud.com/addData',
                {
                    'userName':store.getState().userName,
                    "item":data
                }
                )
            .then(res=>{
                if(res.data.isAdd){
                    console.log("添加成功")
                    const action = {
                        type: 'submitData',
                        value: data
                    }
                    store.dispatch(action)
                    history.push('/Statistics')
                }
            })

            
        }
        
    }

        //新增默认日期为当天
        const getDate_add = () => {
            var Dates = new Date();
            var Y = Dates.getFullYear();
            var M = Dates.getMonth() + 1;
            var D = Dates.getDate();
            var times = Y + (M < 10 ? "-0" : "-") + M + (D < 10 ? "-0" : "-") + D;
            return times          
        }
    
    return (
        <div>
            <AddingPageUI 
                //传递图标到数据给UI渲染
                categoryTypes = {categoryTypes}
            
                //获取被选中图标到index
                index = {index}
                //更新选择支出项目都类型
                chooseItem = {chooseItem}
                // 根据选择收入/支出跳转到相应添加到页面
                typeChange = {typeChange}
                type = {type}
                // 获取消费金额
                numberChange = {numberChange}
                //获取日期
                getDate = {getDate}
                //获取Memo到内容
                MemoChange = {MemoChange}
                confirm = {confirm}
                
                //新增默认日期为当天
                getDate_add = {getDate_add}
            />
        </div>
    )
}





export default AddingPage;