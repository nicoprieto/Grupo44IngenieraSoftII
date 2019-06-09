// @flow

type TLoginProps = {
  title: string,
  errors?: Array<{
    location: string,
    msg: string,
    param: string,
  }>,
  data: {
    email: string,
    pass: string,
  },
}; 

export const loginViewFile = 'admin/login/index';
export const loginViewProps: TLoginProps = {
  title: 'Login admin - Iniciar sesion',
  data: {
    email: '',
    pass: '',
  },
};

// *********************
//
// *********************

type TDashboardProps = {
  title: string,
};

export const dashboardViewFile = 'admin/dashboard/index';
export const dashboardViewProps: TDashboardProps = {
  title: 'Admin - Dashboard',
};

// *********************
//
// *********************
