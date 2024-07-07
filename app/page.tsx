import Image from "next/image";
import { disconnect } from "process";

'use client'


export default function Home() {
  return (
    <>
      <div className=" flex justify-center items-center p-10 bg-slate-700 self-stretch text-7xl">
        <h1>Tic Tac Toe</h1>
      </div>
      <div className="flex justify-center items-center flex-grow  border-teal-200 border-">
        {
          <TicTacToeGame />
        }
      </div>
    </>
  );
}
import React, { Key, MouseEventHandler, ReactEventHandler, useState } from "react";
export function TicTacToeGame() {
  const [boardData, setBoardData] = useState(
    [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ]
  )
  const [xTurn, setXTurn] = useState(true);
  const [gameState, setGameState] = useState(0) // 1: win, 2: draw, 0: ongoing
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (gameState != 0) {
      return
    }
    let indicesToModifyStr = e.currentTarget.id
    let newBoardData = boardData
    newBoardData[Number(indicesToModifyStr[0])][Number(indicesToModifyStr[1])] = xTurn ? "X" : "O"
    setBoardData(newBoardData)
    setXTurn(!xTurn)
  }
  const checkWinner = () => {
    // do something with boardData
    // we can optimize by using xTurn as the previously moved one must be winner

    let winningCombos = [
      [
        [0, 0],
        [0, 1],
        [0, 2]
      ],
      [
        [1, 0],
        [1, 1],
        [1, 2]
      ],
      [
        [2, 0],
        [2, 1],
        [2, 2]
      ],
      [
        [0, 0],
        [1, 1],
        [2, 2]
      ],
      [
        [0, 2],
        [1, 1],
        [2, 0]
      ],
      [
        [0, 0],
        [1, 0],
        [2, 0]
      ],
      [
        [0, 1],
        [1, 1],
        [2, 1]
      ],
      [
        [0, 2],
        [1, 2],
        [2, 2]
      ],
    ]
    let toCheckWin = xTurn ? "X" : "O"
    let win = false
    for (const [idx1, idx2, idx3] of winningCombos) {
      if (boardData[idx1[0]][idx1[1]] == toCheckWin && boardData[idx2[0]][idx2[1]] == toCheckWin && boardData[idx3[0]][idx3[1]] == toCheckWin) {
        win = true
        break
      }
    }
    let draw = true
    for (const i of boardData) { // todo just count turns instead
      for (const j of i) {
        if (j == "")
          draw = false
      }
    }
    if (win || draw) {
      let message = document.getElementById("message")!
      setGameState(win ? 1 : 2)
    }


  }
  const resetGame = () => {
    setBoardData([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ])
    setXTurn(true)
    setGameState(0)

  }
  return (
    <div className=" flex flex-col justify-evenly text-5xl gap-8">
      <div id="message" className="text-center"> {gameState != 2 ? (((gameState == 1 ? !xTurn : xTurn) ? "X" : "O") + (gameState == 0 ? " turn" : " has won!")) : "Draw"}</div >
      <div className=" flex border-teal-200 border-2">
        <div>
          {boardData.map((boardRowData, idxR) => (
            <div className="flex justify-center items-center" key={idxR}>
              {boardRowData.map((boardCellData: String, idxC: Key) => (
                <div className="flex justify-center items-center border-teal-200 border-2 h-28 w-28 " key={idxC} id={String(idxR) + String(idxC)} onClick={(e) => { handleClick(e); checkWinner(); }}>{boardCellData}</div>
              ))}
            </div>
          ))}
        </div >
      </div>
      <div className="flex items-center justify-center">
        <button onClick={resetGame} className="border-teal-200 border-2 rounded-lg p-4 text-3xl bg-slate-700">Reset</button>
      </div>
    </div >

  )
}