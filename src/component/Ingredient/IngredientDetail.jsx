import React from "react";
import classes from './ingredientDetail.module.css'
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



const IngredientDetail = () => {
    
    const token = localStorage.getItem('token')
    const [items,setItems] = useState([])
    const [error, setError] = useState("")
    const navigate = useNavigate();
    const {id_ingredient} = useParams();
    

    useEffect(() => {
        
        async function getData(){
          const res = await api.get(`/items/detail/${id_ingredient}`)
          return res
        }
        getData().then((res) => {
          setItems(res.data.item[0])
        })
        getData().catch((err) => {
          console.log(err)
        })
        console.log(1)
      },[id_ingredient])
    
      
      
        /*    handleChange= (e) => {
            console.log("change")
            let track= items; // <-- track is reference to state
            track[e.target.name]=e.target.value; // <-- state mutation!
            setItems(track); // <-- save state reference back into state
            // console.log(items)
          } */

          const handleChange= (e) => {
            setItems(items => ({
              ...items,
              [e.target.name]: e.target.value
            }));
        }


      const handleSubmit = (e) =>{
        e.preventDefault();

        try{
        {
            api.put(`/ingredients/update/${id_ingredient}`, items,
                {
                    headers: {
                        Access_token: token,
                    }
                }
            )
            .then(res =>{
                toast.success('Cập nhật thành công', {
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
                    navigate('/ingredient')
                }, 2000);
            })
            .catch(err =>{
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
            console.log(error);
        }
        
    }

    return (
        <div>
            <Link to="/ingredient" className={classes["back-icon"]}>
                <i class="fa-solid fa-chevron-left"></i>
                <h>Quay lai</h>
            </Link>
            <div className={classes["container"]}>
                <div className={classes["form-main"]}>
                    <h1>{"Thêm mới nguyên liệu"}</h1>
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
                        
                        <Input
                            type="text"
                            name="id_type"
                            label="Loại thức ăn"
                            placeholder="Nhập số loại thức ăn "
                            required={true}
                            readOnly
                            value={items.name_type}
                            //onChange={handleChange}
                        />
                        <Input
                            type="number"
                            name="quantity"
                            label="Số lượng"
                            placeholder="Nhập số lượng "
                            required={true}
                            value={items.quantity}
                            onChange={handleChange}
                        />
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
                            Cập Nhật</button>
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

export default IngredientDetail;