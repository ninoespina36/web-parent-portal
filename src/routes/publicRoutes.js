import ParentInformation from '../pages/Auth/ParentInformation';
import Register from '../pages/Auth/Register';

const publicRoutes = [
    {
        path: '/register',
        exact: true,
        auth: false,
        component: Register,
    },
    {
        path: '/parent-information/:data',
        exact: true,
        auth: false,
        component: ParentInformation,
    },
];

export default publicRoutes;