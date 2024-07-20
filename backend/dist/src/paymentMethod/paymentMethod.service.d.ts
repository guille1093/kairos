import { DefaultService } from '../app/defaults/defatul.service';
import { ResposeResultsPaginationDTO } from '../app/api.dto';
import { SearchPaymentMethodDto } from './dto/search-paymentMethod.dto';
import { PaymentMethod } from './entities/paymentMethod.entity';
import { SearchPaymentMethodPaginationDto } from './dto/search-pagination-paymentMethod.dto';
import { CreatePaymentMethodDto } from './dto/create-paymentMethod.dto';
import { UpdatePaymentMethodDto } from './dto/update-paymentMethod.dto';
export declare class PaymentMethodService extends DefaultService {
    private readonly paymentMethodRepository;
    constructor();
    getBy(params: {
        query: SearchPaymentMethodDto;
    }): Promise<PaymentMethod>;
    all(params: {
        query: SearchPaymentMethodPaginationDto;
    }): Promise<ResposeResultsPaginationDTO>;
    create(params: {
        body: CreatePaymentMethodDto;
        createdByGUID?: string;
    }): Promise<PaymentMethod>;
    update(params: {
        guid: string;
        body: UpdatePaymentMethodDto;
        updatedByGUID: string;
    }): Promise<PaymentMethod>;
}
