import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DefaultService } from 'src/app/defaults/defatul.service';

@Injectable()
export class ApiService extends DefaultService {
  @Inject(ConfigService)
  private readonly config: ConfigService;

  constructor() {
    super(ApiService);
  }

  getInfo(): any {
    return {
      description: this.config.get<string>('DESCRIPTION'),
      version: '1.1.1',
    };
  }
}
