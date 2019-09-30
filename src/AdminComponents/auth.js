import React, {Component} from "react";

class Auth {
    constructor() {
        this.authenticated = false;
    }

    login() {
       
        this.authenticated = true;
    }

    logout(cb) {
        this.authenticated = false;
        localStorage.clear()
      //  history.push('/')   
        cb();
    }

    isAuthenticated() {
        return this.authenticated
    }
}

export default new Auth();