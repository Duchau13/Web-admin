import classes from './Home.module.css'
import { useEffect, useState } from 'react';
import Input from '../Input/Input';
//import { loginUser } from '../../redux/apiRequest';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginFailed, loginStart, loginSuccess, logoutStart } from "../../redux/authSlice";
import api from "../../redux/axois";

const Home = () => {
    
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loginUser = async(user,dispatch,navigate) => {
        dispatch(loginStart());
        try{
            const res = await api.post("/account/admin/login",user);
            dispatch(loginSuccess(res.data));
            navigate("/")
            console.log(res.data);
            localStorage.setItem('token',res.data.token);
            localStorage.setItem('timeOut',res.data.expireTime)
            localStorage.setItem('role',res.data.id_role)
            
        }
        catch(err){
            dispatch(loginFailed());
            setError(err.response.data.message);
        } 
    }
    const loginStaff = async(user,dispatch,navigate) => {
        dispatch(loginStart());
        try{
            const res = await api.post("/account/staff/login",user);
            dispatch(loginSuccess(res.data));
            navigate("/")
            console.log(res.data);
            localStorage.setItem('token',res.data.token);
            localStorage.setItem('timeOut',res.data.expireTime)
            localStorage.setItem('role',res.data.id_role)
            
        }
        catch(err){
            dispatch(loginFailed());
            setError(err.response.data.message);
        } 
    }

    const handleLoginAdmin = (e) => {
      e.preventDefault();
      const newUser = {
        username: username,
        password: password,
      };
       loginUser(newUser,dispatch,navigate)
    }
    const handleLoginStaff = (e) => {
        e.preventDefault();
        const newUser = {
          username: username,
          password: password,
        };
        loginStaff(newUser,dispatch,navigate)
    }
      
    
    
    return(
        <div>
            <div className={classes['navbar-main']}>
                <div className={classes['navbar-logo']}>
                    <img src="https://demo2.pavothemes.com/poco/wp-content/uploads/2020/10/logo_svg.svg" alt="logo" />
                </div>
            </div>
            <div className={classes['form-login']}>
                    <h1>Đăng Nhập </h1>
                    {
                        <p className={classes['text-err']}>{error}</p>
                    }
                    <form>
                        <Input
                            name="username"
                            label="Username"
                            placeholder="Nhập username"
                            required
                            onChange= {(e) => setUsername(e.target.value)}
                            //onChange= {(e) => {this.formikLogin.handleChange(e); setUsername(this.target.value(e))}}
                           
                        />
                        <Input
                            name="password"
                            label="Mật khẩu"
                            placeholder="Nhập 8 kí tự có ít nhất 1 số"
                            required
                            type="password"
                            onChange= {(e) => setPassword(e.target.value)}
                        />
                    </form>
                    <div className={classes["button-submit"]}>
                            <button type="submit" onClick={handleLoginAdmin}>Đăng nhập với quản lý</button>
                            <button type="submit" onClick={handleLoginStaff}>Đăng nhập với nhân viên</button>
                    </div>
            </div>
        </div>
    )
}
export default Home;