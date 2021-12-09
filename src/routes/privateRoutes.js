import Dashboard from '../pages/Dashboard';
import Login from '../pages/Auth/Login';

import NoMatch from '../pages/NoMatch';

const privateRoutes = [
    {
        path: '/',
        exact: true,
        auth: true,
        component: Dashboard,
        fallback: Login,
    },
    {
        path: '',
        exact: false,
        auth: false,
        component: NoMatch,
    },
]

export default privateRoutes;