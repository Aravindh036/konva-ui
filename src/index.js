import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import { Stage, Layer,Rect } from 'react-konva';

// const App=()=>{
//     return(<Stage width={1000} height={1000}>
//         <Layer>
//             <Rect draggable height={100} width={100} fill={'red'}  />
//         </Layer>
//     </Stage>)
// }


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
