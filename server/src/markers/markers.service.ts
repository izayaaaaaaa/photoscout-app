import { Injectable } from '@nestjs/common';
import { CreateMarkerDto, UpdateMarkerDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MarkersService {
  constructor(private prisma: PrismaService) {}

  getMarkers() {
    return this.prisma.marker.findMany();
  }

  getMarker(id: number) {
    return this.prisma.marker.findUnique({
      where: { id },
    });
  }

  createMarker(createMarkerDto: CreateMarkerDto) {
    return this.prisma.marker.create({
      data: createMarkerDto,
    });
  }

  updateMarker(id: number, updateMarkerDto: UpdateMarkerDto) {
    return this.prisma.marker.update({
      where: { id },
      data: updateMarkerDto,
    });
  }

  removeMarker(id: number) {
    return this.prisma.marker.delete({
      where: { id },
    });
  }
}
