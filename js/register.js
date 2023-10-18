
let usernames=document.querySelector("#username")
let emails=document.querySelector("#email")
let passwords=document.querySelector("#password")

let register_btn=document.querySelector("#sigin_up")

register_btn.addEventListener('click',function(e){
    e.preventDefault()
    if( usernames.value==="" || emails.value==="" || passwords.value===""){
        alert("please fill data")
    }else{
        localStorage.setItem('usernames',usernames.value)
        localStorage.setItem('email',emails.value)
        localStorage.setItem('passwords',passwords.value)

        setTimeout(()=>{
             window.location="login.html"
        },1500)
    }
})

