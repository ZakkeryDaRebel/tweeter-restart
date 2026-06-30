import { Buffer } from "buffer";
import {
  AuthenticationPresenter,
  AuthenticationView,
} from "./AuthenticationPresenter";
import { User, AuthToken } from "tweeter-shared";

export interface RegisterView extends AuthenticationView {
  setImageUrl: (url: string) => void;
}

export class RegisterPresenter extends AuthenticationPresenter<RegisterView> {
  private imageBytes: Uint8Array;
  private imageFileExtension: string;

  public constructor(view: RegisterView) {
    super(view);
    this.imageBytes = new Uint8Array();
    this.imageFileExtension = "";
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

  protected async authenticationOperation(
    alias: string,
    password: string,
    firstName?: string,
    lastName?: string,
  ): Promise<[User, AuthToken]> {
    return await this.service.register(
      firstName!,
      lastName!,
      alias,
      password,
      this.imageBytes,
      this.imageFileExtension,
    );
  }

  protected authenticationDescription(): string {
    return "register user";
  }

  protected getDestinationUrl(user: User): string {
    return this.defaultDestinationUrl(user);
  }
}
