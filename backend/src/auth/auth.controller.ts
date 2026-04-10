import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterBuyerDto } from './dto/register-buyer.dto';
import { RegisterSellerDto } from './dto/register-seller.dto';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

// 7 days in milliseconds
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: COOKIE_MAX_AGE,
};

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ── POST /auth/register/buyer ─────────────────────────────────────────────

  @Post('register/buyer')
  async registerBuyer(
    @Body() dto: RegisterBuyerDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user, token } = await this.authService.registerBuyer(dto);
    res.cookie('access_token', token, COOKIE_OPTIONS);
    return { message: 'Account created successfully', user };
  }

  // ── POST /auth/register/seller ────────────────────────────────────────────

  @Post('register/seller')
  async registerSeller(
    @Body() dto: RegisterSellerDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user, token } = await this.authService.registerSeller(dto);
    res.cookie('access_token', token, COOKIE_OPTIONS);
    return { message: 'Account created successfully', user };
  }

  // ── POST /auth/login ──────────────────────────────────────────────────────
  // LocalAuthGuard runs LocalStrategy first — if credentials are wrong,
  // it throws before the handler is ever called

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body() _dto: LoginDto, // validated but LocalStrategy does the actual check
  ) {
    const { user, token } = await this.authService.login(req.user);
    res.cookie('access_token', token, COOKIE_OPTIONS);
    return { message: 'Logged in successfully', user };
  }

  // ── POST /auth/logout ─────────────────────────────────────────────────────

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
    return { message: 'Logged out successfully' };
  }

  // ── GET /auth/me ──────────────────────────────────────────────────────────

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Req() req: Request) {
    // JwtStrategy.validate() already fetched the fresh user from DB
    // and attached it to req.user
    return req.user;
  }
}