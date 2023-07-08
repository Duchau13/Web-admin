import React from "react";
import classes from './NewItem.module.css'
import Input from "../Input/Input";
import { Link } from "react-router-dom";
//import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import { useParams } from "react-router-dom";
import { useState } from "react";
import api from "../../redux/axois"
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';


const NewItem = () => {

    const token = localStorage.getItem('token')
    const [items,setItems] = useState({
        name: "",
        image:"",
        id_type: "",
        price: 0,
    })
    const navigate = useNavigate();
    //const {id} = useParams();
    const [error, setError] = useState("")


    
    console.log(items);
    //console.log(items[0]);
    


    const handleSubmit = (e) =>{
        e.preventDefault();

        try{
        {
            api.post('/items/create', items,
                {
                    headers: {
                        Access_token: token,
                    }
                }
            )
            .then(res =>{
                toast.success('Thêm Mới Thành Công', {
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
    console.log(error)
    const handleChange = (e) => {
        
        const itemsClone = {...items};
        itemsClone[e.target.name] = e.target.value;
        setItems(itemsClone);
    
    }

    

    return (
        <div>
            <Link to="/" className={classes["back-icon"]}>
                <i class="fa-solid fa-chevron-left"></i>
                <h>Quay lai</h>
            </Link>
            <div className={classes["container"]}>
                <div className={classes["form-main"]}>
                    <h1>Thêm mới thức ăn</h1>
                    <p className={classes["text-err"]}>{error}</p>
                    <form action="" className={classes["add-form"]}>
                        
                        <Input
                            name="name"
                            label="Tên thức ăn"
                            placeholder="Nhập tên thức ăn"
                            required={true}
                            value={items.name}
                            onChange={handleChange}
                        />
                        
                        <Input
                            name="image"
                            label="Ảnh"
                            placeholder="Nhập đường dẫn hình ảnh"
                            required={true}
                            value={items.image}
                            onChange={handleChange}
                        />
                        
                        <select name="id_type" onChange={handleChange}>
                            <option value=""></option>
                            <option value="1">Trà sữa</option>
                            <option value="2">Đồ ăn nhẹ</option>
                            <option value="3">Bánh ngọt</option>
                            <option value="4">Topping</option>
                        </select>
                        <Input
                            type="number"
                            name="price"
                            label="Giá"
                            placeholder="Nhập Giá "
                            required={true}
                            value={items.price}
                            onChange={handleChange}
                        />
                        
                        <button className={classes['button-submit']}
                                onClick={handleSubmit}
                        >
                            Thêm mới
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
export default NewItem;