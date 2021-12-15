import React, { useEffect, useState } from "react";
import { Link,useLocation,useHistory,useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
import { NotificationManager } from "react-notifications"
import { toast } from 'react-toastify';
import { signUp,activateuser,login } from '../actions/authActions';
import isEmpty from '../lib/isEmpty';

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

// Intial form value
const initialFormValue = {
  'email': '',
  'password': '',
}

export default function Login(props) {
    const history = useHistory();
    const [formValue, setFormValue] = useState(initialFormValue);
    const [validateError, setValidateError] = useState({});
    const params = useParams()


    const {
        email,
        password,
    } = formValue


    useEffect(() => {
        isActive();
    }, [])
    //   User activate
    const isActive=async ()=>{
        var activate_id = params.id;
        if (typeof activate_id != "undefined" && activate_id != "") {
            let passdata = { userid: activate_id };
            var {res} = await activateuser(passdata);
        if (res && res.errormsg) {
            toast.success(res.errormsg, 'success')
        }
        if (res && res.message) {
            toast.success(res.message, 'success')
        }
        }else {
            localStorage.clear();
        }
    }

    // function
    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        let formData = { ...formValue, ...{ [name]: value } }
        setFormValue(formData)
    }

    const notify = () => toast("Wow so easy!");
    // Login functionality  
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        let reqData = {
            email,
            password,
        }
        let {  error, result,message } = await login(reqData);
        if (isEmpty(error)) {
            console.log("Message",message);
            setFormValue(initialFormValue);
            NotificationManager.success(message, "Registration Success!", 10000)
            history.push('/Dashboard')             
        } else {
            setValidateError(error.errors);
        }
    }
  
    return (
        <div>
            <h1>Login</h1>
            <section className="crediantialsBox">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7 col-md-10 col-sm-12 mx-auto">
                            <div className="wow flipInY" data-wow-delay=".15s;">
                            <div className="formBox mb-5 mb-md-0">
                                <div
                                    className="tab-content py-3 px-3 px-sm-0"
                                    id="nav-tabContent"
                                    >
                                    <div
                                        className="tab-pane fade show active"
                                        id="nav-signup"
                                        role="tabpanel"
                                        aria-labelledby="nav-signup-tab"
                                        >
                                        <form id="regfrm" name="regfrm" className="stoForm" method=""noValidate onSubmit={handleFormSubmit} >
                                            <label className="control-label col-xs-3">Email</label>
                                            <div className="form-group">
                                                <input
                                                    name="email"
                                                    type="text"
                                                    onChange={handleChange}
                                                    value={email}
                                                    error={validateError.email}
                                                    className="form-control"
                                                    required
                                                    />
                                                <span className="text-danger">{validateError.email}</span>
                                            </div>
                                            <div className="row">
                                                <label>Password</label>
                                                <div className="form-group">
                                                    <input
                                                        name="password"
                                                        type="password"
                                                        onChange={handleChange}
                                                        value={password}
                                                        className="form-control"
                                                        error={validateError.password}
                                                        required
                                                        />
                                                    <span className="text-danger">
                                                    {validateError.password}</span>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="form-group text-center">
                                                    <input
                                                        id="regfrmbtn"
                                                        type="submit"
                                                        className="form-control btn btn-info"
                                                        value="LOGIN"
                                                        />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="form-group text-center">
                                                    <Button className="form-control btn btn-info">
                                                        <Link to="/Signup" color="transparent" className="form-control btn btn-info">
                                                        SIGN UP</Link>
                                                    </Button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
  
}
