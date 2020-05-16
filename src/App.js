import React from 'react';
import './App.css';

class RunButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
    alert('todo...');
  }

  render() {
    return (
      <button className="button" onClick={() => this.handleClick()}>
        Run
      </button>
    );
  }
}

function App() {
  let players = `player1\nplayer2\nplayer3\nplayer4`
  let rankings = `player1:80\nplayer2:60\nplayer3:40\nplayer4:20`
  return (
    <div className="App">
      <header className="App-header">
        <p>Rosters</p>
      </header>
      <div className="App-content">
        <div id="reds">
          <div className="team-name">Team #1</div>
          <div className="players-list">player1, player4</div>
        </div>
        <div id="whites">
          <div className="team-name">Team #2</div>
          <div className="players-list">player2, player3</div>
        </div>
        <div className="row">
          <div id="players-column" className="column">
            <div>Players</div>
            <textarea id="players" className="resize-none" rows="20" cols="12">{players}</textarea>
          </div>
          <div id="rankings-column" className="column">
            <div>Rankings</div>
            <textarea id="rankings" className="resize-none" rows="20" cols="16">{rankings}</textarea>
          </div>
          <div className="column flex-end">
            <RunButton />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
