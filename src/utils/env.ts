import type { GlobEnvConfig } from '../types/config';

export function getGlobEnvConfig(): GlobEnvConfig {
  const env = process.env
  return (env as unknown) as GlobEnvConfig;
}

/**
 * @description: 开发模式
 */
export const devMode = 'development';

/**
 * @description: 生产模式
 */
export const prodMode = 'production';

/**
 * @description: 获取环境变量
 */
export function getEnv(): string {
  return (process.env.MODE as string);
}

/**
 * @description: 是否是开发模式
 */
export function isDevMode(): boolean {
  return (process.env.DEV as unknown as boolean);
}

/**
 * @description: 是否是生产模式模式
 */
export function isProdMode(): boolean {
  return (process.env.PROD as unknown as boolean);
}
