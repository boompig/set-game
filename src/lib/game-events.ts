import type { Card } from '$lib/card';

export enum GameEventType {
    CARD_SELECTED = 'card-selected',
};

export interface IGameEvent {
    type: GameEventType;
    card?: Card;
}