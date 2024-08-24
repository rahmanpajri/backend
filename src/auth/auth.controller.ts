import { Controller, Post, Req, Res, Logger, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { LocalAuthGuard } from './local.auth.guard';
import { TokenBlacklistService } from '../token-blacklist/token-blacklist.service';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly authService: AuthService,
    private readonly tokenBlacklistService: TokenBlacklistService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    this.logger.log('Login request received');
    return this.authService.login(req.user);
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    const authHeader = req.headers['authorization'];
    
    // Check if authorization header is present
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      
      // Add the token to the blacklist
      if (token) {
        await this.tokenBlacklistService.addTokenToBlacklist(token);
      }

      // Send a success response
      res.status(200).send({ message: 'Logged out successfully' });
    } else {
      // Send an error response if authorization header is missing
      res.status(400).send({ message: 'Authorization header not found' });
    }
  }
}
