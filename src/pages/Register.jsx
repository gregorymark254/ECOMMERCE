import React,{ useState } from 'react'
import { Footer, Navbar } from "../components";
import { Link,useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../api/api'

const URL = '/api/v1/register'

const Register = () => {

    const [fullName,setFullname] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await axios.post(URL,
          JSON.stringify({ fullName, email, password }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          });
          toast.success("Registration Successful");
          navigate("/login");
        } catch (error) {
          if (!error?.response) {
            toast.error("No Server Response");
          } else if (error.response?.status === 400) {
            toast.error("All fields are required");
          } else if (error.response?.status === 409) {
            toast.error("Email Taken");
          } else {
            toast.error("Registration Failed");
          }
          console.log(error);
        }
    };
    
    return (
        <>
            <Navbar />
            <div className="container my-3 py-3">
                <h1 className="text-center">Register</h1>
                <hr />
                <div class="row my-4 h-100">
                    <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
                        <form onSubmit={handleSubmit}>
                            <div class="form my-3">
                                <label for="Name">Full Name</label>
                                <input
                                    type="name"
                                    class="form-control"
                                    id="Name"
                                    placeholder="Enter Your Name"
                                    value={fullName}
                                    onChange={(e) => setFullname(e.target.value)}
                                />
                            </div>
                            <div class="form my-3">
                                <label for="Email">Email address</label>
                                <input
                                    type="email"
                                    class="form-control"
                                    id="Email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div class="form  my-3">
                                <label for="Password">Password</label>
                                <input
                                    type="password"
                                    class="form-control"
                                    id="Password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="my-3">
                                <p>Already has an account? <Link to="/login" className="text-decoration-underline text-info">Login</Link> </p>
                            </div>
                            <div className="text-center">
                                <button class="my-2 mx-auto btn btn-dark" type="submit">
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Register