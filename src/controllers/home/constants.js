// @flow

import {
  type TClient,
  emptyClient,
} from '../../models/Clients';

import {
  type TResidence,
  type TResidences,
  emptyResidence,
} from '../../models/Residences';

type TResidencesProps = {
  title: string,
  client: TClient,
  residences: TResidences,
  cities: Array<$PropertyType<TResidence, 'address_city'>>,
  errors?: Array<{
    location: string,
    msg: string,
    param: string,
  }>,
  searchParams: {
    city: string,
    start_date: string,
    end_date: string,
  },
}; 

export const residencesViewFile = 'home/residences/index';
export const residencesViewProps: TResidencesProps = {
  title: 'Home Switch Home - Bienvenido',
  client: emptyClient,
  residences: [],
  cities: [],
  searchParams: {
    city: '',
    start_date: '',
    end_date: '',
  },
};

// **************
//
// **************

type TResidenceProps = {
  title: string,
  client: TClient,
  residence: TResidence,
  didWeekHasBeenReservated: bool,
  errorMessage: string,
}; 

export const residenceViewFile = 'home/residence/index';
export const residenceViewProps: TResidenceProps = {
  title: 'Home Switch Home - Residencia',
  client: emptyClient,
  residence: emptyResidence,
  didWeekHasBeenReservated: false,
  errorMessage: '',
};
