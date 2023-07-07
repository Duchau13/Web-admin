import React from "react";
import classes from './Newimportinvoice.module.css'
import Input from "../Input/Input";
import { Link } from "react-router-dom";
//import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import api from "../../redux/axois"
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';


const Newimportinvoice = () => {

    const token = localStorage.getItem('token')
    const [items,setItems] = useState({
        name: "",
        unit:"",
        image:"",
    })
    const [provider,setProvider] = useState([])
    const [id,setId] = useState()
    const navigate = useNavigate();
    //const {id} = useParams();
    const [error, setError] = useState("")
    const getProvider = async() => {
        const res = await api.get("/providers",{
            headers: {
                access_token: token
            }
        })
        return res
    }
    useEffect(() => {
      
        getProvider().then((res) => {
          setProvider(res.data.prodiverList)
          console.log(res)
        })
        getProvider().catch((err) => {
          console.log(err)
        })
    },[])

    
    console.log(provider);
    //console.log(items[0]);
    


    const handleSubmit = (e) =>{
        e.preventDefault();

        try{
        {
            api.post('importinvoices', {
                id_provider:id,
                description:"TẠO MỚI HOÁ ĐƠN NHẬP"
            },
                {
                    headers: {
                        Access_token: token,
                    }
                }
            )
            .then(res =>{
                toast.success('Tạo mới thành công', {
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
                    navigate('/importinvoice')
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
    console.log(id)
    const handleChangeProvider = (e) => {
        setId(e.target.value);
    
    }

    

    return (
        <div>
            <Link to="/importinvoice   " className={classes["back-icon"]}>
                <i class="fa-solid fa-chevron-left"></i>
                <h>Quay lai</h>
            </Link>
            <div className={classes["container"]}>
                <div className={classes["form-main"]}>
                    <h1>Tạo Hoá Đơn Nhập</h1>
                    <p className={classes["text-err"]}>{error}</p>
                    <form action="" className={classes["add-form"]}>
                        
                        <select name="lang" id="lang-select" multiple onChange={handleChangeProvider}  className={classes["set__payment"]}>
                            {provider.map((item) => {
                            return(
                                <option value={item.id_provider}>
                                {item.name}
                                </option>
                            )})}   
                        </select>
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
export default Newimportinvoice;