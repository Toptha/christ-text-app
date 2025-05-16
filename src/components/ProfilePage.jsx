import './styles/profile.css'
import logo from '../assets/logo.png'
function ProfilePage(){
    const handleImageUpload=async (e)=>{
    }
    return(
        <>
            <div className="app-container-4">
                <div className="box">
                    <img src={logo} id="logo" alt="logo"/>
                    <h1 className="title">PROFILE</h1>
                    <hr className="title"/>
                    <div className="profile-pic-wrapper">
                    <img src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Profile" className="profile-pic"/>
                    <label htmlFor="profile-pic"><input type="file" id="profile-pic" className="hidden" accept="image/*" onChange={handleImageUpload}/><span className="edit-photo">Edit Photo</span></label>
                    </div>
                    <div className="info-container">
                    <div className="info">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" placeholder="Regina George" disabled readonly/>
                    <label htmlFor="reg-no">Register Number</label>
                    <input type="text" id="reg-no" placeholder="2516723" disabled readonly/>
                    <label htmlFor="email">Email Address</label>
                    <input type="text" id="email" placeholder="regina.george@bcah.christuniversity.in" disabled readonly/>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ProfilePage