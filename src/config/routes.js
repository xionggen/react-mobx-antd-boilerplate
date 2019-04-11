import Login from '../views/login';
import Project from '../views/project';
import Finance from '../views/finance';
import NotFound from '../views/404';
import NoPermission from '../views/403';

export default [
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/project',
        component: Project,
    },
    {
        path: '/finance',
        component: Finance,
    },
    {
        path: '/404',
        component: NotFound,
    },
    {
        path: '/403',
        component: NoPermission,
    }
]