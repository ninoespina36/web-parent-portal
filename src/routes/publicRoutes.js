import Register from '../pages/Auth/Register';

const publicRoutes = [
    {
        path: '/register',
        exact: true,
        auth: false,
        component: Register,
    },
];

export default publicRoutes;