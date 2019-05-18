// @flow

type TViewProps = {
  title: string,
  errors?: Array<{
    location: string,
    msg: string,
    param: string,
  }>,
  data?: {[string]: any},
}; 

export const loginViewFile = 'admin/login/index';
export const loginViewProps: TViewProps = {
  title: 'Login admin - Iniciar sesion',
  data: {
    email: '',
    pass: '',
  },
};

export const dashboardViewFile = 'admin/dashboard/index';
export const dashboardViewProps: TViewProps = {
  title: 'Admin - Dashboard',
};
