import { useState } from "react";
import { loginUser } from "../../services/auth.service";
import ErrorAlert from "../common/ErrorAlert";
import { getErrorMessage } from "../../guards/getErrorMessage";
import { useAuth } from "../context/UserContext";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(new Set<string>());
    const navigate = useNavigate();
    const [user, setUser] = useAuth();

    const handleLogin = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const user = await loginUser({ username, password });
            setUser(user);
            navigate('/')

        } catch (error) {
            setErrors((state) => new Set([...state, getErrorMessage(error)]));
        }
    }

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-base-100 p-6 rounded-lg shadow">
                <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
                <div className="w-full">

                {errors.size > 0 && Array.from(errors).map((error, i) => (
                    <ErrorAlert key={i} message={error} />
                ))}                
                </div>
                
                <form onSubmit={handleLogin}>
                    <div className="form-control w-full mb-4">
                        <label className="label">
                            <span className="label-text">Username</span>
                        </label>
                        <input name="username" required value={username} onChange={(e) => setUsername(e.currentTarget.value)} type="text" placeholder="Username" className="input input-bordered w-full validator" />
                    </div>

                    <div className="form-control w-full mb-6">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" required name="password" value={password} onChange={(e) => setPassword(e.currentTarget.value)} placeholder="Password" className="input input-bordered w-full validator" />
                    </div>

                    <button className="btn btn-primary text-base w-full" type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login;