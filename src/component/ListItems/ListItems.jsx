import React, { useEffect, useState } from "react";
import classes from './ListItems.module.css'
import { Link } from "react-router-dom";
import api from '../../redux/axois'
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Navbar from "../Navbar/navbar";
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';





const ListItems = () => {
    const [items, setItems] = useState([])
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')
    const [pageCount,setPageCount] = useState(0)
    const navigate = useNavigate();
    var timeOut = localStorage.getItem('timeOut'); // Reset storage 
    var now = new Date().getTime();
    var setupTime = localStorage.getItem('setupTime');
    if (setupTime == null) {
        localStorage.setItem('setupTime', now)
    } else {
        if(now-setupTime > timeOut*1000) {
            localStorage.clear()
            localStorage.setItem('setupTime', now);
        }
    }
    console.log(items);
    /*
    useEffect(()=>{
      if(!localStorage.getItem('token')){
          navigate("/login")
      }

    })
    */
    // goi api data items
    
    const getData = async() => {
        const res = await api.get("/items/")
        return res;
    }
    useEffect(() => {
      
      getData().then((res) => {
        setItems(res.data.itemList)
        const total = res.data.totalItems
        setPageCount(Math.ceil(total/12));
      })
      getData().catch((err) => {
        console.log(err)
      })
    },[])
    
    const fetchData = async (currentPage) => {
        const res = await api.get(`/items/page/${currentPage}`)
        const data = res.data.itemList;
        return data;
        
    }
   

    const handlePgaeclick = async (data) => {
      let currentPage = data.selected +1;
      const currentData = await fetchData(currentPage);
      //console.log(data.selected + 1)
      setItems(currentData);
      
    }

    
    //delete items
   /* const deletePost = (id) => {
      api.delete(`./items/${id}`);
      setItems(
         items.filter((item) => {
            return item.id !== id;
         })
      );
      };
    */

      const handDelete = async (id) => {
        if(role==="5"){
        try{
            //setItems(items.filter((item) => item.id_item !== item.id_item));
            await api.delete(`/items/delete/${id}`,{
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
                    navigate('/')
                }, 2000);
                
               
            })
        }
        catch (err){
            console.log(err)
        }
        getData().then((res) => {
            setItems(res.data.itemList)
            const total = res.data.totalItems
            setPageCount(Math.ceil(total/12));
          })
          getData().catch((err) => {
            console.log(err)
        })
        }
        else{
            toast.error('Bạn không có quyền sử dụng chức năng này', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        
    };
    const handleToCreate = () => {
        if(role==="5"){
            navigate("NewItem")
        }
        else{
            toast.error('Bạn không có quyền sử dụng chức năng này', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }
    const handleToDetail = (id_item) => {
        if(role==="5"){
            navigate(`/item/${id_item}`)
        }
        else{
            toast.error('Bạn không có quyền sử dụng chức năng này', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }
    const handleToRepice = (id_item) => {
        if(role==="2"){
            toast.error('Bạn không có quyền sử dụng chức năng này', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            navigate(`/item/${id_item}`)
        }
        else{
            navigate(`/item/repice/${id_item}`)
        }
    }
    const handleToQuantity = (id_item) => {
        if(role==="2"){
            toast.error('Bạn không có quyền sử dụng chức năng này', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else{
            navigate(`/item/quantity/${id_item}`)
        }
    }
    
     
    
    return(
        <div>
            <Navbar/>
            <div className={classes['header']}>
                <h1>Quản lý danh sách thức ăn</h1>
            </div>
            <div className={classes['table-items__container']} >
                
                <button
                 onClick={() => handleToCreate()}
                 className={classes['button-add']}>Thêm mới thức ăn
                 </button>
                
                <table className={classes['table-items']}>
                     
                    <tbody>
                        {items.map((item =>{
                            return (
                                <tr key={item.id_item}>
                                    <td className={classes['column-image']}><Link to="/"><img src={item.image} alt="food image" width="90px" height="90px"></img></Link></td>
                                    <td className={classes['column-des']}>
                                        <div>
                                        <h1 onClick={() => handleToDetail(item.id_item)} 
                                        className={classes['name-itiem']} to="/">{item.name}</h1>
                                        </div>
                                    </td>
                                    <td className={classes['column-price']}>
                                        <div>Đơn Giá: {item.price}</div>
                                    </td>
                                    <td className={classes['column-count']}>
                                        <div>Loại thức ăn: {item.name_type}</div>
                                    </td>
                                    <td className={classes['button-remove']}>
                                        <button 
                                            onClick={e => handleToRepice(item.id_item)}
                                        >Xem Công Thức
                                        </button>
                                    </td>
                                    <td className={classes['button-remove']}>
                                        <button 
                                            onClick={e => handDelete(item.id_item)}
                                        >Remove</button>
                                        <button 
                                            onClick={e => handleToQuantity(item.id_item)}
                                        >Chế Biến</button>
                                    </td>
                                </tr>
                            )
                        }))}
                    </tbody>
                </table>
                <div className={classes['container-pagination']}>
                <ReactPaginate 
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    pageCount={pageCount}
                    marginPagesDisplayed={3}
                    pageRangeDisplayed={3}
                    onPageChange={handlePgaeclick}
                    containerClassName={'pagination justify-content-center'}
                    pageClassName={'page-item'}
                    pageLinkClassName={'page-link'}
                    activeClassName={'active'}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                />
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

export default ListItems;