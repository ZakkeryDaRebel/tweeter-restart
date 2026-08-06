import {
  ObjectCannedACL,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { ImageDAO } from "./ImageDAO";

export class S3ImageDAO implements ImageDAO {
  private readonly bucketName = "bucket-name";
  private readonly regionArea = "region";

  async createImage(
    imageStringBase64: string,
    imageFileExtension: string,
    userAlias: string,
  ): Promise<string> {
    let decodedImageBuffer: Buffer = Buffer.from(imageStringBase64, "base64");
    const keyName: string = "image/" + userAlias + "." + imageFileExtension;
    const s3Params = {
      Bucket: this.bucketName,
      Key: keyName,
      Body: decodedImageBuffer,
      ContentType: "image/" + imageFileExtension,
      ACL: ObjectCannedACL.public_read,
    };
    const client = new S3Client({ region: this.regionArea });
    try {
      await client.send(new PutObjectCommand(s3Params));
      return `https://${this.bucketName}.s3.${this.regionArea}.amazonaws.com/image/${keyName}`;
    } catch (error) {
      throw Error("s3 put image failed with: " + (error as Error).message);
    }
  }
}
