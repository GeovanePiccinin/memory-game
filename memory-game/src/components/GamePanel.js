import React from "react";
import Card from "./Card";
import Api from "../api";
import axios from "axios";

class GamePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: null,
      listOfCharacters: [],
    };
    this.openedCards = [];
    this.blockClick = false;
  }

  componentDidMount() {
    const urlBaseMarvel = "https://gateway.marvel.com:443/v1/public/";
    const apiKey = "af4b4566925ba7ba9e73e60273ee76b5";
    const limit = 100;

    const urlCharacters =
      urlBaseMarvel + "characters?apikey=" + apiKey + "&limit=" + limit;
    axios
      .get(urlCharacters)
      .then((response) => {        
        const listOfAllCharacters = response.data.data.results;
        const cardOptions = listOfAllCharacters
          .filter(
            (item) =>
              item.thumbnail.path.split("/").pop() !== "image_not_available" &&
              item.thumbnail.extension !== "gif"
          )
          .map((item) => {
            return {
              cardCode: `${item.thumbnail.path}.${item.thumbnail.extension}`,
              status: 0,
            };
          });

        this.shuffleArray(cardOptions);
        this.setState({ cards: this.chooseRandomImages(14, cardOptions) });
      })
      .catch((error) => {
        console.error(error);
        const cardOptions = this.generateCardOptions(
          24,
          `${process.env.PUBLIC_URL}/assets/images/`
        );
        this.setState({ cards: this.chooseRandomImages(14, cardOptions) });
      });
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  heroUrl = (index, urlBase, options = "") => {
    return `${urlBase}${index}/${options}`;
  };

  generateCardOptions = (length, urlBase, urlGenerator, options) => {
    const tempArr = [];
    for (let i = 1; i <= length; i++) {
      tempArr.push({
        cardCode: urlGenerator(i, urlBase, options),
        status: 0,
      });
    }
    return tempArr;
  };

  copyCards = (cards) => {
    return cards.map((item) => {
      return { cardCode: item.cardCode, status: item.status };
    });
  };

  chooseRandomImages(numberOfImages, cardOptions) {
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

  handleCardClick = (index, cardCode) => {
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
  };

  render() {
    return (
      <div className="gamePanel">
        {!!this.state.cards
          ? this.state.cards.map((item, i) => (
              <Card
                key={i}
                imgCode={
                  !!item.status
                    ? item.cardCode
                    : `${process.env.PUBLIC_URL}/assets/images/texture.jpg`
                }
                onClick={() => this.handleCardClick(i, item.cardCode)}
              />
            ))
          : null}
      </div>
    );
  }
}

export default GamePanel;
