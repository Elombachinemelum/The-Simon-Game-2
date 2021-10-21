// lets hold our button colors in the array........
var buttonColours = ["red","blue","green","yellow"];
// create empty array............
var gamePattern = [];
var userClickedPattern =[];
let gameLevel = 0;
function nextSequence(){ //settled
    gameLevel ++; // we increase this every time nextSequence() is called
    $("h1").text("level " + gameLevel);  //update the h1 to tell the current level.

    let randomNumber = Math.floor(Math.random() * 4); //this makes a random number to from 0 to 3...
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    // console.log(randomNumber, randomChosenColour,"game pattern is " + gamePattern); //debugging

    

    // we select the element that is the same as the randomChosenColour.......

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);  //the 100 is the time in miliseconds the animation takes to occur
    // let sound = new Audio("sounds/" + randomChosenColour + ".mp3"); 
    playSound(randomChosenColour);
      
}
var counter = 0;
// ****************************************detect which button is clicked************************************

$(".row div").on("click", (event)=>{  //settled..
    let userChosenColour = event.target.getAttribute("id");
    // userClickedPattern.push(userChosenColour);  //need to apply some logic before this happens
    
    // console.log("user color is " + userChosenColour); //debugging
    // we call play sound function on click event play the appropriatw sound...........
    if(userChosenColour === gamePattern[counter]){  //if user has choseen wrong color in gamepattern sequence, we dont want to make sound for no reason
        playSound(userChosenColour);
    }
    // we call animate press to handle the pressing animation on click event......
    animatePress(userChosenColour)
    // we call the nextSequence once the user starts clicking after a slight delay....
     
    // here basically what is happening is: the user makes a click, it triggers a callback which then determines which 
    // color was clicked by fecthing the mathing id of the clicked element on the page.. once the chosen color
    // matches the color in the gamepattern starting from index 0(using counter variable) for the first input and progresses to other indices
    // code pushes the color into the userClickPattern array..and goes down to see if the two arrays ie gamepattern and userclick
    // have the same length. if so, we call the nextSequence() again. 
    if(userChosenColour === gamePattern[counter]){
            userClickedPattern.push(userChosenColour);
            // console.log("user click pattern is " + userClickedPattern);  //debugging
            counter ++;  //increases counter by one....hence we check userchosencolor against the next index in gamepattern array
    }else{
        // in the case wr the user has chosen the wrong color in the sequnce, its game over and the following is reset

        // ofcourse we play error sound first.....
        var sound = new Audio("sounds/wrong.mp3");
        sound.play();

        // basically reset everything to default......(what they wr at the begining or when declared..)
        userClickedPattern = [];  //reset the clickpattern
        gamePattern = [];  //reset the game pattern
        counter = 0;  //reset counter...
        gameLevel = 0;  //reset gamelevel
        started = false;  //reset started  (to allow the keydown eventListener to run again....just once)

        // make animation for game over....
        $("body").addClass("game-over");
        setTimeout(()=>{
            $("body").removeClass("game-over");
        }, 100);
        // change h1 to let user know that game is over...and what to do to restart
        $("#level-title").text("Game over, Press a Key or touchscreen to Restart");

    }
    
    // this section of the code(in the click callback function) will handle the case where the user has succesfully
    // inputed all the colors in the gamePattern in the right sequence without screwing it up...

    if(userClickedPattern.length === gamePattern.length){
        if(gamePattern.length !=0){
            setTimeout(()=>{
                nextSequence();
                userClickedPattern = [];  //reset it because the user is meant to recall and fill in all colors in correct sequence
                counter = 0;
            }, 1000);
        }
    }

});

// ***************************************now we detect a keyboard event on the document*******************************

// let keyboardEvent = []; // this is to use the length to discover if its empty or not, empty means the game hasnt started
// or we can use a boolean below...
let started = false; 
$(document).keydown(()=>{ //settled
    if(!started){
        $("h1").text("level " + gameLevel);
        nextSequence();
        // keyboardEvent.push(e.key);
        // we use the boolean way instead
        started = true;  //this makes the running condition to be false because (started is true)..the callback no longer will respond to keydown event 
    }else{}  //we do nothing.........
});

// this eventListener allows the game to be played by touchscreen only devices.
$(document).click((e)=>{
    if(!started){
        // make sure the user clicks the body of the page
        if(e.target.matches("body")){
            $("h1").text("level " + gameLevel);
        nextSequence();
        // keyboardEvent.push(e.key);
        // we use the boolean way instead
        started = true;  //this makes the running condition to be false because (started is true)..the callback no longer will respond to keydown event 
        }
        
    }else{}  //we do nothing.........
})

function playSound(name){  //settled.....
    let sound = new Audio(`sounds/${name}.mp3`);
    sound.play();
}

function animatePress(currentColour){  //settled....
    $("#" + currentColour).addClass("pressed");
    setTimeout(()=>{
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}
