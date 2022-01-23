import loginService from './login.service.';

const loginRoutes = [
  {
    method: 'POST' as const,
    url: '/login',
    handler: loginService.loginUser,
  },
];

export default loginRoutes;
