import { Children, useState } from 'react'
import './App.css'
import confetti from "canvas-confetti"

/* 
  LÓGICA DEL JUEGO TIC-TAC-TOE:
  
  1. Renderizamos un tablero compuesto por 9 casillas (Squares).
  2. Cada casilla es un componente independiente que:
     - Recibe propiedades como `index` y `updateBoard`.
     - Llama a la función `updateBoard` al hacer clic para actualizar el estado del tablero.
  3. El estado global incluye:
     - `board`: Representa el estado actual del tablero.
     - `turn`: Indica de quién es el turno (X o O).
  4. Al hacer clic en una casilla:
     - Se actualiza el tablero.
     - Se alterna el turno entre X y O.
*/

    /* CONSTANTES */

// Define los dos turnos posibles del juego: X y O.
const TURNS = {
  X: 'x',
  O: 'o'
}

    /* COMPONENTES */

// Componente individual que representa una casilla del tablero.
const Square = ({ children, isSelected, updateBoard, index }) => {
  // Asigna una clase dinámica dependiendo de si la casilla está seleccionada.
  const className = `square ${isSelected ? 'is-selected' : ''}`

  // Función que maneja el clic en una casilla y actualiza el tablero.
  const handleClick = () => {
    updateBoard(index) // Notifica el índice de la casilla seleccionada.
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

    /* COMPONENTE PRINCIPAL */

// Componente principal de la aplicación.
function App() {
  /* ESTADO */

  // Estado del tablero: Un array de 9 posiciones inicializadas como `null`.
  const [board, setBoard] = useState(Array(9).fill(null))

  // Estado del turno: Empieza con el turno de 'X'.
  const [turn, setTurn] = useState(TURNS.X)

  // Estado del ganador
  const [winner, setWinner] = useState(null) // Null = No hay ganador || False = Hay un empate


  const checkWinner = (boardToCheck) => {
    // Revisamos todas las combinaciones ganadoras
    // para ver si X o U ganó
    for (const combo of WINNER_COMBOS){
      const [a, b, c] = combo
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ){
        return boardToCheck[a]
      }
    }
    // Si no hay ganador
    return null
  }


      /* FUNCIONES */
  // Para resetear lo que sea, hay que asegurarse de que ponemos los ESTADOS en sus VALORES INICIALES
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const checkEndGame = (newBoard) => {
    // Cuando todas las posiciones son diferente de null significa que ha terminado el juego
    return newBoard.every((square) => square !== null)
  }

  // Actualiza el estado del tablero y alterna el turno.
  const updateBoard = (index) => {
    // Evita actualizar si la casilla ya está ocupada o tenemos un ganador
    if (board[index] || winner ) return

    // Crea una copia del tablero y actualiza el tablero.
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    // Cambia el turno: Si es 'X', pasa a 'O', y viceversa.
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    // Revisar si hay un ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner){
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)){
      setWinner(false) // empate
    }
  }

      /* RENDERIZADO */

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>

      <button onClick={resetGame}>Reset</button>

      {/* Renderiza el tablero */}
      <section className='game'>
        {
          board.map((square, index) => (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {square}
            </Square>
          ))
        }
      </section>

      {/* Muestra el turno actual */}
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      {/* Muestra el resultado */}
      {
        winner !== null && (
          <section className='winner'> {/* Este className es un modal */}
            <div className='text'>
              <h2>
                {
                  winner === false ? 'Empate' : 'Ganó:'
                }
              </h2>

              <header className='win'>
                {winner && <Square>{winner}</Square>}
              </header>

              <footer>
                <button onClick={resetGame}>Empezar de nuevo</button>
              </footer>

            </div>
          </section>
        )
      }

    </main>
  )
}

export default App
