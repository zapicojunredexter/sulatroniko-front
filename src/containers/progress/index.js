import React from 'react';
import { connect } from 'react-redux';
import Board from '../../components/draggable/Board';
import { getOwnManuscripts } from '../../redux/manuscripts/manuscripts.selector';
import FirebaseClient from '../../modules/FirebaseClient';
import AuthorsService from '../../services/authors.service';
import ThreadsService from '../../services/threads.service';
import Navigation from '../../components/navigation';
import TransactionService from '../../services/transactions.service';
import config from '../../config/config';

class Container extends React.PureComponent<> {
    
    // componentDidMount() {
    //     this.listenTransaction('Tn8ipnyzY9OaGZ688Erq');
    // }
    state = {
        // nullable
        transaction: null,
        progressData: [],
    };

    componentDidMount(){
        if(window.location.hash.substr(1)) {
            this.listenTransaction(window.location.hash.substr(1));
        }
    }

    handleSelectTransaction = (transactionId) => {
        window.location.href = `#${transactionId}`;
        this.listenTransaction(transactionId);
    }

    listenTransaction = async (transactionId) => {
        const doc = FirebaseClient.instance
            .firestore()
            .collection('transactions')
            .doc(transactionId);

        const docData = await this.props.fetch(transactionId);
        // const docData = await doc.get();
        this.setState({transaction: docData})

        this.cardsListener = 
            doc
            .collection('progress')
            .onSnapshot(data => {
                    const result = data.docs.map(data => ({id: data.id, cardId: data.id, ...data.data()}));
                    const progressData = [
                        {
                            columnKey: 'pending',
                            cardData: result.filter(res => res.status === 'pending')
                        },
                        {
                            columnKey: 'doing',
                            cardData: result.filter(res => res.status === 'doing')
                        },
                        {
                            columnKey: 'done',
                            cardData: result.filter(res => res.status === 'done')
                        },
                    ];
                    this.setState({progressData});
                }
            );
    }

    changeProgressStatus = (cardId, status) => {
        if(this.state.transaction && this.state.transaction.id) {
            this.props.editCard(this.state.transaction.id, {
                cardId,
                status,
            });
        }
    }

    changeProgressOrder = (dragged, target) => {
        if(this.state.transaction && this.state.transaction.id) {
            console.log('ginaedit dapat', dragged, target);
            // this.props.editCard(this.state.transaction.id, {
            //     cardId,
            //     status,
            // });
        }
    }

    mapData = () => {
        return [
            {
                columnKey: 'pendings',
                cardData: [
                    {
                        cardId: 'pending-1',
                        label: 'pending-1',
                    },
                    {
                        cardId: 'pending-2',
                        label: 'pending-2',
                    },
                    {
                        cardId: 'pending-3',
                        label: 'pending-3',
                    },
                ]
            },
            {
                columnKey: 'doings',
                cardData: [
                    {
                        cardId: 'doing-1',
                        label: 'doing-1',
                    },
                    {
                        cardId: 'doing-2',
                        label: 'doing-2',
                    },
                    {
                        cardId: 'doing-3',
                        label: 'doing-3',
                    },
                ]
            },
            {
                columnKey: 'dones',
                cardData: [
                    {
                        cardId: 'done-1',
                        label: 'done-1',
                    },
                    {
                        cardId: 'done-2',
                        label: 'done-2',
                    },
                    {
                        cardId: 'done-3',
                        label: 'done-3',
                    },
                ]
            },
        ];
    }

    renderManuscript = (manuscript) => {
        return (
            <div
                style={{marginBottom: 20}}
                class="card"
                // onClick
            >
                <div class="card-header">
                    {manuscript.title}
                </div>
                <div class="card-body row">
                    <div class="col-sm-3">
                        <img src={manuscript.cover} style={{width: 100}} />
                    </div>
                    <div class="col-sm-6">
                        {manuscript.synopsis}
                    </div>
                    <div class="col-sm-3 d-flex justify-content-center">
                        VIEW PROGRESS
                    </div>
                </div>
            </div>
        );
    }
    render() {

        return (
            <main class="pt-5 mx-lg-5 threads-page-container">
                <div class="container-fluid mt-5">
                    {this.props.ownManuscripts.map(this.renderManuscript)}
                    {/*
                    <button
                        onClick={() => {
                            if(this.state.transaction && this.state.transaction.id) {
                                this.props.addCard(
                                    this.state.transaction.id,
                                    {
                                        description: 'hellooooo',
                                    }
                                );
                            }
                        }}
                    >addCard</button>
                    */}
                    
                    <Board
                        boardData={this.state.progressData}
                        changeProgressStatus={this.changeProgressStatus}
                        changeProgressOrder={this.changeProgressOrder}
                    />
                </div>
            </main>
        );
        return (
            <div>
                <Navigation />
                <button
                    onClick={() => {
                        if(this.state.transaction && this.state.transaction.id) {
                            this.props.addCard(
                                this.state.transaction.id,
                                {
                                    description: 'hellooooo',
                                }
                            );
                        }
                    }}
                >addCard</button>
                <Board
                    boardData={this.state.progressData}
                    changeProgressStatus={this.changeProgressStatus}
                    changeProgressOrder={this.changeProgressOrder}
                />
            </div>
            );
        // return (
        //     <div>
                
        //         <div
        //             onDragStart={(e) => this.onDragStart(e, 'namee')}
        //             onDragOver={(ev) => ev.preventDefault()}
        //             draggable
        //             style={{backgroundColor: 'orange'}}
        //         >
        //             draggable
        //         </div>
        //         <div
        //             onDragStart={(e) => this.onDragStart(e, 'namee1')}
        //             onDragOver={(ev) => ev.preventDefault()}
        //             draggable
        //             style={{backgroundColor: 'orange'}}
        //         >
        //             draggable1
        //         </div>
        //         <div
        //             onDragOver={(ev) => ev.preventDefault()}
        //             onDrop={(e) => this.onDrop(e,'complete')}
        //         >
        //             drop to here
        //         </div>
        //     </div>
        // );
    }
}


const mapStateToProps = state => ({
    ownManuscripts: getOwnManuscripts(state),
});

const mapDispatchToProps = dispatch => ({
    fetch: (id) => dispatch(TransactionService.fetchOne(id)),
    addCard: (id, params) => dispatch(TransactionService.addCard(id, params)),
    editCard: (id, params) => dispatch(TransactionService.editCard(id, params))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
