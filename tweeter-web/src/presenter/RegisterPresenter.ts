import { UserService } from "../model.service/UserService";
import { Buffer } from "buffer";
import {
  LoadingView,
  NavigateView,
  Presenter,
  UpdateUserView,
  View,
} from "./Presenter";

export interface RegisterView
  extends View, LoadingView, NavigateView, UpdateUserView {
  setImageUrl: (url: string) => void;
}

export class RegisterPresenter extends Presenter<RegisterView> {
  private service: UserService;
  private _rememberMe: boolean;
  private imageBytes: Uint8Array;
  private imageFileExtension: string;

  public constructor(view: RegisterView) {
    super(view);
    this.service = new UserService();
    this._rememberMe = false;
    this.imageBytes = new Uint8Array();
    this.imageFileExtension = "";
  }

  public async register(
    firstName: string,
    lastName: string,
    alias: string,
    password: string,
  ) {
    this.doFailureAndFinallyReportingOperation(
      async () => {
        this.view.setIsLoading(true);

        const [user, authToken] = await this.service.register(
          firstName,
          lastName,
          alias,
          password,
          this.imageBytes,
          this.imageFileExtension,
        );

        this.view.updateUserInfo(user, user, authToken, this._rememberMe);
        this.view.navigate(`/feed/${user.alias}`);
      },
      "register user",
      () => {
        this.view.setIsLoading(false);
      },
    );
  }

  public handleImageFile(file: File | undefined) {
    if (file) {
      this.view.setImageUrl(URL.createObjectURL(file));

      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const imageStringBase64 = event.target?.result as string;

        // Remove unnecessary file metadata from the start of the string.
        const imageStringBase64BufferContents =
          imageStringBase64.split("base64,")[1];

        const bytes: Uint8Array = Buffer.from(
          imageStringBase64BufferContents,
          "base64",
        );

        this.imageBytes = bytes;
      };
      reader.readAsDataURL(file);

      // Set image file extension (and move to a separate method)
      const fileExtension = this.getFileExtension(file);
      if (fileExtension) {
        this.imageFileExtension = fileExtension;
      }
    } else {
      this.view.setImageUrl("");
      this.imageBytes = new Uint8Array();
    }
  }

  public getFileExtension(file: File): string | undefined {
    return file.name.split(".").pop();
  }

  public set rememberMe(value: boolean) {
    this._rememberMe = value;
  }
}
