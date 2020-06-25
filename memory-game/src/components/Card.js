import React from "react";

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardCode: props.cardCode,
      opened: false,
    };
    this.turnCard = this.turnCard.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  turnCard(opened) {
      this.setState({opened});
  }

  handleClick() {
      this.props.onClick({cardCode: this.state.cardCode, turnCard: this.turnCard})
  }

  render() {
    const image = this.state.opened ? this.state.cardCode : this.props.blankImage;
    return (
      <div className="card" onClick={this.handleClick}>
        <img
          className="img-fluid"
          src={`${process.env.PUBLIC_URL}/assets/images/${image}.jpg`}
          alt="card"
        />
      </div>
    );
  }
}
export default Card;
