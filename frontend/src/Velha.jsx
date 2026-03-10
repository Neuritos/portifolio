import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const Velha = ({ terminalColor }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const navigate = useNavigate();

  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];

  const calculateWinner = useCallback((squares) => {
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return squares.includes(null) ? null : 'TIE';
  }, [lines]);

  const executeMove = useCallback((index, player) => {
    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);
    
    const result = calculateWinner(newBoard);
    if (result) {
      setWinner(result);
    } else {
      setIsPlayerTurn(player === 'O');
    }
  }, [board, calculateWinner]);

  const makeSmartMove = useCallback(() => {
    const getEmptyIndices = (b) => b.map((v, i) => v === null ? i : null).filter(v => v !== null);
    

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      const vals = [board[a], board[b], board[c]];
      if (vals.filter(v => v === 'O').length === 2 && vals.filter(v => v === null).length === 1) {
        const target = [a, b, c][vals.indexOf(null)];
        executeMove(target, 'O');
        return;
      }
    }


    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      const vals = [board[a], board[b], board[c]];
      if (vals.filter(v => v === 'X').length === 2 && vals.filter(v => v === null).length === 1) {
        const target = [a, b, c][vals.indexOf(null)];
        executeMove(target, 'O');
        return;
      }
    }


    if (board[4] === null) {
      executeMove(4, 'O');
      return;
    }


    const empty = getEmptyIndices(board);
    if (empty.length > 0) {
      const random = empty[Math.floor(Math.random() * empty.length)];
      executeMove(random, 'O');
    }
  }, [board, lines, executeMove]);

  useEffect(() => {
    if (gameStarted && !isPlayerTurn && !winner) {
      const timer = setTimeout(makeSmartMove, 600);
      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, winner, gameStarted, makeSmartMove]);

  const handlePlayerClick = (i) => {
    if (!isPlayerTurn || winner || board[i]) return;
    executeMove(i, 'X');
  };

  const startGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setWinner(null);
    setGameStarted(true);
  };


  const overlayStyle = {
    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
    display: 'flex', flexDirection: 'column', justifyContent: 'center',
    alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.92)', zIndex: 10
  };

  return (
    <div style={{ textAlign: 'center', color: terminalColor, fontFamily: 'monospace' }}>
      <p style={{ letterSpacing: '2px' }}>
        STATUS: {winner ? '>> SYSTEM_HALTED' : isPlayerTurn ? '>> WAITING_USER_INPUT' : '>> ANALYZING_PATTERNS...'}
      </p>
      
      <div style={{ 
        border: `2px solid `, 
        display: 'inline-block',
        position: 'relative',
        boxShadow: `0 0 15px`
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 100px)' }}>
          {board.map((square, i) => (
            <div 
              key={i} 
              onClick={() => handlePlayerClick(i)}
              style={{
                width: '100px', height: '100px',
                border: `0.5px solid `,
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                fontSize: '40px', cursor: isPlayerTurn && !board[i] ? 'pointer' : 'default',
                color: square === 'X' ? terminalColor : '#ffffff',
                textShadow: square ? `0 0 10px ${square === 'X' ? terminalColor : 'red'}` : 'none'
              }}
            >
              {square}
            </div>
          ))}
        </div>

        {!gameStarted && (
          <div style={overlayStyle}>
            <h2 style={{ marginBottom: '20px' }}>AI_CHALLENGE_V3</h2>
            <a onClick={startGame} class='back-link' style={{fontSize:'30px'}}>
              [ JOGAR ]
            </a>
          </div>
        )}

        {winner && (
          <div style={overlayStyle}>
            <h1 style={{ color: winner === 'X' ? terminalColor : '#ff3131', textShadow:'0 0 8px red' }}>
              {winner === 'X' ? 'VITÓRIA' : winner === 'O' ? 'DERROTA' : 'EMPATE'}
            </h1>
            <a onClick={startGame}  style={{ cursor:'pointer',
                border: `1px solid, ${winner === 'X' ? terminalColor : 'red'}`,
              color: winner === 'X' ? terminalColor : 'red', fontSize:'25px', textShadow:'0 0 8px red',
            }}>
              [ JOGAR NOVAMENTE ]
            </a>
          </div>
        )}
      </div>

      <div style={{ marginTop: '30px' }}>
        <a onClick={() => navigate(-1)} class='back-link'>
          {`[ VOLTAR ]`}
        </a>
      </div>
    </div>
  );
};

export default Velha;