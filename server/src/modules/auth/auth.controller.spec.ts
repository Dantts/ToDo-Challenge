import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthResponse } from './models/responses/AuthResponse.model';
import { ApiResponse } from '../../models/ApiResponse.model';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlODRkOGMwLWNmZGUtNDBhZC1hZWU4LTYwODg2ZmRjZjVjZiIsInVzZXJuYW1lIjoiZGFudHRzIiwibmFtZSI6IkdhYnJpZWwgRHVhcnRlIiwiaWF0IjoxNjgwMzczMzI1LCJleHAiOjE2ODI5NjUzMjV9.bXq3xMFXN9EPC0CL9RC9IrzitW0uc-FP7ddqabPpuhM';

const mockValues = [
  {
    id: '5e84d8c0-cfde-40ad-aee8-60886fdcf5cf',
    name: 'Gabriel Dantas',
    token,
  },
];

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signUp: jest.fn().mockResolvedValue(mockValues[0]),
            signIn: jest.fn().mockResolvedValue(mockValues[0]),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  it('should return created user account', async () => {
    const user = mockValues[0];

    const account = await authController.signUp({
      name: user.name,
      password: '1234',
      username: 'Gabriel Duarte',
    });

    expect(account).toEqual(
      new ApiResponse(
        201,
        'Success',
        new AuthResponse(user.id, user.name, token),
      ),
    );
  });

  it('should return login user account', async () => {
    const user = mockValues[0];

    const account = await authController.signIn({
      username: 'Gabriel Duarte',
      password: '1234',
    });

    expect(account).toEqual(
      new ApiResponse(
        200,
        'Success',
        new AuthResponse(user.id, user.name, token),
      ),
    );
  });
});
