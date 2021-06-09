//YOUR FIREBASE LINKS
var firebaseConfig = {
      apiKey: "AIzaSyB3Z7O6N7gkbF946OA-u309wrHzKGfY0cA",
      authDomain: "kwitter-1dd3f.firebaseapp.com",
      databaseURL: "https://kwitter-1dd3f-default-rtdb.firebaseio.com",
      projectId: "kwitter-1dd3f",
      storageBucket: "kwitter-1dd3f.appspot.com",
      messagingSenderId: "921982118802",
      appId: "1:921982118802:web:885d8e9b1bce9a6a47af4b"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    user_name=localStorage.getItem("user_name");
    room_name=localStorage.getItem("room_name");

    function send()
    {
          msg=document.getElementById("msg").value;
          firebase.database().ref(room_name).push({
                name:user_name,
                message:msg,
                like:0
          });
          document.getElementById("msg").value="";
    }



function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
console.log(firebase_message_id);
console.log(message_data);
name=message_data['name'];
message=message_data['message'];
like=message_data['like'];
name_with_tag="<h4>" + name +"imgclass='user_tick src='tick.png'</h4>"
message_with_tag="<h4 class='message_h4'>" +message+"</h4>";
like_buton="<button class='btn btn-warning' id="+firebase_message_id+"value="+like+"onclick='updateLike(this.id)'>";
span_with_tag="<span class='glyphicon glyphicon-thumbs-up'> like:  "+like+"</span></button></hr>";
row= name_with_tag +message_with_tag+like_buton+span_with_tag;
document.getElementById("output").innerHTML+=row;
//End code
      } });  }); }
getData();
function updateLike(message_id)
{
console.log("Clicked on the like button-"+message_id);
button_id=message_id;
likes=document.getElementById(button_id).value;
updated_likes=Number(likes)+1;
console.log(updated_likes);

firebase.database().ref(room_name).child(message_id).update({
      like:updated_likes
});

function logout()
{
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location="index.html";
}
}