import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { MarkersService } from './markers.service';
import { CreateMarkerDto } from './dto/create-marker.dto';
import { UpdateMarkerDto } from './dto/update-marker.dto';

@Controller('markers')
export class MarkersController {
  constructor(private readonly markersService: MarkersService) {}

  @Get()
  getMarkers() {
    return this.markersService.getMarkers();
  }

  @Get(':id')
  getMarker(@Param('id') id: string) {
    return this.markersService.getMarker(+id);
  }

  @Post()
  createMarker(@Body() createMarkerDto: CreateMarkerDto) {
    return this.markersService.createMarker(createMarkerDto);
  }

  @Patch(':id')
  updateMarker(
    @Param('id') id: string,
    @Body() updateMarkerDto: UpdateMarkerDto,
  ) {
    return this.markersService.updateMarker(+id, updateMarkerDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  removeMarker(@Param('id') id: string) {
    return this.markersService.removeMarker(+id);
  }
}
