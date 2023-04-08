import { Context, Schema } from 'koishi';
export declare const name = "api-service";
export interface Config {
    path: string;
    enable: boolean;
    secrets: string;
}
export declare const Config: Schema<Config>;
export declare function apply(ctx: Context, config: Config): void;
