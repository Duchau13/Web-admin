import React from "react";
import classes from './ingredientDetail.module.css'
import Input from "../Input/Input";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";
import api from "../../redux/axois"
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';



const RepiceIngredient = () => {
    
    const token = localStorage.getItem('token')
    const [items,setItems] = useState([])
    const [unproces,setUnproces] = useState()
    const [repices,setRepices] = useState([])
    const [quantity,setQuantity] = useState()
    const [error, setError] = useState("")
    const navigate = useNavigate();
    const {id_ingredient} = useParams();
    

    useEffect(() => {
        
        async function getData(){
          const res = await api.get(`/recipes/ingredient/${id_ingredient}`,{
            headers: {
                Access_token: token,
            },
          })
          return res
        }
        getData().then((res) => {
            setRepices(res.data.itemList)
        })
        getData().catch((err) => {
          console.log(err)
        })
        console.log(1)
    },[])
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
    const handleChangeUnproces = (e) => {
        setUnproces(e.target.value)
    }
    
    const handleChangeQuantity = (e) => {
        setQuantity(e.target.value)
    }
    console.log(quantity,id_ingredient,unproces)
    const handleSubmit = (e) =>{
        e.preventDefault();

        try{
        {
            api.post('recipes/ingredient/create', {
                id_ingredient:id_ingredient,
                id_u_ingredient:unproces,
                quantity:quantity
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
                    navigate('/ingredient')
                }, 2000);
            })
            .catch(err =>{
                console.log(err)
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
            console.log(error.response.data);
        }
        
    }
      
      
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



        

    return (
        <div>
            <Link to="/ingredient" className={classes["back-icon"]}>
                <i class="fa-solid fa-chevron-left"></i>
                <h>Quay lai</h>
            </Link>
            <div className={classes["container"]}>
                <div className={classes["form-main"]}>
                    <h1>Công thức sản phẩm</h1>
                    <p className={classes["text-err"]}>{error}</p>
                    <form action="" className={classes["add-form"]}>
                    {repices.map((repice =>{
                            return (
                                <div className={classes["repice"]}>
                                    <h6>{repice.name}</h6>
                                    <p>Số Lượng :{repice.quantity}</p>
                                {/* <Input
                                    name="name"
                                    label="Tên thực phẩm"
                                    placeholder="Nhập tên thức ăn"
                                    required={true}
                                    value={repice.name}
                                />
                                <Input
                                    name="quantity"
                                    label="Số lượng"
                                    placeholder="Nhập tên thức ăn"
                                    required={true}
                                    value={repice.quantity}
                                /> */}
                                </div>
                            )
                        }))}
                    </form>
                    <h1>Thêm nguyên liệu</h1>
                            <select name="lang" id="lang-select" multiple onChange={handleChangeUnproces} className={classes["set__payment"]}>
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

export default RepiceIngredient;