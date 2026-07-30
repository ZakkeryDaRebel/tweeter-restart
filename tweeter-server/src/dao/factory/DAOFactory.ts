import { UserDAO } from "../user/UserDAO";

export class DAOFactory {
  private constructor() {}

  public static readonly userDAO: UserDAO;
}
