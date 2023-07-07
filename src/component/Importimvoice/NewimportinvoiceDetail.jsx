import React from "react";
import classes from './NewimportinvoiceDetail.module.css'
import Input from "../Input/Input";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextArea from "../Input/TextArea"
import { useParams } from "react-router-dom";
import { useState } from "react";
import api from "../../redux/axois"
import axios from "axios";
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';



const NewimportinvoiceDetail = () => {
    
    const token = localStorage.getItem('token')
    const [items,setItems] = useState([])
    const [idingredient,setIderedient] = useState()
    const [quantity,setQuantity] = useState()
    const [price,setPrice] = useState()
    const [error, setError] = useState("")
    const navigate = useNavigate();
    const { id_i_invoice } = useParams();
    

    useEffect(() => {
        
        async function getData(){
          const res = await api.get(`/unprocessedingredients`,{
            headers: {
                Access_token: token,
            },
          })
          return res
        }
        getData().then((res) => {
            setItems(res.data.itemList)
        })
        getData().catch((err) => {
          console.log(err)
        })
        console.log(1)
    },[])
    
    console.log(id_i_invoice)  
      
      

          


    const handleSubmit = (e) =>{
        e.preventDefault();

        try{
        {
            api.post(`/importinvoicedetails`, {
                quantity:quantity,
                id_i_invoice: id_i_invoice,
                id_u_ingredient: idingredient,
                unit_price:price
            },
                {
                    headers: {
                        Access_token: token,
                    }
                }
            )
            .then(res =>{
                toast.success('Thêm thành công', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setTimeout(() => {
                    navigate(`/importinvoices/${id_i_invoice}`)
                }, 2000);
            })
            .catch(err =>{
                setError(err.response.data.message)
                toast.error(<div>{error}</div>, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })
            
        }
        
        }catch(error){
            console.log(error);
        }
        
    }
    const handleChangeIngre = (e) => {
        setIderedient(e.target.value)
    }
    
    const handleChangeQuantity = (e) => {
        setQuantity(e.target.value)
    }
    const handleChangePrice = (e) => {
        setPrice(e.target.value)
    }
    console.log(id_i_invoice,idingredient,quantity,price)
    
    return (
        <div>
            <Link to={`/importinvoices/${id_i_invoice}`} className={classes["back-icon"]}>
                <i class="fa-solid fa-chevron-left"></i>
                <h>Quay lai</h>
            </Link>
            <div className={classes["container"]}>
                <div className={classes["form-main"]}>
                    <h1>Thêm nguyên liệu</h1>
                            <select name="lang" id="lang-select" multiple onChange={handleChangeIngre}  className={classes["set__payment"]}>
                            {items.map((item) => {
                            return(
                                <option value={item.id_u_ingredient}>
                                {item.name}
                                </option>
                            )})}   
                            </select>
                        <Input
                            name="quantityitem"
                            label="Số lượng"
                            placeholder="Nhập số lượng"
                            required={true}
                            onChange={handleChangeQuantity}  
                        />
                        <Input
                            name="price"
                            label="Giá"
                            placeholder="Nhập giá nguyên liệu"
                            required={true}
                            onChange={handleChangePrice}  
                        />
                        <button className={classes['button-submit']}
                            onClick={handleSubmit}
                        >
                            Thêm mới
                        </button>
                       
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

export default NewimportinvoiceDetail;