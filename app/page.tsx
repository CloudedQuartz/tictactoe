import Image from "next/image";
import { disconnect } from "process";

'use client'
export default function Home() {
  return (
    <>
      <div className=" flex justify-center items-center p-10 bg-slate-700 self-stretch">
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
  const handleClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    let indicesToModifyStr = e.currentTarget.id
    let newBoardData = boardData
    newBoardData[Number(indicesToModifyStr[0])][Number(indicesToModifyStr[1])] = xTurn ? "X" : "O"
    setBoardData(newBoardData)
    setXTurn(!xTurn)
  }
  return (
    <div className="text-7xl">
      <div className="text-center"> {xTurn ? "X" : "O"} turn</div >
      <div className=" border-teal-200 border-2">
        <div>
          {boardData.map((boardRowData, idxR) => (
            <div className="flex justify-center items-center " key={idxR}>
              {boardRowData.map((boardCellData: String, idxC: Key) => (
                <div className="flex justify-center items-center border-teal-200 border-2 h-36 w-36 " key={idxC} id={String(idxR) + String(idxC)} onClick={handleClick}>{boardCellData}</div>
              ))}
            </div>
          ))}
        </div >
      </div>
    </div >

  )
}