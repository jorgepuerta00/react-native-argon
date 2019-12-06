import React, {useState, useEffect} from "react";
import * as firebase from "firebase";

import Loading from "../Profile/loading"
import UserGuest from "../Profile/Login"
import UserLogged from "../Profile/Profile"

export default function MyAccount(){
    const [login, setLogin] = useState(null);

    useEffect(() => {
            firebase.auth().onAuthStateChanged(user => {
                    !user ? setLogin(false) : setLogin(true);
                }
            );
        }
    )

    if(login === null){
        return (
            <Loading isVisible={true} text="Cargando..."/>
        )
    }

    return login ? <UserLogged/> : <UserGuest/>
}
