import './styles/login.css'
import logo from '../assets/logo.png'
function Login({onLogin}){
    const handleLogin = (e) => {
        e.preventDefault(); 
        onLogin(); 
      };
    return(
        <>
            <div class="box">
            <img src={logo} id="logo1"/>
            <form onSubmit={handleLogin}>
                <label htmlFor="name">Name</label><br/>
                <input type="text" id="name"/><br/>
                <label htmlFor="reg-no">Register No.</label><br/>
                <input type="text" id="reg-no"/><br/>
                <label htmlFor="email">College Email ID</label><br/>
                <input type="text" id="email"/><br/>
                <button type="submit">Login</button>
            </form>
            </div>
        </>
    )
}
export default Login;