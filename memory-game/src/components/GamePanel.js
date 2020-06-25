import React from "react";
import Card from "./Card";

class GamePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: null,
    };
    this.openedCards = [];
    this.blockClick = false;
    this.handleCardClick = this.handleCardClick.bind(this);
  }

  componentDidMount() {
    this.setState({ cards: this.chooseRandomImages(14) });
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  generateCardOptions = (length) => {
    const tempArr = [];
    for (let i = 0; i < length; i++) {
      tempArr.push({ cardCode: i, status: 0 });
    }
    return tempArr;
  };

  copyCards = (cards) => {
    return cards.map((item) => {
      return { cardCode: item.cardCode, status: item.status };
    });
  };

  chooseRandomImages(numberOfImages) {
    const cardOptions = this.generateCardOptions(24);
    this.shuffleArray(cardOptions);
    const cards = [
      ...cardOptions.slice(0, numberOfImages),
      ...this.copyCards(cardOptions.slice(0, numberOfImages)),
    ];

    this.shuffleArray(cards);
    return cards;
  }

  turnCard(index, status) {
    const cards = this.state.cards.slice();
    cards[index].status = status;
    this.setState({ cards: cards });
  }

  handleCardClick(cardRef) {
    if(this.openedCards.length < 2 && !this.blockClick) {
      this.openedCards.push(cardRef);
      cardRef.turnCard(true);
    }

    if(this.openedCards.length === 2) {
      this.blockClick = true;
      if(this.openedCards[0].cardCode !== this.openedCards[1].cardCode) {
        const that = this;
        const turnFirstCardRef = this.openedCards[0].turnCard;
        const turnnSecondCardRef = this.openedCards[1].turnCard;
        setTimeout(() => {
          turnFirstCardRef(false);
          turnnSecondCardRef(false);
          that.blockClick = false;
        }, 1700);
      } else {
        this.blockClick = false;        
      }
      this.openedCards = [];      
    }

  }

  /* handleCardClick = (index, cardCode) => {
    if (!!this.state.cards[index].status) return;

    if (this.openedCards.length < 2 && !this.blockClick) {
      this.openedCards.push({
        cardIndex: index,
        cardCode: this.state.cards[index].cardCode,
      });
      this.turnCard(index, 1);
    }

    if (this.openedCards.length === 2) {
      this.blockClick = true;
      if (this.openedCards[0].cardCode !== this.openedCards[1].cardCode) {
        const that = this;
        const firstCardIndex = this.openedCards[0].cardIndex;
        const secondCardIndex = this.openedCards[1].cardIndex;
        setTimeout(() => {
          that.turnCard(firstCardIndex, 0);
          that.turnCard(secondCardIndex, 0);
          that.blockClick = false;
        }, 1500);
      } else {
        this.blockClick = false;
      }
      this.openedCards = [];
    }
  }; */

  render() {
    return (
      <div className="gamePanel">
        {!!this.state.cards
          ? this.state.cards.map((item, i) => (
              <Card
                key={i}
                cardCode={item.cardCode}
                blankImage={"texture"}
                onClick={this.handleCardClick}
              />
            ))
          : null}
      </div>
    );
  }
}

export default GamePanel;
