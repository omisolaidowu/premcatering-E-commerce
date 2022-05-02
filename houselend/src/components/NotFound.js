import { NavLink } from 'react-router-dom'


const Navigation = () =>{

    return(
        <div>
            
            <nav className = 'main-nav'>
                
                <ul>
                    <li><NavLink className='nav' to = '/'>Home</NavLink></li>
                    <li><NavLink className='nav' to = '/About'>About</NavLink></li>
                    <li><NavLink className='nav' to = '/Account'>Account</NavLink></li>
                    <li><NavLink className='nav' to = '/Apartments'>Apartments Shops</NavLink></li>
                </ul>
            </nav>
            <h1 className = 'exist'>Error 404: Ooops! That page doesn't exist</h1>
        </div>
    )
    
    

}

export default Navigation;

