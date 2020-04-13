import React from 'react';
import { Button } from '@material-ui/core';
import uppercaseCharacters from './uppercase.json';
import 'typeface-roboto';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedCharacter: uppercaseCharacters[0]
    };

    this.handleCharacterClicked = this.handleCharacterClicked.bind(this);
    this.handleKeyPressed = this.handleKeyPressed.bind(this);
  }

  handleCharacterClicked(character){
    this.setState({ selectedCharacter: character });
  }

  handleKeyPressed(event) {
    // console.log(event);
  }

  render() {
    const selectedCharacter = this.state.selectedCharacter;

    return (
      <div className="App" onKeyPress={this.handleKeyPressed}>

          <div className="selected-character">
            <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg" >
              {selectedCharacter.strokes.map((stroke, index) =>
                <path className={`stroke${index}`} d={stroke.path} key={`${selectedCharacter.id}${index}`}
                  strokeWidth="10" stroke="black" fill="transparent" strokeLinecap="round" strokeLinejoin="round"/>)}
            </svg>
          </div>
                
          <div className="character-selection">
            {uppercaseCharacters.map((character, index) =>
              selectedCharacter === character
                ? <Button key={index} size="large" color="primary" variant="contained">{character.id}</Button>
                : <Button key={index} size="large" onClick={() => this.handleCharacterClicked(character)}>{character.id}</Button>
              )}
          </div>

      </div>
    );
  }
}

export default App;
