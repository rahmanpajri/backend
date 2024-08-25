// src/auth/jwt-payload.interface.ts
export interface JwtPayload {
    username: string;
    sub: number; // atau id jenis lain jika diperlukan
    role: string
  }
  