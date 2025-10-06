

const Login = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-base-100 p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
        <form>
          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input type="text" placeholder="Username" className="input input-bordered w-full" />
          </div>

          <div className="form-control w-full mb-6">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input type="password" placeholder="Password" className="input input-bordered w-full" />
          </div>

          <button className="btn btn-primary text-base w-full">Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login;