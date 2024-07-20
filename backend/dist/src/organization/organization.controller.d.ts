import { DefaultController } from '../app/defaults/default.controller';
import { ResposeSuccessDataDTO, ResposeSuccessPaginationDTO } from '../app/api.dto';
import { User } from '../users/users.entity';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
export declare class OrganizationController extends DefaultController {
    private readonly OrganizationService;
    constructor();
    all(query: any): Promise<ResposeSuccessPaginationDTO>;
    findOne(guid: string): Promise<ResposeSuccessDataDTO>;
    create(body: CreateOrganizationDto, request: {
        user: User;
    }): Promise<any>;
    update(guid: string, body: UpdateOrganizationDto, request: {
        user: User;
    }): Promise<ResposeSuccessDataDTO>;
}
