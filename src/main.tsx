// main.tsx or index.tsx
// import React from 'react'
import ReactDOM from 'react-dom/client'
// import { Provider } from 'react-redux'
// import { store } from './store/store.ts'

// import { BrowserRouter as Router } from 'react-router-dom'
import RootCmp from './RootCmp'

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
  // <Provider store={store}>
  <RootCmp />
  // </Provider>
);