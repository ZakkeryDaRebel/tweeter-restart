import { ServerFacade } from "../network/ServerFacade";

export class Service {
  private _serverFacade = new ServerFacade();

  public get serverFacade() {
    return this._serverFacade;
  }
}
