"use strict";

$(document).ready(function () {
  let XO = '';
  let steps = -1;
  let grids = ['N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N'];

  // get X or O selection
  $('.selxo').click(function () {
    let text = $(this).text();
    if (text === 'X') {
      XO = 'X';
    } else {
      XO = 'O';
    }

    // change to game screen
    $('.board-inner').css('height', 380);
    $('.main .board-outer .title').css('display', '');
    $('.selection-menu').css('display', 'none');
    $('.game').css('display', '');

    $('.board-outer .title .XO').text(XO);

    gameLoop();
  });

  function isGameRunning() {
    for (let i = 0; i < grids.length; i++) {
      if (grids[i] === 'N') {
        return true;
      }
    }

    return false;
  }

  function isPlayerTurn() {
    if (XO === 'O') {
      if (steps % 2 === 0) {
        return true;
      } else {
        return false;
      }
    } else { /// XO is X
      if (steps % 2 === 0) {
        return false;
      } else {
        return true;
      }
    }
  }

  function getComputerXO() {
    if (XO === 'X') {
      return 'O';
    } else if (XO === 'O') {
      return 'X';
    }
  }


  function waitForComputer() {
    console.log('computer');

    // generate the random position that computer will go.
    let num = Math.floor(Math.random() * 9);
    while (grids[num] !== 'N') {
      num = Math.floor(Math.random() * 9);
    }

    grids[num] = getComputerXO();
    $('.game ul li:nth-child(' + (num + 1) + ')').find('.piece').text(getComputerXO());

    gameLoop();
  }


  function isWin() {
    let winMode = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    let com = getComputerXO();

    for (let i = 0; i < winMode.length; i++) {
      if (grids[winMode[i][0]] === XO && grids[winMode[i][1]] === XO && grids[winMode[i][2]] === XO) {
        $('.board-outer .title .msg').text('You are win');
        return true;
      } else if (grids[winMode[i][0]] === com && grids[winMode[i][1]] === com && grids[winMode[i][2]] === com) {
        $('.board-outer .title .msg').text('Computer is win');
        return true;
      }
    }

    return false;
  }

  function resetGame() {
    XO = getComputerXO();
    steps = -1;
    grids = ['N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N'];

    $('.board-outer .title .XO').text(XO);

    $('.overlay').show();

    setTimeout(function () {
      let pieces = $('.game .piece').each(function (ele) {
        $(this).text('');
      });
      $('.overlay').hide();
      gameLoop();
    }, 3000);



  }

  function gameLoop() {
    ++steps;
    if (isWin()) {
      console.log('win');
      resetGame();
    } else {
      if (isGameRunning()) {
        if (isPlayerTurn()) {
          $('.board-outer .title .msg').text('Your turn!');
        } else {
          $('.board-outer .title .msg').text('Computer turn...');
          waitForComputer()
        }
      } else  {
        console.log('game is full...');
        $('.board-outer .title .msg').text('Draw');
        resetGame();
      }
    }


  }


  $('.game li').click(function () {
    if (isPlayerTurn()) {
      let isValidStep = false;
      let lis = $('.game li');
      for (let i = 0; i < lis.length; i++) {
        if (this === lis[i]) {
          console.log('clicked position: ' + i);
          console.log(typeof lis);
          //                            console.log(lis[i]);
          console.log(grids[i]);
          if (grids[i] === 'N') {
            isValidStep = true;
            grids[i] = XO;
            $(this).find('.piece').text(XO);
            break;
          }
        }
      }

      if (isValidStep) {
        gameLoop();
      }
    }


  });


});