import React, {Component} from "react";

class Auth {
    constructor() {
        this.authenticated = false;
    }

    login() {
       
        this.authenticated = true;
        localStorage.setItem("isAuth", true)
    }


    logout(cb) {
       
        localStorage.clear()

        cb();
    }

    isAuthenticated() {
        return this.authenticated
    }
}

export default new Auth();