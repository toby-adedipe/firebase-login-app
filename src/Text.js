import React,{Component} from 'react';

var firebase = require('firebase');
var config = {
    apiKey: "AIzaSyBqKsGMUf3__narXPIq8DzGcW-e6Xriuvg",
    authDomain: "survey-app-e6828.firebaseapp.com",
    databaseURL: "https://survey-app-e6828.firebaseio.com",
    projectId: "survey-app-e6828",
    storageBucket: "survey-app-e6828.appspot.com",
    messagingSenderId: "515355010863"
};
firebase.initializeApp(config);


class Text extends Component {
    constructor(props){
        super(props);
    

        this.state={
            error: ''
        };
        this.login = this.login.bind(this);
        this.signup = this.signup.bind(this);
        this.logout = this.logout.bind(this);

    }

    login(event){
        const email = this.refs.email.value;
        const password = this.refs.password.value;


        const auth = firebase.auth();

        auth.signInWithEmailAndPassword(email, password)
            .then(user =>{
                var lout = document.getElementById('logout');
                lout.classList.remove('hide');
                const err = "Welcome back "+ user.user.email;
                this.setState({
                    error: err
                })
            })
            .catch(e=>{
                var err = e.message;
                this.setState({
                    error: err
                })
            });
    }

    signup(event){
        const email = this.refs.email.value;
        const password = this.refs.password.value;

        console.log(email,password)
        const auth = firebase.auth();

        auth.createUserWithEmailAndPassword(email, password)
            .then(user =>{
                var err = "welcome "+ user.user.email;
                firebase.database().ref('/users/'+user.user.uid).set({
                    email: user.user.email
                });
                console.log(user)
                this.setState({
                    error: err
                })
            })
            .catch(e=>{
                var err = e.message;
                console.log(err);
                this.setState({
                    error: err
                })
            })
    }

    logout(event){
        firebase.auth().signOut();
        var lout = document.getElementById('logout');
        const err = "Thanks for coming back"

        this.setState({
            error: err
        })
        lout.classList.add('hide');
    }

    render(){
        return(
            <div>
                <input id="email" ref="email" type="email" placeholder="Enter your email" /><br />
                <input id="pass" ref="password" type="password" placeholder="Enter your password" /><br />

                <button onClick={this.login}>Log in</button>
                <button onClick={this.signup}>Sign up</button>
                <button onClick={this.logout} id="logout" className="hide">Log out</button>
                <p>{this.state.error}</p>
            </div>
        )
    }
}

export default Text;