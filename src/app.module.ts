import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DepositsModule } from './deposits/deposits.module';
import { RolesModule } from './roles/roles.module';
import { RegionModule } from './region/region.module';
import { AuthModule } from './auth/auth.module';
import { SourceModule } from './source/source.module';
import { CategoryModule } from './category/category.module';
import { AllocationModule } from './allocation/allocation.module';
import { ConfigModule } from '@nestjs/config';
import { TokenBlacklistModule } from './token-blacklist/token-blacklist.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'sa',
      password: 'User123',
      database: 'PenerimaanNegaraDB',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      options: {
        encrypt: true,    
        trustServerCertificate: true, 
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    UsersModule,
    DepositsModule,
    RolesModule,
    RegionModule,
    AuthModule,
    SourceModule,
    CategoryModule,
    AllocationModule,
    TokenBlacklistModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
