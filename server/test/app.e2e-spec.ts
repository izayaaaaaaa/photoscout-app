import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as pactum from 'pactum';
import { AppModule } from '../src/app.module';

describe('App (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3333);

    pactum.request.setBaseUrl('http://localhost:3333');
  });

  afterAll(() => {
    app.close();
  });

  describe('Markers', () => {
    describe('Get empty markers', () => {
      it('should get empty markers', () => {
        return pactum.spec().get('/markers').expectStatus(200).expectBody([]);
      });
    });

    describe('Create marker', () => {
      const dto = {
        name: 'Marker 1',
        latitude: 1.0,
        longitude: 1.0,
      };

      it('should create marker', () => {
        return pactum
          .spec()
          .post('/markers')
          .withBody(dto)
          .expectStatus(201)
          .stores('markerId', 'id');
      });
    });

    describe('Get markers', () => {
      it('should get markers', () => {
        return pactum
          .spec()
          .get('/markers')
          .expectStatus(200)
          .expectJsonLength(1);
      });
    });

    describe('Get marker by id', () => {
      it('should get marker by id', () => {
        return pactum
          .spec()
          .get('/markers/{id}')
          .withPathParams('id', '$S{markerId}')
          .expectStatus(200)
          .expectBodyContains('$S{markerId}');
      });
    });

    describe('Edit marker by id', () => {
      const dto = {
        name: 'Marker 1',
        latitude: 2.0,
        longitude: 2.0,
      };

      it('should edit marker', () => {
        return pactum
          .spec()
          .patch('/markers/{id}')
          .withPathParams('id', '$S{markerId}')
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.name)
          .expectBodyContains(dto.latitude)
          .expectBodyContains(dto.longitude);
      });
    });

    describe('Delete marker by id', () => {
      it('should delete marker', () => {
        return pactum
          .spec()
          .delete('/markers/{id}')
          .withPathParams('id', '$S{markerId}')
          .expectStatus(204);
      });

      it('should get empty markers', () => {
        return pactum
          .spec()
          .get('/markers')
          .expectStatus(200)
          .expectJsonLength(0);
      });
    });
  });
});
