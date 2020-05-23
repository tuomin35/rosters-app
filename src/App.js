import React, { useState } from 'react';
import './App.css';

const playersDefaultValue = `player1\nplayer2\nplayer3\nplayer4`
const rankingsDefaultValue = `player1:80\nplayer2:60\nplayer3:40\nplayer4:20`

const App = (props) => {
  const [data, setData] = useState({
    fair: true,
    players: playersDefaultValue,
    rankings: rankingsDefaultValue,
    teamRed: [],
    teamWhite: []
  })

  const updateData = () => {
    const players = document.getElementById('players-input').value.split('\n')
    const rankings = document.getElementById('rankings-input').value.split('\n')
    let teamRed = []
    let teamWhite = []

    if (data.fair && players.length > 1) {
      // swap position of top two players before making team rosters to equalize rosters a bit
      [players[0], players[1]] = [players[1], players[0]]
    }

    for (let i = 0; i < players.length; i = i + 2) {
      teamRed.push(players[i])
    }

    for (let i = 1; i < players.length; i = i + 2) {
      teamWhite.push(players[i])
    }

    const newData = {
      ...data,
      teamRed: teamRed,
      teamWhite: teamWhite
    }
    setData(newData)
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Rosters</p>
      </header>
      <div className="App-content">
        <Team id="reds" name="Red" players={data.teamRed} />
        <Team id="whites" name="White" players={data.teamWhite} />
        <div className="row">
          <div id="players-column" className="column">
            <InputTextArea
              id="players"
              label="Players"
              defaultValue={data.players} />
          </div>
          <div id="rankings-column" className="column">
            <InputTextArea
              id="rankings"
              label="Rankings"
              defaultValue={data.rankings} />
          </div>
        </div>
        <div className="row">
          <div id="action-column" className="column flex-end">
            <Button handleClick={updateData} label='Run' />
          </div>
        </div>
      </div>
    </div>
  );
}

const Button = (props) => {
  return (
    <button className="button float-right" onClick={props.handleClick}>
      {props.label}
    </button>
  )
}

const InputTextArea = (props) => {
  return (
    <div id={props.id}>
      <div>{props.label}</div>
      <textarea
        id={`${props.id}-input`}
        className="resize-none"
        rows="20"
        cols="16"
        defaultValue={props.defaultValue} />
    </div>
  )
}

const Team = (props) => {
  return (
    <div id="{props.id}">
      <div className="team-name">Team {props.name}</div>
      <div className="players-list">{props.players.join(', ')}</div>
    </div>
  )
}

export default App;
