document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {});
});
function formSubmit(){
        query = document.getElementById("message").value;
        document.getElementById("form").reset();
        document.getElementsByClassName("messages")[0].innerHTML+=`
                <div class="col s12">
                    <div class="message mine"> ${query} </div>
                </div>`
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST","/",true);
        xhttp.setRequestHeader("Content-type","application/json");
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                try {
                    let x = JSON.parse(this.responseText);
                    if(!x.status) {
                        document.getElementsByClassName("messages")[0].innerHTML+=`
                            <div class="col s12">
                                <div class="message rec"> "Couldn't find the result for the query. Please search something else." </div>
                            </div>`
                    }
                    else {
                        document.getElementsByClassName("messages")[0].innerHTML+=`
                            <div class="col s12">
                                <div class="message rec"> ${x.data} </div>
                            </div>`
                    }                            
                } catch (err) {
                    document.getElementsByClassName("messages")[0].innerHTML+=`
                            <div class="col s12">
                                <div class="message rec"> Couldn't find the result for the query. Please search something else.</div>
                            </div>`

                }
            }
        }
        xhttp.send(JSON.stringify({question: query}))
      
}
function startChat(name){
    var e = document.getElementsByClassName("mainbody")[0]; 
    var child = e.lastElementChild;  
    while (child) { 
        e.removeChild(child); 
        child = e.lastElementChild; 
    } 
    setTimeout(function(){
                document.getElementsByClassName("messages")[0].innerHTML+=`
                    <div class="col s12">
                        <div class="message rec">Hello, please enter your query</div>
                    </div> `
    },500);
    e.innerHTML+=`
        <div class="messages-container">
            <div class="row messages">
            </div>
            <div class="enter-message">
                <form id="form" onSubmit="formSubmit();return false;" style="width: 100%;">
                    <div class="row">
                        <input type="text" id="message" class="query col l7 offset-l1 offset-m1 offset-s1 s7 m6" placeholder="Enter your message ">
                        <div class="col l3 m4 s1 offset-s1 buttons">
                            <button class="btn additional disabled"><i class="fas fa-paperclip"></i></button>
                            <button class="btn additional disabled"><i class="fas fa-camera"></i></button>
                            <button type="submit" class="btn submit-button"><i class="fas fa-paper-plane"></i></button>
                        </div>
                    </div>
                </form>
            </div>
        </div>`;
}