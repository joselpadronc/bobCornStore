export class User {
  public readonly id: string;
  public readonly username: string;

  constructor(
    id: string,
    username: string,
  ) {
    this.id = id;
    this.username = username;
  }

  static create(username: string): User {
    return new User(crypto.randomUUID(), username.trim())
  }

  isValid(): boolean {
    return this.username.length >= 2 && this.username.length <= 50
  }
}
