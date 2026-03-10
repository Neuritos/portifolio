import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SnakeGame = ({ terminalColor, onBack }) => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const navigate = useNavigate();
  
  const gameActive = useRef(false);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const gridSize = 20;
    const tileCount = canvas.width / gridSize;

    let snake = [{ x: 10, y: 10 }];
    let food = { x: 5, y: 5 };
    let dx = 1; 
    let dy = 0;

    const drawGame = () => {
      if (!gameActive.current) return;

      const head = { x: snake[0].x + dx, y: snake[0].y + dy };

      if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        endGame();
        return;
      }

      if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        endGame();
        return;
      }

      snake.unshift(head);

      if (head.x === food.x && head.y === food.y) {
        setScore(s => s + 10);
        food = {
          x: Math.floor(Math.random() * tileCount),
          y: Math.floor(Math.random() * tileCount)
        };
      } else {
        snake.pop();
      }


      ctx.fillStyle = '#1a1a1a'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);

      ctx.fillStyle = '#0d9f4c'; 
      snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
      });
    };

    const endGame = () => {
      gameActive.current = false;
      setGameOver(true);
    };

    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowUp': if (dy === 0) { dx = 0; dy = -1; } break;
        case 'ArrowDown': if (dy === 0) { dx = 0; dy = 1; } break;
        case 'ArrowLeft': if (dx === 0) { dx = -1; dy = 0; } break;
        case 'ArrowRight': if (dx === 0) { dx = 1; dy = 0; } break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const gameInterval = setInterval(drawGame, 100);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(gameInterval);
    };
  }, [gameStarted, gameOver, terminalColor]);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    gameActive.current = true;
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 10
  };


  return (
    <div style={{ textAlign: 'center', color: terminalColor, fontFamily: 'monospace' }}>
      <p>SCORE: {score} | STATUS: {gameOver ? 'SYSTEM_FAILURE' : gameStarted ? 'RUNNING...' : 'IDLE'}</p>
      
      <div class='tela-snake' style={{ 
        border: `2px solid ${terminalColor}`, 
        display: 'inline-block', 
        backgroundColor: '#000',
        position: 'relative'
      }}>
        <canvas ref={canvasRef} width={400} height={400} style={{ display: 'block' }} />

        {!gameStarted && (
          <div style={overlayStyle}>
            <h2 style={{ color: terminalColor }}>SNAKE_OS v1.0</h2>
            <a onClick={startGame} class='back-link' style={{fontSize:'25px'}}>
              [ INICIAR JOGO ]
            </a>
          </div>
        )}

        {gameOver && (
          <div style={overlayStyle}>
            <h1 style={{ color: '#ff0000', marginBottom: '0', textShadow:'0 0 8px red'}}>GAME OVER</h1>
            <p style={{ color: '#FF3131',  textShadow:'0 0 8px red' }}>CRITICAL_COLLISION_DETECTED</p>
            <a onClick={startGame} class='back-link' style={{fontSize:'25px'}}>
              [ TENTAR NOVAMENTE ]
            </a>
          </div>
        )}
      </div>

      <div style={{ marginTop: '20px' }}>
        <a onClick={() => navigate(-1)} class='back-link'>
          [ VOLTAR ]
        </a>
      </div>
    </div>
  );
};

export default SnakeGame;