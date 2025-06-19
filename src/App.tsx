import { useState, useRef, useEffect } from 'react'
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faVolumeUp, faVolumeMute, faTimes } from '@fortawesome/free-solid-svg-icons'
import { faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons'
import { faJava, faJs } from '@fortawesome/free-brands-svg-icons'
import { faCode, faCodeBranch } from '@fortawesome/free-solid-svg-icons'

function App() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [showModal, setShowModal] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume

      const slider = document.querySelector('.volume-slider') as HTMLInputElement
      if (slider) {
        slider.style.setProperty('--volume-level', `${volume * 100}%`)
      }
    }
  }, [volume])

  useEffect(() => {
    if (audioRef.current) {
      const updateTime = () => {
        setCurrentTime(audioRef.current?.currentTime || 0)
      }
      const updateDuration = () => {
        setDuration(audioRef.current?.duration || 0)
      }

      audioRef.current.addEventListener('timeupdate', updateTime)
      audioRef.current.addEventListener('loadedmetadata', updateDuration)

      return () => {
        audioRef.current?.removeEventListener('timeupdate', updateTime)
        audioRef.current?.removeEventListener('loadedmetadata', updateDuration)
      }
    }
  }, [])

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume

      e.target.style.setProperty('--volume-level', `${newVolume * 100}%`)
    }
  }

  const handleOpenModal = () => {
    setShowModal(true)
    setIsClosing(false)
  }

  const handleCloseModal = () => {
    setIsClosing(true)
  }

  const handleAnimationEnd = () => {
    if (isClosing) {
      setShowModal(false)
      setIsClosing(false)
    }
  }

  return (
    <div className="app-container">
      <div className="background-video">
      <video
        ref={videoRef}
        src="https://files.catbox.moe/nfiphz.mp4"
        autoPlay
        muted
        loop
        playsInline
        disablePictureInPicture
      />
      </div>
      <div className="content">
        <h1 className="title">
          Golb
        </h1>
        <button className="modal-button" onClick={handleOpenModal}>
          View More
        </button>
      </div>

      <div className="music-controls">
        <div className="song-info">
          <a 
            href="https://www.youtube.com/@PurpleHazeTrappyn" 
            target="_blank" 
            rel="noopener noreferrer"
            className="artist-avatar"
          >
            <img 
              src="https://yt3.googleusercontent.com/9TXIl_ecE1muYUATUiT3OlxIz91F_n2SvX3w69nTVLzezp2hq_MoUTZBAGhPLBmo_QUOVkTKDg=s160-c-k-c0x00ffffff-no-rj" 
              alt="PurpleHaze Avatar"
            />
          </a>
          <div className="song-details">
            <div className="song-title">Loco/PurpleHaze - Smerfy</div>
            <div className="time-display">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>
        </div>
        <div className="controls-row">
          <button 
            className={`control-button ${isPlaying ? 'active' : ''}`}
            onClick={togglePlay}
          >
            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
          </button>
          <button 
            className={`control-button ${isMuted ? 'active' : ''}`}
            onClick={toggleMute}
          >
            <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp} />
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="volume-slider"
          />
        </div>
      </div>

      {showModal && (
        <div 
          className={`modal-overlay ${isClosing ? 'closing' : ''}`}
          onAnimationEnd={handleAnimationEnd}
        >
          <div className={`modal-content ${isClosing ? 'closing' : ''}`}>
            <div className="modal-header">
              <div className="profile-info">
                <div className="profile-details">
                  <h2>Golb</h2>
                  <p>Software Developer</p>
                </div>
              </div>
              <button className="close-button" onClick={handleCloseModal}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className="modal-body">
              <div className="profile-section">
                <img 
                  src="https://cdn.discordapp.com/avatars/1155563178051256341/48ddc89b5d696823d2bf457b6ef29f8b.png?size=1024" 
                  alt="Profile" 
                  className="profile-image"
                />
                <div className="profile-info">
                  <h3>Golb</h3>
                  <p>Software Developer</p>
                  <div className="profile-links">
                    <a href="https://discord.com/users/g0lb1" target="_blank" rel="noopener noreferrer" className="profile-link">
                      <FontAwesomeIcon icon={faDiscord} /> g0lb1
                    </a>
                    <a href="https://github.com/g0lb1" target="_blank" rel="noopener noreferrer" className="profile-link">
                      <FontAwesomeIcon icon={faGithub} /> @g0lb1
                    </a>
                  </div>
                </div>
              </div>
              <div className="skills-section">
                <h3>Languages</h3>
                <div className="skills-grid">
                  <div className="skill-item">
                    <FontAwesomeIcon icon={faCode} className="skill-icon" />
                    <span>C++</span>
                  </div>
                  <div className="skill-item">
                    <FontAwesomeIcon icon={faJs} className="skill-icon" />
                    <span>JavaScript</span>
                  </div>
                  <div className="skill-item">
                    <FontAwesomeIcon icon={faJava} className="skill-icon" />
                    <span>Java</span>
                  </div>
                  <div className="skill-item">
                    <FontAwesomeIcon icon={faCodeBranch} className="skill-icon" />
                    <span>TypeScript</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <audio
        ref={audioRef}
        src="https://files.catbox.moe/moatmr.mp3"
        loop
        autoPlay
      />
    </div>
  )
}

export default App