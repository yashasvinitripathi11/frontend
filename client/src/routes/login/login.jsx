import { useContext, useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";

function Login() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {updateUser} = useContext(AuthContext)

  const navigate = useNavigate();

  // const Login = async (credentials) => {
  //   try {
  //     const res = await api.post("https://house-zjit.onrender.com/api/auth/login", credentials);
  //     localStorage.setItem("token", res.data.token);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const password = formData.get("password");

    try {
      //axios.post(url: "", headers: {}, params: {})
      // const res = await apiRequest.post(url :"https://house-zjit.onrender.com/api/auth/login", headers: {'Access-Control-Allow-Origin'},params {
        
      //   username,
      //   password,
      // });axios.post(url: "", headers: {}, params: {})
const res = await apiRequest.post('https://house-zjit.onrender.com/api/auth/login', {
   username,
   password,
   }
  // , {
  //   headers: {
  //     'Access-Control-Allow-Origin': 'https://estate-housing-8eb9a.web.app',
  //     'Access-Control-Allow-Credentials' : true,

  //   }
  // }
)

      updateUser(res.data)

      navigate("/");
    } catch (err) {
       setError(err.response.data?.message);
      // console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input
            name="username"
            required
            minLength={3}
            maxLength={20}
            type="text"
            placeholder="Username"
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
          />
          <button disabled={isLoading}>Login</button>
          {error && <span>{error}</span>}
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
