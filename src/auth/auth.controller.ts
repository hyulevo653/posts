import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiBasicAuth, ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { RegisterUserDto } from "src/user/dto/register-user.dto";
import { LoginUserDto } from "src/auth/dto/login-user.dto";
import { AuthGuard } from "./auth.guard";

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController{
    constructor(private authService : AuthService){

    }

    @Post("/register")
    registerUser(@Body() requestBody: RegisterUserDto){
       return this.authService.register(requestBody)
    }
    //Post login
    @HttpCode(HttpStatus.OK)
    @Post('/login')
    signIn(@Body() signInDto: LoginUserDto) {
        return this.authService.signIn(signInDto);
    }
    
}