import './style.css';
export function Login({handleLogin}) {
  return (
    <>
    <div>
      <div className="center">
          <button className="center-button" onClick={handleLogin}>
            <h1>Login</h1>
          </button>
      </div>
      </div>
    </>
  );
}
