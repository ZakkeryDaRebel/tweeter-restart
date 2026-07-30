export interface ImageDAO {
  createImage(imageStringBase64: string, imageFileExtension: string): string;
}
