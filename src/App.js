import React from 'react';
import { Button, ButtonGroup } from '@material-ui/core';
import uppercaseCharacters from './uppercase.json';
import 'typeface-roboto';
import './App.css';


const DefaultStrokeSettings = {
  stroke0: {
    dasharray: 400,
    dashoffset: 400,
    durationMs: 1000,
    delayMs: 200
  },
  stroke1: {
    dasharray: 200,
    dashoffset: 200,
    durationMs: 1000,
    delayMs: 1400
  },
  stroke2: {
    dasharray: 200,
    dashoffset: 200,
    durationMs: 1000,
    delayMs: 2500
  },
  stroke3: {
    dasharray: 200,
    dashoffset: 200,
    durationMs: 1000,
    delayMs: 3600
  }
};

const speedScaleChange = 0.1;

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedCharacter: uppercaseCharacters[0],
      zoomScale: 1.0,
      speedScale: 1.0
    };

    this.handleCharacterClicked = this.handleCharacterClicked.bind(this);
    this.handleKeyPressed = this.handleKeyPressed.bind(this);
    this.handleIncreaseSpeed = this.handleIncreaseSpeed.bind(this);
    this.handleDecreaseSpeed = this.handleDecreaseSpeed.bind(this);
  }

  handleCharacterClicked(character) {
    this.setState({ selectedCharacter: character });
  }

  handleKeyPressed(event) {
    // console.log(event);
  }

  handleIncreaseSpeed() {
    this.setState((prevState) => ({
      speedScale: prevState.speedScale - speedScaleChange
    }));
  }

  handleDecreaseSpeed() {
    this.setState((prevState) => ({
      speedScale: prevState.speedScale + speedScaleChange
    }));
  }

  render() {
    const selectedCharacter = this.state.selectedCharacter;

    return (
      <div>
        <div className="App" onKeyPress={this.handleKeyPressed}>

          <div className="TopHalf">

            <div>
              <div>
                <ButtonGroup orientation="vertical" color="primary">
                  <Button>Z+</Button>
                  <Button>Z-</Button>
                </ButtonGroup>
              </div>
              <div>
                <ButtonGroup orientation="vertical" color="primary">
                  <Button onClick={this.handleIncreaseSpeed}>S+</Button>
                  <Button onClick={this.handleDecreaseSpeed}>S-</Button>
                </ButtonGroup>
              </div>
            </div>

            <div className="selected-character">
              <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg" >
                {selectedCharacter.strokes.map((stroke, index) => {
                  const strokeId = `stroke${index}`;
                  const strokeDasharray = stroke.dasharray ?? DefaultStrokeSettings[strokeId].dasharray;
                  const strokeDashoffset = stroke.dashoffset ?? DefaultStrokeSettings[strokeId].dashoffset;
                  const strokeDurationMs = (stroke.durationMs ?? DefaultStrokeSettings[strokeId].durationMs) * this.state.speedScale;
                  const strokedelayMs = (stroke.delayMs ?? DefaultStrokeSettings[strokeId].delayMs) * this.state.speedScale;
                  const strokeAnimation = `${strokeDurationMs}ms linear forwards ${strokedelayMs}ms draw`;
                  return <path d={stroke.path} key={`${selectedCharacter.id}${index}`}
                    strokeDasharray={strokeDasharray} strokeDashoffset={strokeDashoffset} style={{ animation: strokeAnimation }}
                    stroke="black" fill="transparent" strokeLinecap="round" strokeLinejoin="round" strokeWidth="15" />;
                })}
              </svg>
            </div>

            <div>
              <ButtonGroup orientation="vertical" color="primary">
                <Button>S</Button>
                <Button>F</Button>
                <Button>D</Button>
              </ButtonGroup>
            </div>
          </div>

          <div className="character-selection">
            {uppercaseCharacters.map((character, index) =>
              selectedCharacter === character
                ? <Button key={index} size="large" color="primary" variant="contained">{character.id}</Button>
                : <Button key={index} size="large" onClick={() => this.handleCharacterClicked(character)}>{character.id}</Button>
            )}
          </div>

        </div>
        <div>
          Footeer
        </div>
      </div>
    );
  }
}

export default App;
