import React, { useEffect, useState } from "react";
// core components
import { Link,useLocation,useHistory,useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { logoutUser } from '../actions/authActions';



// const useStyles = makeStyles();
const dashboardRoutes = [];



// Scroll to Top
function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}

// toaster config
toast.configure();
let toasterOption = {
  position: "top-right",
  autoClose: 10000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
}



export default function Dashboard(props) {
  const history = useHistory();
  const handleLogout = () => {
    // console.log("dasdasd");
    logoutUser()
    history.push('/Login')
} 
 
  
    return (
        <div>
            <h1>Welcome to dashboard</h1>
            <section className="crediantialsBox">
                <div className="container">
                <div className="row">
                    <div className="col-lg-7 col-md-10 col-sm-12 mx-auto">
                        <div className="wow flipInY" data-wow-delay=".15s;">
                            <div className="form-group text-center">
                                <input
                                    type="button"
                                    onClick={handleLogout}
                                    value="Logout"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </section>
        </div>
    );
  
}
