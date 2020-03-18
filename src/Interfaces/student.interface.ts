export interface IStudent extends Document {
  name: string;
  fatherName: string;
  DOB: string;
  dateOfAdmission: string;
  placeOfBirth: string;
  sex: string;
  nationality: string;
  address: string;
  telephone: string;
  mobile: string;
  classes: string;
  admissionFee: { total: Number; paid: Number };
  fee: { total: Number; paid: Number };
}
