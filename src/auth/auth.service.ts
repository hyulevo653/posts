import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { RegisterUserDto } from "src/user/dto/register-user.dto";
import { UserService } from "src/user/user.service";
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from "./dto/login-user.dto";

@Injectable()
export class AuthService{
    constructor(
        private jwtService: JwtService,
        private userService : UserService

    ) {}

    async signIn(requestBody: LoginUserDto) {
        const userbyEmail = await this.userService.findByEmail(requestBody.email);
        if(!userbyEmail){
            throw new BadRequestException('Invalid Credentials');
        }
        // check password
        const isMatchPassword = await bcrypt.compare(requestBody.password,userbyEmail.password);
        if(!isMatchPassword){
            throw new BadRequestException('Invalid Credentials');
        }
        const payload =  {
            id : userbyEmail.id,
            email : userbyEmail.email,
            firstName : userbyEmail.firstName,
            lastName : userbyEmail.lastName,
            roles : userbyEmail.role
        }
        const access_token = await this.jwtService.signAsync(payload,{
            secret: process.env.JWT_SECRET,
        });
        return {
            msg : 'Đăng nhập thành công',
            access_token
        }

      }

     async register(requestBody: RegisterUserDto){
           //kiem tra email da ton tai
           const userByEmail = await this.userService.findByEmail(requestBody.email);
           if(userByEmail){
            throw new BadRequestException('email đã tồn tại!');
           }
           // hash password 
           const hashPassword = await bcrypt.hash(requestBody.password,10)
           requestBody.password = hashPassword;
           //save to db
            const saveUser = await this.userService.create(requestBody);
            //generate jwt token
            const payload =  {
                id : saveUser.id,
                firstName : saveUser.firstName,
                lastName : saveUser.lastName,
                email :saveUser.email,
                roles : saveUser.role
            }
            const access_token = await this.jwtService.signAsync(payload,{
                secret: process.env.JWT_SECRET,
            });
            return {
                msg : 'Thêm mới thành công user',
                access_token
            }

    }
}
