import axios from "axios";
import React, { useState } from "react";
axios.defaults.withCredentials = true;
export function JWT() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState("");
  const [accessToken, setAccessToken] = useState("12345");

  const fakeLogin = async (username, password) => {
    axios
      .post(
        "http://localhost:3002/login?username=" +
          username +
          "&password=" +
          password
      )
      .then((response) => {
        console.log(response);
        setAccessToken(response.data.accessToken);
      })
      .catch((error) => {
        console.error("Error Getting data:", error);
      });
  };

  const fakeProtectedRequest = async (username) => {
    try {
      const response = await axios.post(
        "http://localhost:3002/getResult",
        {username},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
  
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getRefreshCookie = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3002/getRefreshCookie"
      );
      console.log(response.data);
      return response.data.refreshToken;
    } catch (error) {
      console.error("Error getting refresh cookie:", error);
      return null;
    }
  };

  const getNewAccessToken = async () => {
    try {
      const refreshToken = await getRefreshCookie();
      if (!refreshToken) {
        console.error("No refresh token available");
        return;
      }

      const response = await axios.post("http://localhost:3002/token");

      setAccessToken(response.data.accessToken);
    } catch (error) {
      console.error("Error refreshing access token:", error);
    }
  };
  console.log(accessToken);
  return (
    <div>
      <h1>React Authentication Example</h1>

      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={() => fakeLogin(username, password)}>Login</button>
      <button onClick={() => fakeProtectedRequest(username)}>
        Get Protected Resource
      </button>
      <button onClick={getNewAccessToken}>Get RefreshToken</button>
    </div>
  );
}
