import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.sass';
import ReactMemo from './components/ReactMemo';

const App = () => (
  <React.Fragment>
    <ReactMemo />
  </React.Fragment>
);

ReactDOM.render(<App />, document.getElementById('root'));