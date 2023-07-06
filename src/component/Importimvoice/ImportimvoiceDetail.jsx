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
  
    const [pageCount,setPageCount] = useState(0)
    const {id_i_invoice} = useParams();
    
    
    // goi api data items
    
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
    

    // console.log(items.length)
    
    return(
        <div>
            <Navbar/>
            <div className={classes['header']}>
                <h1>Danh Sách Nguyên Liệu Nhập</h1>
            </div>
            <div className={classes['table-items__container']} >
                
                <table className={classes['table-items']}>
                     
                    <tbody>
                        {items.map((item =>{
                            return (
                                <tr key={item.id_item}>
                                    <td className={classes['column-image']}><Link to="/"><img src={item.image} alt="food image" width="90px" height="90px"></img></Link></td>
                                    <td className={classes['column-des']}>
                                        <div>
                                        <h1
                                        className={classes['name-itiem']} >{item.name_u_ingredient}</h1>
                                        </div>
                                    </td>
                                    <td className={classes['column-price']}>
                                        <div>Giá: {item.unit_price}</div>
                                    </td>
                                    <td className={classes['column-count']}>
                                        <div>Số Lượng: {item.quantity}</div>
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