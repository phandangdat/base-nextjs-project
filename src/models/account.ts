export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
}

export interface IChangeEmail {
  newEmail: string;
}

export interface IChangeEmailConfirm {
  code: string;
}

export interface IChangeInfoUserCompany {
  companyName: string;
  companyNameFurigana: string;
  departmentName: string;
  departmentNameFurigana: string;
  firstName: string;
  lastName: string;
  firstNameFurigana: string;
  lastNameFurigana: string;
  postCode: string;
  address1: string;
  address2: string;
  phoneNumber: string;
}

export interface IChangeInfoIndividual {
  firstName: string;
  lastName: string;
  firstNameFurigana: string;
  lastNameFurigana: string;
  gender: string;
  birthday: string;
  postCode: string;
  address1: string;
  address2: string;
  phoneNumber: string;
  homeTel: string;
  priorityPhone: string;
}

export interface IDeleteUser {
  reason: string;
}
