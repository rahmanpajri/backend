import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenBlacklistService {
  private blacklistedTokens: Set<string> = new Set<string>();

  async isTokenBlacklisted(token: string): Promise<boolean> {
    return this.blacklistedTokens.has(token);
  }

  async addTokenToBlacklist(token: string): Promise<void> {
    this.blacklistedTokens.add(token);
  }
}
