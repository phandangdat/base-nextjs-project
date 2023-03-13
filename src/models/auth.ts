export interface ILogin {
  email: string;
  password: string;
}

export interface IRegisterCompany {
  companyName: string;
  companyNameFurigana: string;
  departmentName: string;
  departmentNameFurigana?: string;
  firstName: string;
  lastName: string;
  firstNameFurigana: string;
  lastNameFurigana: string;
  email: string;
  password: string;
  confirmPassword: string;
  homeUrl?: string;
  phoneNumber: string;
  postCode?: string;
  prefecture?: string;
  city?: string;
  address1?: string;
  address2?: string;
  purpose?: string;
  detailContact?: string;
}

export interface IRegisterIndividual {
  email: string;
  emailConfirmed: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  firstNameFurigana: string;
  lastNameFurigana: string;
  gender?: string;
  birthday: string;
  postCode: string;
  prefecture: string;
  city: string;
  address1: string;
  address2?: string;
  phoneNumber: {
    homeTel: string;
    mobileTel: string;
  };
  priority: string;
  notiVolunteer: boolean;
  notiEvent: boolean;
}
