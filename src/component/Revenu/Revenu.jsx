import Navbar from "../Navbar/navbar"
import classes from "./Revenu.module.css"
//import { Link } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import api from '../../redux/axois';
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";


const UserData = [
    {
      id: 1,
      year: 2016,
      userGain: 80000,
      userLost: 823,
    },
    {
      id: 2,
      year: 2017,
      userGain: 45677,
      userLost: 345,
    },
    {
      id: 3,
      year: 2018,
      userGain: 78888,
      userLost: 555,
    },
    {
      id: 4,
      year: 2019,
      userGain: 90000,
      userLost: 4555,
    },
    {
      id: 5,
      year: 2020,
      userGain: 4300,
      userLost: 234,
    },
  ];

function Revenu()  {
    const token = localStorage.getItem('token')
    const [orders,setOrders] = useState({})    
    const [items,setItems] = useState([])
    const [chart,setChart] = useState()
    const [renevu,setRenevu] = useState({})
    const [userData, setUserData] = useState({
        labels: UserData.map((data) => data.year),
        datasets: [
          {
            label: "Thống kê đơn hàng",
            data: UserData.map((data) => data.userGain),
            // backgroundColor: [
            //   "rgba(75,192,192,1)",
            //   "#ecf0f1",
            //   "#50AF95",
            //   "#f3ba2f",
            //   "#2a71d0",
            // ],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      });
    
    
    useEffect(() => {
        async function getData(){
          const res = await api.get("/orders/dashboard",
            {
            headers: {
                Access_token: token,
            }
            }
          )
          return res.data 
        }
        getData().then((res) => {
            console.log(res)
            setItems(res.itemList)
            setOrders(res.info)
            setChart(res.chart)
            setRenevu(res.revenue)
        })
        getData().catch((err) => {
          console.log(err)
        })
    },[])
    console.log(chart)
    
    


    

    return(
        <div className={classes["container"]}>
            <Navbar/>
            <h1 className={classes['title-name']}>Thống kê doanh thu</h1>
            <div className={classes['container-total']}>
                <div>
                    <div className={classes['items__renevu']}>
                        <h2>Doanh Thu Hôm Nay</h2>
                        <p>{renevu.totalDay}</p>
                    </div>
                    <div className={classes['icon_shopping']}>
                        <i class="fa-solid fa-cart-shopping"></i>
                    </div>
                </div>
                <div>
                    <div className={classes['items__renevu']}>
                        <h2>Doanh Thu Tháng Này</h2>
                        <p>{renevu.totalMonth}</p>
                    </div>
                    <div className={classes['icon_gift']}>
                        <i class="fa-solid fa-gift"></i>
                    </div>
                </div>
                <div>
                    <div className={classes['items__renevu']}>
                        <h2>Tổng Đơn Hôm Nay</h2>
                        <p>{renevu.countOrderDay}</p>
                    </div>
                    <div className={classes['icon_truck']}>
                    <i class="fa-sharp fa-solid fa-truck"></i>
                    </div>
                </div>
                <div>
                    <div className={classes['items__renevu']}>
                        <h2>Tổng Đơn Trong Tháng</h2>
                        <p>{renevu.countOrderMonth}</p>
                    </div>
                    <div className={classes['icon_money']}>
                        <i class="fa-solid fa-money-bill"></i>
                    </div>
                </div>
            </div>
            <div className={classes['container__chart']}>
                <div className={classes["form-chart"]}>
                    <Line data={userData} />
                </div>
                <div className={classes["best__selling"]}>
                    <div className={classes['best__selling-title']}>
                        <p>Selling</p>
                        <i class="fa-solid fa-mug-saucer"></i>
                    </div>
                    {items.map((item) =>{
                        return(
                        <div></div>
                    )})}
                    <div className={classes['best__selling-items']}>
                        {items.map((item) =>{
                            return(
                            <div className={classes['list__items']} >
                                <h3>{item.name}</h3>
                                <p>số lượng:{item.sold} giá:{item.total}</p>
                            </div>
                        )})}
                        {/* <div className={classes['list__items']} >
                            <h3>Hồng Trà Sữa Thái Đỏ</h3>
                            <p>Số Lượng: 150</p>
                        </div>
                        <div className={classes['list__items']} >
                            <h3>Trà Sữa Trân Châu</h3>
                            <p>Số Lượng: 250</p>
                        </div>
                        <div className={classes['list__items']} >
                            <h3>Bánh Ngọt</h3>
                            <p>Số Lượng: 100</p>
                        </div> */}
                    </div>
                </div>
            </div>
            <div className={classes["total__order"]}>
                <div className={classes["total__order-title"]}>
                    <p>Đơn Hàng</p>
                    <i class="fa-sharp fa-solid fa-file-invoice"></i>
                </div>
                <div className={classes["info__order"]}>
                    <div className={classes["info__order-title"]}>
                        <h4>Tổng đơn</h4>
                        <p>{orders.total}</p>
                    </div>
                    <div className={classes["info__order-items"]}>
                        <div>
                            <h6>Chưa Xác Nhận</h6>
                            <p>{orders.un_confirm}</p>
                        </div>
                        <div>
                            <h6>Đã Xác Nhận</h6>
                            <p>{orders.confirmed}</p>
                        </div>
                        <div>
                            <h6>Đã Huỷ</h6>
                            <p>{orders.canceled}</p>
                        </div>
                        <div>
                            <h6>Đang Giao</h6>
                            <p>{orders.delivering}</p>
                        </div>
                        <div>
                            <h6>Hoàn Thành</h6>
                            <p>{orders.finished}</p>
                        </div>
                    </div>
                </div>
            </div>


            <div className={classes["add"]}>

            </div>
        </div>
    )
}

export default Revenu;