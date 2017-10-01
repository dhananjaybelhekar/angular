import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

function formatName(user) {
    return user.firstName + ' ' + user.lastName;
  }
  
  const user = {
    firstName: 'Harper',
    lastName: 'Perez'
  };
  const element = (
    <h1>
      Hello, {formatName(user)}!
    </h1>
  );

//const element = <h1>Hello, world</h1>;
ReactDOM.render(
  element,
  document.getElementById('rt2')
);

function tick() {
    const element = (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {new Date().toLocaleTimeString()}.</h2>
      </div>
    );

    ReactDOM.render(
        element,
        document.getElementById('rt')
      );
}
  setInterval(tick, 1000);

  function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
  }
  
  const elementSara = <Welcome name="Sara" />;
  ReactDOM.render(
    elementSara,
    document.getElementById('rt3')
  );