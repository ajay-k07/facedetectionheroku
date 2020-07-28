import React from 'react';

const Navigation =({onRouteChange , isSignedIn}) =>{
	
		if(isSignedIn){
			return(
			<div>
			<nav style={{display:'flex', justifyContent:'flex-end'}}>
				<p onClick={()=> onRouteChange('signout')} className='f3 link dim black underline pa3 pointer left'>sign out</p>
			</nav>
			</div>
			);
		} 
		else
		{
			return(
				<div>
				<nav style={{display:'flex', justifyContent:'flex-end'}}>
					<p onClick={()=> onRouteChange('register')} className='f3 link dim black underline pa3 pointer left'>Register</p>
	                <p onClick={()=> onRouteChange('Signin')} className='f3 link dim black underline pa3 pointer left'>sign in</p>
				</nav>
				</div>
				);
		}
	
}
export default Navigation;