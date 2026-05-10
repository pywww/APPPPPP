import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import bcrypt from 'bcryptjs'
import { PrismaService } from '../../config/prisma.service'
import { LoginDto } from './dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { phone: dto.phone } })
    if (!user) throw new UnauthorizedException('手机号或密码错误')
    const ok = await bcrypt.compare(dto.password, user.passwordHash)
    if (!ok) throw new UnauthorizedException('手机号或密码错误')
    const token = await this.jwtService.signAsync(
      { sub: user.id, phone: user.phone },
      { expiresIn: this.configService.get<string>('JWT_EXPIRES_IN', '7d') as never },
    )
    return {
      accessToken: token,
      user: {
        id: user.id,
        phone: user.phone,
        displayName: user.displayName,
      },
    }
  }
}
