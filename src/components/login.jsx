import './styles/login.css'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom';
function Login({onLogin}){
    const handleLogin = (e) => {
        e.preventDefault(); 
        onLogin(); 
      };
    return(
            <div className="app-container-1">
                <div className="box">
                    <img src={logo} id="logo1"/>
                    <form onSubmit={handleLogin}>
                        <label htmlFor="email">College Email ID</label><br/>
                        <input type="text" placeholder="Enter College Email" id="email" required/><br/>
                        <label htmlFor="reg-no">Register No.</label><br/>
                        <input type="text" placeholder="Enter Register No." id="reg-no" required/><br/>
                        <label htmlFor="password">Password</label><br/>
                        <input type="password" placeholder="Enter Password" id="password" required/><br/>
                        <button type="submit">Login</button>
                        <p className="paragraph"><b>Don't have an account? </b><br/> <Link to="/signup" style={{color:'#253440'}}>Sign Up</Link></p>
                    </form>
                </div>
            </div>
    )
}
export default Login;