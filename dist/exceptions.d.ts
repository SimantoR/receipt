import { Receipt, ReceiptItem } from ".";
export declare class ReceiptException extends Error {
    readonly receipt: Receipt;
    constructor(receipt: Receipt, message: string);
}
export declare class ReceiptFormattingException extends ReceiptException {
    readonly receipt: Receipt;
    readonly item: ReceiptItem<unknown>;
    constructor(receipt: Receipt, item: ReceiptItem<unknown>, message: string);
}
