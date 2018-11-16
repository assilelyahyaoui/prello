// Modules
import React from 'react';
import { connect } from 'react-redux';
import{Card , CardHeader,  CardBody, Modal, ModalHeader, ModalBody, Popover, PopoverHeader, PopoverBody} from 'reactstrap';


// Action builder
import { setListName, moveCardInList, addCardToList} from '../../../action/actionList';


// Components
import MyCard from '../MyCard/MyCard';
import CardCreator from './CardCreator';
import InputText from '../../Input/InputText';

// Style 
import '../../../style/App.css';
import '../../../style/list.css';


class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editNameOn : false,
      popoverOpen: false
    };
}

  handleEditClick = () => {
    this.setState({
      editNameOn: !this.state.editNameOn
    });
  }

  togglePopover = () => {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  addingCard = (event) => {
    console.log("on est y")
    event.preventDefault();
    const data = new FormData(event.target);
    var cardName = data.get('cardName');
    var dueDate = data.get('dueDate');
    if( dueDate === "No due date"){
        dueDate = null;
    }
    this.props.dispatchAddCardToList(
      this.props.idList,
      this.props.list.idBoard,
      cardName,
      dueDate
    );
    this.togglePopover();
  }

  render() {
  const {
      idList,
      list,
      name,
      cards,
      setListName
  } = this.props;
  return (
    <Card className="list">
      <CardHeader>

      {this.state.editNameOn === true ? 
         <span className="ListCreator">
          <InputText
          className="changeName"
            value={name}
            placeHolder="List Name"
            resetable
            onChange={(value) => {
              setListName(value);
              this.handleEditClick();
            }}
          />
         </span>
      :
        <span onClick={this.handleEditClick} className="list-title">{list.idBoard}{list.name}{idList}</span>
      }

      <i onClick = {this.handleEditClick} 
        className= { this.state.editNameOn === true ? "fa fa-edit editmod" : "fa fa-edit" }
      />
      </CardHeader>

      {cards.map((card) => (
        <MyCard key={card.id} idList={card.idList} id={card.id}></MyCard>
      ))}
            
      <CardBody>
        <div>
            <button className="add-card-link" onClick={this.togglePopover}>
                <span className="fa fa-plus-circle">Add Card</span>  
            </button>
          <CardCreator isOpen={this.state.popoverOpen} toggle={this.togglePopover} handleSubmit={this.addingCard} />
        </div>
      </CardBody>

      </Card>
    
    );
  }
}
 
const mapStateToProps = ( state, props ) => ({
  list : state.lists.find(list => list.idList === props.idList),
  cards: state.cards.filter(card => card.idList === props.idList && card.closed !== true)
});

const mapDispatchToProps = ( dispatch, props ) => {
  return {
    dispatchOnDragEnd: ({source, destination}) => (
      destination &&
      dispatch(moveCardInList(source.index, destination.index))
    ),
    setListName: (name) => dispatch(setListName( props.idlist, name )),
    dispatchAddCardToList: (idlist, idboard, name, duedate) => dispatch(addCardToList(idlist, idboard, name, duedate)
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(List); 