"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReceiptException extends Error {
    constructor(receipt, message) {
        super(message);
        this.receipt = receipt;
    }
}
exports.ReceiptException = ReceiptException;
class ReceiptFormattingException extends ReceiptException {
    constructor(receipt, item, message) {
        super(receipt, message);
        this.receipt = receipt;
        this.item = item;
    }
}
exports.ReceiptFormattingException = ReceiptFormattingException;
