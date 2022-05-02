import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './index.css';
import { Suspense, lazy } from 'react';
import useToken from './components/useToken';

import ProtectedRoute from './components/protectedRoute';
// import remToken from './useToken';



import Home from './components/Home'
import About from './components/About'
import Apartment from './components/Apartments'
import Account from './components/Account'
import Register from './components/Register'
import Login from './components/Login'
import Logout from './components/Logout'
import Userprofile from './components/User'
import Navigation from './components/NotFound'
import Tokentest from './components/Tes'
import Product from './components/PostProduct'
import Forgotpassword from './components/Forgotpassword'
import Resetpassword from './components/Resetpassword';



// const Home = lazy(() => import('./components/Home'));
// const About = lazy(() => import('./components/About'));
// const Apartment = lazy(() => import('./components/Apartments'));
// const Account = lazy(() => import('./components/Account'));
// const Choice = lazy(()=> import('./components/Choicetrade'));
// const Register = lazy(()=> import('./components/Register'));
// const Login = lazy(()=> import('./components/Login'));
// const User = lazy(()=> import('./components/User'));
// const NotFound = lazy(() => import('./components/NotFound'));



function App() {
    
    // const [isAuthenticated, setisAthenticated] = useState(false)
    // const [token, setToken] = useState();

    
    // if(!token) {
    //     return (
    //             // <Login setToken={setToken} />
    //             <Router>
    //                 <Login setToken={setToken} component={Login} />
    //                 <Register component={Register}/>
    //            </Router>
    //     )
    //   }
        return(
            <Router>
                <Suspense fallback={<div>Please wait...</div>}>
                    <Switch>
                    <ProtectedRoute exact strict path="/" component={Home} title="Home"/>
                    <Route exact strict path="/About" component={About}/>
                    {/* <Route exact strict path="/Apartments" component={Apartment}/> */}
                    <Route exact strict path="/Account" component={Account}/>
                    <Route exact strict path="/Register" component={Register}/>
                    <Route exact strict path="/Logout" component={Logout}/>
                    <Route exact strict path="/Login" component={Login}/>
                    <Route exact strict path="/PostProduct" component={Product}/>
                    <Route exact strict path="/Forgotpassword" component={Forgotpassword}/>
                    <Route path="/Resetpassword" component={Resetpassword}/>
                    <Route exact strict path="/User" component={Userprofile}/>
                    <Route exact strict path="/Tes" component={Tokentest}/>
                    <Route exact strict path="*" component={Navigation}/>     
                     </Switch>
                </Suspense>
            </Router>
            
        );
}


export default App;
