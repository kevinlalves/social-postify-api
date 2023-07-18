import { IsArray, IsDate, IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreatePublicationDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  text: string;

  images: Express.Multer.File[];

  @IsNotEmpty()
  @IsDateString()
  publishAt: string;

  @IsArray()
  @IsString({ each: true })
  platformIds: string[];
}
