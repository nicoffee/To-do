import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
//import { combineReducers } from 'redux'
// import { Provider } from 'react-redux'
import './index.css'
//import App from './App'
import registerServiceWorker from './registerServiceWorker'
import expect from 'expect'
import deepFreeze from 'deep-freeze'


const todo = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                id: action.id,
                text: action.text,
                completed: false
            };
        case 'TOGGLE_TODO':
            if (state.id !== action.id) return state;

            return {
                ...state,
                completed: !state.completed
            };
        default:
            return state;
    }
}

const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                todo(state, action)
            ];
        case 'TOGGLE_TODO':
            return state.map(t => todo(t, action));
        default:
            return state;
    }
};

const visibilityFilter = (state = 'SHOW_ALL', action) => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
};

const combineReducers = (reducers) => {
    return (state = {}, action) => {
        return Object.keys(reducers).reduce(
          (nextState, key) => {
              nextState[key] = reducers[key](
                state[key],
                action
              );
              return nextState;
          },
          {}
        )
    };
};

// const todoApp = combineReducers({
//     todos: todos,
//     visibilityFilter: visibilityFilter
// });

// const todoApp = (state = {}, action) => {
//     return {
//         todos: todos(
//           state.todos,
//           action
//         ),
//         visibilityFilter: visibilityFilter(
//           state.visibilityFilter,
//           action
//         )
//     };
// };

// const { createStore } = Redux;
const store = createStore(todoApp);

console.log('Initial State:');
console.log(store.getState());
console.log('**************');

console.log('Dispatching ADD_TODO.');
store.dispatch({
    type: 'ADD_TODO',
    id: 0,
    text: 'Learn REdux'
});

console.log('Current State:');
console.log(store.getState());
console.log('**************');

console.log('Dispatching ADD_TODO.');
store.dispatch({
    type: 'ADD_TODO',
    id: 1,
    text: 'Learn Python'
});

console.log('Current State:');
console.log(store.getState());
console.log('**************');

console.log('Dispatching TOGGLE_TODO.');
store.dispatch({
    type: 'TOGGLE_TODO',
    id: 0
});

console.log('Current State:');
console.log(store.getState());
console.log('**************');

console.log('Dispatching SET_VISIBILITY_FILTER.');
store.dispatch({
    type: 'SET_VISIBILITY_FILTER',
    filter: 'SHOW_COMPLETED'
});

console.log('Current State:');
console.log(store.getState());
console.log('**************');

// const testAddTodo = () => {
//     const stateBefore = [];
//
//     const action = {
//         type: 'ADD_TODO',
//         id: 0,
//         text: 'Learn Redux'
//     };
//
//     const stateAfter = [
//         {
//             id: 0,
//             text: 'Learn Redux',
//             completed: false
//         }
//     ];
//
//     deepFreeze(stateBefore);
//     deepFreeze(action);
//
//     expect(
//       todos(stateBefore, action)
//     ).toEqual(stateAfter)
// };
//
// const testToogleTodo = () => {
//     const stateBefore = [
//         {
//             id: 0,
//             text: 'Learn Redux',
//             completed: false
//         },
//         {
//             id: 1,
//             text: 'Play PC',
//             completed: false
//         }
//     ];
//
//     const action = {
//         id: 1,
//         type: 'TOGGLE_TODO',
//     };
//
//     const stateAfter = [
//         {
//             id: 0,
//             text: 'Learn Redux',
//             completed: false
//         },
//         {
//             id: 1,
//             text: 'Play PC',
//             completed: true
//         }
//     ];
//
//     deepFreeze(stateBefore);
//     deepFreeze(action);
//
//     expect(
//       todos(stateBefore, action)
//     ).toEqual(stateAfter)
// };
//
// testAddTodo();
// testToogleTodo();
// console.log('All tests passed');