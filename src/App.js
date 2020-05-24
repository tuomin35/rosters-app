import React, { useState } from 'react';
import './App.css';

const algorithmDefaultValue = 'classic'
const playersDefaultValue = `player1\nplayer2\nplayer3\nplayer4`
const rankingsDefaultValue = `player1:80\nplayer2:60\nplayer3:40\nplayer4:20`

const App = (props) => {
  const [data, setData] = useState({
    algorithm: algorithmDefaultValue,
    players: playersDefaultValue,
    rankings: rankingsDefaultValue,
    teamRed: [],
    teamWhite: []
  })

  const readData = (id) => {
    return document.getElementById(id).value
      .split('\n')
      .filter(
        function (el) { return el; } // remove falsy values
      )
  }

  const setAlgorithm = (algorithm) => {
    console.log("algorithm", algorithm)
    const newData = {
      ...data,
      algorithm: algorithm
    }
    setData(newData)
  }

  const sortData = (players, rankings) => {
    players.sort(function (a, b) {
      let aRanking = 50
      let bRanking = 50
      for (let i = 0; i < rankings.length; i++) {
        let ranking = rankings[i].split(':')
        if (ranking.length === 2) {
          if (ranking[0] === a) {
            aRanking = ranking[1]
          }
          if (ranking[0] === b) {
            bRanking = ranking[1]
          }
        }
      }
      return bRanking - aRanking
    });
    console.log("players (sorted)", players)
  }

  const updateData = () => {
    const algorithm = data.algorithm
    const players = readData('players-input')
    const rankings = readData('rankings-input')
    let teamRed = []
    let teamWhite = []

    sortData(players, rankings)

    if (algorithm === 'fair' && players.length > 1) {
      // swap position of top two players before making team rosters to equalize rosters a bit
      [players[0], players[1]] = [players[1], players[0]]
    } else if (algorithm === 'random') {
      players.sort(function (a, b) { return 0.5 - Math.random() });
    }

    for (let i = 0; i < players.length; i = i + 2) {
      teamRed.push(players[i])
    }

    for (let i = 1; i < players.length; i = i + 2) {
      teamWhite.push(players[i])
    }

    teamRed.sort()
    teamWhite.sort()

    const newData = {
      ...data,
      algorithm: algorithm,
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
          <Algorithm setAlgorithm={setAlgorithm} />
          <div id="action-column" className="column flex-end">
            <Button handleClick={updateData} label='Run' />
          </div>
        </div>
      </div>
    </div>
  );
}

const Algorithm = (props) => {

  const updateValue = (event) => {
    props.setAlgorithm(event.target.value)
  }

  return (
    <div>
      <div>Algorithm</div>
      <AlgorithmRadioButton algorithm="classic" label="Classic" handleChange={updateValue}
        title='The teams take turns picking players.
        Red team has odd picks: 1st, 3rd, 5th, ...
        White teams has even picks: 2nd, 4th, ...' />
      <br />
      <AlgorithmRadioButton algorithm="fair" label="Fair" handleChange={updateValue}
        title='Like the classic algorithm, but top two picks are reversed.
        White team now has the 1st &amp; 4th pick.
        Red team has the 2nd &amp; 3rd pick.' />
      <br />
      <AlgorithmRadioButton algorithm="random" label="Random" handleChange={updateValue}
        title="Random rosters for each run." />
    </div>
  )
}

const AlgorithmRadioButton = (props) => {
  return (
    <span title={props.title}>
      <input
        type="radio"
        id={props.algorithm}
        name="algorithm"
        defaultChecked={props.algorithm === algorithmDefaultValue}
        onChange={props.handleChange}
        value={props.algorithm} />
      <label htmlFor={props.algorithm}>{props.label}</label>
    </span>
  )
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
