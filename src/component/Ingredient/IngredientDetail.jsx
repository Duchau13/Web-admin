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

    return (
        <div>
            <Link to="/" className={classes["back-icon"]}>
                <i class="fa-solid fa-chevron-left"></i>
                <h>Quay lai</h>
            </Link>
            <div className={classes["container"]}>
                <div className={classes["form-main"]}>
                    <h1>{id_ingredient==="new" ? "Thêm mới thức ăn" : "Cập nhập thông tin thức ăn"}</h1>
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
                        <Input
                            type="text"
                            name="ingredient"
                            label="Nguyên liệu"
                            placeholder="Nhập thành phần nguyên liệu "
                            required={true}
                            value={items.ingredient}
                            onChange={handleChange}
                        />
                        <Input
                            type="number"
                            name="energy"
                            label="Năng lượng"
                            placeholder="Nhập năng lượng thức ăn "
                            required={true}
                            value={items.energy}
                            onChange={handleChange}
                        />
                        <div className={classes.textArea}>
                            <label htmlFor="">
                                Nhập mô tả sản phẩm
                            </label>
                            <textarea rows="3" cols="60" name="description" value={items.description} placeholder="" onChange={handleChange}>
                            
                            </textarea>
                        </div>
                        
                        <button className={classes['button-submit']}
                            onClick={handleSubmit}
                        >
                            Cập Nhập</button>
                    </form>
                       
                </div>
            </div>
        </div>
    )
    
}

export default IngredientDetail;