import React, {Component} from 'react';
import TakeTest from './TakeTest'


const floor =require('math-floor')

class Countdown extends Component
{
    constructor(props)
    {
        super(props);

        this.state={
            counter: this.props.location.timeData * 60,
            testSubtypeData: this.props.location.testSubtypeData,
        }
    }
    convertSeconds = (s) => 
    {  
        let min = floor(s/60);
        let sec = s % 60
        if(min < 10)
        {
            min = '0' + min
        }
        if(sec < 10)
        {
            sec = '0' + sec
        }
        return(
            <div>
             <table>
                <tbody>							
                <tr>
                <th>       
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42C16.07 4.74 14.12 4 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/></svg>	</th>
                <th> {min} : </th>
                <th> {sec} </th>
               
                </tr>
                <tr>
                </tr> 
                </tbody>
                </table>
            </div>

        )
    }

    componentDidMount = () => 
    {
        console.log(this.state.testSubtypeData)
        console.log(this.state.counter)
        this.interval = setInterval(() => {
           this.setState(
               {
                   counter: this.state.counter-1,
               }
           )
           if(this.state.counter === -1)
           {
               alert("Time out")
               window.location='/guest/ViewTestDetails'
           }
        }, 1000);
    }

   render()
    {
        return(
            <div>
          <TakeTest 
          functionCountdown ={this.convertSeconds(this.state.counter)} 
          testSubtypeValue={this.state.testSubtypeData}/>
            </div>
        )
    }
}

export default Countdown;







