import { DefaultController } from '../app/defaults/default.controller';
import { ResposeSuccessDataDTO, ResposeSuccessPaginationDTO } from '../app/api.dto';
import { User } from '../users/users.entity';
import { CreatePaymentMethodDto } from './dto/create-paymentMethod.dto';
import { UpdatePaymentMethodDto } from './dto/update-paymentMethod.dto';
export declare class PaymentMethodController extends DefaultController {
    private readonly PaymentMethodService;
    constructor();
    all(query: any): Promise<ResposeSuccessPaginationDTO>;
    findOne(guid: string): Promise<ResposeSuccessDataDTO>;
    create(body: CreatePaymentMethodDto, request: {
        user: User;
    }): Promise<any>;
    update(guid: string, body: UpdatePaymentMethodDto, request: {
        user: User;
    }): Promise<ResposeSuccessDataDTO>;
}
