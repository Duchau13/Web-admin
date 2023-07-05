import React, { useEffect, useState } from "react";
import classes from './ListItems.module.css'
import { Link } from "react-router-dom";
import api from '../../redux/axois'
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Navbar from "../Navbar/navbar";






const ListItems = () => {
    const [items, setItems] = useState([])
    const token = localStorage.getItem('token')
  
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
        try{
            //setItems(items.filter((item) => item.id_item !== item.id_item));
            await api.delete(`/items/delete/${id}`,{
                headers: {
                    Access_token: token,
                },
            })
            //console.log(item.id_item)
            .then(() =>{
                alert("xoa thanh cong");
                navigate('/')
                
               
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
        
     };
    
     
    
    return(
        <div>
            <Navbar/>
            <div className={classes['header']}>
                <h1>Quản lý danh sách thức ăn</h1>
            </div>
            <div className={classes['table-items__container']} >
                
                <button
                 onClick={() => navigate("NewItem")}
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
                                        <h1 onClick={() => navigate(`/item/${item.id_item}`)} 
                                        className={classes['name-itiem']} to="/">{item.name}</h1>
                                        </div>
                                    </td>
                                    <td className={classes['column-price']}>
                                        <div>Đơn Giá: {item.price}</div>
                                    </td>
                                    <td className={classes['column-count']}>
                                        <div>Loại thức ăn: {item.name_type}</div>
                                    </td>
                                    <td className={classes['column-count']}>
                                        <div>Số Lượng: {item.amount}</div>
                                    </td>
                                    <td className={classes['button-remove']}>
                                        <button 
                                            onClick={e => handDelete(item.id_item)}
                                        >Remove</button>
                                        <button 
                                            onClick={e => handDelete(item.id_item)}
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
        </div>
    )
};

export default ListItems;