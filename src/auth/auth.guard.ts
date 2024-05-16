import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const correctSecret = this.configService.get('RAPID_PROXY_SECRET');
    if (!correctSecret) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const requestSecret = this.getProxySecret(request);
    if (!requestSecret) {
      throw new UnauthorizedException();
    }

    if (correctSecret !== requestSecret) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private getProxySecret(request: Request): string | undefined {
    const header = request.headers['x-rapidapi-proxy-secret'];

    return Array.isArray(header) ? header[0] : header;
  }
}
