import { Counter } from "./components/Counter";
import FetchData from "./components/FetchData";
import FetchDataCustom from "./components/FetchDataCustom";
import { Home } from "./components/Home";

// import our users pages
import { Users } from './components/users/Users';
import { Login } from './components/users/Login';
import { Register } from './components/users/Register';

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
  },
  {
    path: '/fetch-data-custom',
    element: <FetchDataCustom />
  },

  {
    path: '/users',
    element: <Users />
  },
  {
        path: '/login',
        element: <Login />
    },
  {
        path: '/register',
        element: <Register />
    }
];

export default AppRoutes;
