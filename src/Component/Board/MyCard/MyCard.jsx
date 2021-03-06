// Modules
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import{Card , CardHeader, CardBody, Badge} from 'reactstrap';
import moment from 'moment';
// Actions 
import {  setCardName } from './../../../action/actionCard';

// Style
import '../../../style/card.css';


const MyCard = ({ card, labels, history, match }) => (
  <Card onClick={() => history.push(`${match.url}/card/${card.id}`)} className="mycard" >
    <CardHeader className="mycard-header">
    {labels.map((label) => (
      <Badge key={label.id} style={{color : '#fff', background : label.color }} pill>{label.name}</Badge>
    ))}
    </CardHeader>
    <CardBody> {card.name} <br/>{ card.dueDate === null ? "" : moment(card.dueDate).fromNow() }  </CardBody>
  </Card>
);

const mapStateToProps = (state, props) => ({
  card: state.cards.find(card => card.id.toString() === props.id.toString()),
  labels: state.labels.filter(label => label.idCard === props.id)
});

const mapDispatchToProps = (dispatch, props) => ({
  setName: (id,name) => dispatch(setCardName(id, name )),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyCard)); 