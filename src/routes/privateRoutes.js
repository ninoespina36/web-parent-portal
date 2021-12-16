import Dashboard from '../pages/Dashboard';
import ParentInformation from '../pages/Auth/ParentInformation';
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
        path: '/parent-information',
        exact: true,
        auth: true,
        component: ParentInformation,
    },
    {
        path: '',
        exact: false,
        auth: false,
        component: NoMatch,
    },
]

export default privateRoutes;