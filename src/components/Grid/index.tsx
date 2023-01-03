import { useRef, useState } from "react";
import { duplicateRegenerateSortArray } from "../../utils/cards-utils";
import { Card, CardProps } from "../Card";
import './style.css'

export interface GridProps {
    cards: CardProps[]
}

export function Grid({ cards }: GridProps) {
    const [stateCards, setStatesCards] = useState(() => {
        return duplicateRegenerateSortArray(cards)
    })
    const first = useRef<CardProps | null>(null)
    const second = useRef<CardProps | null>(null)
    const unflip = useRef(false)
    const [matches, setMatches] = useState(0)
    const [moves, setMoves] = useState(0)

    const handleReset = () => {
        setStatesCards(duplicateRegenerateSortArray(cards))
        first.current = null
        second.current = null
        unflip.current = false
        setMatches(0)
        setMoves(0)
    }

    const handleClick = (id: string) => {
        const newStateCards = stateCards.map((card) => {

            if (card.id !== id) return card

            if (card.flipped) return card

            if (unflip.current && first.current && second.current) {
                first.current.flipped = false
                second.current.flipped = false
                first.current = null
                second.current = null
                unflip.current = false

            }

            card.flipped = true

            if (first.current === null) {
                first.current = card
            } else if (second.current === null) {
                second.current = card
            }


            if (first.current && second.current) {
                if (first.current.back === second.current.back) {
                    first.current = null
                    second.current = null
                    setMatches((m) => m + 1)
                } else {
                    unflip.current = true
                }
                setMoves((m) => m + 1)
            }
            return card
        })
        setStatesCards(newStateCards)
    }

    return (
        <>
            <div className="text">
                <h1 className="titulo">Jogo da Memória da Rafa</h1>
                <p>Movimentos: {moves} | Acertos: {matches} | <button className="botao_resetar" onClick={handleReset}>Resetar</button></p>
            </div>
            <div className="grid">
                {stateCards.map((card) => {
                    return <Card {...card} key={card.id} handleClick={handleClick} />
                })}
            </div>
        </>
    )
}