import React from "react";
import classes from './UnprocessedingredientsDetail.module.css'
import Input from "../Input/Input";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";
import api from "../../redux/axois"
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';


const UnprocessedingredientsDetail = () => {
    
    const token = localStorage.getItem('token')
    const [items,setItems] = useState([])
    const [error, setError] = useState("")
    const navigate = useNavigate();
    const {id_u_ingredient} = useParams();
    

    useEffect(() => {
        
        async function getData(){
          const res = await api.get(`/unprocessedingredients/detail/${id_u_ingredient}`,{
            headers: {
                Access_token: token,
            }
          })
          return res
        }
        getData().then((res) => {
          console.log(res)  
          setItems(res.data.item)
        })
        getData().catch((err) => {
          console.log(err)
        })
        console.log(1)
      },[id_u_ingredient])
    
      
      
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
            api.put(`/unprocessedingredients/update/${id_u_ingredient}`, items,
                {
                    headers: {
                        Access_token: token,
                    }
                }
            )
            .then(res =>{
                toast.success('Cập Nhật Thành Công', {
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
                    navigate('/unprocessedingredients')
                }, 2000);
            })
            .catch(err =>{
                toast.warning('Thao Tác Thất Bại', {
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
    console.log(items)
    return (
        <div>
            <Link to="/unprocessedingredients" className={classes["back-icon"]}>
                <i class="fa-solid fa-chevron-left"></i>
                <h>Quay lai</h>
            </Link>
            <div className={classes["container"]}>
                <div className={classes["form-main"]}>
                    <h1>{id_u_ingredient==="new" ? "Thêm mới thức ăn" : "Cập nhập thông tin thức ăn"}</h1>
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
                            name="energy"
                            label="Đơn vị"
                            placeholder="Đơn vị"
                            required={true}
                            value={items.unit}
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

export default UnprocessedingredientsDetail;