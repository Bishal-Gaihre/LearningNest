import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service"
import { SignupDto } from "./dto/signup.dto";
import { LoginDto } from "./dto/login.dto";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor (private readonly authService: AuthService) {}

    @Post('signup')
    @ApiOperation({summary: 'register a new user'})
    @ApiResponse({ status: 201, description: 'user successfully created, return JWT token.'})
    signup(@Body() dto: SignupDto) {
        return this.authService.signup(dto)
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    @ApiOperation({ summary: 'Login in with existing credentials'})
    @ApiResponse({ status: 401, description: 'Invalid credentials.'})
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }
}