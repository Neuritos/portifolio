import { useEffect, useState, useRef } from 'react'
import './css/App.css'
import SnakeGame from './SnakeGame.jsx';
import Velha from './Velha.jsx'

import { Routes, Route, Link, useLocation } from 'react-router-dom'

// --- COMPONENTE DA TELA DE BOOT DINÂMICA ---
const BootScreen = ({ title, status, message, onStart, color }) => (
  <div className="terminal-screen" style={{ '--main-color': color, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <div className="terminal-window" style={{ padding: '50px', textAlign: 'center' }}>
      <header className="terminal-header"><span className="title">{title}</span></header>
      <div className="terminal-content">
        <h2 style={{ marginBottom: '20px' }}>SYSTEM_STATUS: {status}</h2>
        <p>{message}</p>
        <br />
        <button 
          className="back-link" 
          style={{ fontSize: '1.5rem', cursor: 'pointer', background: 'none', border: '1px solid', color: 'inherit', padding: '10px 20px' }}
          onClick={onStart}
        >
          [ INITIALIZE_SYSTEM ]
        </button>
      </div>
    </div>
  </div>
);

function App() {
  const [displayText, setDisplayText] = useState('');
  const [terminalColor, setTerminalColor] = useState('#00FF41');
  const [currentView, setCurrentView] = useState('home');
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const location = useLocation();
  const bgMusic = useRef(new Audio('Barrier.mp3'));

  // --- LÓGICA DE TEXTOS DA TELA DE BOOT ---
  const getBootConfig = () => {
    switch (location.pathname) {
      case '/snakegame':
        return {
          title: 'SNAKE_PROTOCOL_ENCRYPTED',
          status: 'GAME_LOCKED',
          message: 'Módulos de movimento e som desativados. Descriptografe para jogar Snake.',
          color: '#00FF41'
        };
      case '/velha':
        return {
          title: 'TIC_TAC_TOE_SECURITY',
          status: 'LOGIC_ENCRYPTED',
          message: 'Inicialize o sistema para carregar a matriz do jogo.',
          color: '#00FFFF'
        };
      default:
        return {
          title: 'AUTHENTICATION_REQUIRED',
          status: 'ENCRYPTED',
          message: 'Clique abaixo para descriptografar os arquivos e ativar os módulos de som.',
          color: '#00FF41'
        };
    }
  };

  const bootConfig = getBootConfig();

  useEffect(() => {
    bgMusic.current.loop = true;
    bgMusic.current.volume = 0.5;
    if (hasInteracted && !isMuted) {
      bgMusic.current.play().catch(() => console.log("Autoplay bloqueado"));
    } else {
      bgMusic.current.pause();
    }
  }, [isMuted, hasInteracted]);

  const playSfx = (file) => {
    if (isMuted || !hasInteracted) return;
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
    if (hasInteracted && currentView === 'home' && !isLoading) {
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
  }, [currentView, isLoading, hasInteracted]);

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
            <div className='sobreform'> 
              <div className='minhafoto'></div>
              <p>★ Formado em ADS (Unicesumar)<br/>
              ★ Curso técnico em Programação (ETEC)<br/>
              ★ Estudando cybersecurity e Pentesting (HackerSec e Solyd)<br/>
              ★ Pretendo me especializar em infraestrutura crítica.</p>
            </div>
            <p>Sou um entusiasta de cibersegurança focado em entender as vulnerabilidades que comprometem a integridade de sistemas digitais. Com uma base sólida em lógica de programação e Python, venho dedicando meus estudos à área de Pentest (Testes de Intrusão) e análise de falhas. Minha jornada começou na programação geral aos 14 anos, mas minha verdadeira motivação está em "pensar como um invasor" para construir defesas mais fortes. Atualmente, foco meus estudos em OWASP Top 10, redes de computadores e o desenvolvimento de scripts para automação de testes de segurança.</p>
            <a className="back-link" onClick={(e) => handleNav(e, 'home')}>[ VOLTAR ]</a>
          </div>
        );
      case 'projects':
        return (
          <div className="view-content">
            <h2> REPOSITORIOS.BIN</h2>
            <p>Listando diretórios disponíveis no GitHub...</p>
            <ul></ul>
            <a className="back-link" onClick={(e) => handleNav(e, 'home')}>[ VOLTAR ]</a>
          </div>
        );
      case 'skills':
        return (
          <div className="view-content">
            <h2> HABILIDADES.ZIP</h2>
            <p>Listando minhas habilidades em programação...</p>
            <div className='skill'>
              <div>
                Blackarch linux - 1%
                <div id='progress-barra'><div className='progress-prenchimento7'></div></div>
                Kali Linux - 9%
                <div id='progress-barra'><div className='progress-prenchimento5'></div></div> 
                HTML - 96%
                <div id='progress-barra'><div className='progress-prenchimento1'></div></div>
                CSS - 91%
                <div id='progress-barra'><div className='progress-prenchimento2'></div></div>
              </div>
              <div>
                JavaScript - 79%
                <div id='progress-barra'><div className='progress-prenchimento3'></div></div>
                Python - 70%
                <div id='progress-barra'><div className='progress-prenchimento4'></div></div> 
                SQL - 50%
                <div id='progress-barra'><div className='progress-prenchimento6'></div></div>
              </div>
            </div>
            <a className="back-link" onClick={(e) => handleNav(e, 'home')}>[ VOLTAR ]</a>
          </div>
        );
      case 'jogos':
        return (
          <div className="view-content">
            <h2> JOGOS.EXE</h2>
            <p>Lista de jogos para você testar...</p>
            <ul style={{display:'flex', flexDirection:'initial'}}>
              <Link to="#" className='game1' onClick={() => playSfx('button-click.mp3')}></Link>
              <Link to="/velha" className='game2' onClick={() => playSfx('button-click.mp3')}></Link>
              <Link to="/snakegame" className='game3' onClick={() => playSfx('button-click.mp3')}></Link>
            </ul>
            <a className="back-link" onClick={(e) => handleNav(e, 'home')}>[ VOLTAR ]</a>
          </div>
        );
      case 'sis_test':
        return (
          <div className="view-content">
            <h2> SISTEMAS_TESTE.LOG</h2>
            <p>Ambientes de homologação ativos:</p>
            <a className="back-link" onClick={(e) => handleNav(e, 'home')}>[ VOLTAR ]</a>
          </div>
        );
      case 'contact':
        return (
          <div className="view-content">
            <h2> CONTATO.SH</h2>
            <p>Canais de comunicação seguros:</p>
            <ul>
              <li><a href="https://www.linkedin.com/in/gustavo-silva-de-deus-737a76276/" target="_blank" rel="noopener noreferrer">[LINKEDIN]</a></li>
              <li><a href="https://github.com/Neuritos" target="_blank" rel="noopener noreferrer">[GITHUB]</a></li>
              <li><a href="mailto:gustavodedeus111@gmail.com" target="_blank" rel="noopener noreferrer">[EMAIL]</a></li>
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

  if (!hasInteracted) {
    return (
      <BootScreen 
        title={bootConfig.title}
        status={bootConfig.status}
        message={bootConfig.message}
        color={bootConfig.color}
        onStart={() => setHasInteracted(true)}
      />
    );
  }

  return (
    <div className="terminal-screen" style={{ '--main-color': terminalColor }}>
      <div className="scanlines"></div>
      <div className="sound-picker">
        <a className='sound' onClick={() => setIsMuted(!isMuted)}>
          {isMuted ? "[ 🔊 SOUND: OFF ]" : "[ 🔊 SOUND: ON ]"}
        </a>
      </div>
      <div className="color-picker">
        <span className="label">THEME_COLOR:</span>
        <button className="dot green" onClick={() => { setTerminalColor('#00FF41'); playSfx('button-click.mp3'); }}></button>
        <button className="dot amber" onClick={() => { setTerminalColor('#FFB000'); playSfx('button-click.mp3'); }}></button>
        <button className="dot cyan" onClick={() => { setTerminalColor('#00FFFF'); playSfx('button-click.mp3'); }}></button>
        <button className="dot red" onClick={() => { setTerminalColor('#FF3131'); playSfx('button-click.mp3'); }}></button>
        <button className="dot purple" onClick={() => { setTerminalColor('#a800ba'); playSfx('button-click.mp3'); }}></button>
      </div>
      <div className="terminal-window">
        <header className="terminal-header">
          <span className="title">TERMINAL_V.4.0 (ADS_SEC) - {currentView.toUpperCase()}</span>
          <div className="controls"><span>_</span><span>□</span><span>×</span></div>
        </header>
        <section className="terminal-content">
          <Routes>
            <Route path="/" element={renderView()} />
            <Route path="/snakegame" element={<SnakeGame />} />
            <Route path="/velha" element={<Velha />} />
          </Routes>
        </section>
      </div>
      <footer className="footer-info">
        ESTABLISHED CONNECTION: SECURE_AES_256 | STATUS: {isLoading ? 'BUSY' : 'READY'}
      </footer>
    </div>
  )
}

export default App;