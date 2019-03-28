var config = {
    apiKey: "AIzaSyBjqkcLzSmyYSQWDajk2iWTE6bjtjm9wm4",
    authDomain: "train-schedule-a58cd.firebaseapp.com",
    databaseURL: "https://train-schedule-a58cd.firebaseio.com",
    projectId: "train-schedule-a58cd",
    storageBucket: "train-schedule-a58cd.appspot.com",
    messagingSenderId: "41417842495"
  };
  firebase.initializeApp(config);

var database = firebase.database();

database.ref().on("child_added", function(childSnapshot){

    var row = $("<tr>");
    row.html("<td>" + childSnapshot.val().name + "</td>" + "<td>" + childSnapshot.val().city+ "</td><td>" + childSnapshot.val().rate + "</td><td>" + childSnapshot.val().arrival + "</td><td>" + childSnapshot.val().minutes + "</td>" + "<td>" + "<button class='remove btn btn-default'>Remove</button>" + "</td>" 
        );
    $("#table").append(row);
});


$("#submit-train").on("click", function(){
   
   event.preventDefault();

    var trainName = $("#name").val().trim();
    var destination =$("#destination").val().trim();
    var firstTrain = $("#first-train").val().trim();
    var tFrequency = $("#frequency").val().trim();
  
    var firstTimeConverted = moment(firstTrain, "hh:mm").subtract(1, "years").toString();
     console.log(firstTimeConverted);
   
    var currentTime = moment().format();

    var diffTime = moment().diff(firstTimeConverted, "minutes");

    var tRemainder = diffTime % tFrequency;

    var tMinutesTillTrain = tFrequency - tRemainder;
   
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");

    database.ref().push({
      name: trainName,
      city: destination,
      rate: tFrequency,
      arrival: nextTrain,
      minutes: tMinutesTillTrain
   
});

   
   $("#name").val(" ");
    $("#destination").val(" ");
    $("#first-train").val(" ");
    $("#frequency").val(" ");

 });


   
  $(document.body).on("click", ".remove", function() {

    var buttonGradparentId = $(this).parent().parent().attr("id");

    var removeRef = database.ref(buttonGradparentId);
    removeRef.remove();


    $(this).parent().parent().remove();
    
  });

