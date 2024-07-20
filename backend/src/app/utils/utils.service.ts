import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as moment from 'moment';

@Injectable()
export class UtilsService {
  @Inject(ConfigService)
  private readonly config: ConfigService;

  getTimezone(): string {
    const d = new Date().toString();
    return (
      d
        .substring(d.search('GMT'), d.length)
        .split(' ')[0]
        .split('GMT')[1]
        .substring(0, 3) +
      ':' +
      d
        .substring(d.search('GMT'), d.length)
        .split(' ')[0]
        .split('GMT')[1]
        .substring(3)
    );
  }

  getYYYYMMDDDateFormat(date: Date, includeTime = true): string {
    try {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');

      return `${date.getFullYear()}-${month}-${day}${
        includeTime
          ? ` ${date.getUTCHours()}:${date.getMinutes()}:${date.getSeconds()}`
          : ''
      }`;
    } catch (error) {
      throw new Error(
        `${UtilsService.name}(getYYYYMMDDDateFormat): ${error.message}`,
      );
    }
  }

  isValidDate(dateString: string): boolean {
    const date = moment(dateString, 'YYYY-MM-DD', true);
    return date.isValid();
  }

  clearUrlPath(url: string): string {
    return url.charAt(url.length - 1) === '/'
      ? url.substring(0, url.length - 1)
      : url;
  }

  basePath(): string {
    const envBasePath = this.config.get<string>('BASEPATH');
    return envBasePath && envBasePath.length > 1
      ? envBasePath.charAt(envBasePath.length - 1) === '/'
        ? envBasePath.substring(0, envBasePath.length - 1)
        : envBasePath
      : '';
  }
}
