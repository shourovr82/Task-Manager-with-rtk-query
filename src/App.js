import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import { Provider } from 'react-redux';
import { store } from './redux/app/store';

function App() {
  return (
    <Provider store={store} className="App">
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
