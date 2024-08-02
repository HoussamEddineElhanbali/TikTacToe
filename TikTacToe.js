"use strict"

const boxes = document.querySelectorAll(".box");
const restart = document.querySelector(".restart");
const grid = [
                [null,null,null],
                [null,null,null],
                [null,null,null]
             ];
const winnerText = document.querySelector(".winner");

let lastPlayedSign;

boxes.forEach(Element => {Element.addEventListener("click",gameLoop)});
restart.addEventListener("click",initializeGrid);


let gameRuning = true;
function initializeGrid()
{
    boxes.forEach(element => {element.innerHTML = ""});
    
    for(let i = 0; i < 3; i++)
    {
        for(let j = 0; j < 3; j++)
        {
            grid[i][j] = null;
        }
    }

    winnerText.innerHTML = "...";

    gameRuning = true;
}

function gameLoop(event)
{
    if(gameRuning && event.target.innerHTML === "")
    {
        event.target.innerHTML = getXorO();
        addIdToArray(event);
        checkLinesWinCondition();
        checkDiagonalWinCondition();
        checkIsGridFull();
    }
}

let swipeValue = false;
function getXorO()
{
    swipeValue = !swipeValue;

    if(swipeValue)
    {
        lastPlayedSign = "X";
        return "X";
    }
    else
    {
        lastPlayedSign = "O";
        return "O";
    }
}

function addIdToArray(event)
{
    switch (event.target.id) 
    {
        case "1":
            grid[0][0] = event.target.innerHTML;
            break;
        case "2":
            grid[0][1] = event.target.innerHTML;
            break;
        case "3":
            grid[0][2] = event.target.innerHTML;
            break;
        case "4":
            grid[1][0] = event.target.innerHTML;
            break;
        case "5":
            grid[1][1] = event.target.innerHTML;
            break;
        case "6":
            grid[1][2] = event.target.innerHTML;
            break;
        case "7":
            grid[2][0] = event.target.innerHTML;
            break;
        case "8":
            grid[2][1] = event.target.innerHTML;
            break;
        case "9":
            grid[2][2] = event.target.innerHTML;
            break;
    }
}

function checkLinesWinCondition()
{
    let lineMatchesHorizontal = 0;
    let lineMatchesVerical = 0;

    for(let i = 0; i < 3; i++)
    {
        for(let j = 0; j < 2; j++)
        {
            if(grid[i][j] === grid[i][j+1] && grid[i][j] !== null)
            {
                lineMatchesHorizontal++;
            }
        }

        for(let j = 0; j < 2; j++)
        {
            if(grid[j][i] === grid[j+1][i] && grid[j][i] !== null)
            {
                lineMatchesVerical++;
            }
        }

        if(lineMatchesHorizontal === 2 || lineMatchesVerical === 2)
        {
            winnerText.innerHTML = "WINNER IS : " + lastPlayedSign;
            gameRuning = false;
            return;
        }

        lineMatchesHorizontal = 0;
        lineMatchesVerical = 0;
    }
}

function checkDiagonalWinCondition()
{
    let diagonalMatchesHorizontal = 0;

    for(let i = 0; i < 2; i++)
    {
        if(grid[i][i] === grid[i+1][i+1] && grid[i][i] !== null)
        {
            diagonalMatchesHorizontal++;
        }
    }

    let diagonalMatchesVertical = 0;
    let j = 0;

    for(let i = 2; i > 0; i--)
    {
        if(grid[i][j] === grid[i-1][j+1] && grid[i][j] !== null)
        {
            diagonalMatchesVertical++;
        }
        j++;
    }

    if(diagonalMatchesHorizontal === 2 || diagonalMatchesVertical === 2)
    {
        winnerText.innerHTML = "WINNER IS : " + lastPlayedSign;
        gameRuning = false;
        return;
    }

    diagonalMatchesHorizontal = 0;
    diagonalMatchesVertical = 0;
}

let isFull = true;
function checkIsGridFull()
{
    grid.forEach(element => 
    {
        element.forEach(row => 
        {
            if(row === null)
            {
                isFull = false;
            }
        })
    });
    
    if(isFull)
    {
        winnerText.innerHTML = "ITS A DRAW";
        gameRuning = false;
    }

    isFull = true;
}