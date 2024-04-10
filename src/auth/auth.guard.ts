import { Injectable, CanActivate, ExecutionContext, BadRequestException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor( private jwtService : JwtService,
    private userService : UserService
  ){}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();

    //1 get token from header
    const token = request.headers.authorization.split(' ')[1];
    if(!token){
      throw new BadRequestException('Please provide access token');
    }
    //2 jwtVerify validate token
    const payload = await this.jwtService.verifyAsync(token,{
      secret : process.env.JWT_SECRET
    })
    //3 find user in db based
    const user = await this.userService.findByEmail(payload.email);
    console.log(user);
    if(!user){
      throw new BadRequestException("User not belong to token,please try again");
    }
    //4 Asssign user to request object
    } catch (error) {
      throw new ForbiddenException('Invalid token or expired');
    }
    return true;
  }
}