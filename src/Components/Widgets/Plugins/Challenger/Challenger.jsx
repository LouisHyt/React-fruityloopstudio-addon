import React, { useState, useEffect } from 'react';
import './Challenger.css';

const Challenger = () => {
  const defaultGenres = ['Hardstyle', 'trap', 'bass house', 'techno', 'synthwave', 'phonk', 'drum and bass', 'dubstep', 'trance', 'future bass'];
  const [genres, setGenres] = useState(() => {
    const savedGenres = localStorage.getItem('challengerGenres');
    return savedGenres ? JSON.parse(savedGenres) : defaultGenres;
  });
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [time, setTime] = useState(30);
  const [constraints, setConstraints] = useState('with');
  const [customGenre, setCustomGenre] = useState('');

  useEffect(() => {
    localStorage.setItem('challengerGenres', JSON.stringify(genres));
  }, [genres]);

  const timeOptions = [15, 30, 60, 60, 90, 120];
  const constraintOptions = ['with', 'without'];

  const handleStartChallenge = () => {
    // Add challenge start logic here
  };

  const handleGenreClick = (genre) => {
    setSelectedGenres(prev => 
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  const handleAddGenre = (e) => {
    e.preventDefault();
    if (customGenre.trim() && !genres.includes(customGenre.trim())) {
      setGenres(prev => [...prev, customGenre.trim()]);
      setCustomGenre('');
    }
  };

  const handleDeleteGenre = (e, genre) => {
    e.preventDefault();
    setGenres(prev => prev.filter(g => g !== genre));
    setSelectedGenres(prev => prev.filter(g => g !== genre));
  };

  return (
    <div className="challenger-plugin">
      <div className="challenger-header">
        <h2>Challenger v1.0</h2>
        <div className="challenger-led"></div>
      </div>
      
      <div className="challenger-controls">
        <div className="control-group genres-container">
          <label>Genres</label>
          <form onSubmit={handleAddGenre} className="custom-genre-form">
            <input
              type="text"
              value={customGenre}
              onChange={(e) => setCustomGenre(e.target.value)}
              placeholder="Add custom genre"
              className="challenger-input"
            />
            <button type="submit" className="add-genre-button">+</button>
          </form>
          <div className="genres-grid">
            {genres.map((genre, index) => (
              <div
                key={index}
                onClick={() => handleGenreClick(genre)}
                onContextMenu={(e) => handleDeleteGenre(e, genre)}
                className={`genre-button ${selectedGenres.includes(genre) ? 'selected' : ''}`}
              >
                {genre.toUpperCase()}
              </div>
            ))}
          </div>
        </div>

        <div className="control-group options-container">
          <div className="control-item">
            <label>Time (minutes)</label>
            <select 
              value={time} 
              onChange={(e) => setTime(Number(e.target.value))}
              className="challenger-select"
            >
              {timeOptions.map((val, index) => (
                <option key={index} value={val}>{val}</option>
              ))}
            </select>
          </div>

          <div className="control-item">
            <label>Constraints</label>
            <select 
              value={constraints} 
              onChange={(e) => setConstraints(e.target.value)}
              className="challenger-select"
            >
              {constraintOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <button 
        className="challenger-button" 
        onClick={handleStartChallenge}
      >
        START CHALLENGE
      </button>
    </div>
  );
};

export default Challenger;