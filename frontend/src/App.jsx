import { useEffect, useState, useRef } from 'react'
import './css/App.css'

function App() {
  const [displayText, setDisplayText] = useState('');
  const [terminalColor, setTerminalColor] = useState('#00FF41');
  const [currentView, setCurrentView] = useState('home');
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const bgMusic = useRef(new Audio('Ambience2.mp3'));
  useEffect(() => {
    bgMusic.current.loop = true;
    bgMusic.current.volume = 1;
    
    if (!isMuted) {
      bgMusic.current.play().catch(() => console.log("Autoplay bloqueado pelo browser"));
    } else {
      bgMusic.current.pause();
    }
  }, [isMuted]);

  const playSfx = (file) => {
    if (isMuted) return;
    const sfx = new Audio(`${file}`);
    sfx.volume = 0.5;
    sfx.play();
  };

  const fullText = `> SYSTEM READY
> USER: ADS_GRADUATE
> SPECIALIZATION: CYBERSECURITY
> STATUS: OPEN FOR PROJECTS
> TYPE 'HELP' TO LIST COMMANDS...`;

  useEffect(() => {
    if (currentView === 'home' && !isLoading) {
      let i = 0;
      setDisplayText('');
      const interval = setInterval(() => {
        if (i < fullText.length) {
          setDisplayText((prev) => prev + fullText.charAt(i));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 40);
      return () => clearInterval(interval);
    }
  }, [currentView, isLoading]);

  const handleNav = (e, view) => {
    if (e) e.preventDefault();

    playSfx('button-click.mp3');

    setIsLoading(true);

    playSfx('Garble1.mp3');

    setTimeout(() => {
      setCurrentView(view);
      setIsLoading(false);
      
    }, 1200); 
  };

  const renderView = () => {
    if (isLoading) {
      return (
        <div className="loading-container">
          <p className="loading-text">ACCESSING_SERVER...</p>
          <div className="progress-bar"><div className="progress-fill"></div></div>
          <p className="decrypt-text">DECRYPTING_FILES: {Math.floor(Math.random() * 100)}%</p>
        </div>
      );
    }
    

    switch (currentView) {
      case 'about':
        return (
          <div className="view-content">
            <h2> SOBRE_MIM.TXT</h2>
            <a class='minhafoto'></a>           
            <p>Formado em ADS pela Unicesumar</p>
            <p>Atualmente estou focado em Segurança da Informação e Pentesting (Hacking Ético)</p>
            <p>Pretendo me </p>
            <a className="back-link" onClick={(e) => handleNav(e, 'home')}>[ VOLTAR ]</a>
            
          </div>
        );
      case 'projects':
        return (
          <div className="view-content">
            <h2> REPOSITORIOS.BIN</h2>
            <p>Listando diretórios disponíveis no GitHub...</p>
            <ul>
              <li><a href="#">[PROJETO_01] - Sistema de Login Seguro</a></li>
              <li><a href="#">[PROJETO_02] - API Rest com Node.js</a></li>
            </ul>
            <a className="back-link" onClick={(e) => handleNav(e, 'home')}>[ VOLTAR ]</a>
          </div>
        );
      case 'skills':
        return (
          <div className="view-content">
            <h2> REPOSITORIOS.BIN</h2>
            <p>Listando diretórios disponíveis no GitHub...</p>
            <ul>
              <li><a href="#">[PROJETO_01] - Sistema de Login Seguro</a></li>
              <li><a href="#">[PROJETO_02] - API Rest com Node.js</a></li>
            </ul>
            <a className="back-link" onClick={(e) => handleNav(e, 'home')}>[ VOLTAR ]</a>
          </div>
        );
      case 'jogos':
        return (
          <div className="view-content">
            <h2> JOGOS.EXE</h2>
            <p>Lista de jogos para você testar...</p>
            <ul style={{display:'flex', flexDirection:'initial'}}>
              <a class='game1' href="#"></a>
              <a class='game2' href="#"></a>
              <a class='game3' href="#"></a>
            </ul>
            <a className="back-link" onClick={(e) => handleNav(e, 'home')}>[ VOLTAR ]</a>
          </div>
        );
      case 'sis_test':
        return (
          <div className="view-content">
            <h2> REPOSITORIOS.BIN</h2>
            <p>Listando diretórios disponíveis no GitHub...</p>
            <ul>
              <li><a href="#">[PROJETO_01] - Sistema de Login Seguro</a></li>
              <li><a href="#">[PROJETO_02] - API Rest com Node.js</a></li>
            </ul>
            <a className="back-link" onClick={(e) => handleNav(e, 'home')}>[ VOLTAR ]</a>
          </div>
        );
      case 'contact':
        return (
          <div className="view-content">
            <h2> REPOSITORIOS.BIN</h2>
            <p>Listando diretórios disponíveis no GitHub...</p>
            <ul>
              <li><a href="#">[PROJETO_01] - Sistema de Login Seguro</a></li>
              <li><a href="#">[PROJETO_02] - API Rest com Node.js</a></li>
            </ul>
            <a className="back-link" onClick={(e) => handleNav(e, 'home')}>[ VOLTAR ]</a>
          </div>
        );
      default:
        return (
          <>
            <div className="typing-area">
              <h1>USER_PORTIFOLIO: Gustavo Silva de Deus</h1>
              <div className="text-output">{displayText}</div>
              <span className="cursor">█</span>
            </div>

            <nav className="terminal-nav">
              <br />
              <p className="dir">~/portfolio/links</p>
              <ul>
                <li><a href="#" onClick={(e) => handleNav(e, 'about')}>[01] SOBRE_MIM</a></li>
                <li><a href="#" onClick={(e) => handleNav(e, 'projects')}>[02] REPOSITORIOS</a></li>
                <li><a href="#" onClick={(e) => handleNav(e, 'skills')}>[03] HABILIDADES_TECNICAS</a></li>
                <li><a href="#" onClick={(e) => handleNav(e, 'jogos')}>[04] AREA_DE_JOGOS</a></li>
                <li><a href="#" onClick={(e) => handleNav(e, 'sis_test')}>[05] SISTEMAS_TESTE</a></li>
                <li><a href="#" onClick={(e) => handleNav(e, 'contact')}>[06] CANAL_DE_CONTATO</a></li>
              </ul>
            </nav>
          </>
        );
    }
  };

  return (
    <div className="terminal-screen" style={{ '--main-color': terminalColor }}>
      <div className="scanlines"></div>
      <div className="audio-controls">

</div>
      <div className="sound-picker">
        <a class= 'sound' onClick={() => setIsMuted(!isMuted)}>
          {isMuted ? "[ 🔊 SOUND: OFF ]" : "[ 🔊 SOUND: ON ]"}
        </a>
        </div>
      <div className="color-picker">

        <span className="label">THEME_COLOR:</span>
        <button className="dot green" onClick={() => setTerminalColor('#00FF41')}></button>
        <button className="dot amber" onClick={() => setTerminalColor('#FFB000')}></button>
        <button className="dot cyan" onClick={() => setTerminalColor('#00FFFF')}></button>
        <button className="dot red" onClick={() => setTerminalColor('#FF3131')}></button>
        <button className="dot purple" onClick={() => setTerminalColor('#a800ba')}></button>
      </div>

      <div className="terminal-window">
        <header className="terminal-header">
          <span className="title">TERMINAL_V.4.0 (ADS_SEC) - {currentView.toUpperCase()}</span>
          <div className="controls"><span>_</span><span>□</span><span>×</span></div>
        </header>

        <section className="terminal-content">
          {renderView()}
        </section>
      </div>

      <footer className="footer-info">
        ESTABLISHED CONNECTION: SECURE_AES_256 | STATUS: {isLoading ? 'BUSY' : 'READY'}
      </footer>
    </div>
  )
}

export default App;