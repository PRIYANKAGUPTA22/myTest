
import React from 'react';
import ReactDOM from 'react-dom';
// import Header from './header';

class App extends React.Component {
    constructor(props){
        super(props);
         this.state= { 
             "popularAirConditioners":[],
             "popularLEDs":[]
         };
    }
    componentDidMount(){
        var _this= this;
        this.makeApiCall.call(this,"http://127.0.0.1:3001/popularAirConditioners","popularAirConditioners");
        this.makeApiCall.call(this,"http://127.0.0.1:3001/popularLEDs","popularLEDs");

    }
    makeApiCall(url,stateParam){
        var _this= this ;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        var response = JSON.parse(this.responseText);
       var obj = {};
       obj[stateParam] = response;
        _this.setState(obj);
        }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    }
    render(){
        var popularAirConditioners = this.state.popularAirConditioners || [];
        var popularLEDs = this.state.popularLEDs || [];
    return(
        <section>
            <div class="borderLine">
            </div>                 
        <section className="popularAcSection">
            <div class="bestDeals">
                    <h2> Popular Air Conditioners</h2>
            </div>
            <ul className="popularAcItems">
                {popularAirConditioners.map(function(airConditioner,index){
                 return(  <li key={"ac-item"+index}>
                 <a>
                     <div>
                         <img src={airConditioner["ac_image"]}></img>
                         <div>
                             <div>
                                 <span>{airConditioner["brand_name"]}</span>
                                 <span>{airConditioner["modal_no"]}</span>
                                 <span>{airConditioner["size"]}</span>
                             </div> 
                             <div>
                                 <span>{airConditioner["description"]}</span>
                             </div> 
                             <div>
                                 <span> Rs</span>
                                 <span>{airConditioner["price"]}</span>
                             </div>  
                             <div>
                                 <span>{airConditioner["emi_details"]}</span>
                             </div> 
                         </div>
                     </div>
                 </a>
                 
               </li>    )
            })}
            </ul>
            <div class="clearBoth"></div>
        </section>
        <div class="borderLine">
        </div> 
         <section className="popularLEDsSection">
         <div class="bestDeals">
                <h2> Popular LED's</h2>
            </div>
         <ul className="popularLEDItems">
            {popularLEDs.map(function(led,index){
             return(  
             <li key={"Leditem"+index}>
                <a>
                    <div>
                        <img src={led["ac_image"]}></img>
                        <div>
                            <div>
                                <span>{led["brand_name"]}</span>
                                <span>{led["modal_no"]}</span>
                                <span>{led["size"]}</span>
                            </div> 
                            <div>
                                <span>{led["description"]}</span>
                            </div> 
                            <div>
                                <span> Rs</span>
                                <span>{led["price"]}</span>
                            </div>  
                            <div>
                                <span>{led["emi_details"]}</span>
                            </div> 
                        </div>
                    </div>
                </a>
              
            </li>    )
         })}
        </ul>
        <div class="clearBoth"></div>
     </section>
     </section>
        
    )

    }
};

ReactDOM.render(<App />, document.getElementById('app'));
