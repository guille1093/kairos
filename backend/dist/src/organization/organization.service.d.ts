import { DefaultService } from '../app/defaults/defatul.service';
import { ResposeResultsPaginationDTO } from '../app/api.dto';
import { SearchOrganizationDto } from './dto/search-organization.dto';
import { Organization } from './entities/organization.entity';
import { SearchOrganizationPaginationDto } from './dto/search-pagination-organization.dto';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
export declare class OrganizationService extends DefaultService {
    private readonly OrganizationRepository;
    constructor();
    getBy(params: {
        query: SearchOrganizationDto;
    }): Promise<Organization>;
    all(params: {
        query: SearchOrganizationPaginationDto;
    }): Promise<ResposeResultsPaginationDTO>;
    create(params: {
        body: CreateOrganizationDto;
        createdByGUID?: string;
    }): Promise<Organization>;
    update(params: {
        guid: string;
        body: UpdateOrganizationDto;
        updatedByGUID: string;
    }): Promise<Organization>;
}
