var buttons = ["green", "red", "yellow", "blue"];
var sequence = []; // 'blue', 'yellow', 'green', 'red'
var userSequence = []
var level = 0

$(".btn").on("click", function(){
    var userClick = $(this).attr("id");
    userSequence.push(userClick);
    playSound(userClick);
    $("." + userClick).addClass("pressed");
    setTimeout(function(){
        $("." + userClick).removeClass("pressed");
    }, 100);
    checkAnswers(userSequence.length-1);
});

function startGame(){
    $(document).on("keydown", function(){
        nextSequence();
        $(document).off("keydown");
    });
    
}

function endGame(){
    playSound("wrong");
    $("h1").text("You Lost! Press any key to play again.");
    $(document).on("keydown", function(){
        sequence = [];
        level = 0
        nextSequence();
        $(document).off("keydown");
    })
    
}

function nextSequence(){
    level ++
    userSequence = [];
    $(".btn").on("click");
    $("h1").text("Level " + level);
    var chosseRandomColor = buttons[Math.floor(Math.random() * 4)];
    sequence.push(chosseRandomColor);
    $("." + sequence[sequence.length-1]).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(sequence[sequence.length-1]);
    // console.log(sequence)
}

function checkAnswers(index){
    if(userSequence[index] === sequence[index]){
        $("h1").text("Correct!");
        // console.log("you clicked " + userSequence[index] + "! the correct answer is " + sequence[index])
        if(userSequence.length === sequence.length){
            setTimeout(function(){nextSequence();}, 1000);
        }
    }else{
        endGame();
        // console.log("you clicked " + userSequence[index] + " the correct answer is " + sequence[index])
    }
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3")
    audio.play();
}

startGame();
