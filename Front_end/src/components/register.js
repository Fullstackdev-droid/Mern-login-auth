import React, { useEffect, useState } from "react";
import { Link,useLocation,useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import { NotificationManager } from "react-notifications"
import { toast } from 'react-toastify';
import { signUp } from '../actions/authActions';
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
  'userName':'',
  'email': '',
  'password': '',
  'password2':'',
}

export default function Register(props) {
    const history = useHistory();


    // const classes = useStyles();
    const [formValue, setFormValue] = useState(initialFormValue);
    const [validateError, setValidateError] = useState({});

    const {
      email,
      password,
      userName,
      password2
    } = formValue

    // function
    const handleChange = (e) => {
      e.preventDefault();
      const { name, value } = e.target;
      let formData = { ...formValue, ...{ [name]: value } }
      setFormValue(formData)
    }

    // Sign up submit
    const handleFormSubmit = async (e) => {
      e.preventDefault();
      let reqData = {
          email,
          password,
          userName,
          password2,
      }
      let {  error, result,message } = await signUp(reqData);
      if (isEmpty(error)) {
          setFormValue(initialFormValue);
          NotificationManager.success(message, "Registration Success!", 10000)
          history.push('/Dashboard')             
      } else {
          setValidateError(error.errors);
      }
    }
  
    return (
      <div>
        <h1>Sign up here</h1>
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
                                    <label>Name</label>
                                    <div className="form-group">
                                      <input
                                          name="userName"
                                          type="text"
                                          onChange={handleChange}
                                          value={userName}
                                          error={validateError.username}
                                          className="form-control"
                                          required
                                          />
                                      <span className="text-danger">{validateError.username}</span>
                                    </div>
                                    <label>Email</label>
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
                                            value="SIGN UP"
                                            />
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="form-group text-center">
                                        <Button className="form-control btn btn-info">
                                            <Link to="/Login" color="transparent" className="form-control btn btn-info">
                                            Login</Link>
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
