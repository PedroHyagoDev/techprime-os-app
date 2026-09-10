import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdemServicoModule } from './presentation/ordem-servico.module';

@Module({
    imports: [ScheduleModule.forRoot(), OrdemServicoModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}