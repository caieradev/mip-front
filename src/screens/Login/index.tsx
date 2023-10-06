import { useEffect, useRef, useState } from "react";
import { Navigate, useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { LoginRequestEntity } from "../../entities/LoginEntity";
import React from "react";

export default function Login(){
    const { user, handleLogin } = useAuth();
	
    const location = useLocation();
    const navigate = useNavigate();
    
    const emailRef = useRef<HTMLInputElement>() as React.RefObject<HTMLInputElement>;
    const passwordRef = useRef<HTMLInputElement>() as React.RefObject<HTMLInputElement>;
    
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const [formLogin, setFormLogin] = useState("");
    const [formPassword, setFormPassword] = useState("");
    
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();

        if(!emailRef.current || !passwordRef.current){
           return false; 
        }

        setLoading(true);
        setMessage("");

        let loginRequest = {
            login: formLogin,
            password: formPassword,
        } as LoginRequestEntity;

        let response = await handleLogin(loginRequest);

        if((response instanceof Object)){
            setMessage("Deu Bom");
            // navigate("/dashboard");
        }else{
            setLoading(false);
            setMessage(response as string);
        }
    }

    if (user) {
        return <Navigate to="/dashboard" state={{ from: location }} replace />;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 pb-56">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 mb-20 text-center text-3xl font-extrabold text-gray-900">
                        Bem Vindo!
                    </h2>
                </div>
                <form className="mt-5 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">E-mail</label>
                            <input 
                                ref={emailRef}
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="E-mail"
                                value={formLogin}
                                onChange={e => setFormLogin(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Senha</label>
                            <input 
                                ref={passwordRef}
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Senha"
                                value={formPassword}
                                onChange={e => setFormPassword(e.target.value)}
                            />
                        </div>
                    </div>
    
                    <div>
                        <button 
                            type="submit"
                            className=" group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {loading ? 'Carregando...' : 'Entrar'}
                        </button>
                    </div>
    
                    {message && (
                        <div className="text-red-500 text-center mt-2">
                            {message}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
    
}
