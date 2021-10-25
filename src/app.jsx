import React, { Component } from 'react';

var wellStyle = {
      width:'20%', 
      height:'30%',
      margin: '5px',
      padding: ''
  }

var rowStyle = {
  padding: '5px'
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AmountDue: '',
      received: '',
      alertClass:'',
      Alert:'',
      Twenties: '',
      Tens: '',
      Fives: '',
      Ones: '',
      Quarters: '',
      Dimes: '',
      Nickels: '',
      Pennies: ''
    }

    this.HandleChange = this.HandleChange.bind(this);
    this.CalculateChange = this.CalculateChange.bind(this);
  }

  HandleChange(event) { 
    this.setState({[event.target.name]: event.target.value});
  }

  CalculateChange(AmountDue, AmountReceived) {

    let array =[];
    AmountDue = this.state.AmountDue
    AmountReceived = this.state.received
    var ChangeDue = (AmountReceived-AmountDue).toFixed(2)
    console.log(ChangeDue);
    
    var dollars = (Math.floor(ChangeDue));
    console.log(dollars);
    var cents = ChangeDue - dollars;
    
    if(!AmountDue || AmountReceived < AmountDue) {
      this.setState({
        alertClass:'alert alert-danger',
        Alert:'You need more money! 😭',
        Twenties: '',
        Tens: '',
        Fives: '',
        Ones: '',
        Quarters: '',
        Dimes: '',
        Nickels: '',
        Pennies: ''
      })
    }else {

    if(dollars > 19){
      let twenties = dollars / 20;
      array.push(Math.floor(twenties));
      console.log(Math.floor(twenties))
    } else { array.push(0)}
    var twentiesR = (dollars%20).toFixed(2);

    if(twentiesR > 9) {
      let tens = twentiesR / 10;
      array.push(Math.floor(tens))
      console.log(Math.floor(tens))
    } else {array.push(0)}
    var tensR = (twentiesR%10).toFixed(2);

    if(tensR > 4) {
      let fives = tensR / 5;
      array.push(Math.floor(fives));
    }else { array.push(0) }

    var fivesR = (tensR%5).toFixed(2);

    if(fivesR > .9) {
      let ones = fivesR / 1;
      array.push(Math.floor(ones));
    }else{array.push(0)}

    if(cents > .24){
        let quarters = cents / .25;
        array.push(Math.floor(quarters));
    } else { array.push(0) }
   
   var quartersR = (cents%0.25).toFixed(2);
  
  if( quartersR > .09) {
      let dimes = quartersR / .10;
      array.push(Math.floor(dimes))
  } else {array.push(0)}
    
    let dimesR = (quartersR%.10).toFixed(2);

  if ( dimesR > 0.04) {
      let nickels = dimesR / 0.05
      array.push(Math.floor(nickels));
    } else {array.push(0)}
    
    let nickelsR = (dimesR%0.05).toFixed(2);

    if ( nickelsR > 0) {
      let pennies = nickelsR / .01
      array.push(Math.floor(pennies));
    } else {array.push(0)}

    this.setState({
      Twenties: array[0],
      Tens: array[1],
      Fives: array[2],
      Ones: array[3],
      Quarters: array[4],
      Dimes: array[5],
      Nickels: array[6],
      Pennies: array[7],
      alertClass: 'alert alert-success',
      Alert: `The total change due is $${ChangeDue}`
    });
    console.log(array);
    }
  }
    
  render() {
    return (
      <div className='container'>
      <header><h1><font color="white"><strong>Change Calculator</strong></font></h1></header>
      <hr size='3px'/>
    <div className='row'>
        <div className='col-md-4'>
          <div className="panel panel-default">
            <div className="panel-heading">Enter Information</div>
              <div className="panel-body">
                <div className="input-group mb-3">
                      <p><strong>How much is due?</strong></p>
                      <input 
                          className="form-control" 
                          name='AmountDue' 
                          value={this.state.AmountDue} 
                          onChange={this.HandleChange}/>
                </div>
              </div>
                <div className="panel-body">
                      <p><strong>How much was recieved?</strong></p>
                      <input className='form-control' name='received' value={this.state.received} onChange={this.HandleChange}/>
                  </div>
                <div className="panel-footer">
                  <button 
                  className='btn btn-primary btn-block' 
                  onClick = {() => this.CalculateChange()}
                  >Calculate Change</button></div>
                </div>
              </div>
          {/* This creates the currency labels and the total alerts */}
        <div className='col-md-8'> 
              <div className="panel panel-default" style={rowStyle}>
                  <div className='panel-body'>
                    <div className={this.state.alertClass} role='alert'>{this.state.Alert}</div>
                  </div>
                  <div className='row'>
                    <div className='panel-body'>
                      <div className="panel-body col-sm-3 well well-lg" name='Twenties' style={wellStyle}>Twenties<p className='change'>{this.state.Twenties}</p></div>
                        <div className="col-sm-3 well well-lg" name='Tens'style={wellStyle}>Tens <p className='change'>{this.state.Tens}</p></div>
                         <div className="col-sm-3 well well-lg" name='Fives' style={wellStyle} >Fives<p className='change'>{this.state.Fives}</p></div>
                          <div className='col-sm-3 well well-lg' name='Ones' style={wellStyle}>Ones<p className='change'>{this.state.Ones}</p></div>
                    </div>
                  </div>
                     <div className='row '>
                       <div className='panel-body'>
                        <div className="col-sm-3 well well-lg" name='Quarters' style={wellStyle}>Quarters<p className='change'>{this.state.Quarters}</p></div>
                         <div className="col-sm-3 well well-lg"name='Dimes' style={wellStyle}>Dimes<p className='change'>{this.state.Dimes}</p></div>
                          <div className="col-sm-3 well well-lg" name='Nickels' style={wellStyle} >Nickels<p className='change'>{this.state.Nickels}</p></div>
                            <div className='col-sm-3 well well-lg' name='Pennies' style={wellStyle}>Pennies<p className='change'>{this.state.Pennies}</p></div>
                        </div>
                    </div>
                  </div>
              </div>
          </div>
      </div>
  );
  }
}

export default App;
