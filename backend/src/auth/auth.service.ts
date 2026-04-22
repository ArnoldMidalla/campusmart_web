import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { RegisterBuyerDto } from './dto/register-buyer.dto';
import { RegisterSellerDto } from './dto/register-seller.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // Called by LocalStrategy — validates credentials without issuing a token
  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user || !user.password) {
      return null;
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return null;
    }

    if (user.isSuspended) {
      throw new UnauthorizedException('This account has been suspended');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('This account is inactive');
    }

    // Strip password before returning — this becomes req.user in the controller
    const { password: _pw, ...safeUser } = user;
    return safeUser;
  }

  // Shared token-signing logic used after both registration and login
  signToken(userId: string, email: string, role: string) {
    const payload = { sub: userId, email, role };
    return this.jwtService.sign(payload);
  }

  async registerBuyer(dto: RegisterBuyerDto) {
    const user = await this.usersService.create({
      ...dto,
      role: "BUYER",
    });

    const token = this.signToken(user.id, user.email, user.role);
    return { user, token };
  }

  async registerSeller(dto: RegisterSellerDto) {
    const user = await this.usersService.create({
      ...dto,
      role: "SELLER",
    });

    const token = this.signToken(user.id, user.email, user.role);
    return { user, token };
  }

  // Called after LocalStrategy has already validated credentials
  async login(user: any) {
    const token = this.signToken(user.id, user.email, user.role);
    return { user, token };
  }
}