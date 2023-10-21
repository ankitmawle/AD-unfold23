import { ConfigType } from './types';
export declare function getRootID(config: ConfigType): string;
export declare const SDK_LOCAL_STORAGE: {
    getLocalStorage(key: string): Promise<string>;
    setLocalStorage(key: string, value: string): void;
};
export declare function getFirstItemInArray(arr: Array<unknown> | unknown): unknown;
