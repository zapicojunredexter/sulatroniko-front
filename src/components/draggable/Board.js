import React from 'react';
import Column from './Column';
import Card from './Card';
import AddCardModal from './AddCardModal';
import './styles.scss';

export default class Container extends React.PureComponent<> {
    state = {
        isAddingCard: false,
    }
    renderCard = (card) => {
        return (
            <Card
                isDraggable={this.props.canDrag}
                key={card.cardId}
                changeProgressOrder={this.props.changeProgressOrder}
                cardId={card.cardId}
                label={card.description}
                onClickDelete={() => this.props.deleteCard(card.id)}
            />
        );
    }
    render() {
        const {canAdd,canConclude} = this.props;
        return (
            <>
                <AddCardModal
                    visible={this.state.isAddingCard}
                    handleAddCard={this.props.addCard}
                    closeModal={() => this.setState({isAddingCard: false})}
                />
                <div class="card">
                    <div class="card-header">
                        <h4>{this.props.headerLabel}</h4>
                        <button onClick={this.props.goBack} class="btn btn-light">GO BACK</button>
                        {canAdd && (
                            <button onClick={() => this.setState({isAddingCard: true})} class="btn btn-primary">ADD CARD</button>
                        )}
                        {canConclude && (
                            <button onClick={() => this.props.onClickFinish()} class="btn btn-dark-green">CONFIRM</button>
                        )}

                    </div>
                    <div class="card-body row">
                        {this.props.boardData.map(board => {
                            const cards = board.cardData.map(this.renderCard)
                            return (    
                                <div class="col-sm-4">  
                                    <Column
                                        cards={cards}
                                        columnId={board.columnKey}
                                        key={board.columnKey}
                                        changeProgressStatus={this.props.changeProgressStatus}
                                    />  
                                </div>
                            )
                        })}
                    </div>
                </div>
            </>
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