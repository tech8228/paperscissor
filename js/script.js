// VARIABLES
$(document).ready(function () {
  const choices = [
    {
      id: 1,
      name: "Rock",
      image: "./img/rock.png",
    },
    {
      id: 2,
      name: "Paper",
      image: "./img/paper.png",
    },
    {
      id: 3,
      name: "Scissors",
      image: "./img/scissors.png",
    },
  ];

  let playerPoints = document.querySelector(".playerPoints");
  let computerPoints = document.querySelector(".computerPoints");
  let playerChoiceImg = document.querySelector("#playerChoiceImg");
  let playerChoiceTxt = document.querySelector("#playerChoiceTxt");
  let computerChoiceImg = document.querySelector("#computerChoiceImg");
  let computerChoiceTxt = document.querySelector("#computerChoiceTxt");
  let buttons = document.querySelectorAll(".btn");
  let points = [0, 0];
  let randomNumber;
  let player1Points = document.querySelector(".player1Points");
  let player2Points = document.querySelector(".player2Points");
  let player1ChoiceImg = document.querySelector("#player1ChoiceImg");
  let player1ChoiceTxt = document.querySelector("#player1ChoiceTxt");
  let player2ChoiceImg = document.querySelector("#player2ChoiceImg");
  let player2ChoiceTxt = document.querySelector("#player2ChoiceTxt");

  // Hide the game container initially
  $("#container").hide();

  // Handle the "Start Game" button click event
  $("#start-game").click(function () {
    // Get the selected game mode
    const selectedMode = $("input[name='game-mode']:checked").val();

    // Show the game container
    $("#container").show();

    // Hide the game modes menu
    $("#game-modes").hide();

    // Start the game based on the selected mode
    if (selectedMode === "computer") {
      //hide the player container
      $("#player-container").hide();
      $("#computer-container").show();
      startComputerGame();
    } else if (selectedMode === "player") {
      //hide the computer container
      $("#computer-container").hide();
      $("#player-container").show();
      startPlayerGame();
    }
  });

  // Define functions for Player vs. Computer and Player vs. Player modes
  function startComputerGame() {
    function getComputerChoice(playerChoice) {
      computerChoiceImg.src = "./img/gif.gif";
      setTimeout(function () {
        randomNumber = Math.floor(Math.random() * 3);
        computerChoiceImg.src = choices[randomNumber].image;
        computerChoiceTxt.textContent = choices[randomNumber].name;
        gameRules(playerChoice);
        playerPoints.textContent = points[0];
        computerPoints.textContent = points[1];
        whoWon();
      }, 1000);
    }

    // Modify the button click event listener to pass the player's choice to getComputerChoice
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        if (button.textContent === "Rock") {
          playerChoiceImg.src = choices[0].image;
          playerChoiceTxt.textContent = choices[0].name;
          getComputerChoice(choices[0].name); // Pass the player's choice
        } else if (button.textContent === "Paper") {
          playerChoiceImg.src = choices[1].image;
          playerChoiceTxt.textContent = choices[1].name;
          getComputerChoice(choices[1].name); // Pass the player's choice
        } else if (button.textContent === "Scissors") {
          playerChoiceImg.src = choices[2].image;
          playerChoiceTxt.textContent = choices[2].name;
          getComputerChoice(choices[2].name); // Pass the player's choice
        }

        console.log(points);
      });
    });

    function gameRules() {
      if (
        playerChoiceTxt.textContent === choices[0].name &&
        computerChoiceTxt.textContent === choices[1].name
      ) {
        points[1]++;
      } else if (
        playerChoiceTxt.textContent === choices[1].name &&
        computerChoiceTxt.textContent === choices[2].name
      ) {
        points[1]++;
      } else if (
        playerChoiceTxt.textContent === choices[2].name &&
        computerChoiceTxt.textContent === choices[0].name
      ) {
        points[1]++;
      } else if (
        playerChoiceTxt.textContent === computerChoiceTxt.textContent
      ) {
        console.log("draw");
      } else {
        points[0]++;
      }
    }

    function whoWon() {
      if (points[0] === 5) {
        alert("Victory! You beat the computer");
        points = [0, 0];
      } else if (points[1] === 5) {
        alert("Failure! You lost to the computer");
        points = [0, 0];
      }
    }

    // Update the game container based on the selected mode
    $("#container h2").text("ScissorsRockPaper - Player vs. Computer");
  }

  function startPlayerGame() {
    $("#player1Ready").prop("disabled", false);
    $("#player2Ready").prop("disabled", true);
    var currentPlayer = 1; // Initialize currentPlayer
    // Set only button player 1 to be disabled

    let player1Choice = ""; // Initialize Player 1's choice
    let player2Choice = ""; // Initialize Player 2's choice
    var value;
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        if (currentPlayer === 1) {
          // Handle Player 1's choice
          player1Choice = button.textContent; // Store Player 1's choice
          if (player1Choice == "Scissors") {
            value = 2;
          } else if (player1Choice == "Paper") {
            value = 1;
          } else {
            value = 0;
          }
          if (
            player1Choice === "Rock" ||
            player1Choice === "Paper" ||
            player1Choice === "Scissors"
          ) {
            player1ChoiceImg.src = choices[value].image;
            player1ChoiceTxt.textContent = choices[value].name;
            currentPlayer = 2; // Switch to Player 2
            $("#player1Ready").prop("disabled", true);
            $("#player2Ready").prop("disabled", false);
          }
        } else if (currentPlayer === 2) {
          // Handle Player 2's choice
          player2Choice = button.textContent; // Store Player 2's choice
          if (player2Choice == "Scissors") {
            value = 2;
          } else if (player2Choice == "Paper") {
            value = 1;
          } else {
            value = 0;
          }
          if (
            player2Choice === "Rock" ||
            player2Choice === "Paper" ||
            player2Choice === "Scissors"
          ) {
            player2ChoiceImg.src = choices[value].image; // Update with the appropriate choice
            player2ChoiceTxt.textContent = choices[value].name; // Update with the appropriate choice

            // Switch to the next player
            if (points[0] <= 5 || points[1] <= 5) {
              switchPlayer();
            } // Determine the winner and add points
            gameRules(player1Choice, player2Choice);
            //show the points each time after player 2 make the choice
            console.log(points);
            // Update the score
            player1Points.textContent = points[0];
            player2Points.textContent = points[1];
            // Check if the game is over
            whoWon();
            // Check if the game is over

            //reset the img after each round
            player1ChoiceImg.src = "";
            player1ChoiceTxt.textContent = "";
            player2ChoiceImg.src = "";
            player2ChoiceTxt.textContent = "";
          }
        }
      });
    });

    function switchPlayer() {
      if (currentPlayer === 1) {
        currentPlayer = 2;
        $("#player1Ready").prop("disabled", true);
        $("#player2Ready").prop("disabled", false);
      } else {
        currentPlayer = 1;
        $("#player2Ready").prop("disabled", true);
        $("#player1Ready").prop("disabled", false);
      }
    }

    function gameRules(player1Choice, player2Choice) {
      if (
        (player1Choice === "Rock" && player2Choice === "Scissors") ||
        (player1Choice === "Paper" && player2Choice === "Rock") ||
        (player1Choice === "Scissors" && player2Choice === "Paper")
      ) {
        points[0]++; // Player 1 wins
      } else if (
        (player2Choice === "Rock" && player1Choice === "Scissors") ||
        (player2Choice === "Paper" && player1Choice === "Rock") ||
        (player2Choice === "Scissors" && player1Choice === "Paper")
      ) {
        points[1]++; // Player 2 wins
      } else {
        console.log("It's a draw");
      }
      whoWon();
    }

    function whoWon() {
      if (points[0] >= 5) {
        alert("Player 1 wins!");
        resetGame();
      } else if (points[1] >= 5) {
        alert("Player 2 wins!");
        resetGame();
      }
    }

    function resetGame() {
      debugger;
      points = [0, 0];
      currentPlayer = 1;
      player1Choice = "";
      player2Choice = "";
      $("#player1Ready").prop("disabled", false);
      $("#player2Ready").prop("disabled", true);
      player1ChoiceImg.src = ""; // Clear choice images
      player1ChoiceTxt.textContent = ""; // Clear choice text
      player2ChoiceImg.src = ""; // Clear choice images
      player2ChoiceTxt.textContent = ""; // Clear choice text
    }
  }
});
