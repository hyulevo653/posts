import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiTags } from "@nestjs/swagger";
import { RegisterUserDto } from "src/user/dto/register-user.dto";
import { LoginUserDto } from "src/user/dto/login-user.dto";
export @Controller()
@ApiTags('auth')
@Controller('auth')
class AuthController{
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