const ui = {
  
  start(game) {
    
    ui.boardEl = $('#board');
    ui.game = new Chess();
    ui.board = ChessBoard('board', {
      draggable: true,
      onChange: (oldPos, newPos) => {
          if (!!ui.afterMove) {
            ui.afterMove(newPos);
          }
      },
      
      onDragStart: (source, piece, position, orientation) => {
        if (!canMovePiece(ui, piece)) {
          return false;
        }
        ui.highlightSquare(source, 'green');
      },
      
      onDrop: (source, target) => {
          const isValidMove = tryMove(ui.game, source, target);
        
          if (isValidMove && ui.fsm.state === 'waitForStep1Response') {
            ui.undo();
          }
        
          if ( ui.fsm.state === 'waitForStep2Response') {
              ui.updateFenString(ui.game.fen());
              ui.fsm.completeTurn();
          }
        
          if (!isValidMove) {
            return 'snapback';
          }
      },
      
      onSnapEnd: () => {
        ui.board.position(ui.game.fen());
      }
    });
    
    ui.board.start(true);
    ui.updateFenString(ui.game.fen());
  },
  
  updateFenString (fenStr) {
    $('#fen').val(fenStr);
  },
  
  highlightSquare (square, className) {
    ui.boardEl.find('.square-' + square).addClass(className);
  },
  
  clearHighlight(className) {
    ui.boardEl.find('.square-55d63')
    .removeClass(className);
  },
  
  showInputPanel () {
    $("#inputPanel").css('visibility', 'visible');
  },
  
  hideInputPanel () {
    $("#inputPanel").css('visibility', 'hidden');
  },
  
  undo () {
      ui.game.undo();
      ui.board.position(ui.game.fen());
      ui.updateFenString(ui.game.fen());
  }
  
};

$("#SetPosBtn").on('click', (e) => {
  const fenStr = $("#fen").val();
  handleFenUpdate(ui, fenStr);
});

$("#SwitchSidesBtn").on('click', (e) => {
  ui.board.flip();
});

$("#UndoBtn").on('click', (e) => {
  ui.undo();
});

$("#NoResponseAnswer").on('click', (e) => {
  if (ui.fsm.state === 'waitForStep1Response') {
    ui.fsm.showStep1Feedback();
  }
});

