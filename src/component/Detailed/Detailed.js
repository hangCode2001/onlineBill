import {React,Component} from 'react';
import 'antd/dist/antd.css'
import "./detailed.css"
import echarts from "echarts"
import axios from "axios"
import DetailedUi from "./DetailedUi"
import store from "../../store"

const billtypes = [
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
]

class Detailed extends Component {
  constructor(props) {
    super(props);
    let dateString=((new Date()).getFullYear().toString())+'-'
    dateString+=(new Date().getMonth()+1)>=10?(new Date().getMonth()+1).toString():'0'+(new Date().getMonth()+1).toString()
    let year=parseInt(dateString.split('').splice(0,4).join(''))
    let month=parseInt(dateString.split('').splice(5,2).join(''))
    this.state = { 
      date:{
        year,month
      },
      itemList:[]
     }
   
    this.getItemList=this.getItemList.bind(this)
    this.getChart=this.getChart.bind(this)
    this.changeDate=this.changeDate.bind(this)
    //订阅store的变化
    //变化时直接改变渲染
    store.subscribe(this.getItemList)
  }

  render() { 
    return ( 
      <DetailedUi
        changeDate={this.changeDate}
        itemList={this.state.itemList}
      ></DetailedUi>

     );
  }
  //把store数据转化为排序后的可渲染的数据
  getItemList(){
    let date=this.state.date
    let billItems = store.getState().billItems;
    let itemList=new Array(16)
    //给itemList赋初值
    for(let i=0;i<16;i++){
      let obj={
        name:i,
        value:0
      }
      itemList[i]=obj
    }
    console.log(billItems)
    for (const i of billItems) {
      if(i.date.year===date.year&&i.date.month===date.month)
      itemList[i.type].value+=i.money;
    }
    //金额排序
    itemList.sort(function(itema,itemb){
      return itemb["value"]-itema["value"]
    })
    itemList=itemList.filter((i)=>{
      if(i.value!==0)return true;
      return false;
    })
    
    for(let i=0;i<itemList.length;i++){
      itemList[i].name=billtypes[itemList[i].name]
    }
    
    this.setState({
      itemList
    },this.getChart)
    
  }
  //根据数据渲染饼图
  getChart(){
    let myChart = echarts.init(document.getElementById('myechart'));
      let option={
        series : [

        {
            name: '访问来源',
            type: 'pie',    // 设置图表类型为饼图
            radius: '80%',  // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
            data:this.state.itemList,

            label:{
              normal: {
                position:'outside',
                show:true,
                formatter:'{b}{d}%'
              }
            }
        }
     ]
    }
    myChart.setOption(option)
  }
  //更改日期的时候
  changeDate(date){
    this.setState({
      date
    },this.getItemList)
  }
  
  //进入页面时渲染
  componentDidMount(){
    this.getItemList()
  }
}

export default Detailed;



