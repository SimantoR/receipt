import { ReceiptOptions, ReceiptPropertiesItemOptions, ReceiptPropertiesLine, ReceiptRulerItemOptions, ReceiptTextItemOptions, ReceiptItemDataProvider, Align } from "./types";
export * from "./types";
export declare class ReceiptSupport {
    protected readonly options: ReceiptOptions;
    constructor(options: ReceiptOptions);
    toAlignedString(value: string, align: Align, horizontalPadding?: number): string;
    toCurrencyString(base: number): string;
}
export declare class Receipt {
    readonly options: ReceiptOptions;
    readonly support: ReceiptSupport;
    protected items: readonly ReceiptItem<unknown>[];
    constructor(options: Partial<ReceiptOptions>);
    add(item: ReceiptItem<unknown>): this;
    text(text: string | ReceiptItemDataProvider<string>, options?: ReceiptTextItemOptions): this;
    ruler(options?: ReceiptRulerItemOptions): this;
    break(): this;
    properties(lines: readonly ReceiptPropertiesLine[] | ReceiptItemDataProvider<readonly ReceiptPropertiesLine[]>, options?: ReceiptPropertiesItemOptions): this;
    toString(): string;
}
export declare abstract class ReceiptItem<O> {
    readonly options: O;
    constructor(options?: Partial<O>);
    protected abstract getDefaultOptions(): O;
    abstract format(receipt: Receipt): string;
}
export declare class ReceiptTextItem extends ReceiptItem<ReceiptTextItemOptions> {
    protected readonly text: string;
    constructor(text: string, options?: ReceiptTextItemOptions);
    getDefaultOptions(): ReceiptTextItemOptions;
    format(receipt: Receipt): string;
}
export declare class ReceiptRulerItem extends ReceiptItem<ReceiptRulerItemOptions> {
    getDefaultOptions(): ReceiptRulerItemOptions;
    format(receipt: Receipt): string;
}
export declare class ReceiptBreakItem extends ReceiptItem<void> {
    format(receipt: Receipt): string;
    getDefaultOptions(): void;
}
export declare class ReceiptPropertiesItem extends ReceiptItem<ReceiptPropertiesItemOptions> {
    readonly lines: readonly ReceiptPropertiesLine[];
    constructor(lines: readonly ReceiptPropertiesLine[], options?: ReceiptPropertiesItemOptions);
    format(receipt: Receipt): string;
    getDefaultOptions(): ReceiptPropertiesItemOptions;
}
export default function create(options: ReceiptOptions): Receipt;
