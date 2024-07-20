import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DefaultService } from '../app/defaults/defatul.service';
import { ResposeResultsPaginationDTO } from '../app/api.dto';
import { IsNull, Like, Repository } from 'typeorm';
import { SearchOrganizationDto } from './dto/search-organization.dto';
import { Organization } from './entities/organization.entity';
import { SearchOrganizationPaginationDto } from './dto/search-pagination-organization.dto';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { OrganizationNoExistsException } from './organization.exeptions';

@Injectable()
export class OrganizationService extends DefaultService {
  @InjectRepository(Organization)
  private readonly OrganizationRepository: Repository<Organization>;

  constructor() {
    super(OrganizationService);
  }

  async getBy(params: { query: SearchOrganizationDto }): Promise<Organization> {
    try {
      const Organization = await this.OrganizationRepository.findOne({
        select: {
          guid: true,
          name: true,
          description: true,
          createdAt: true,
          updatedAt: true,
          isActive: true,
          createdBy: {
            guid: true,
            name: true,
            lastname: true,
            email: true,
            createdAt: true,
            updatedAt: true,
            password: false
          }
        },
        relations: ['createdBy', 'updatedBy', 'deletedBy'],
        where: {
          guid: params.query.guid || undefined,
          name: params.query.name || undefined,
          isActive: params.query.isActive || undefined,
          deletedAt: IsNull()
        }
      });
      return Organization;
    } catch (error) {
      throw new Error(`${OrganizationService.name}[getBy]:${error.message}`);
    }
  }

  async all(params: { query: SearchOrganizationPaginationDto }): Promise<ResposeResultsPaginationDTO> {
    const emptyResponse = {
      total: 0,
      pageSize: 0,
      offset: params.query.offset,
      results: []
    };
    try {
      if (Object.keys(params.query).length === 0) {
        return emptyResponse;
      }
      if (params.query.pageSize?.toString() === '0') {
        return emptyResponse;
      }

      const order = {};
      if (params.query.orderBy && params.query.orderType) {
        order[params.query.orderBy] = params.query.orderType;
      }

      const forPage: number = parseInt(params.query.pageSize);
      const skip: number = parseInt(params.query.offset);
      const [Organization, total] = await this.OrganizationRepository.findAndCount({
        select: {
          guid: true,
          name: true,
          description: true,
          createdAt: true,
          updatedAt: true,
          isActive: true,
          createdBy: {
            guid: true,
            name: true,
            lastname: true,
            email: true,
            createdAt: true,
            updatedAt: true,
            password: false
          }
        },
        relations: ['createdBy', 'updatedBy'],
        where: {
          deletedAt: IsNull(),
          name: params.query.name ? Like(`%${params.query.name}%`) : undefined,
          isActive: params.query.isActive || undefined
        },
        order,
        take: forPage,
        skip: skip
      });
      return {
        total: total,
        pageSize: forPage,
        offset: parseInt(params.query.offset),
        results: Organization
      };
    } catch (error) {
      throw new Error(`${OrganizationService.name}[all]:${error.message}`);
    }
  }

  async create(params: { body: CreateOrganizationDto; createdByGUID?: string }): Promise<Organization> {
    try {
      const findOrganization = await this.OrganizationRepository.findOne({
        where: { name: params.body.name, deletedAt: IsNull() }
      });
      if (findOrganization) {
        return findOrganization;
      }
      const Organization = await this.OrganizationRepository.save({
        name: params.body.name,
        description: params.body.description || null,
        isActive: params.body.isActive || 1,
        createdBy: { guid: params.createdByGUID }
      });

      return Organization;
    } catch (error) {
      throw new Error(`${OrganizationService.name}[create]:${error.message}`);
    }
  }

  async update(params: { guid: string; body: UpdateOrganizationDto; updatedByGUID: string }): Promise<Organization> {
    try {
      const Organization = await this.OrganizationRepository.findOne({
        where: { guid: params.guid, deletedAt: IsNull() }
      });
      if (!Organization) {
        throw new OrganizationNoExistsException();
      }
      Organization.name = params.body.name || Organization.name;
      Organization.description = params.body.description || Organization.description;
      Organization.isActive = params.body.isActive !== undefined ? params.body.isActive : Organization.isActive;
      return await this.OrganizationRepository.save(Organization);
    } catch (error) {
      throw new Error(`${OrganizationService.name}[update]:${error.message}`);
    }
  }
}
