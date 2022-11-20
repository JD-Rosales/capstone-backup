import { useRef, useState, useEffect } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Spinner from "../../components/Spinner/Spinner";

const Register = () => {
  const userRef = useRef();
  const passwordRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const API_URL = "http://localhost:5000/api/users/";
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      setPassword("");
      setPassword2("");
      passwordRef.current.focus();
      toast.error("Password do not match");
    } else {
      setIsLoading(true);

      await axios
        .post(API_URL, {
          username,
          password,
        })
        .then((response) => {
          toast.info(`Welcome ${response.data.username}`, {
            icon: false,
            position: "top-center",
            hideProgressBar: true,
            theme: "dark",
          });
          setIsLoading(false);

          //save the response data to local storage
          localStorage.clear();
          localStorage.setItem("userData", JSON.stringify(response.data));
          navigate("/administrator");
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          localStorage.clear();
          setUsername("");
          setPassword("");
          setPassword2("");
          userRef.current.focus();
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    userRef.current.focus();
  }, []);

  return (
    <div className="register">
      <div className="container">
        <h2>WEB-BASED E-LEARNING SIGN LANUAGE TRANSLATOR GAME</h2>

        <p>
          It is able to translate sign language to text. It includes games that
          will help the user to enhance and develop their skill in learning sign
          language. It will help unimpaired individuals to be communicative with
          people who suffer from hearing impairment and as well encourage them
          to express their feelings, and it will help to lessen the
          discrimination between deaf and normal individuals through awareness
          of sign language elucidation.
        </p>
      </div>

      <section className="form-container">
        <h1>
          Reg<span>i</span>ster
        </h1>
        <span>(Administrator only)</span>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required
          />

          <input
            type={passwordShown ? "text" : "password"}
            name="password"
            placeholder="Password"
            ref={passwordRef}
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />

          <input
            type={passwordShown ? "text" : "password"}
            name="password2"
            placeholder="Confirm Password"
            autoComplete="off"
            onChange={(e) => setPassword2(e.target.value)}
            value={password2}
            required
          />

          <div className="checkbox-container">
            <input
              type="checkbox"
              id="scales"
              name="showPassword"
              onChange={() => {
                setPasswordShown(!passwordShown);
              }}
            />
            <label htmlFor="showPassword">Show password</label>
          </div>

          <button>Register</button>
        </form>
      </section>
      {isLoading ? <Spinner /> : ""}
    </div>
  );
};

export default Register;
