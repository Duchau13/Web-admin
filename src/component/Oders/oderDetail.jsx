import classes from './oderDetail.module.css'
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import api from '../../redux/axois'
import { useNavigate,useParams } from "react-router-dom";
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';


const OderDetail = () => {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')
    const [order, setOrder] = useState([])
    const [items, setItems] = useState([])
    const navigate = useNavigate();
    const {id_order} = useParams();

   /* useEffect(()=>{
        if(!localStorage.getItem('token')){
            navigate("/login")
        }
  
      })
    */
   console.log(token)
    useEffect(() => {
        async function getData(){
          const res = await api.get(`/orders/detail/${id_order}`,
            {
            headers: {
                Access_token: token,
            }
            }
          )
          return res.data;
        }
        getData().then((res) => {
          setOrder(res.info)
          setItems(res.itemList)
          console.log(res)
        })
        getData().catch((err) => {
          console.log(err)
        })
    },[])

      //console.log(oder)
      //console.log(items)
      
      console.log(role)
    const handleConfirm = (id_order) => {
        console.log(id_order)
        if(role==="3"){
        try{
            api.get(`/orders/confirm/${id_order}`,
            {
            headers: {
                Access_token: token,
            }})
            toast.success('Tạo báo cáo thành công', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setTimeout(() => {
                navigate('/orders')
            }, 2000);
        }
        catch(err){
            console.log(err);
            toast.error('Thao tác thất bại', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        }else{
            toast.error('Bạn không có quyền sử dụng chức năng này', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        // navigate('/oders')
      }
    const handleCancle = () => {
        api.get(`/orders/cancel/${id_order}`,
        {
        headers: {
            Access_token: token,
        }
        }
        )
        navigate('/oders')
    }
    function Status(id) {
        if(order.status===0){
            return(
                <div className={classes['container-button']} >
                    <button 
                        className={classes['confirm-button']}
                        onClick={() => handleConfirm(id.id)}
                    >
                        Xác Nhận
                    </button>
                    <button 
                        className={classes['cancle-button']}
                        onClick={handleCancle}
                    >
                        Huỷ đơn hàng
                    </button>
                </div>
            )
        }
        if(order.status===1){
            return <p className={classes['text-confirm']} >Đã xác nhận </p>
        }
        else{
            return <p className={classes['text-cancle']}>Đã huỷ</p>
        }
    }

    return (
        <div>
            <Link to="/oders" className={classes["back-icon"]}>
                <i class="fa-solid fa-chevron-left"></i>
                <h>Quay lai</h>
            </Link>
            <div className={classes["container"]}>
                <h1>Chi tiết đơn đặt hàng</h1>
                <div className={classes["form-main"]}>
                    
                    <form action="" className={classes["add-form"]}> 
                    <h3>Thông tin thức ăn</h3>
                    {items.map((item =>{
                            return (
                                <div key={item.id_item}>
                                <div className={classes["items-details"]} key={item.id_item}> 
                                    <p>{item.name}</p>
                                    <p>Đơn giá: {item.price} </p>
                                    <p>Số lượng: {item.quantity}</p>
                                    <p>Tổng tiền : {item.amount}</p> 
                                    <hr></hr>
                                </div>
                                <hr />
                                </div>
                        
                            )
                    }))}
                        <h3>Thông tin thanh toán</h3>
                        <div className={classes['info-payment']}>
                            <p>Tên khách hàng: {order.name_customer}</p>
                            <p>Số điện thoại khách hàng: {order.phone}</p>
                            <p>Thời gian đặt hàng: {order.time_order}</p>
                            <p>Tổng giá trị đơn hàng: {order.total}</p>
                            <p>Phương thức thanh toán : {order.name_payment}</p>
                            <h5>Trạng thái đơn hàng: <Status id = {order.id_order}/></h5>
                        </div>
                    </form>
                       
                </div>
            </div>
            <ToastContainer 
                position="top-right"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    )
}

export default OderDetail;

