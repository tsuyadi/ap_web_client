'use strict'

 
const MINUTES_UNITL_AUTO_LOGOUT = 10 // in mins
const CHECK_INTERVAL = 15000 // in ms
const STORE_KEY =  'lastAction';
class Idle extends React.Component {

    constructor(props) {
        super(props);
        this.check();
        this.initListener();
        this.initInterval();
      }
     
      getLastAction() {
        return parseInt(localStorage.getItem(STORE_KEY));
      }
     
      setLastAction(lastAction) {
        localStorage.setItem(STORE_KEY, lastAction.toString());
      }
     
      initListener() {
        document.body.addEventListener('click', () => this.reset());
        document.body.addEventListener('mouseover',()=> this.reset());
        document.body.addEventListener('mouseout',() => this.reset());
        document.body.addEventListener('keydown',() => this.reset());
        document.body.addEventListener('keyup',() => this.reset());
        document.body.addEventListener('keypress',() => this.reset());
      }
     
      reset() {
        this.setLastAction(Date.now());
      }
     
      initInterval() {
        if(localStorage.getItem('role')){
            setInterval(() => {
            this.check();
            }, CHECK_INTERVAL);

        }
      }
     

	logout(e){
        // e.preventDefault();
        alert('Session Expired !');
		localStorage.clear();
		var url = window.location.href.split("#");
		window.location.href=url[0];		
	}

      check() {
        const now = Date.now();
        const timeleft = this.getLastAction() + MINUTES_UNITL_AUTO_LOGOUT * 60 * 1000;
        console.log('time left : '+timeleft);
        console.log('now : '+now);
        const diff = timeleft - now;
        console.log('diff : '+diff);
        const isTimeout = diff < 0;
        if (isTimeout && localStorage.getItem('role')) {
          this.logout();
        }
      }

    render(){
        return (<div> </div>);
    }

}


export default Idle;