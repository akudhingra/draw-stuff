import React from 'react';
import { Button, ButtonGroup, Slider, Grid } from '@material-ui/core';
import { PlayArrow, FastForward } from '@material-ui/icons';
import uppercaseCharacters from './uppercase.json';
import 'typeface-roboto';
import './App.css';

const NoSelectedCharacter = {
  id: "None",
  strokes: [{ path: "m0,0" }]
};

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

const DefaultSpeedScale = 1.0;
const SpeedScaleChange = 0.1;
const MinSpeed = 0.2;
const MaxSpeed = 7.0;

const DefaultZoomScale = 1.0;

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedCharacter: NoSelectedCharacter,
      zoomScale: DefaultZoomScale,
      speedScale: DefaultSpeedScale
    };

    this.handleCharacterClicked = this.handleCharacterClicked.bind(this);
    this.handleKeyPressed = this.handleKeyPressed.bind(this);
    this.handleSpeedChanged = this.handleSpeedChanged.bind(this);
    this.reloadSelectedCharacter = this.reloadSelectedCharacter.bind(this);
  }

  reloadSelectedCharacter() {
    const selectedCharacter = Object.assign({}, this.state.selectedCharacter);
    this.setState({ selectedCharacter });
  }

  handleCharacterClicked(character) {
    const selectedCharacter = Object.assign({}, character);
    this.setState({ selectedCharacter });
  }

  handleKeyPressed(event) {
    // console.log(event);
  }

  handleSpeedChanged(_, newSpeed) {
    const selectedCharacter = Object.assign({}, this.state.selectedCharacter);
    this.setState({ speedScale: newSpeed, selectedCharacter });
  }

  render() {
    const selectedCharacter = this.state.selectedCharacter;

    return (
      <div>
        <div className="App" onKeyPress={this.handleKeyPressed}>

          <div className="TopHalf">

            <div>
              <ButtonGroup orientation="vertical" color="primary">
                <Button>Z+</Button>
                <Button>Z-</Button>
              </ButtonGroup>
            </div>

            <div className="selected-character">
              <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg" onClick={this.reloadSelectedCharacter}>
                {selectedCharacter.strokes.map((stroke, index) => {
                  const strokeId = `stroke${index}`;
                  const strokeDasharray = stroke.dasharray ?? DefaultStrokeSettings[strokeId].dasharray;
                  const strokeDashoffset = stroke.dashoffset ?? DefaultStrokeSettings[strokeId].dashoffset;
                  const strokeDurationMs = (stroke.durationMs ?? DefaultStrokeSettings[strokeId].durationMs) / this.state.speedScale;
                  const strokedelayMs = (stroke.delayMs ?? DefaultStrokeSettings[strokeId].delayMs) / this.state.speedScale;
                  const strokeAnimation = `${strokeDurationMs}ms linear forwards ${strokedelayMs}ms draw`;
                  return <path d={stroke.path} key={`${selectedCharacter.id}.${Date.now()}.${index}`}
                    strokeDasharray={strokeDasharray} strokeDashoffset={strokeDashoffset} style={{ animation: strokeAnimation }}
                    stroke="black" fill="transparent" strokeLinecap="round" strokeLinejoin="round" strokeWidth="15" />;
                })}
              </svg>
              <div>
                <Grid container>
                  <Grid item><PlayArrow /></Grid>
                  <Grid item xs>
                    <Slider step={SpeedScaleChange} min={MinSpeed} max={MaxSpeed}
                      valueLabelDisplay="off" value={this.state.speedScale} onChange={this.handleSpeedChanged} />
                  </Grid>
                  <Grid item><FastForward /></Grid>
                </Grid>
              </div>
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
              selectedCharacter.id === character.id
                ?
                <Button key={index} size="large" onClick={this.reloadSelectedCharacter}
                  color="primary" variant="contained">
                  {character.id}
                </Button>
                :
                <Button key={index} size="large" onClick={() => this.handleCharacterClicked(character)}>
                  {character.id}
                </Button>
            )}
          </div>

        </div>
        <div>
          Footer
        </div>
      </div>
    );
  }
}

export default App;
