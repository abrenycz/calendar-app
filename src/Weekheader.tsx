import * as React from "react";
import './App.css';
	
class Weekheader extends React.Component<any,any> {

	constructor(props:any){
		super(props)
	}

	public render() { 
		return (

	<ul className="weekdays">
    <li>
      <abbr title="S">Sunday</abbr>
    </li>
    <li>
      <abbr title="M">Monday</abbr>
    </li>
    <li>
      <abbr title="T">Tuesday</abbr>
    </li>
    <li>
      <abbr title="W">Wednesday</abbr>
    </li>
    <li>
      <abbr title="T">Thursday</abbr>
    </li>
    <li>
      <abbr title="F">Friday</abbr>
    </li>
    <li>
      <abbr title="S">Saturday</abbr>
    </li>
  </ul>
	) };
}

export default Weekheader;