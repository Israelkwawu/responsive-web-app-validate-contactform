const form  = document.querySelector('#submit');
const inputs = document.querySelectorAll("input, textarea");
const emailRe = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const phoneRe = /^\(?([0-9]{3})\)?[ ]?([0-9]{3})[ ]?([0-9]{4})$/;

const errors = ["Please Enter First Name","Please Enter Last Name","Please Enter Email", "Please Enter Phone Number", "Please Enter Comment"];

form.addEventListener('submit',(e)=>{
    e.preventDefault();
 
    formHandler(e);
});

let formHandler = e =>{
    let inputs = e.target.elements;
    let isOk = true;
    for (let index = 0; index < inputs.length-1; index++) {
        let span =  inputs[index].previousElementSibling;
        span.innerText = errors[index];
        span.classList.add('hide');        
        let text = inputs[index].value;
      
        if (text == undefined || text == null || text == '') {
          
            span.classList.remove('hide');
            isOk &&= false;
        } else {

            isOk &&= true;
        } 
    }
    if(isOk){
        let data = '';
        for (let index = 0; index < inputs.length-1; index++) {
            let input = inputs[index];
            data+=input.value +"\n";
        }
        alert(data);
        console.log(data);
        resetForm(e) ;
    }
    
}

let resetForm = e =>{
    let inputs = e.target.elements;
    for (let index = 0; index < inputs.length-1; index++) {
        
       inputs[index].value ='';
        
    }
    
}

let validateEmail = email=>{
    if (!emailRe.test(email)) {
        return false;
    } 
    return true;
}

let validatePhone = phone=>{
    if (!phone.match(phoneRe)) {
        
        return false;
    } 
    return true;
}

//email is the third input
inputs[2].addEventListener('keyup', function(){
    let email = this.value;
    let span =  this.previousElementSibling;
       

    if (validateEmail(email)) { 
        span.innerText = '';
        span.classList.add('hide');
        this.removeAttribute('style');
    } else {
        span.innerText = 'Please Enter a Valid Email';
        span.classList.remove('hide');
        this.style.border = "1px solid red";
        
    } 
});


//email is the fourth input
inputs[3].addEventListener('keyup', function(){
    let phone = this.value.trim();
    let span =  this.previousElementSibling;
    phone += phone.length === 3 ||phone.length === 7 ?" ":'';//format input:added 2 spaces to format the input
    this.value = phone;
    phone = this.value.slice(0,12);//a
    this.value = phone;
    if (validatePhone(this.value)) {
        span.innerText = '';
        span.classList.add('hide');
        this.removeAttribute('style');
    } else {
        span.innerText = 'Please Enter a Valid Phone Number';
        span.classList.remove('hide');
        this.style.border = "1px solid red";
    } 
});