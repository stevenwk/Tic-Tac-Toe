const board=document.querySelector('#board')
const gameBoard=(()=>{
  let xTurn=true;
  let turn=0;
  let gameStill=true;
  const create=()=>{
    board.innerHTML=''
    xTurn=true;
    turn=0;
    gameStill=true;
    player1.reset();
    player2.reset();
    for(let y=0;y<3;y++){
      for(let x=0;x<3;x++){
        const cell=document.createElement('div');
        cell.addEventListener('click',()=>(gameBoard.play(x,y)));
        cell.className='cell'
        board.appendChild(cell);
      }
    }
  }

  const play=(x,y)=>{
    let nthChild=y*3+x+1
    const target=document.querySelector(`.cell:nth-child(${nthChild})`)
    if (target.innerHTML==''&&gameStill==true){
      target.innerHTML=xTurn?'x':'o';
      xTurn?player1.play(x,y):player2.play(x,y)
      xTurn=!xTurn;
      turn+=1;
      turn==9?tie():true;
    }
  }
  const gameOver=()=>{
    gameStill=false;
  }

  const tie=()=>{
    alert('tie!');
    gameOver()
  }

  return {create,play,gameOver}
})()


const player=(playerName)=>{
  let name=playerName;
  let ownRow={0:0,1:0,2:0};
  let ownCol={0:0,1:0,2:0};
  let ownDia={0:0,1:0};

  const play=(x,y)=>{
    ownRow[y]+=1;
    ownCol[x]+=1;
    x==y?ownDia[0]+=1:true;
    x==Math.abs(y-2)?ownDia[1]+=1:true;
    if(ownRow[y]==3||ownCol[x]==3||ownDia[0]==3||ownDia[1]==3){
      win()
    }
  }
  const win=()=>{
    alert(`${name} win`)
    gameBoard.gameOver()
  }
  const reset=()=>{
    ownRow={0:0,1:0,2:0};
    ownCol={0:0,1:0,2:0};
    ownDia={0:0,1:0};
  }

  return {play,reset}
}

const player1=player('x');
const player2=player('o')
gameBoard.create();
