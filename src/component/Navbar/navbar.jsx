import classes from './navbar.module.css'
import { Link } from "react-router-dom";

const Navbar = () => {

    return(
        <div>
            <div className={classes['navbar-main']}>
                <div className={classes['navbar-logo']}>
                    <img src="https://demo2.pavothemes.com/poco/wp-content/uploads/2020/10/logo_svg.svg" alt="logo" />
                </div>
                <Link to="/ingredient">
                    <div className={classes['button-manage']}>
                        Nguyên liệu
                    </div>
                </Link>
                <Link to="/">
                    <div className={classes['button-manage']}>
                        Thực đơn
                    </div>
                </Link>
                
                <Link to="/oders">
                    <div className={classes['button-booking']}>
                        Đơn hàng
                    </div>
                </Link>
                <Link to="/revenu">
                    <div className={classes['button-booking']}>
                        Doanh thu
                    </div>
                </Link>

                <Link to="/login" onClick={() =>{
                  localStorage.clear()
                }} 
                >
                    
                        <button className={classes['log-out']}>Đăng Xuất</button>
                    
                </Link>
            </div>
            
        </div>
    )
}
export default Navbar;