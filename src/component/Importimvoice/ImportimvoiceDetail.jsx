import React, { useEffect, useState } from "react";
import classes from './ImportimvoiceDetail.module.css'
import { Link } from "react-router-dom";
import api from '../../redux/axois'
import { useNavigate,useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Navbar from "../Navbar/navbar";
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';





const ImportimvoiceDetail = () => {
    const [items, setItems] = useState([])
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')
    const navigate = useNavigate()
    const [pageCount,setPageCount] = useState(0)
    const [error,setError] = useState()
    const {id_i_invoice} = useParams();
    
    
    // goi api data items
    console.log(id_i_invoice)
    const getData = async() => {
        const res = await api.get(`/importinvoices/${id_i_invoice}`,{
            headers: {
                Access_token: token,
            },
        })
        return res;
    }
    useEffect(() => {
      
      getData().then((res) => {
        console.log(res);
        setItems(res.data.itemInImportInvoiceList)
      })
      getData().catch((err) => {
        console.log(err)
      })
    },[])
    
    const handleToDetails = () => {
        navigate(`/importinvoices/detail/${id_i_invoice}`)
    }
    // console.log(items.length)
    const handDelete = async (id) => {
        try{
            //setItems(items.filter((item) => item.id_item !== item.id_item));
            await api.delete(`/importinvoicedetails/${id_i_invoice}/${id}`,{
                headers: {
                    Access_token: token,
                },
            })
            //console.log(item.id_item)
            .then(() =>{
                toast.success('Xoá Thành Công', {
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
            .catch((err) => {
                setError(err.response.data.message)
                console.log(error)
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
        catch (err){
            console.log(err)
        }
    };
    console.log(items)
    return(
        <div>
            <Navbar/>
            <div className={classes['header']}>
                <h1>Danh Sách Nguyên Liệu Nhập</h1>
            </div>
            <div className={classes["button-add"]} onClick={() => navigate(`/importinvoices/detail/${id_i_invoice}`)}>
                <button>Thêm Chi Tiết Hoá Đơn</button>
            </div>
            <div className={classes['table-items__container']} >
                
                <table className={classes['table-items']}>
                     
                    <tbody>
                        {items.map((item =>{
                            return (
                                <tr key={item.id_u_ingredient}>
                                    <td className={classes['column-image']}><Link to={`/importinvoices/detail/${id_i_invoice}/${item.id_u_ingredient}`}><img src={item.image} alt="food image" width="90px" height="90px"></img></Link></td>
                                    <td className={classes['column-des']}>
                                        <div>
                                        <h1
                                            className={classes['name-itiem']}
                                            onClick={() => navigate(`/importinvoices/detail/${id_i_invoice}/${item.id_u_ingredient}`)} 
                                        >
                                            {item.name_u_ingredient}
                                        </h1>
                                        </div>
                                    </td>
                                    <td className={classes['column-price']}>
                                        <div>Giá: {item.unit_price}</div>
                                    </td>
                                    <td className={classes['column-count']}>
                                        <div>Số Lượng: {item.quantity}</div>
                                    </td>
                                    <td className={classes['button-remove']}>
                                        <button 
                                            onClick={() => handDelete(item.id_ingredient)}
                                        >Xoá</button>
                                    </td>
                                </tr>
                            )
                        }))}
                    </tbody>
                </table>
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

export default ImportimvoiceDetail;