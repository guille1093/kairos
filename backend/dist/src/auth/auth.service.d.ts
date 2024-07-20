import { User } from 'src/users/users.entity';
import { JWTPayloadInterface } from 'src/app/api.interface';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    validateUser(params: {
        username: string;
        password: string;
        googleID?: string;
    }): Promise<User>;
    validateGoogleUser(params: {
        googleID: string;
        name: string;
        lastname: string;
        email: string;
    }): Promise<User>;
    generateAccessToken(params: {
        user: User;
    }): Promise<{
        token: string;
        user: User;
    }>;
    validateAccessToken(params: {
        token: string;
    }): Promise<JWTPayloadInterface>;
}
