export class User {
  id!: string;
  first_name!: string;
  last_name!: string;
  email!: string;
  occupation!: string;
  bio!: string;

  isNull(): boolean {
    return (
      this.id === undefined &&
      this.first_name === undefined &&
      this.last_name === undefined &&
      this.email === undefined &&
      this.occupation === undefined &&
      this.bio === undefined
    );
  }
}
