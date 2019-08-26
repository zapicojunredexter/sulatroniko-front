import React from 'react';
import { connect } from 'react-redux';
import Board from '../../components/draggable/Board';
import { getOwnManuscripts } from '../../redux/manuscripts/manuscripts.selector';
import FirebaseClient from '../../modules/FirebaseClient';
import AuthorsService from '../../services/authors.service';
import ThreadsService from '../../services/threads.service';
import Navigation from '../../components/navigation';
import TransactionService from '../../services/transactions.service';
import AssignManuscriptCopywriter from './modals/AssignManuscriptCopywriter';
import FinishManuscriptModal from './modals/FinishManuscriptModal';
import config from '../../config/config';

const initialState = {
    transaction: null,
    progressData: [],
    assignCopywriterTransaction: null,
    finishManuscriptTransaction: null
}
class Container extends React.PureComponent<> {
    
    // componentDidMount() {
    //     this.listenTransaction('Tn8ipnyzY9OaGZ688Erq');
    // }
    state = {
        // nullable
        ...initialState,
    };

    componentDidMount(){
        this.props.fetchAll();
        if(window.location.hash.substr(1)) {
            this.listenTransaction(window.location.hash.substr(1));
        }
    }

    componentWillUnmount(){
        this.unlistenTransaction();
    }

    handleSelectTransaction = (transactionId) => {
        window.location.href = `#${transactionId}`;
        this.listenTransaction(transactionId);
    }

    unlistenTransaction = () => {
        if(this.cardsListener) {
            this.setState({...initialState});
            this.cardsListener();
        }
    }

    listenTransaction = async (transactionId) => {
        this.unlistenTransaction();
        if(!transactionId) {
            return;
        }
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
                    const notDeleted = result.filter(data => !data.deleted);
                    const progressData = [
                        {
                            columnKey: 'pending',
                            cardData: notDeleted.filter(res => res.status === 'pending')
                        },
                        {
                            columnKey: 'doing',
                            cardData: notDeleted.filter(res => res.status === 'doing')
                        },
                        {
                            columnKey: 'done',
                            cardData: notDeleted.filter(res => res.status === 'done')
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

    deleteCard = (cardId) => {
        if(this.state.transaction && this.state.transaction.id) {
            this.props.editCard(this.state.transaction.id, {
                cardId,
                deleted: true,
            });
        }
    }

    changeProgressOrder = (dragged, target) => {
        if(this.state.transaction && this.state.transaction.id) {
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

    renderTransaction = transaction => {
        const { manuscript, copywriter } = transaction;
        const renderBadge = () => {
            const statusObj = {
                pending: {
                    className: 'badge badge-warning',
                    label: 'Pending',
                },
                approved: {
                    className: 'badge badge-primary',
                    label: 'Approved',
                },
            };
            if(!statusObj[transaction.status]){
                return <span class="badge badge-secondary">{transaction.status}</span>;
            }
            return (<span class={statusObj[transaction.status].className}>{statusObj[transaction.status].label}</span>);
        }
        return (
            <div
                style={{marginBottom: 20}}
                class="card"
                // onClick
            >
                <div class="card-header">
                    {manuscript.title}
                    &nbsp;
                    {renderBadge()}
                </div>
                <div class="card-body row">
                    <div class="col-sm-3">
                        <img src={manuscript.cover} style={{width: 100}} />
                    </div>
                    <div class="col-sm-6">
                        {manuscript.synopsis}
                        <p>Copywriter: {copywriter ? copywriter.name : 'None'}</p>
                    </div>
                    <div class="col-sm-3 d-flex justify-content-center">
                        <button onClick={() => this.handleSelectTransaction(transaction.id)}>VIEW PROGRESS</button>
                        {this.props.userType === 'publisher' && transaction.status === 'pending' && (
                            <>      
                                <button onClick={() => {
                                    this.props.approveTransaction(transaction.id)
                                        .then(res => {
                                            this.props.fetchAll();
                                            alert('success');
                                        })
                                        .catch(err => err.message);
                                }}>APPROVE</button>
                            </>
                        )}
                        {this.props.userType === 'publisher' && (
                            <>
                                <button onClick={() => {
                                        this.setState({assignCopywriterTransaction: transaction})
                                    }}>{copywriter ? `REASSIGN` : `ASSIGN`} COPYWRITER</button>
                                
                            </>
                        )}
                                
                    </div>
                </div>
            </div>
        );
    }
    render() {

        return (
            <main class="pt-5 mx-lg-5 threads-page-container">
                <AssignManuscriptCopywriter
                    assignCopywriterTransaction={this.state.assignCopywriterTransaction}
                    closeModal={() => this.setState({assignCopywriterTransaction: null})}
                />
                <FinishManuscriptModal
                    finishManuscriptTransaction={this.state.finishManuscriptTransaction}
                    closeModal={() => this.setState({finishManuscriptTransaction: null})}
                />
                <div class="container-fluid mt-5">
                    {this.state.transaction || false ? (
                        <>
                            <Board
                                canDrag={this.props.userType === 'copywriter'}
                                canAdd={this.props.userType === 'copywriter'}
                                canConclude={this.props.userType === 'copywriter'}
                                addCard={(description) => {
                                    if(this.state.transaction && this.state.transaction.id) {
                                        this.props.addCard(
                                            this.state.transaction.id,
                                            {
                                                description,
                                            }
                                        );
                                    }
                                }}
                                goBack={() => this.handleSelectTransaction('')}
                                headerLabel={this.state.transaction && this.state.transaction.manuscript && this.state.transaction.manuscript.title}
                                deleteCard={this.deleteCard}
                                boardData={this.state.progressData}
                                changeProgressStatus={this.changeProgressStatus}
                                changeProgressOrder={this.changeProgressOrder}
                                onClickFinish={() => this.setState({finishManuscriptTransaction: this.state.transaction})}
                            />
                        </>
                    ) : (
                        <>
                        {this.props.transactions.map(this.renderTransaction)}
                        </>
                    )}
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
    userType: state.userStore.type,
    transactions: state.transactionsStore.transactions
});

const mapDispatchToProps = dispatch => ({
    approveTransaction: (id) => dispatch(TransactionService.approveTransaction(id)),
    fetch: (id) => dispatch(TransactionService.fetchOne(id)),
    fetchAll: () => dispatch(TransactionService.fetchAll()),
    addCard: (id, params) => dispatch(TransactionService.addCard(id, params)),
    editCard: (id, params) => dispatch(TransactionService.editCard(id, params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
