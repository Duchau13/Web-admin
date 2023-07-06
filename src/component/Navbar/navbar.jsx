import classes from './navbar.module.css'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';


const Navbar = () => {
    const role = localStorage.getItem('role')
    const navigate = useNavigate();

    const handleToDashboard = () => {
        if(role==="2"){
            navigate('/revenu')
        }
        else{
            toast.error('Bạn không có quyền truy cập', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }
    const handleToImportinvoice = () => {
        if(role==="2"){
            navigate('/importinvoice')
        }
        else{
            toast.error('Bạn không có quyền truy cập', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }
    const handleToRepost = () => {
        if(role==="5"){
            navigate('/repost')
            toast.error('Bạn không có quyền truy cập', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else{
            toast.error('Bạn không có quyền truy cập', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }
    const handleToOrder = () => {
        if(role===""){
            toast.error('Bạn không có quyền truy cập', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else{
            navigate('/oders')
        }
    }
    const handleToIngredient = () => {
        if(role==="2"){
            toast.error('Bạn không có quyền truy cập', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            navigate('/ingredient')
            
        }
        else{
            navigate('/ingredient')
            
        }
    }
    const handleToUnprocessedingredients = () => {
        if(role==="2"){
            toast.error('Bạn không có quyền truy cập', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else{
            navigate('/unprocessedingredients')
            
        }
    }
    

    return(
        <div>
            <div className={classes['navbar-main']}>
                <div className={classes['navbar-logo']}>
                    <img src="https://demo2.pavothemes.com/poco/wp-content/uploads/2020/10/logo_svg.svg" alt="logo" />
                </div>
                <div to="/ingredient" onClick={() => {handleToIngredient()}}>
                    <div className={classes['button-manage']}>
                        Nguyên liệu
                    </div>
                </div>
                <div  onClick={() => {handleToUnprocessedingredients()}}>
                    <div className={classes['button-manage']}>
                        Nguyên liệu Thô
                    </div>
                </div>
                <Link to="/">
                    <div className={classes['button-manage']}>
                        Thực đơn
                    </div>
                </Link>
                
                <div to="/oders"  onClick={() => {handleToOrder()}}>
                    <div className={classes['button-booking']}>
                        Đơn hàng
                    </div>
                </div>
                <div onClick={() => {handleToRepost()}}>
                    <div 
                        className={classes['button-booking']}
                        
                    >
                        Báo Cáo
                    </div>
                </div>
                <div onClick={() => {handleToDashboard()}}>
                    <div 
                        className={classes['button-booking']}
                        
                    >
                        Doanh thu
                    </div>
                </div>
                <div onClick={() => {handleToImportinvoice()}}>
                    <div 
                        className={classes['button-booking']}
                        
                    >
                        Hoá Đơn Nhập
                    </div>
                </div>

                <Link to="/login" onClick={() =>{
                  localStorage.clear()
                }} 
                >
                    <button className={classes['log-out']}>Đăng Xuất</button>
                </Link>
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
export default Navbar;