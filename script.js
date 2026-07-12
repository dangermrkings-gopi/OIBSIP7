// SHA-256 Password Hashing

async function hashPassword(password){

const data =
new TextEncoder()
.encode(password);


const hash =
await crypto.subtle.digest(
"SHA-256",
data
);


return Array.from(
new Uint8Array(hash)
)
.map(b=>b.toString(16).padStart(2,"0"))
.join("");

}





async function register(){


let username =
document.getElementById("regUser").value.trim();


let password =
document.getElementById("regPass").value;



let message =
document.getElementById("message");



if(username==="" || password===""){

message.innerHTML=
"⚠ Please fill all fields";

return;

}



if(password.length<8 ||
!/\d/.test(password)){


message.innerHTML=
"⚠ Password must contain 8 characters and a number";


return;

}



let users =
JSON.parse(
localStorage.getItem("users")
) || [];



let exists =
users.find(
u=>u.username===username
);



if(exists){

message.innerHTML=
"❌ User already exists";

return;

}




let hashed =
await hashPassword(password);



users.push({

username:username,

password:hashed

});



localStorage.setItem(
"users",
JSON.stringify(users)
);



message.innerHTML=
"✅ Registration Successful";


setTimeout(()=>{

window.location=
"login.html";

},1500);



}





async function login(){


let username =
document.getElementById("loginUser").value.trim();


let password =
document.getElementById("loginPass").value;



let message =
document.getElementById("message");



if(username==="" || password===""){

message.innerHTML=
"⚠ Enter username and password";

return;

}




let users =
JSON.parse(
localStorage.getItem("users")
) || [];



let hashed =
await hashPassword(password);



let user =
users.find(

u=>
u.username===username &&
u.password===hashed

);



if(!user){


message.innerHTML=
"❌ Invalid username or password";


return;

}



localStorage.setItem(
"session",
username
);



window.location=
"dashboard.html";


}





function checkSession(){


let session =
localStorage.getItem("session");


if(!session){

window.location=
"login.html";

return;

}



document.getElementById("user")
.innerHTML=
"Hello, "+session+" ✨";


}





function logout(){


localStorage.removeItem(
"session"
);


window.location=
"login.html";


}
