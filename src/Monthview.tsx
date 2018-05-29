import * as React from "react";
import Weekheader from "./Weekheader";
import {NavLink} from "react-router-dom";
import './App.css';

const daysInEachMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

class Monthview extends React.Component<any, any> {

  constructor(props : any){
    super(props);
    this.state={
       month:new Date().getMonth(),
       daysBeforeStart:0,
       daysInMonth:0,
       lastDayOfMonth:0,
       cachedEntries:null
    }

    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.clickedDayCell = this.clickedDayCell.bind(this);
  }

  componentWillMount(){

     let cachedMonth = localStorage.getItem('month');
     let date = new Date();
     let firstDay = null;
     let lastDay = null;
     let startOfMonthDay=null;

     if(cachedMonth){
       this.setState({month:Number(cachedMonth)});
       firstDay = new Date(date.getFullYear(), Number(cachedMonth), 1);
       lastDay = new Date(date.getFullYear(), Number(cachedMonth)+1, 0);
       startOfMonthDay = firstDay.getDay();
     }
     else{
       firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
       lastDay = new Date(date.getFullYear(), date.getMonth()+1, 0);
       startOfMonthDay = firstDay.getDay();
    }

    let entries = JSON.parse(String(localStorage.getItem('entries')));

    this.setState({cachedEntries:entries, lastDayOfMonth:lastDay.getDay(), daysBeforeStart:(6-(6-startOfMonthDay)), daysInMonth:daysInEachMonth[this.state.month]});
  }

  printMonth(month:number){
    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

    return monthNames[month];
  }

  printDay(day:number){
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return dayNames[day];
  }

  clickedDayCell(day:number){
     localStorage.setItem('day', '' + day);
     localStorage.setItem('month', this.state.month);
  }

  next() {
    let newMonth = 0;
    if (this.state.month < 11) {
            newMonth = this.state.month + 1;
        } else {
            newMonth = 0;
    }

    let firstDay = this.state.lastDayOfMonth;
    if(this.state.lastDayOfMonth < 6){
      firstDay = firstDay+1;
    }
    else {
      firstDay = 0;
    }
    let newDaysBeforeStart = 6-(6-firstDay);

    let date = new Date();
    var newLastDay = new Date(date.getFullYear(), newMonth+1, 0).getDay();

    localStorage.setItem('month',newMonth.toString());

    this.setState({ lastDayOfMonth:newLastDay, daysBeforeStart:newDaysBeforeStart, month:newMonth, daysInMonth:daysInEachMonth[newMonth]});
  }

  prev() {
    let newMonth = 0;
    if (this.state.month > 0) {
            newMonth = this.state.month -1;
        } else {
            newMonth = 11;
    }

    let date = new Date();

    let firstDay = new Date(date.getFullYear(), newMonth, 1).getDay();
    let newDaysBeforeStart = 6-(6-firstDay);

    var newLastDay = new Date(date.getFullYear(), newMonth, daysInEachMonth[newMonth]).getDay();

    localStorage.setItem('month',newMonth.toString());

    this.setState({ lastDayOfMonth:newLastDay, daysBeforeStart:newDaysBeforeStart, month:newMonth, daysInMonth:daysInEachMonth[newMonth]});
  }

  public render() {

    let daysBeforeArr = [];
    for (let i = 1; i <= this.state.daysBeforeStart; i++) {
         daysBeforeArr.push(i);
    }

    let daysInMonthArr = [];
    for (let i = 1; i <= this.state.daysInMonth; i++) {
         daysInMonthArr.push(i);
    }

    return (
      <div>
        <h1 className="calendar-title"></h1>

      <div className="calendar">
          <header>
             <button className="left" onClick={()=>this.prev()}></button>
             <h1>{this.printMonth(this.state.month)}</h1>
             <button className="right" onClick={()=>this.next()}></button>
          </header>

          <Weekheader/>

          <ul className="day-grid">
          {daysBeforeArr.map((x,i) => <li className="before-days"></li>)}
        {daysInMonthArr.map((x, i) => 
              <NavLink exact to="/weekview" onClick={()=>this.clickedDayCell(x)}>
              <li>
                <span className="weekday-header">{x}</span>
                <span className="weekday-entrynumber">
                  {this.state.cachedEntries[this.state.month]?
                    this.state.cachedEntries[this.state.month][x]?
                    this.state.cachedEntries[this.state.month][x]['count']?
                    this.state.cachedEntries[this.state.month][x]['count'] + ' entries':null:null:null}</span>
            </li>
            </NavLink>
        )}
        </ul>
      </div>   
  </div>
    );
  }
}
 
export default Monthview;