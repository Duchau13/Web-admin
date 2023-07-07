import React from "react";
import {useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/navbar";
import api from '../../redux/axois';
import classes from './Importimvoice.module.css'

const Importimvoice = () => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate();

    const [orders,setOrders] = useState([])

    const getOrders = async() => {
        const res = await api.get("/importinvoices",{
            headers: {
                access_token: token
            }
        })
        return res
    }
    useEffect(() => {
      
        getOrders().then((res) => {
          setOrders(res.data.importInvoiceList)
          console.log(res)
        })
        getOrders().catch((err) => {
          console.log(err)
        })
    },[])

    //console.log(orders)
    return (
        <div>
        <Navbar/>
        <div className={classes["container"]}>
            <div className={classes["title"]}>
                <h1>Danh Sách Hoá Đơn Nhập</h1>
            </div>
            <div className={classes["button-add"]} onClick={() => navigate("/importinvoice/new")}>
                <button>Tạo hoá đơn nhập</button>
            </div>
            {orders.map((order) =>{
            return(
            <div className={classes["container__orders"]}>
            <div className={classes["cart-item"]} key={order.id_i_invoice}>
                <div className={classes["name-item"]}>
                    <p onClick={() => navigate(`/importinvoices/${order.id_i_invoice}`)}> 
                        Đơn hàng ngày: {order.datetime}
                    </p>
                </div>
                <div className={classes["price"]}>
                    <p>Nhân Viên : {order.name_staff}</p>
                </div>
                <div className={classes["price"]}>
                    <p>Mô tả : {order.description}</p>
                </div>
                <div className={classes["total-price"]}>
                    <p>Nhà Cung Cấp : {order.name_provider}</p>
                </div>
            </div>
            <hr></hr>
            </div>
            )})}
        </div>
        </div>
    )
}

export default Importimvoice