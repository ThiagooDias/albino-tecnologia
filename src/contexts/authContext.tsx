import { FirebaseError } from "firebase/app";

import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";

import { get, ref } from "firebase/database";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../config/config_firebase";
import { URL } from "../constants/url";
import { REF_USUARIO_UID } from "../helpers/nosBanco";

type AuthContextType = {
    user: UserProps | undefined | null;
    login: (email: string, password: string) => Promise<1 | undefined>;
    logout: () => Promise<void>;
    isFetching: boolean;
    isAuthenticated: boolean;
};

type UserProps = {
    uid: string;
    nomeCompleto: string;
    dataNascimento?: Date;
    cns?: string;
    telefone: string;
    email: string;
    tipoUsuario: string;
    endereco?: {
        CEP: string;
        estado: string;
        bairro: string;
        numero: string;
        cidade: string;
        logradouro: string;
    };
};

type AuthContextProviderProps = {
    children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
    const [user, setUser] = useState<UserProps | null | undefined>(undefined);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        try {
            const unsubscribe = onAuthStateChanged(auth, async (user) => {
                setIsFetching(true);
                if (user) {
                    const { uid } = user;

                    const refUsuario = ref(db, REF_USUARIO_UID(uid));
                    const result = await get(refUsuario);

                    if (result.exists()) {
                        setUser(result.val());
                        setIsAuthenticated(true)
                    }
                    setIsFetching(false);
                } else {
                    setUser(null);
                    setIsFetching(false);
                }
            });

            return () => {
                unsubscribe();
            };
        } catch (error) {
            setIsFetching(false);
        }
    }, []);

    async function login(email: string, password: string) {
        try {
            const {
                user: { uid },
            } = await signInWithEmailAndPassword(auth, email, password);
            const refUsuario = ref(db, REF_USUARIO_UID(uid));
            const result = await get(refUsuario);

            if (result.exists()) {
                setUser(result.val());
                setIsAuthenticated(true)
            }
            
        } catch (error: FirebaseError | any) {
            console.log(error);
            return 1;
        }
    }

    async function logout() {
        try {
            await signOut(auth);
            setUser(null);
            setIsAuthenticated(false)
        } catch (error) {
            console.log("Erro ao sair");
        }
    }

    return (
        <AuthContext.Provider value={{ login, user, logout, isFetching, isAuthenticated }}>
            {props.children}
        </AuthContext.Provider>
    );
}
