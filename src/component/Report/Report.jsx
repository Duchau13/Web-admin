import React from "react";
import {useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/navbar";
import api from '../../redux/axois';
import classes from './Report.module.css'

const Repost = () => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate();

    const [orders,setOrders] = useState([])

    const getOrders = async() => {
        const res = await api.get("/reports",{
            headers: {
                access_token: token
            }
        })
        return res
    }
    useEffect(() => {
      
        getOrders().then((res) => {
          setOrders(res.data.itemList)
          console.log(res)
        })
        getOrders().catch((err) => {
          console.log(err)
        })
    },[])

    //console.log(orders)
    function Status(e) {
        const order = e.value
        //console.log(order)
        if(order==0){
            return(    
                <p className={classes['text-wait']} >Chưa xác nhận </p>   
            )
        }
        if(order==2){
            return ( 
                <p className={classes['text-cancel']} >Đã Huỷ </p>
        )}
        else{
            return (
                <p className={classes['text-confirm']} >Đã xác nhận </p>
        )}
    }
    return (
        <div>
        <Navbar/>
        <div className={classes["container"]}>
            <div className={classes["title"]}>
                <h1>Danh Sách Báo Cáo</h1>
            </div>
            {orders.map((order) =>{
            return(
            <div className={classes["container__orders"]}>
            <div className={classes["cart-item"]} key={order.id_report}>
                <div className={classes["name-item"]}>
                    <p onClick={() => navigate(`/report/detail/${order.id_report}`)}> 
                        Đơn hàng ngày: {order.date}
                    </p>
                </div>
                <div className={classes["price"]}>
                    <p>Chi Nhánh : {order.name_store}</p>
                </div>
                <div className={classes["price"]}>
                    <p>Số Đơn Hàng : {order.countOrder}</p>
                </div>
                <div className={classes["total-price"]}>
                    <p>Tổng Thu Nhập : {order.revenue}</p>
                </div>
            </div>
            <hr></hr>
            </div>
            )})}
        </div>
        </div>
    )
}

export default Repost