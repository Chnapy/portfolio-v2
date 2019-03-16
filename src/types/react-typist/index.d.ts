
declare module 'react-typist' {

    export interface DelayProps {
        ms: number;
    }

    export class Delay extends React.FunctionComponent<DelayProps> {
        constructor(props: DelayProps) {
            super(props);
        }

        static componentName: 'Delay';
    }

    export interface BackspaceProps {
        count: number;
        delay: number;
    }

    export class Backspace extends React.FunctionComponent<BackspaceProps> {
        constructor(props: BackspaceProps) {
            super(props);
        }

        static componentName: 'Backspace';
    }

    export interface CursorProps {
        blink?: boolean;
        show?: boolean;
        element?: React.ReactNode;
        hideWhenDone?: boolean;
        hideWhenDoneDelay?: number;
        isDone?: boolean;
    }

    export interface CursorState {
        shouldRender: boolean;
    }

    export class Cursor extends React.Component<CursorProps, CursorState> {
        constructor(props: CursorProps) {
            super(props);
        }

        _reRenderCursor(): void;
    }

    export interface DelayGeneratorThird {
        line: string;
        lineIdx: number;
        character: string;
        charIdx: number;
        defDelayGenerator: (mn: number, st: number) => number;
    }

    export interface TypistProps {
        className?: string;
        avgTypingDelay?: number;
        stdTypingDelay?: number;
        startDelay?: number;
        cursor?: CursorProps;
        onCharacterTyped?: (character: string, charIdx: number) => void;
        onLineTyped?: (line: string, lineIdx: number) => void;
        onTypingDone?: () => void;
        delayGenerator?: (mean: number, std: number, third: DelayGeneratorThird) => number;
    }

    export interface TypistState {
        textLines: string[];
        isDone: boolean;
    }

    export default class Typist extends React.Component<TypistProps, TypistState> {

        static Backspace = Backspace;
        static Delay = Delay;

        mounted: boolean;
        linesToType: string[];
        introducedDelay: number | null;

        constructor(props: TypistProps) {
            super(props);
        }

        onTypingDone(): void;

        delayGenerator(line: string, lineIdx: number, character: string, charIdx: number): number;

        typeAllLines(lines: string[]): Promise<void>;

        typeLine(line: string, lineIdx: number): Promise<void>;

        typeCharacter(character: string, charIdx: number, line: string, lineIdx: number): Promise<void>;
    }
    
}