import { Module } from "@nestjs/common";
import { AuthController } from './auth.controller'
import { AuthService } from "./auth.service";
import { UserModule } from "src/user/user.module";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "src/user/user.controller";
import { RegisterUserDto } from "src/user/dto/register-user.dto";
import { User } from "src/user/entities/user.entity";
@Module({
    imports: [
        UserModule,
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
          global: true,
          signOptions: { expiresIn: '60s' },
        }),
    ],
    controllers: [
        AuthController,
    ],
    providers: [AuthService],
    exports: [AuthService],
})
export class AuthModule {}