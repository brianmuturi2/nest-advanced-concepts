import { Inject, Injectable, Scope } from '@nestjs/common';
import type * as Schema from '../assets/locales/en.json';
import * as en from '../assets/locales/en.json';
import * as sw from '../assets/locales/sw.json';
import { REQUEST } from '@nestjs/core';
const format = require('string-format')

type PathsToStringProps<T> = T extends string
? []
: {
    [K in Extract<keyof T, string>]: [K, ...PathsToStringProps<T[K]>];
}[Extract<keyof T, string>];

type Join<T extends string[]> = T extends []
? never
: T extends [infer F]
? F
: T extends [infer F, ...infer R]
? F extends string
    ? `${F}.${Join<Extract<R, string[]>>}`
    : never
: string;

@Injectable({scope: Scope.REQUEST, durable: true})
export class I18nService {

    constructor(@Inject(REQUEST) private readonly payload: {localeCode: string}){}

    public static readonly defaultLanguage = 'en';
    public static readonly supportedLanguages = ['en', 'sw'];
    private readonly translations: Record<string, typeof Schema> = {en, sw};

    translate(
        key: Join<PathsToStringProps<typeof Schema>>,
        ...args: Array<string | Record<string, unknown>>
    ): string {
        const translation = this.translations[this.payload.localeCode ?? I18nService.defaultLanguage]

        // To support dot notation: "ERRORS.USER_NOT_FOUND", nested translation
        const text: string = key.split('.').reduce((o,i)=> o[i], translation);
        return format(text, ...args);
    }
}
