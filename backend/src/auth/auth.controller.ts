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
import type { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterBuyerDto } from './dto/register-buyer.dto';
import { RegisterSellerDto } from './dto/register-seller.dto';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ApiOperation, ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';

// 7 days in milliseconds
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: COOKIE_MAX_AGE,
};

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ── POST /auth/register/buyer ─────────────────────────────────────────────

  @ApiOperation({
    summary: 'Register a new buyer account',
    description: 'Creates a new buyer account and returns the user data along with an authentication token',
  })
  @ApiBody({ type:RegisterBuyerDto })
  @ApiResponse({
    status: 201,
    description: 'Account created successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        user: { type: 'object' },
      },
    },
  })
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

  @ApiOperation({
    summary: 'Register a new seller account',
    description: 'Creates a new seller account and returns the user data along with an authentication token',
  })
  @ApiBody({ type:RegisterSellerDto })
  @ApiResponse({
    status: 201,
    description: 'Account created successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        user: { type: 'object' },
      },
    },
  })
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

  @ApiOperation({
    summary: 'Login to an existing account',
    description: 'Logs in with email and password, returning user data and setting an authentication cookie',
  })
  @ApiBody({ type:LoginDto })
  @ApiResponse({
    status: 200,
    description: 'Logged in successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        user: { type: 'object' },
      },
    },
  })
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

  @ApiOperation({
    summary: 'Logout from the current account',
    description: 'Clears the authentication cookie, effectively logging the user out'
  })
  @ApiResponse({
    status: 200,
    description: 'Logged out successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  })
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

  @ApiOperation({
    summary: 'Get current user details',
    description: 'Retrieves the details of the currently authenticated user',
  })
  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Req() req: Request) {
    // JwtStrategy.validate() already fetched the fresh user from DB
    // and attached it to req.user
    return req.user;
  }
}