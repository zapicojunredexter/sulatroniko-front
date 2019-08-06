import React from 'react';
import Column from './Column';
import Card from './Card';
import './styles.scss';

export default class Container extends React.PureComponent<> {
    renderCard = (cardId, label) => {
        return (
            <Card key={cardId} cardId={cardId} label={label} />
        );
    }
    render() {
        return (
            <div>
                {this.props.boardData.map(board => {
                    const cards = board.cardData.map(card => this.renderCard(card.cardId, card.label))
                    return (      
                        <Column
                            cards={cards}
                            columnId={board.columnKey}
                            key={board.columnKey}
                            changeProgressStatus={this.props.changeProgressStatus}
                        />  
                    )
                })}
            </div>
        );
        return (
            <div>
                {this.renderCard("card-1", "card-1")}
                <Column
                    cards={[
                        this.renderCard('pending-1','pending-1'),
                        this.renderCard('pending-2','pending-2'),
                        this.renderCard('pending-3','pending-3'),
                    ]}
                    columnId="pending"
                />
                <Column
                    cards={[
                        this.renderCard('doing-1','doing-1'),
                        this.renderCard('doing-2','doing-2'),
                        this.renderCard('doing-3','doing-3'),
                    ]}
                    columnId="doing"
                />
                <Column
                    cards={[
                        this.renderCard('done-1','done-1'),
                        this.renderCard('done-2','done-2'),
                        this.renderCard('done-3','done-3'),
                    ]}
                    columnId="done"
                />
            </div>
        );
    }
}