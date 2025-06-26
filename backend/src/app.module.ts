import { ApplicationModule } from '@application/application.module';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PresentationModule } from '@presentation/presentation.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    InfrastructureModule,
    ApplicationModule,
    PresentationModule,
  ],
  providers: [],
})
export class AppModule {}
