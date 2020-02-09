import { ReceiptSupport } from ".";
export declare type ReceiptOptions = {
    readonly locale: string;
    readonly currency: string;
    readonly width: number;
};
export declare type ReceiptItemDataProvider<T> = (support: ReceiptSupport) => T;
export declare type Align = "left" | "right" | "center";
export declare type Layout = "align" | "spread" | "hug";
export declare type ReceiptTextItemOptions = {
    readonly align: Align;
    readonly horizontalPadding: number;
};
export declare type ReceiptRulerItemOptions = {
    readonly pattern: string;
};
export declare type ReceiptPropertiesLine = {
    readonly label: string;
    readonly value: string;
};
export declare type ReceiptPropertiesItemOptions = {
    readonly layout: Layout;
    readonly separator: string;
};
