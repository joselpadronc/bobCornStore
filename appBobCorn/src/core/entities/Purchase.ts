export class Purchase {
  public readonly id: string;
  public readonly username: string;
  public readonly quantity: number;

  constructor(
    id: string,
    username: string,
    quantity: number,
  ) {
    this.id = id;
    this.username = username;
    this.quantity = quantity;
  }

  static create(data: {
    username: string
    quantity: number
  }): Purchase {
    return new Purchase(
      crypto.randomUUID(),
      data.username,
      data.quantity,
    )
  }
}
