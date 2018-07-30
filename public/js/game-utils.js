const canMovePiece = (ui, piece) => {
  if (ui.game.game_over() === true ||

      //(ui.game.turn() === 'w' && piece.search(/^b/) !== -1) ||
      //(ui.game.turn() === 'b' && piece.search(/^w/) !== -1))
     (ui.fsm.state !== 'waitForStep1Response' && 
      ui.fsm.state !== 'waitForStep2Response')) {
    return false;
  }
  return true;
};

const tryMove = (game, source, target) => {
    // see if the move is legal
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  });
  
  return move !== null;
};

const handleFenUpdate = (ui, newFenStr) => {
  const result = ui.game.validate_fen(newFenStr);
  if (result.valid) {
    ui.game = new Chess(newFenStr);
    ui.setPosition(newFenStr);
  }
  else {
    ui.updateFenString(ui.game.fen());
    throw new Error(result.error);
  }
};

const validateResponse = (ui) => {
  return true;
};

var makeRandomMove = () => {
  var possibleMoves = ui.game.moves();

  // exit if the game is over
  if (ui.game.game_over() === true || possibleMoves.length === 0) {
    return;
  }

  var randomIndex = Math.floor(Math.random() * possibleMoves.length);
  ui.game.move(possibleMoves[randomIndex]);
  const fen = ui.game.fen();
  ui.board.position(fen);
  ui.updateFenString(fen);
};