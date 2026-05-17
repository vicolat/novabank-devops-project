export default function Login({ onLogin }) {
  return (
    <div className="login-page">

      <div className="login-box">
        <h1>NovaBank</h1>
        <p>Secure Banking Portal</p>

        <input placeholder="Email" />
        <input type="password" placeholder="Password" />

        <button onClick={onLogin}>
          Login
        </button>

      </div>

    </div>
  );
}