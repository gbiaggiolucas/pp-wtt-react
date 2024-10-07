import './App.css';
import Home from './components/Home';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Main from './components/Main';
import Metas from './components/Metas';
import Config from './components/Config';
import { ThemeProvider } from './components/context/ThemeContext';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/signin",
    element: <Signin />
  },
  {
    path: "/main",
    element: <Main />
  },
  {
    path: "/config",
    element: <Config />
  },
  {
    path: "/metas",
    element: <Metas />
  },
]);

function App() {
  return (
    <ThemeProvider>
      <div className="App">
          <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  );
}

export default App;