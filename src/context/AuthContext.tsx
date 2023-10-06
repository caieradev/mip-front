import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// TODO: Screens
// import { screens, screensPublics } from "../config/screens";

import { UserEntity, LoginRequestEntity } from "../entities/LoginEntity";
import { login } from "../services/ApiService";

type AuthContextProps = {
	user: any | undefined;
	routeActive: string;
	handleLogin: (loginRequest: LoginRequestEntity) => Promise<any>;
	handleLogout: () => void;
};

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export function useAuth(){
	return useContext(AuthContext);
}

type AuthProviderProps = {
    children: ReactNode;
}

export default function AuthProvider({children}: AuthProviderProps){

    const location = useLocation();
    const navigate = useNavigate();
	
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState<UserEntity | undefined>();
	const [routeActive, setRouteActive] = useState<string>("");

	useEffect(()=>{
		let routeActive : string | false = false;
		// screens.forEach((screen)=>{
		// 	if(screen.route===location.pathname){
		// 		routeActive = location.pathname;
		// 	}
		// });
		if(routeActive===false){
			// screensPublics.forEach((screen)=>{
			// 	if(screen.route===location.pathname){
			// 		routeActive = location.pathname;
			// 	}
			// });
		}
		if(routeActive!==false){
			setRouteActive(routeActive);
		}
	},[location]);

	useEffect(()=>{
		let userSession = localStorage.getItem("user");
		if(userSession){
			let userJson = JSON.parse(userSession);
			setUser(userJson);
		}

		setLoading(false);
	},[]);

	async function handleLogin(loginRequest: LoginRequestEntity){
		throw new Error("Not implemented");
	}

	function handleLogout(){
		setUser(undefined);
		localStorage.removeItem("user");
		navigate("/");
		return;
	}

    const value = {
		user,
		routeActive,
		handleLogin,
		handleLogout
	}

	if(loading){
		return <></>;
	}

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    )
}