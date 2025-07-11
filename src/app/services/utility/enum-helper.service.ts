import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class EnumHelperService {
    getEnumAsArray<T extends object>(enumObject: T): { key: string; value: T[keyof T] }[] {
        return Object.keys(enumObject)
            .filter(key => isNaN(Number(key)))
            .map(key => ({
                key,
                value: enumObject[key as keyof T ],
        }));
    }

    getNumericEnumAsArray<T extends object>(enumObject: T): { key: string; value: number }[] {
        return Object.keys(enumObject)
            .filter(key => isNaN(Number(key)))
            .map(key => ({
                key,
                value: Number(enumObject[key as keyof T])
        }));
    }
}