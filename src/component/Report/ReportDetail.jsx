import Navbar from "../Navbar/navbar"
import classes from "./ReportDetail.module.css"
//import { Link } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

function ReportDetail()  {
    const token = localStorage.getItem('token')
    const {id_report} = useParams();   
    const [items,setItems] = useState([])
    const [renevu,setRenevu] = useState({})
    
    
    
    useEffect(() => {
        async function getData(){
          const res = await api.get(`/reports/detail/${id_report}`,
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
            setRenevu(res.report)
        })
        getData().catch((err) => {
          console.log(err)
        })
    },[])
    console.log(items)
    
    


    

    return(
        <div className={classes["container"]}>
            <Navbar/>
            <h1 className={classes['title-name']}>Thống kê Báo Cáo</h1>
            <div className={classes['container-total']}>
                <div>
                    <div className={classes['items__renevu']}>
                        <h2>Cửa Hàng</h2>
                        <p>{renevu.name_store}</p>
                    </div>
                    <div className={classes['icon_shopping']}>
                        <i class="fa-solid fa-cart-shopping"></i>
                    </div>
                </div>
                <div>
                    <div className={classes['items__renevu']}>
                        <h2>Ngày Lập</h2>
                        <p>{renevu.date}</p>
                    </div>
                    <div className={classes['icon_gift']}>
                        <i class="fa-solid fa-gift"></i>
                    </div>
                </div>
                <div>
                    <div className={classes['items__renevu']}>
                        <h2>Tổng Đơn Hàng</h2>
                        <p>{renevu.countOrder}</p>
                    </div>
                    <div className={classes['icon_truck']}>
                    <i class="fa-sharp fa-solid fa-truck"></i>
                    </div>
                </div>
                <div>
                    <div className={classes['items__renevu']}>
                        <h2>Doanh Thu</h2>
                        <p>{renevu.revenue}</p>
                    </div>
                    <div className={classes['icon_money']}>
                        <i class="fa-solid fa-money-bill"></i>
                    </div>
                </div>
            </div>
            <div className={classes['container__chart']}>
                <div className={classes["best__selling"]}>
                    <div className={classes['best__selling-title']}>
                        <p>Selling</p>
                        <i class="fa-solid fa-mug-saucer"></i>
                    </div>
                    
                    <div className={classes['best__selling-items']}>
                        {items.map((item) =>{
                            return(
                            <div className={classes['list__items']} >
                                <h3>{item.name_item}</h3>
                                <p>số lượng:{item.sold} </p>
                                <p>giá :{item.total}</p>
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
           


            <div className={classes["add"]}>

            </div>
        </div>
    )
}

export default ReportDetail;