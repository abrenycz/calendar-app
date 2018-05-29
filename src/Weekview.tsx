import * as React from "react";

const daysInEachMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

class Weekview extends React.Component<any, any> {

  constructor(props:any){
    super(props);

    this.state = {
      cachedDay: 0, 
      cachedMonth: 0,
      weekStartDay:0,
      cachedEntries:null,
      inputText:''
    }

    this.previousWeek = this.previousWeek.bind(this);
    this.nextWeek = this.nextWeek.bind(this);
    this.addEntry = this.addEntry.bind(this);
    this.clearEntries = this.clearEntries.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount(){
    let day = Number(localStorage.getItem('day'));
    let month = Number(localStorage.getItem('month'));
    let startDay = new Date(2018, month, day, 0, 0, 0, 0).getDay();
    let entries = JSON.parse(String(localStorage.getItem('entries')));

    this.setState({
        cachedDay:day, 
        cachedMonth:month, 
        weekStartDay:startDay, 
        cachedEntries:entries
    });
  }

  printDay(day:number){
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return dayNames[day];
  }

  previousWeek(){
    this.setState({cachedDay:this.state.cachedDay-7});
  }

  nextWeek(){
    this.setState({cachedDay:this.state.cachedDay+7});
  }

  handleChange(event:any){
    this.setState({inputText: event.target.value});
  }

  addEntry(date:Number, inputText:String){
    let newEntries = this.state.cachedEntries;
    let monthEntry = newEntries[this.state.cachedMonth];

    if(monthEntry){
         let dayEntry = monthEntry[Number(date)];
         if(dayEntry){
           if(Number(dayEntry['count'])<5){
             dayEntry['count'] = dayEntry['count']+1;
             dayEntry['texts'].push(dayEntry['count']+ ' ' + inputText + ' \n');  
           }
         }
         else {
           let newDay = {
                'count': 1, 
                'texts': ['1 ' + inputText+ ' \n']
           };
           newEntries[this.state.cachedMonth][Number(date)] = newDay;
         }
    }
    else {
      newEntries[this.state.cachedMonth] = {
                [Number(date)] : {
                  'count': 1, 
                  'texts': ['1 ' + inputText +' \n']
                }
             };
    }

    this.setState({cachedEntries:newEntries, inputText:''});
    localStorage.setItem('entries', JSON.stringify(newEntries));
  }

  clearEntries(date:Number){
    let newEntries = this.state.cachedEntries;
    let monthEntry = newEntries[this.state.cachedMonth];

    if(monthEntry){
      if(monthEntry[Number(date)]){
        newEntries[this.state.cachedMonth][Number(date)] =  {
          'count':0,
          'texts':[]        
        };
      }
    }
    
    this.setState({cachedEntries:newEntries});
    localStorage.setItem('entries', JSON.stringify(newEntries));
  }

  render() {
    const {cachedDay, 
         cachedMonth, 
         weekStartDay, 
         cachedEntries} = this.state;

    let weekArr = [];
    for (let i = 0; i < 7; i++) {
         weekArr.push((cachedDay-weekStartDay)+i);
    }

    return (
      <div>
        <h1 className="calendar-title"></h1>

        <div className="calendar">
          <header>
            {weekArr[0]>1?
            <button className="left" onClick={()=>this.previousWeek()}></button>:
            <button className="left-greyed" ></button>}
            <h1>Week {this.state.cachedWeek}</h1>
            {weekArr[6]<daysInEachMonth[cachedMonth]?
            <button className="right" onClick={()=>this.nextWeek()}></button>:
            <button className="right-greyed"></button>}
          </header>
       </div>
       
       <ul className="day-grid">
         {weekArr.map((x,i)=>
           <li className="weekview-days">
           <span className="weekview-header">
             {x>0&&x<daysInEachMonth[cachedMonth]?
               x + ' - ' + this.printDay(i):null}
           </span>

           <span className="weekday-entrytext" key={x}>
             {cachedEntries[cachedMonth]?
              cachedEntries[cachedMonth][x]?
              cachedEntries[cachedMonth][x]['texts']:null:null}
           </span>
           
           {x>0&&x<daysInEachMonth[cachedMonth]?
             this.state.inputText?
             <button className="weekday-add" onClick={()=>
               this.addEntry(x, this.state.inputText)}> save here </button>
             :null:null}

           {cachedEntries[cachedMonth]?
              cachedEntries[cachedMonth][x]?
              (this.state.cachedEntries[cachedMonth][x]['count'] > 0)?
             <button className="weekday-delete" onClick={()=>this.clearEntries(x)}>clear entries</button>
             :null:null:null
           }
           </li>
        )}

      </ul>
      <br/>
      <label> Type here to start a new calendar entry: 
         <input type="text" maxLength={15} value={this.state.inputText} onChange={this.handleChange}/></label>
      </div>
    );
  }
}
 
export default Weekview;