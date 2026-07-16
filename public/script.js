const socket = io();

console.log("WİFİ chat started");
const userbtn = document.getElementById("userbtn");
const userinput = document.getElementById("userinput");
const chatd = document.getElementById("chat");
const userd = document.getElementById("user");
const msgb = document.getElementById("msg");
const exitc = document.getElementById("exit");
const onco = document.getElementById("onco");
let userc = 0;
let user;
let msg = "";


function refreshOnline() {
    onco.textContent = userc;
}

refreshOnline();

userbtn.addEventListener("click", function () {
    if (userinput.value == "") {
        console.log("no user detected.");
    }
    else {
        user = userinput.value;
        console.log(user + " joined the chat");
        userinput.value = "";
        userd.style.display = "none";
        chatd.style.display = "flex";        
        socket.emit("user joined1");


    }
})

userinput.addEventListener("keydown", function (event) {
if (event.key === "Enter") {
      if (userinput.value == "") {
        console.log("no user detected.");
    }
    else {
        user = userinput.value;
        console.log(user + " joined the chat");
        userinput.value = "";
        userd.style.display = "none";
        chatd.style.display = "flex";
        socket.emit("user joined1");

    }
}
 
})

socket.on("user joined2", function (useron) {
    userc = useron;
    refreshOnline();
    console.log("There are " + userc + " users active.");
});

exitc.addEventListener("click", function () {
    userd.style.display = "flex";
    chatd.style.display = "none";
    socket.emit("user left1");

})
 socket.on("user left2", function (useron) {
    userc = useron;
    refreshOnline();
    console.log("There are " + userc + " users active now.");
})

socket.on("user left3", function (useron) {
    userc = useron;
    refreshOnline();
    console.log("There are " + userc + " users active now.");
}) 

msgb.addEventListener("keydown", function (event) { 

     if (event.key === "Enter")  {
        if (msgb.value == "") {
        return;
    }  

    else {
        msg = msgb.value;
        socket.emit("chatmsg1", msg);
        msgb.value = "";
    }
}});

function createMsg(msg) {
    const newmsg = document.createElement("div");
    newmsg.className = "msgs";
    newmsg.innerText = msg;
    chatd.appendChild(newmsg);
}
  

socket.on("chatmsg2", function (msg) {
  createMsg(msg);
})