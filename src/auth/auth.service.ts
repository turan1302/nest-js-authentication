import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from './entity/auth.entity';
import { BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Auth)
        private readonly authRepository: Repository<Auth>,
        private readonly jwtService: JwtService,
    ) { }

    async signup(dto: AuthDto) {
        try {
            const user = await this.authRepository.findOne({ where: { username: dto.username } });
            if (user) {
                throw new BadRequestException('User already exists');
            }
            const newUser = this.authRepository.create(dto);
            return this.authRepository.save(newUser);
        } catch (error) {
            throw new BadRequestException('Failed to signup');
        }
    }

    async signin(dto: AuthDto) {
        try {
            const user = await this.authRepository.findOne({ where: { username: dto.username } });
            if (!user) {
                throw new BadRequestException('User not found');
            }
            const token = this.jwtService.sign({ id: user.id, username: user.username });
            return {
                user: user.username,
                token: token,
            };
        } catch (error) {
            throw new BadRequestException('Failed to signin');
        }
    }


    async profile(user: { id: number; username: string }) {
        return user;
    }
}
