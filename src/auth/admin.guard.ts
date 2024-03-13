import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    if (!request.user.is_admin) {
      throw new ForbiddenException('관리자만 공연 등록 가능합니다.');
    }
    return true;
  }
}