import React, {useState, useEffect} from "react";
import * as firebase from "firebase";

import Loading from "../Profile/loading"
import UserGuest from "../Profile/Login"
import UserLogged from "../Profile/Profile"

// Internationalization
import i18n from '../../locales/i18n';

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
            <Loading isVisible={true} text={i18n.t('myAccount.loading')}/>
        )
    }

    return login ? <UserLogged/> : <UserGuest/>
}
