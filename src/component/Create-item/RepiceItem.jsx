import React from "react";
import classes from './NewItem.module.css'
import Input from "../Input/Input";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextArea from "../Input/TextArea"
import { useParams } from "react-router-dom";
import { useState } from "react";
import api from "../../redux/axois"
import axios from "axios";



const RepiceItem = () => {
    
    const token = localStorage.getItem('token')
    const [items,setItems] = useState([])
    const [ingredient,setIngredient] = useState([])
    const [idingredient,setIderedient] = useState()
    const [quantity,setQuantity] = useState()
    const [repices,setRepices] = useState([])
    const [error, setError] = useState("")
    const navigate = useNavigate();
    const {id} = useParams();
    

    useEffect(() => {
        
        async function getData(){
          const res = await api.get(`/items/detail/${id}`)
          return res
        }
        getData().then((res) => {
            console.log(res)
            setItems(res.data.item[0])
        })
        getData().catch((err) => {
          console.log(err)
        })
        console.log(1)
    },[id])
    useEffect(() => {
        
        async function getData(){
          const res = await api.get(`/recipes/item/${id}`,{
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
    },[id])
    const getData = async() => {
        const res = await api.get("/ingredients",{
            headers: {
                Access_token: token,
            },
        })
        return res;
    }
    useEffect(() => {
      
      getData().then((res) => {
        console.log(res);
        setIngredient(res.data.itemList)
        
      })
      getData().catch((err) => {
        console.log(err)
      })
    },[])
    console.log(ingredient)
    
      
      
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
            axios.put(`http://localhost:3005/items/update/${id}`, items,
                {
                    headers: {
                        Access_token: token,
                    }
                }
            )
            .then(res =>{
                alert("cập nhập thành công")
                navigate('/')
            })
            .catch(err =>{
                setError(err.response.data.message)
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
    console.log(id,idingredient,quantity)
    const handleAddrepice = (e) =>{
        e.preventDefault();

        try{
        {
            api.post('recipes/item/create', {
                id_item:id,
                id_ingredient:idingredient,
                quantity:quantity
            },
                {
                    headers: {
                        Access_token: token,
                    }
                }
            )
            .then(res =>{
                alert("thêm thành công")
                navigate('/')
            })
            .catch(err =>{
                console.log(err)
                setError(err.response.data.message)
            })
        }
        
        }catch(error){
            console.log(error.response.data);
        }
        
    }
    return (
        <div>
            <Link to="/" className={classes["back-icon"]}>
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
                                <div>
                                <Input
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
                                />
                                </div>
                            )
                        }))}
                    </form>
                    <h1>Thêm nguyên liệu</h1>
                            <select name="lang" id="lang-select" multiple onChange={handleChangeIngre}  className={classes["set__payment"]}>
                            {ingredient.map((item) => {
                            return(
                                <option value={item.id_ingredient}>
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
                            onClick={handleAddrepice}
                        >
                            Thêm mới
                        </button>
                       
                </div>
            </div>
        </div>
    )
    
}

export default RepiceItem;