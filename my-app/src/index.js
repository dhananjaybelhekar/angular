import React from 'react';
import ReactDOM from 'react-dom';
import './bootstrap.css';
import App from './App';
import Toggle from './Toggle';
import registerServiceWorker from './registerServiceWorker'; 

function Show(props){
  return <div class="alert alert-danger" role="alert">
  {props.name}
</div>;
}

function Welcome(props) {
  return (<div class="container-fluid">
    <Show name="local msg"/>
  </div>);
}
const element = <Welcome name="anjali"/>;




  
ReactDOM.render(
  element,
  document.getElementById('root')
);

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

// function formatName(user) {
//     return user.firstName + ' ' + user.lastName;
//   }
  
//   const user = {
//     firstName: 'Harper',
//     lastName: 'Perez'
//   };
//   const element = (
//     <h1>
//       Hello, {formatName(user)}!
//     </h1>
//   );

// //const element = <h1>Hello, world</h1>;
// ReactDOM.render(
//   element,
//   document.getElementById('rt2')
// );

// function tick() {
//     const element = (
//       <div>
//         <h1>Hello, world!</h1>
//         <h2>It is {new Date().toLocaleTimeString()}.</h2>
//       </div>
//     );

//     ReactDOM.render(
//         element,
//         document.getElementById('rt')
//       );
// }
//   setInterval(tick, 1000);

//   function Welcome(props) {
//     return <h1>Hello, {props.name}</h1>;
//   }
  
//   const elementSara = <Welcome name="Sara" />;
//   ReactDOM.render(
//     elementSara,
//     document.getElementById('rt3')
//   );
  
//   ReactDOM.render(<Toggle />, document.getElementById('rt4'));



//   function UserGreeting(props) {
//     return <h1>Welcome back!</h1>;
//   }
  
//   function GuestGreeting(props) {
//     return <h1>Please sign up.</h1>;
//   }

//   function Greeting(props) {
//     const isLoggedIn = props.isLoggedIn;
//     if (isLoggedIn) {
//       return <UserGreeting />;
//     }
//     return <GuestGreeting />;
//   }
  
//   ReactDOM.render(
//     // Try changing to isLoggedIn={true}:
//     <Greeting isLoggedIn={false} />,
//     document.getElementById('root5')
//   );



//   class NameForm extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {value: ''};
  
//       this.handleChange = this.handleChange.bind(this);
//       this.handleSubmit = this.handleSubmit.bind(this);
//     }
  
//     handleChange(event) {
//         console.log(event.target)
//       this.setState({value: event.target.value});
//     }
  
//     handleSubmit(event) {
//       alert('A name was submitted: ' + this.state.value);
//       event.preventDefault();
//     }
  
//     render() {
//       return (
//         <form onSubmit={this.handleSubmit}>
//           <label>
//             Name:
//             <input type="text" value={this.state.value} onChange={this.handleChange} />
//           </label>
//           <input type="submit" value="Submit" />
//         </form>
//       );
//     }
//   }

//   ReactDOM.render(<NameForm />, document.getElementById('rt6'));