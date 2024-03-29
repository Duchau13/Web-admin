import React from "react";
import classes from './NewItem.module.css'
import Input from "../Input/Input";
import { Link } from "react-router-dom";
//import { useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
//import { useParams } from "react-router-dom";
import { useState } from "react";
import api from "../../redux/axois"
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';


const ItemQuantity = () => {

    const token = localStorage.getItem('token')
    const [items,setItems] = useState()
    const navigate = useNavigate();
    const { id } = useParams();
    const [error, setError] = useState("")
    console.log(id)
    
    const handleSubmit = (e) =>{
        e.preventDefault();

        try{
        {
            api.post(`items/${id}`, {
                quantity: items
            },
                {
                    headers: {
                        Access_token: token,
                    }
                }
            )
            .then(res =>{
                toast.success('Chế Biến Thành Công', {
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
                    navigate('/')
                }, 2000);
            })
            .catch(err =>{
                console.log(err)
                toast.error(`${err.response.data.message}`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });;
            })
        }
        
        }catch(error){
            console.log(error.response.data);
        }
        
    }
    console.log(items)
    const handleChange = (e) => {
        
        // const itemsClone = {...items};
        // itemsClone[e.target.name] = e.target.value;
        setItems(e.target.value);
    
    }

    

    return (
        <div>
            <Link to="/ingredient   " className={classes["back-icon"]}>
                <i class="fa-solid fa-chevron-left"></i>
                <h>Quay lai</h>
            </Link>
            <div className={classes["container"]}>
                <div className={classes["form-main"]}>
                    <h1>Chế Biến</h1>
                    <p className={classes["text-err"]}>{error}</p>
                    <form action="" className={classes["add-form"]}>
                        
                        <Input
                            name="quantity"
                            label="số lượng"
                            placeholder="Nhập số lượng nguyên liệu"
                            required={true}
                            onChange={handleChange}
                        />
                        <button className={classes['button-submit']}
                                onClick={handleSubmit}
                        >
                            Chế Biến
                        </button>
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
};
export default ItemQuantity;