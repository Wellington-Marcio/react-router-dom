import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://sheetdb.io/api/v1/t3f0khtspqdtd/search?email=${email}&password=${password}&sheet=${"login"}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      console.log(data);

      if (data.length > 0) {
        localStorage.setItem("@app_user_email", email);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Erro ao fazer login", error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="email">Email</label>
        </div>
        <div className="input-field">
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password">Senha</label>
        </div>
        <button className="btn" type="submit">
          Login
        </button>
      </form>
    </div>
  );

}
    
  