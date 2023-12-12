export const MAX_NUM = 3;

export enum Color {
    RED = 1,
    BLUE = 2,
    GREEN = 3,
}

// reverse mapping
export function colorToString(c: Color): string {
    switch (c) {
        case Color.RED:
            return 'red';
        case Color.BLUE:
            return 'blue';
        case Color.GREEN:
            return 'green';
    }
}

export enum Pattern {
    FILLED = 1,
    STRIPED = 2,
    OUTLINED = 3,
}

export function patternToString(p: Pattern): string {
    switch (p) {
        case Pattern.FILLED:
            return 'filled';
        case Pattern.STRIPED:
            return 'dotted';
        case Pattern.OUTLINED:
            return 'outlined';
    }
}

export enum Shape {
    DIAMOND = 1,
    SQUIGGLE = 2,
    CIRCLE = 3,
}

export function shapeToString(s: Shape): string {
    switch(s) {
        case Shape.DIAMOND:
            return 'diamond';
        case Shape.SQUIGGLE:
            return 'triangle';
        case Shape.CIRCLE:
            return 'circle';
    }
}

export class Card {
    number: number;
    color: Color;
    shape: Shape;
    pattern: Pattern;

    constructor(number: number, color: Color, shape: Shape, pattern: Pattern) {
        this.number = number;
        this.color = color;
        this.shape = shape;
        this.pattern = pattern;
    }

    toString(): string {
        return `Card <n=${this.number}, c=${this.color}, s=${this.shape}, p=${this.pattern}>`;
    }

    isSame(otherCard: Card): boolean {
        if (this.number !== otherCard.number) {
            return false;
        }
        if (this.color !== otherCard.color) {
            return false;
        }
        if (this.shape !== otherCard.shape) {
            return false;
        }
        if (this.pattern !== otherCard.pattern) {
            return false;
        }
        return true;
        // return this.hash() === otherCard.hash();
    }

    hash(): number {
        // assume MAX_NUM is inclusive
        const base = MAX_NUM + 1;
        return this.number + this.color * (base) + this.shape * (base ** 2) + this.pattern * (base ** 3);
    }
}
