"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = require("os");
const exceptions_1 = require("./exceptions");
class ReceiptSupport {
    constructor(options) {
        this.options = options;
    }
    toAlignedString(value, align, horizontalPadding = 0) {
        const padToken = " ";
        const maximumLineLength = this.options.width - horizontalPadding * 2;
        while (value.length < maximumLineLength) {
            if (align === "left") {
                value = value + padToken;
            }
            else if (align === "right") {
                value = padToken + value;
            }
            else {
                value = padToken + value + padToken;
            }
        }
        return value
            .substr(0, maximumLineLength)
            .padStart(this.options.width - horizontalPadding)
            .padEnd(this.options.width);
    }
    toCurrencyString(base) {
        return (base / 100).toLocaleString(this.options.locale, {
            style: "currency",
            currency: this.options.currency
        });
    }
}
exports.ReceiptSupport = ReceiptSupport;
class Receipt {
    constructor(options) {
        this.items = [];
        this.options = Object.assign({ locale: "en-US", currency: "USD", width: 60 }, options);
        this.support = new ReceiptSupport(this.options);
    }
    add(item) {
        this.items = this.items.concat(item);
        return this;
    }
    text(text, options) {
        return this.add(new ReceiptTextItem(text instanceof Function ? text(this.support) : text, options));
    }
    ruler(options) {
        return this.add(new ReceiptRulerItem(options));
    }
    break() {
        return this.add(new ReceiptBreakItem());
    }
    properties(lines, options) {
        return this.add(new ReceiptPropertiesItem(lines instanceof Function ? lines(this.support) : lines, options));
    }
    toString() {
        return this.items
            .map((item) => item.format(this))
            .join(os_1.EOL);
    }
}
exports.Receipt = Receipt;
class ReceiptItem {
    constructor(options) {
        this.options = Object.assign(Object.assign({}, this.getDefaultOptions()), (options ? options : {}));
    }
}
exports.ReceiptItem = ReceiptItem;
class ReceiptTextItem extends ReceiptItem {
    constructor(text, options) {
        super(options);
        this.text = text;
    }
    getDefaultOptions() {
        return {
            align: "center",
            horizontalPadding: 0
        };
    }
    format(receipt) {
        if (this.options.horizontalPadding * 2 + 2 > receipt.options.width) {
            throw new exceptions_1.ReceiptFormattingException(receipt, this, "The provided padding does not leave enough space to render text - reduce the padding or increase the total receipt width.");
        }
        const words = this.text.split(/\s+/g);
        let lines = [];
        let line = "";
        for (const word of words) {
            if (line.length + word.length + 1 >
                receipt.options.width - this.options.horizontalPadding * 2) {
                lines.push(line.trim());
                line = "";
            }
            line += word + " ";
        }
        lines.push(line.trim());
        return lines
            .map((line) => receipt.support.toAlignedString(line, this.options.align, this.options.horizontalPadding))
            .join(os_1.EOL);
    }
}
exports.ReceiptTextItem = ReceiptTextItem;
class ReceiptRulerItem extends ReceiptItem {
    getDefaultOptions() {
        return {
            pattern: "="
        };
    }
    format(receipt) {
        let result = "";
        while (result.length < receipt.options.width) {
            result += this.options.pattern;
        }
        return result.substr(0, receipt.options.width);
    }
}
exports.ReceiptRulerItem = ReceiptRulerItem;
class ReceiptBreakItem extends ReceiptItem {
    format(receipt) {
        return "".padStart(receipt.options.width);
    }
    getDefaultOptions() { }
}
exports.ReceiptBreakItem = ReceiptBreakItem;
class ReceiptPropertiesItem extends ReceiptItem {
    constructor(lines, options) {
        super(options);
        this.lines = lines;
    }
    format(receipt) {
        const longestLabelWidth = Math.max(...this.lines.map((line) => line.label.length)) + this.options.separator.length;
        return this.lines
            .map((line) => this.options.layout === "align"
            ? (line.label + this.options.separator).padEnd(longestLabelWidth) +
                " " +
                line.value
            : (line.label + this.options.separator).padEnd(receipt.options.width - line.value.length) + line.value)
            .join(os_1.EOL);
    }
    getDefaultOptions() {
        return {
            layout: "align",
            separator: ":"
        };
    }
}
exports.ReceiptPropertiesItem = ReceiptPropertiesItem;
function create(options) {
    return new Receipt(options);
}
exports.default = create;
