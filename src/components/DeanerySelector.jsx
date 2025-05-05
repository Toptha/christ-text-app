import './styles/deanery.css'
import logo from '../assets/logo.png'
function DeanerySelector(){
    return(
        <>
            <div class="box">
                <img src={logo} id="logo"/><br/>
                <h1>Let's Get You Started</h1>
                <hr/>
                <div class="selector">
                <h3>Choose Your Academic Division:</h3>
                <label htmlFor="deanery">Deanery</label><br/>
                <select name="deanery" >
                    <option value="" disabled selected>Select Deanery</option>
                    <option>School of Sciences</option>
                </select><br/>
                <label htmlFor="department">Department</label><br/>
                <select name="department">
                    <option value="" disabled selected>Select Department</option>
                    <option>Computer Science</option>
                </select>
                </div>
            </div>
        </>
    )
}
export default DeanerySelector