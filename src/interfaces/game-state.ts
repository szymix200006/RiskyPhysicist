import { Player } from "./player";
import { Question } from "./question";

export interface GameState {
    players: Player[];
    questions: Question[];
}
