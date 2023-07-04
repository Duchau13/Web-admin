import Navbar from "../Navbar/navbar"
import classes from "./Revenu.module.css"
//import { Link } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import api from '../../redux/axois'



function Revenu()  {
    const token = localStorage.getItem('token')
    const [revenu,setRevenu] = useState([])    
    const [items,setItems] = useState([])
    const [fromday,setFromday] = useState()
    const [today,setToday] = useState()
    
    

    useEffect(() => {
        async function getData(){
          const res = await api.get("/orders/thongke",
            {
            headers: {
                Access_token: token,
            }
            }
          )
          return res.data 
        }
        getData().then((res) => {
          setRevenu(res)
          setItems(res.itemList)
        })
        getData().catch((err) => {
          console.log(err)
        })
    },[])
      console.log(items)
    const handleChange1 =(e) => {
        setFromday(e.target.value)
    }
    const handleChange2 =(e) => {
        setToday(e.target.value)
    }
    
    const fetchData = async () => {
        const res = await api.get(`/orders/thongke?tuNgay=${fromday}&denNgay=${today}`,
        {
            headers: {
                Access_token: token,
            }
        }
        )
        const data = res.data;
        return data;
        
    }
    
    
    const handlePgaeclick = async (data) => {
        //let currentPage = data.selected +1;
        const currentData = await fetchData();
        console.log(currentData)
        setItems(currentData.itemList)
        setRevenu(currentData)
        
    }

    

    return(
        <div>
            <Navbar/>
            <h1 className={classes['title-name']}>Thống kê doanh thu</h1>
            <div className={classes['container-total']}>
                <div className={classes['total-revenu']}>
                    <p>Tổng doanh thu: {revenu.total}</p>
                </div>
                <div className={classes['form-search']}>
                <input type="date"
                    onChange={handleChange1} 
                />
                <p>Đến ngày</p>
                <input type="date"
                    onChange={handleChange2} 
                />
                <button
                    onClick={handlePgaeclick}
                >
                    Tìm kiếm
                </button>
                </div>
            </div>
            <div className={classes["form-items"]}>
                <h3>Sản phẩm đã bán</h3>
                    {items.map((item =>{
                            return (
                                <div key={item.id_item}>
                                <div className={classes["items-details"]} key={item.id_item}> 
                                    <p>{item.name}</p>
                                    <p>Đơn giá: {item.price} </p>
                                    <p>Số lượng: {item.sold}</p>
                                    <p>Tổng tiền : {item.total}</p> 
                                    <hr></hr>
                                </div>
                                <hr />
                                </div>
                        
                            )
                    }))}
            </div>
        </div>
    )
}

export default Revenu;