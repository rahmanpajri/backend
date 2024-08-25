<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Project setup

1. Install npm
```bash
npm install
```
2. Tambahkan file .env yang berisi JWT SECRET

3. Run project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
4. Jalankan pada server http://localhost:4000

## What technology do I use
1. NestJS
2. TypeOrm
3. Database SQL Server 2022
4. JWT Token Auth
5. Typescript
6. Class Validator

## API Endpoint
Untuk menjalankan API silahkan akses terlebih dahulu `http://localhost:4000`, lalu tambahkan endpointnya. Berikut beberapa list endpoint yang tersedia.
1. Users
- `GET /users`: Mendapatkan semua users
- `POST /users`: Menambahkan users baru
- `PUT /users/{id}`: Mengupdate users berdasarkan ID
- `DELETE /users/{id}`: Menghapus users berdasarkan ID

2. Role
- `GET /roles`: Mendapatkan semua roles
- `POST /roles`: Menambahkan roles baru
- `PUT /roles/{id}`: Mengupdate roles berdasarkan ID
- `DELETE /roles/{id}`: Menghapus roles berdasarkan ID

3. Category
- `GET /categories`: Mendapatkan semua barang
- etc..

4. etc..
