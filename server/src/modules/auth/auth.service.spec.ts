import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../../prisma/prisma.service';
import { DeepMockProxy } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ApiResponse } from '../../models/ApiResponse.model';
import { AuthResponse } from './models/responses/AuthResponse.model';
import { UnauthorizedError } from './models/errors/Unauthorized.error';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlODRkOGMwLWNmZGUtNDBhZC1hZWU4LTYwODg2ZmRjZjVjZiIsInVzZXJuYW1lIjoiZGFudHRzIiwibmFtZSI6IkdhYnJpZWwgRHVhcnRlIiwiaWF0IjoxNjgwMzczMzI1LCJleHAiOjE2ODI5NjUzMjV9.bXq3xMFXN9EPC0CL9RC9IrzitW0uc-FP7ddqabPpuhM';

const mockValues = [
  {
    id: '5e84d8c0-cfde-40ad-aee8-60886fdcf5cf',
    name: 'Gabriel Dantas',
    username: 'dantts',
    // decrypted password = 1234
    password: '$2b$10$aY2OBhhw98vC6N3E0YgOneDCgcY2vV/2LS675qrmTx19XLOqb4dvi',
  },
];

const db = {
  user: {
    create: jest.fn().mockReturnValue(mockValues[0]),
    findUnique: jest.fn().mockResolvedValue(mockValues[0]),
  },
};

describe('AuthService', () => {
  let authService: AuthService;
  let prisma: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: db,
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue(token),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
    expect(prisma).toBeDefined();
  });

  describe('signUp', () => {
    it('should return a created user and your login access.', async () => {
      const user = mockValues[0];

      jest.spyOn(prisma.user, 'findUnique').mockResolvedValueOnce(null);

      const result = await authService.signUp(mockValues[0]);

      expect(result).toEqual(new AuthResponse(user.id, user.name, token));
    });

    it('should return UnauthorizedError exception', async () => {
      expect(authService.signUp(mockValues[0])).rejects.toThrowError(
        UnauthorizedError,
      );
    });
  });

  describe('signIn', () => {
    it('should return a user login access', async () => {
      const user = mockValues[0];

      const result = await authService.signIn({
        username: user.username,
        password: '1234',
      });

      expect(result).toEqual(new AuthResponse(user.id, user.name, token));
    });

    it('should return UnauthorizedError, because password is wrong', () => {
      const user = mockValues[0];

      expect(
        authService.signIn({ username: user.username, password: '123' }),
      ).rejects.toThrowError(UnauthorizedError);
    });

    it('should return UnauthorizedError, because not found user', () => {
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValueOnce(null);

      expect(
        authService.signIn({ username: 'Username', password: '1234' }),
      ).rejects.toThrowError(UnauthorizedError);
    });
  });
});
