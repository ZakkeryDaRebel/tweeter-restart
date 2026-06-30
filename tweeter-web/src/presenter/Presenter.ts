import { AuthToken, User } from "tweeter-shared";

export interface View {
  displayErrorMessage: (message: string) => void;
}

export interface MessageView extends View {
  displayInfoMessage: (
    message: string,
    duration: number,
    bootstrapClasses?: string | undefined,
  ) => string;
  deleteMessage: (messageId: string) => void;
}

export interface LoadingView extends View {
  setIsLoading: (isLoading: boolean) => void;
}

export interface NavigateView extends View {
  navigate: (featureUrl: string) => void;
}

export interface LoadingMessageView extends LoadingView, MessageView {}

export interface UpdateUserView extends View {
  updateUserInfo: (
    currentUser: User,
    displayedUser: User | null,
    authToken: AuthToken,
    remember: boolean,
  ) => void;
}

export abstract class Presenter<V extends View> {
  private _view: V;

  public constructor(view: V) {
    this._view = view;
  }

  protected async doFailureReportingOperation(
    operation: () => Promise<void>,
    operationDescription: string,
  ) {
    try {
      await operation();
    } catch (error) {
      this._view.displayErrorMessage(
        `Failed to ${operationDescription} because of exception: ${error}`,
      );
    }
  }

  protected async doFailureAndFinallyReportingOperation(
    operation: () => Promise<void>,
    operationDescription: string,
    finallyOperation: () => void,
  ) {
    try {
      await operation();
    } catch (error) {
      this._view.displayErrorMessage(
        `Failed to ${operationDescription} because of exception: ${error}`,
      );
    } finally {
      finallyOperation();
    }
  }

  protected get view() {
    return this._view;
  }
}
