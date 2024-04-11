import { Controller, Get } from '@nestjs/common';
import { AmazonService } from './amazon.service';

@Controller('amazon')
export class AmazonController {
    constructor(private readonly amazonService: AmazonService){}
    @Get('products')
    getProducts() {
      return  this.amazonService.getProducts();
    }
}
