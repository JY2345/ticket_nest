import {
  Controller,
  Get,
  Post,
  Body,
  Query, 
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ShowService } from './show.service';
import { CreateShowDto } from './dto/create-show.dto';
import { UpdateShowDto } from './dto/update-show.dto';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../auth/admin.guard';

@Controller('show')
export class ShowController {
  constructor(private readonly showService: ShowService) {}

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Post('regist')
  create(@Body() createShowDto: CreateShowDto) {
    return this.showService.registShow(createShowDto);
  }

  @Get('shows-list')
  findAll(@Query('showName') showName?: string) {
    return this.showService.findAll(showName);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.showService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShowDto: UpdateShowDto) {
    return this.showService.update(+id, updateShowDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.showService.remove(+id);
  }
}
