import { DefaultWithoutSecurityController } from 'src/app/defaults/default.without-security.controller';
import { ResposeSuccessDataDTO } from 'src/app/api.dto';
import { LoginDTO, googleOAuthDTO } from 'src/users/users.dto';
export declare class ApiController extends DefaultWithoutSecurityController {
    private readonly apiService;
    private readonly authService;
    constructor();
    getInfo(): any;
    login(body: LoginDTO): Promise<ResposeSuccessDataDTO>;
    googleoauth(body: googleOAuthDTO): Promise<ResposeSuccessDataDTO>;
}
