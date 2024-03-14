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
import { ApiTags, ApiBearerAuth, ApiExcludeEndpoint } from '@nestjs/swagger';
@ApiTags('공연 정보')
@Controller('show')
export class ShowController {
  constructor(private readonly showService: ShowService) {}

  /**
   * 공연 등록
   * @param createShowDto 
   * @returns 
   */
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @ApiBearerAuth('access-token')
  @Post('regist')
  create(@Body() createShowDto: CreateShowDto) {
    return this.showService.registShow(createShowDto);
  }

  /**
   * 공연 검색(show_name or 전체검색)
   * @param show_name 
   * @returns 
   */
  @Get('shows-list')
  findAll(@Query('show_name') show_name?: string) {
    return this.showService.findAll(show_name);
  }

  /**
   * 공연 1건 상세정보
   * @param id 
   * @returns 
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.showService.findOne(+id);
  }

  /**
   * 공연 1건 잔여좌석 확인
   * @param id 
   * @returns 
   */
  @Get('seats-in-show/:id')
  findAvailableSeats(@Param('id') id: string) {
    return this.showService.findAvailableSeats(+id);
  }

  @ApiExcludeEndpoint()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShowDto: UpdateShowDto) {
    return this.showService.update(+id, updateShowDto);
  }

  @ApiExcludeEndpoint()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.showService.remove(+id);
  }
}
