import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { ResposeResultsPaginationDTO } from 'src/app/api.dto';
import { DefaultService } from 'src/app/defaults/defatul.service';
import { RoleEnum } from 'src/roles/role.enum';
import { Role } from 'src/roles/roles.entity';
import { CreateUserDTO, SearchUserDTO, SearchUserPaginationDTO, UpdateUserDTO } from 'src/users/users.dto';
import { User } from 'src/users/users.entity';
import { UserAlreadyExistsException, UserNoExistsException } from 'src/users/users.exception';
import { Category } from 'src/categories/entities/category.entity';
import { PaymentMethod } from 'src/paymentMethod/entities/paymentMethod.entity';
import { In, IsNull, Like, Repository } from 'typeorm';
import { saveFiles } from '../app/utils/filePersistor';
@Injectable()
export class UsersService extends DefaultService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;
  @InjectRepository(Role)
  private readonly userRoleRepository: Repository<Role>;
  @InjectRepository(Category)
  private readonly categoryRepository: Repository<Category>;
  @InjectRepository(PaymentMethod)
  private readonly paymentMethodRepository: Repository<PaymentMethod>;

  constructor() {
    super(UsersService);
  }

  private async _hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(8);
    return await bcrypt.hash(password, salt);
  }

  async getBy(params: { query: SearchUserDTO; withPassword?: boolean }): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        select: {
          guid: true,
          name: true,
          lastname: true,
          document: true,
          email: true,
          profileImage: true,
          username: true,
          documentSideA: true,
          documentSideB: true,
          backgroundCheck: true,
          backgroundCheckDate: true,
          backgroundCheckExpirationDate: true,
          birthdate: true,
          address: true,
          phone: true,
          mapAdress: true,
          isActive: true,
          googleID: true,
          createdAt: true,
          updatedAt: true,
          availability: true,
          isAvailable: true,
          certifications: true,
          previusWorks: true,
          description: true,
          category: {
            guid: true,
            name: true,
            description: true
          },


          paymentMethod: {
            guid: true,
            name: true
          },
          password: params.withPassword || false,
          createdBy: {
            guid: true,
            name: true,
            lastname: true,
            email: true,
            username: true,
            createdAt: true,
            updatedAt: true,
            password: false
          }
        },
        relations: ['role', 'createdBy', 'updatedBy', 'deletedBy', 'category', 'paymentMethod'],
        where: {
          guid: params.query.guid || undefined,
          username: params.query.username || undefined,
          googleID: params.query.googleID || undefined,
          email: params.query.email || undefined,
          document: params.query.document || undefined,
          isActive: params.query.isActive || undefined,
          deletedAt: IsNull()
        }
      });

      if (!user) throw new UserNoExistsException();
      user.availability = JSON.parse(user.availability);
      user.certifications = JSON.parse(user.certifications);
      user.previusWorks = JSON.parse(user.previusWorks);
      return user;
    } catch (error) {
      throw new Error(`${UsersService.name}[getBy]:${error.message}`);
    }
  }

  async all(params: { query: SearchUserPaginationDTO }): Promise<ResposeResultsPaginationDTO> {
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

      let categoriesIDs: Category[] = [];
      if (params.query.categoryID) {
        categoriesIDs = await Promise.all(
          params.query.categoryID
            .trim()
            .substring(1, params.query.categoryID.length - 1)
            .split(',')
            .map((jobType) => jobType.trim())
            .map(async (categoryId) => {
              const category = await this.categoryRepository.findOneBy({
                guid: categoryId
              });
              if (!category) {
                throw new Error('Category not found');
              }
              return category;
            })
        );
      }

      const forPage: number = parseInt(params.query.pageSize);
      const skip: number = parseInt(params.query.offset);
      const [user, total] = await this.userRepository.findAndCount({
        select: {
          guid: true,
          name: true,
          lastname: true,
          email: true,
          document: true,
          profileImage: true,
          documentSideA: true,
          documentSideB: true,
          backgroundCheck: true,
          backgroundCheckDate: true,
          backgroundCheckExpirationDate: true,
          username: true,
          birthdate: true,
          address: true,
          phone: true,
          mapAdress: true,
          availability: true,
          isActive: true,
          googleID: true,
          createdAt: true,
          updatedAt: true,
          paymentMethod: true,
          isAvailable: true,
          certifications: true,
          previusWorks: true,
          description: true,
          category: {
            guid: true,
            name: true,
            description: true
          },
          role: {
            guid: true,
            role: true,
            description: true
          },
          createdBy: {
            guid: true,
            name: true,
            lastname: true,
            email: true,
            username: true,
            createdAt: true,
            updatedAt: true,
            password: false
          }
        },
        relations: ['role', 'createdBy', 'updatedBy', 'deletedBy', 'category', 'paymentMethod'],
        where: {
          deletedAt: IsNull(),
          name: params.query.name ? Like(`%${params.query.name}%`) : undefined,
          lastname: params.query.lastname ? Like(`%${params.query.lastname}%`) : undefined,
          email: params.query.email ? Like(`%${params.query.email}%`) : undefined,
          document: params.query.document ? Like(`%${params.query.document}%`) : undefined,
          username: params.query.username ? Like(`%${params.query.username}%`) : undefined,
          isActive: params.query.isActive || undefined,
          mapAdress: params.query.mapAdress || undefined,
          phone: params.query.phone || undefined,
          role: {
            guid: params.query.roleGuid || undefined
          },
          category: {
            guid: categoriesIDs.length > 0 ? In(categoriesIDs.map((category) => category.guid)) : undefined,
            name: params.query.category ? Like(`%${params.query.category}%`) : undefined
          },
          paymentMethod: {
            guid: params.query.paymentMethod || undefined
          }
        },
        order,
        take: forPage,
        skip: skip
      });
      user.forEach((user) => {
        user.availability = JSON.parse(user.availability);
        user.certifications = JSON.parse(user.certifications);
        user.previusWorks = JSON.parse(user.previusWorks);
      });
      return {
        total: total,
        pageSize: forPage,
        offset: parseInt(params.query.offset),
        results: user
      };
    } catch (error) {
      throw new Error(`${UsersService.name}[all]:${error.message}`);
    }
  }

  async create(
    files: {
      profileImage?: Express.Multer.File;
      documentSideA?: Express.Multer.File;
      documentSideB?: Express.Multer.File;
      backgroundCheck?: Express.Multer.File;
      previusWorks?: Express.Multer.File[];
      certifications?: Express.Multer.File[];
    },
    params: {
      body: CreateUserDTO;
      createdByGUID?: string;
    }
  ): Promise<User> {
    try {
      saveFiles(files);
      let user = await this.userRepository.findOneBy({
        username: params.body.username
      });
      if (user) {
        throw new UserAlreadyExistsException();
      }
      const hashedPassword: string = await this._hashPassword(params.body.password);

      let categories: Category[] = [];
      if (params.body.category) {
        categories = await Promise.all(
          params.body.category
            .trim()
            .substring(1, params.body.category.length - 1)
            .split(',')
            .map((jobType) => jobType.trim())
            .map(async (categoryId) => {
              const category = await this.categoryRepository.findOneBy({
                guid: categoryId
              });
              if (!category) {
                throw new Error('Category not found');
              }
              return category;
            })
        );
      }


      if (!params.body.roleGuid) {
        params.body.roleGuid = 'R02';
      }
      user = await this.userRepository.save({
        name: params.body.name,
        lastname: params.body.lastname,
        email: params.body.email,
        document: params.body.document || null,
        password: hashedPassword,
        googleID: params.body.googleID || null,
        username: params.body.username,
        birthdate: params.body.birthdate || null,
        address: params.body.address || null,
        mapAdress: params.body.mapAdress || null,
        phone: params.body.phone || null,
        profileImage: files?.profileImage?.[0]?.filename || '',
        documentSideA: files?.documentSideA?.[0]?.filename || '',
        documentSideB: files?.documentSideB?.[0]?.filename || '',
        backgroundCheck: files?.backgroundCheck?.[0]?.filename || '',
        backgroundCheckDate: params.body.backgroundCheckDate || null,
        backgroundCheckExpirationDate: params.body.backgroundCheckExpirationDate || null,
        certifications: JSON.stringify(files?.certifications?.map((certification) => certification.filename)) || null,
        previusWorks: JSON.stringify(files?.previusWorks?.map((previusWork) => previusWork.filename)) || null,
        description: params.body.description || null,
        isAvailable: params.body.isAvailable || 0,
        availability: JSON.stringify(params.body.availability) || null,
        paymentMethods: params.body.paymentMethods || null,
        category: categories || [],
        role: await this.userRoleRepository.findOneBy({
          guid: params.body.roleGuid
        }),
        isActive: params.body.isActive || 1,
        isProfessional: 0
      });
      user.createdBy = (await this.userRepository.findOneBy({ guid: params.createdByGUID })) || user;
      delete user.createdBy;
      user.certifications = JSON.parse(user.certifications);
      user.previusWorks = JSON.parse(user.previusWorks);
      return user;
    } catch (error) {
      throw new Error(`${UsersService.name}[create]:${error.message}`);
    }
  }

  async update(
    files: {
      profileImage?: Express.Multer.File;
      documentSideA?: Express.Multer.File;
      documentSideB?: Express.Multer.File;
      backgroundCheck?: Express.Multer.File;
      previusWorks?: Express.Multer.File[];
      certifications?: Express.Multer.File[];
    },
    params: {
      guid: string;
      body: UpdateUserDTO;
      updatedByGUID: string;
    }
  ): Promise<User> {
    try {
      saveFiles(files);
      const user = await this.userRepository.findOne({
        select: {
          paymentMethod: {
            guid: true,
            name: true
          }
        },
        where: { guid: params.guid, deletedAt: IsNull() },
        relations: ['role', 'createdBy', 'updatedBy', 'deletedBy', 'category', 'paymentMethod']
      });
      if (!user) {
        throw new UserNoExistsException();
      }

      if (files?.documentSideA && files?.documentSideB && !params.body.isProfessional) {
        params.body.roleGuid = RoleEnum.ServiceProvier;
      }

      let categories: Category[] = [];
      if (params.body.category) {
        categories = await Promise.all(
          params.body.category
            .trim()
            .substring(1, params.body.category.length - 1)
            .split(',')
            .map((jobType) => jobType.trim())
            .map(async (categoryId) => {
              const category = await this.categoryRepository.findOneBy({
                guid: categoryId
              });
              if (!category) {
                throw new Error('Category not found');
              }
              return category;
            })
        );
      } else {
        categories = user.category;
      }

      let paymentMethods: PaymentMethod[] = [];
      if (params.body.paymentMethods) {
        paymentMethods = await Promise.all(
          params.body.paymentMethods
            .trim()
            .substring(1, params.body.paymentMethods.length - 1)
            .split(',')
            .map((paymentMethod) => paymentMethod.trim())
            .map(async (paymentMethodId) => {
              const paymentMethod = await this.paymentMethodRepository.findOneBy({
                guid: paymentMethodId
              });
              if (!paymentMethod) {
                throw new Error('Payment Method not found');
              }
              return paymentMethod;
            })
        );
      } else {
        paymentMethods = user.paymentMethod;
        console.log('payment from service', user.paymentMethod);
      }

      user.name = params.body.name || user.name;
      user.email = params.body.email || user.email;
      user.address = params.body.address || user.address;
      user.phone = params.body.phone || user.phone;
      user.googleID = params.body.googleID || user.googleID;
      user.birthdate = params.body.birthdate || user.birthdate;
      user.profileImage = files?.profileImage?.[0]?.filename || user.profileImage;
      user.documentSideA = files?.documentSideA?.[0]?.filename || user.documentSideA;
      user.documentSideB = files?.documentSideB?.[0]?.filename || user.documentSideB;
      user.backgroundCheck = files?.backgroundCheck?.[0]?.filename || user.backgroundCheck;
      user.backgroundCheckExpirationDate = params.body.backgroundCheckExpirationDate || user.backgroundCheckExpirationDate;
      user.backgroundCheckDate = params.body.backgroundCheckDate || user.backgroundCheckDate;
      user.lastname = params.body.lastname || user.lastname;
      user.username = params.body.username || user.username;
      user.document = params.body.document || user.document;
      user.mapAdress = params.body.mapAdress || user.mapAdress;
      user.category = categories || user.category;
      user.backgroundCheckDate = params.body.backgroundCheckDate || user.backgroundCheckDate;
      user.password = params.body.password ? await this._hashPassword(params.body.password) : user.password;
      user.isActive = params.body.isActive !== undefined ? params.body.isActive : user.isActive;
      user.isAvailable = params.body.isAvailable !== undefined ? params.body.isAvailable : user.isAvailable;
      user.availability = JSON.stringify(params.body.availability) || user.availability;
      user.paymentMethod = paymentMethods || user.paymentMethod;
      user.certifications = JSON.stringify(files?.certifications?.map((certification) => certification.filename)) || user.certifications;
      user.previusWorks = JSON.stringify(files?.previusWorks?.map((previusWork) => previusWork.filename)) || user.previusWorks;
      user.description = params.body.description || user.description;
      if (params.body.roleGuid !== undefined) {
        user.role = await this.userRoleRepository.findOneBy({
          guid: params.body.roleGuid
        });
      }

      let newUser = await this.userRepository.save(user);
      newUser.availability = JSON.parse(newUser.availability);
      newUser.certifications = newUser.certifications ? JSON.parse(newUser.certifications) : [];
      newUser.previusWorks = newUser.previusWorks ? JSON.parse(newUser.previusWorks) : [];

      return newUser;
    } catch (error) {
      throw new Error(`${UsersService.name}[update]:${error.message}`);
    }
  }

  async delete(params: { guid: string; updatedByGUID: string }): Promise<User> {
    try {
      const userToDelete = await this.userRepository.findOne({
        where: { guid: params.guid, deletedAt: IsNull() }
      });
      if (!userToDelete) {
        throw new UserNoExistsException();
      }

      const user = await this.userRepository.findOne({
        where: { guid: params.updatedByGUID }
      });
      if (!user) {
        throw new Error('UserNoExists');
      }

      userToDelete.deletedAt = new Date();
      userToDelete.updatedBy = user;
      userToDelete.isActive = 0;
      return await this.userRepository.save(userToDelete);
    } catch (error) {
      throw new Error(`${UsersService.name}[delete]:${error.message}`);
    }
  }
}
