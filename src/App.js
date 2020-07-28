import React, {Component} from 'react';
import Particles from 'react-particles-js';

import Navigation from './components/navigation/Navigation.js'
import Logo from './components/logo/Logo.js'
import ImageLinkForm from './components/imagelink/ImageLinkForm.js'
import Rank from './components/rank/Rank.js'
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js'
import Signin from './components/signin/Signin.js'
import Register from './components/Register/Register.js'
import './App.css';






const ParticlesOption = {
      "particles": {
          "number": {
              "value": 100
          },
          "size": {
              "value": 3
          }
      },
      "interactivity": {
          "events": {
              "onhover": {
                  "enable": true,
                  "mode": "repulse"
              }
          }
      }
  }
 
 const initialState ={
    input:'',
    imageUrl:'',
    box:{},
    route:'Signin',
    isSignedIn:false,
    user:{
      id:'',
    name:'',
    email: '',
    entries:0,
    joined:''
    }
   }

class App extends Component {
  constructor(){
   super();
   this.state=initialState;
 }

//  componentDidMount(){
//   fetch(https://floating-journey-74814.herokuapp.com//').then(response=> response.json()).then(data=>console.log(data));
// }
  loadUser =(data)=>{
    this.setState({user:{
      id:data.id,
    name:data.name,
    email: data.email,
    entries:data.entries,
    joined:data.joined

    }})

  }

 

  displayFaceBox = (box) => {
    this.setState({box: box});
  }


 onSubmit=()=>{
  this.setState({imageUrl: this.state.input});
  fetch('https://floating-journey-74814.herokuapp.com/imageurl',{
          method:'post',
          headers:{'content-Type':'application/json'},
          body:JSON.stringify({
            input:this.state.input
          })
        })
  .then(response=>response.json())
  .then(response=> {
      if(response){
        fetch('https://floating-journey-74814.herokuapp.com/image',{
          method:'put',
          headers:{'content-Type':'application/json'},
          body:JSON.stringify({
            id:this.state.user.id
          })
          })
            .then(response=>response.json()).then(count =>{
              this.setState(Object.assign(this.state.user,{entries:count}))
            })
            .catch(console.log)
      
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
  .catch(error=>console.log(error));
 }

 onInputChange=(event)=>{
    this.setState({input:event.target.value});
  }
 onRouteChange=(route)=>{
  if(route=== 'signout'){
    this.setState(initialState)
  }else if(route === 'home'){
    this.setState({isSignedIn:true})
  }
  this.setState({route:route});
 }
 calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }
  render(){
  return (
    <div className="App">
      <Particles className='particles'
        params={ParticlesOption}
      />
      <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
      {  this.state.route === 'home'
      ?<div><Logo />
      <Rank name={this.state.user.name} entries={this.state.user.entries}/>
      <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
      <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} /></div>
    
    :(
      this.state.route==='Signin'
      ?<Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
      :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
      )
      }
  </div>
  );
}
}
export default App;
