import React from "react";
import classes from './ingredientDetail.module.css'
import Input from "../Input/Input";
import { Link } from "react-router-dom";
//import { useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
//import { useParams } from "react-router-dom";
import { useState } from "react";
import api from "../../redux/axois"


const IngredientQuantity = () => {

    const token = localStorage.getItem('token')
    const [items,setItems] = useState({
        quantity: "",
    })
    const navigate = useNavigate();
    const {id_ingredient} = useParams();
    const [error, setError] = useState("")
    
    const handleSubmit = (e) =>{
        e.preventDefault();

        try{
        {
            api.post(`ingredients/process/${id_ingredient}`, items,
                {
                    headers: {
                        Access_token: token,
                    }
                }
            )
            .then(res =>{
                alert("cập nhập thành công")
                navigate('/ingredient')
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
    console.log(error)
    const handleChange = (e) => {
        
        const itemsClone = {...items};
        itemsClone[e.target.name] = e.target.value;
        setItems(itemsClone);
    
    }

    

    return (
        <div>
            <Link to="/ingredient   " className={classes["back-icon"]}>
                <i class="fa-solid fa-chevron-left"></i>
                <h>Quay lai</h>
            </Link>
            <div className={classes["container"]}>
                <div className={classes["form-main"]}>
                    <h1>Cập nhập số lượng</h1>
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
                            Cập nhập
                        </button>
                    </form>
                       
                </div>
            </div>
        </div>
    )
};
export default IngredientQuantity;