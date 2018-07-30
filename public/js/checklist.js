
ui.fsm = new StateMachine({
    init: 'waitForStep1Response',
    transitions: [
      { name: 'showStep1Feedback',     from: 'waitForStep1Response',     to: 'showingCollectionResult' },
      { name: 'getMoreStep1Responses', from: 'showingCollectionResult',  to: 'waitForStep1Response'    },
      { name: 'proceedToStep2',        from: 'showingCollectionResult',  to: 'waitForStep2Response'    },
      { name: 'completeTurn',          from: 'waitForStep2Response',     to: 'waitForStep1Response' },
      { name: 'finish',                from: 'waitForStep2Response',     to: 'done' }
    ],
    methods: {
      onWaitForStep1Response: () => { 
        console.log("Show me all threats.");
        ui.showInputPanel();
      },
      
      onShowStep1Feedback: () => {
        console.log('"I got your answer. Let me see...');
        // validate response;
        if (validateResponse(ui)) {
          setTimeout(() => ui.fsm.proceedToStep2(), 2000);
        }
      },
      
      onGetMoreStep1Responses: () => {
        console.log("Waiting fro more answers..");
      },
      
      onProceedToStep2: () => { 
        ui.hideInputPanel();
        console.log("Very good. Now make your move.");
      },
      
      onCompleteTurn: () => { 
        window.setTimeout(makeRandomMove, 1000);
        console.log("Thank You. Your opponent made a move. ");
      },
      
      onFinish: () => { 
        console.log("Game's over.");
      }
    }
  });


ui.start();




