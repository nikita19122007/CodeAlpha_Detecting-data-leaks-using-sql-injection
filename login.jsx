import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [form, setForm] = useState({

    name: "",
    email: "",
    password: ""

  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const submit = async () => {

    const url = isLogin
      ? "http://localhost:5000/api/login"
      : "http://localhost:5000/api/register";

    const body = isLogin
      ? {
          email: form.email,
          password: form.password
        }
      : form;

    const res = await axios.post(url, body);

    alert(res.data.message);

    if (isLogin) {

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");

    } else {

      setIsLogin(true);

    }

  };

  return (

    <div style={{ textAlign: "center", marginTop: "100px" }}>

      <h1>{isLogin ? "Login" : "Register"}</h1>

      {!isLogin && (

        <input
          placeholder="Name"
          name="name"
          onChange={handleChange}
        />

      )}

      <br /><br />

      <input
        placeholder="Email"
        name="email"
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        name="password"
        onChange={handleChange}
      />

      <br /><br />

      <button onClick={submit}>
        {isLogin ? "Login" : "Register"}
      </button>

      <br /><br />

      <button onClick={() => setIsLogin(!isLogin)}>

        {isLogin
          ? "Create Account"
          : "Already Have Account"}

      </button>

    </div>

  );

}

export default Login;
