import React, { useEffect, useState } from "react";
import classes from './Ingredient.module.css'
import { Link } from "react-router-dom";
import api from '../../redux/axois'
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Navbar from "../Navbar/navbar";






const Ingredient = () => {
    const [items, setItems] = useState([])
    const token = localStorage.getItem('token')
  
    const [pageCount,setPageCount] = useState(0)
    const navigate = useNavigate();
    
    
    // goi api data items
    
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
        setItems(res.data.itemList)
        const total = res.data.totalItems
        console.log(total)
        setPageCount(Math.ceil(total/12));
      })
      getData().catch((err) => {
        console.log(err)
      })
    },[])
    
    const fetchData = async (currentPage) => {
        const res = await api.get(`/ingredients/page/${currentPage}`,{
            headers: {
                Access_token: token,
        },})
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
          })
          getData().catch((err) => {
            console.log(err)
        })
        
     };
    
    // console.log(items.length)
    
    return(
        <div>
            <Navbar/>
            <div className={classes['header']}>
                <h1>Quản lý danh sách thực phẩm</h1>
            </div>
            <div className={classes['table-items__container']} >
                
                <button
                 onClick={() => navigate("Newingredỉnt")}
                 className={classes['button-add']}>Thêm mới nguyên liệu
                 </button>
                
                <table className={classes['table-items']}>
                     
                    <tbody>
                        {items.map((item =>{
                            return (
                                <tr key={item.id_item}>
                                    <td className={classes['column-image']}><Link to="/"><img src={item.image} alt="food image" width="90px" height="90px"></img></Link></td>
                                    <td className={classes['column-des']}>
                                        <div>
                                        <h1 onClick={() => navigate(`/ingredient/${item.id_ingredient}`)} 
                                        className={classes['name-itiem']} to="/">{item.name}</h1>
                                        </div>
                                    </td>
                                    <td className={classes['column-price']}>
                                        <div>Đơn Vị: ({item.unit})</div>
                                    </td>
                                    <td className={classes['column-count']}>
                                        <div>Số Lượng: {item.quantity}</div>
                                    </td>
                                    <td className={classes['button-remove']}>
                                        <button 
                                            onClick={() => navigate(`/ingredient/quantity/${item.id_ingredient}`)}
                                        >Cập nhập số lượng</button>
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

export default Ingredient;