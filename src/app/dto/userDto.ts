export default class UserDTO {
  firstName: string;
  lastName: string;

  constructor(model: any) {
    this.firstName = model.firstName;
    this.lastName = model.lastName;
  }
}
