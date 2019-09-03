export function MoneyFormat(number){
      try
      {
            number = parseFloat(number);
            //return number != null ? number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : null;
            // // debugger;
            return number != undefined ? isNaN(number) ? '0' : number.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') : '0';
      }catch(e)
      {
            // // debugger
            return '0';
      }
}

export function MoneyFormatUnit(number){
      try
      {
            number = parseFloat(number);
            //return number != null ? number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : null;
            // debugger;
            return number != undefined ? isNaN(number) ? '0' : number.toFixed(5).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') : '0';
      }catch(e)
      {
            // debugger
            return '0';
      }
}

export function capitalize(a)
{
    return a.replace(/\w+/g, function(a){ 
      return a.charAt(0).toUpperCase() + a.slice(1).toLowerCase()
    });
}

export function decimalFormatCeilling(number){
      var num = 0;
    
      if(number == null) num = 0;
      else
      {
            number = parseFloat(number);

            if(isNaN(number))
            {
                  num = 0;
            }
            else
            {
                  num = number;
            }
           
      }

      return (Math.round(num * 100) / 100).toFixed(2);
}

export function decimalFormat(number){
      if(number == '-'){ number = 0; }
      number = parseFloat(number);

      return (number != null && number > 0) ? number.toFixed(2) : number;
}

export function DateFormatEx(p_date){
      if(p_date != undefined)
      {
            // // debugger;
            try{
                  let res = p_date.split('/');
                  // let new_date = new Date(p_date);
                  let dd = res[0];
                  let mm = res[1]; //January is 0!
                  let yyyy = res[2];

                  return dd+'-'+mm+'-'+yyyy;  
            }catch(e){
                  return '';
            }                      
      }
      else
      {
            return null;
      }
} 

export function DateFormatExYMD(p_date){
      if(p_date != undefined)
      {
            // // debugger;
            try{
                  let res = p_date.split('/');
                  // let new_date = new Date(p_date);
                  let dd = res[0];
                  let mm = res[1]; //January is 0!
                  let yyyy = res[2];

                  return yyyy+'-'+mm+'-'+dd;  
            }catch(e){
                  return '';
            }                      
      }
      else
      {
            return null;
      }
} 

export function DateFormatExYMDs(p_date){
      if(p_date != undefined)
      {
            // // debugger;
            try{
                  let res = p_date.split('-');
                  // let new_date = new Date(p_date);
                  let dd = res[0];
                  let mm = res[1]; //January is 0!
                  let yyyy = res[2];

                  return yyyy+'-'+mm+'-'+dd;  
            }catch(e){
                  return '';
            }                      
      }
      else
      {
            return null;
      }
} 

export function DateFormatCustom(p_date, number){
      if(p_date)
      {
            let new_date = new Date(p_date);
            let dd = new_date.getDate() + number;
            let mm = new_date.getMonth()+1; //January is 0!
            let yyyy = new_date.getFullYear();
            if(dd<10){dd='0'+dd} 
            if(mm<10){mm='0'+mm} 
            
            return dd+'-'+mm+'-'+yyyy;            
      }
      else
      {
            return null;
      }
} 

export function DateFormat(p_date){
      if(p_date)
      {
            let new_date = new Date(p_date);
            let dd = new_date.getDate();
            let mm = new_date.getMonth()+1; //January is 0!
            let yyyy = new_date.getFullYear();
            if(dd<10){dd='0'+dd} 
            if(mm<10){mm='0'+mm} 
            
            var date_result = dd+'-'+mm+'-'+yyyy;

            if(date_result == '01-01-1900')
            {
                  return '';
            }
            else
            {
                  return dd+'-'+mm+'-'+yyyy;    
            }
                    
      }
      else
      {
            return null;
      }
} 

export function DateFormatYMD(p_date){
      if(p_date)
      {
            let new_date = new Date(p_date);
            let dd = new_date.getDate();
            let mm = new_date.getMonth()+1; //January is 0!
            let yyyy = new_date.getFullYear();
            if(dd<10){dd='0'+dd} 
            if(mm<10){mm='0'+mm} 
            
            return yyyy+'-'+mm+'-'+dd;            
      }
      else
      {
            return null;
      }
} 

export function DateFormatYMDx(p_date){
      if(p_date)
      {
            var newdate = p_date.split("-").reverse().join("-");

              
            return newdate;            
      }
      else
      {
            return null;
      }
} 

export function DateFormatMonthName(p_date){
      if(p_date)
      {
            var monthNames = ["January", "February", "March", "April", "May", "June",
                              "July", "August", "September", "October", "November", "December"
                              ];
            let new_date = new Date(p_date);
            let dd = new_date.getDate();
            let mm = new_date.getMonth(); //January is 0!
            let yyyy = new_date.getFullYear();
            
            return dd+' '+monthNames[mm]+' '+yyyy;            
      }
      else
      {
            return null;
      }
}

export function DateFormatMMM(p_date){
      if(p_date)
      {
            var monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            let new_date = new Date(p_date);
            let dd = new_date.getDate();
            let mm = new_date.getMonth(); //January is 0!
            let yyyy = new_date.getFullYear();
            
            return dd+' '+monthNames[mm]+' '+yyyy;            
      }
      else
      {
            return null;
      }
}  


export function DateFormatMMWithoutYear(p_date){
      if(p_date)
      {
            var monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            let new_date = new Date(p_date);
            let dd = new_date.getDate();
            let mm = new_date.getMonth(); //January is 0!
            let yyyy = new_date.getFullYear();
            
            return dd+' '+monthNames[mm];            
      }
      else
      {
            return null;
      }
}  

export function DateFormatMMWithoutDay(p_date){
      if(p_date)
      {
            var monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            let new_date = new Date(p_date);
            let dd = new_date.getDate();
            let mm = new_date.getMonth(); //January is 0!
            let yyyy = new_date.getFullYear();
            
            return monthNames[mm] + ' ' + yyyy;            
      }
      else
      {
            return null;
      }
}  

export function DateddMMMYYYY(p_date){
      if(p_date)
      {
            var arr_date = p_date.split('-');
            var val_date = arr_date[2] + '-'+ arr_date[1] + '-' + arr_date[0];
            var monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            let new_date = new Date(val_date);
            let dd = new_date.getDate();
            let mm = new_date.getMonth(); //January is 0!
            let yyyy = new_date.getFullYear();
            
            return dd+' '+monthNames[mm]+' '+yyyy;            
      }
      else
      {
            return null;
      }
}  

export function srvTime(){

   var xmlHttp;

    try {
        //FF, Opera, Safari, Chrome
        xmlHttp = new XMLHttpRequest();
    }
    catch (err1) {
        //IE
        try {
            xmlHttp = new ActiveXObject('Msxml2.XMLHTTP');
        }
        catch (err2) {
            try {
                xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
            }
            catch (eerr3) {
                //AJAX not supported, use CPU time.
                alert("AJAX not supported");
            }
        }
    }
    xmlHttp.open('HEAD',window.location.href.toString(),false);
    xmlHttp.setRequestHeader("Content-Type", "text/html");
    xmlHttp.send('');
//     // debugger;
    return xmlHttp.getResponseHeader("Date");
}

export function UserLevelMap(id){
	let userList = ['Tokio Marine Management','Branch Admin','Senior Regional Sales Head','Regional Sales Head','Regional Director','Region Manager Builder','Agency Manager Builder','Regional Manager Producer ','Financial Consultant', 'Departement','Takumi Director', 'Takumi Manager', 'Takumi Consultant', 'Agency Manager Producer', 'Executive Takumi Consultant', 'Senior Takumi Consultant','Regional Bancassurance Manager','Executive Bancassurance Consultant','Senior Bancassurance Consultant','Bancassurance Consultant'];
	return userList[id-1]; 
}

export function CheckAgentType(code){
	switch(parseInt(code.charAt(0))){
      case 8:
            return 'MO';
      case 6:
            return 'SO';
      case 9:
            return 'BA';
      default:
            return code;
    }
}

export function getDayCurrentWeek(d, days) {
      d = new Date(d);
      var day = d.getDay(),
            diff = d.getDate() - day + (day == 0 ? -6:days); // adjust when day is sunday
      return new Date(d.setDate(diff));
}

export function getPreviousWeek(d, week)
{
    var date = new Date(d);
    var day = date.getDay();
    var prevWeek;
            prevWeek = date.setDate(date.getDate() - (7*week));
    return prevWeek;
}

export function getNextWeek(d, week)
{
    var date = new Date(d);
    var day = date.getDay();
    var nextWeek;
            nextWeek = date.setDate(date.getDate() + (7*week));
    return nextWeek;
}

export function getNextDay(d, days)
{
    var date = new Date(d);
    var day = date.getDay();
    var nextWeek;
            nextWeek = date.setDate(date.getDate() + (days));
    return nextWeek;
}


export function getPreviousDay(d, days)
{
    var date = new Date(d);
    var day = date.getDay();
    var nextWeek;
            nextWeek = date.setDate(date.getDate() - (days));
    return nextWeek;
}