import * as yup from 'yup';

export const registerAccountCompany = yup.object({
  companyName: yup.string().required().max(20),
  companyNameFurigana: yup.string().required().max(20),
  departmentName: yup.string().max(20),
  departmentNameFurigana: yup.string().max(20),
  firstName: yup.string().required().max(20),
  lastName: yup.string().required().max(20),
  firstNameFurigana: yup.string().required().max(20),
  lastNameFurigana: yup.string().required().max(20),
  email: yup.string().required(),
  password: yup.string().required().max(10).min(6),
  confirmPassword: yup.string().required().max(10).min(6),
  homeUrl: yup.string(),
  phoneNumber: yup.string().required().min(10).max(11),
  postCode: yup.string(),
  prefecture: yup.string(),
  city: yup.string().max(16),
  address1: yup.string().max(16),
  address2: yup.string().max(16),
});

export const registerAccountIndividual = yup.object({
  email: yup.string().required(),
  emailConfirmed: yup.string().required(),
  password: yup.string().required().max(10).min(6),
  confirmPassword: yup.string().required().max(10).min(6),
  firstName: yup.string().required().max(20),
  lastName: yup.string().required().max(20),
  firstNameFurigana: yup.string().required().max(20),
  lastNameFurigana: yup.string().required().max(20),
  gender: yup.string(),
  birthday: yup.string().required(),
  postCode: yup.string().required(),
  prefecture: yup.string().required(),
  city: yup.string().required().max(16),
  address1: yup.string().required().max(16),
  address2: yup.string().max(16),
  phoneNumber: yup
    .object({
      homeTel: yup.string().min(10).max(11),
      mobileTel: yup.string().min(10).max(11),
    })
    .test('oneOfRequired', 'Please enter home phone number or mobile number', (item) => {
      // ko được để trống cả hai trường (bắt buộc phải có một trường được điền vào)
      console.log('homeTel', item.homeTel);
      console.log('mobileTel', item.mobileTel);
      return item.homeTel === '' || item.mobileTel === '';
    }),

  notiVolunteer: yup.bool().required(),
  notiEvent: yup.bool().required(),
});

export const createContact = yup.object({
  name: yup.string().required().max(20),
  email: yup.string().required(),
  phone: yup.string(),
  content: yup.string().required().max(1000),
});

export const changePassword = yup.object({
  newPassword: yup.string().required().max(10).min(6),
  oldPassword: yup.string().required().max(10).min(6),
});

export const changeEmail = yup.object({
  newEmail: yup.string().required(),
});

export const changeUserInfoCompany = yup.object({
  companyName: yup.string().required().max(20),
  companyNameFurigana: yup.string().required().max(20),
  departmentName: yup.string().max(20),
  departmentNameFurigana: yup.string().max(20),
  firstName: yup.string().required().max(20),
  lastName: yup.string().required().max(20),
  firstNameFurigana: yup.string().required().max(20),
  lastNameFurigana: yup.string().required().max(20),
  phoneNumber: yup.string().required().min(10).max(11),
});

export const changeUserInfoIndividual = yup.object({
  firstName: yup.string().required().max(20),
  lastName: yup.string().required().max(20),
  firstNameFurigana: yup.string().required().max(20),
  lastNameFurigana: yup.string().required().max(20),
  gender: yup.string().required(),
  birthday: yup.string().required(),
  postCode: yup.string().required().max(7),
  prefecture: yup.string().required(),
  city: yup.string().required().max(16),
  address1: yup.string().required().max(16),
  address2: yup.string().required().max(16),
  phoneNumber: yup.string().required().min(10).max(11),
  homeTel: yup.string().required().min(10).max(11),
});
