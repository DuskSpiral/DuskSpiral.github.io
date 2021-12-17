/*
Hw 5 - Scrabble
Brandon Swanberg
GUI 1
*/

$( function() {
  // create initial board state
  boardState = {
    'boardState': {
      's_0_0': {'multiplier': 1, 'wordMultiplier': 1, 'tileUniqueID': 'none', 'value': 'none'},
      's_0_1': {'multiplier': 1, 'wordMultiplier': 1, 'tileUniqueID': 'none', 'value': 'none'},
      's_0_2': {'multiplier': 1, 'wordMultiplier': 2, 'tileUniqueID': 'none', 'value': 'none'},
      's_0_3': {'multiplier': 1, 'wordMultiplier': 1, 'tileUniqueID': 'none', 'value': 'none'},
      's_0_4': {'multiplier': 1, 'wordMultiplier': 1, 'tileUniqueID': 'none', 'value': 'none'},
      's_0_5': {'multiplier': 2, 'wordMultiplier': 1, 'tileUniqueID': 'none', 'value': 'none'},
      's_0_6': {'multiplier': 1, 'wordMultiplier': 1, 'tileUniqueID': 'none', 'value': 'none'}
    },
    'trayState': {
      't_0': {'tileUniqueID': 'none', 'value': 'none'},
      't_1': {'tileUniqueID': 'none', 'value': 'none'},
      't_2': {'tileUniqueID': 'none', 'value': 'none'},
      't_3': {'tileUniqueID': 'none', 'value': 'none'},
      't_4': {'tileUniqueID': 'none', 'value': 'none'},
      't_5': {'tileUniqueID': 'none', 'value': 'none'},
      't_6': {'tileUniqueID': 'none', 'value': 'none'}
    },
    'usedTiles': {
      'a': 0,
      'b': 0,
      'c': 0,
      'd': 0,
      'e': 0,
      'f': 0,
      'g': 0,
      'h': 0,
      'i': 0,
      'j': 0,
      'k': 0,
      'l': 0,
      'm': 0,
      'n': 0,
      'o': 0,
      'p': 0,
      'q': 0,
      'r': 0,
      's': 0,
      't': 0,
      'u': 0,
      'v': 0,
      'w': 0,
      'x': 0,
      'y': 0,
      'z': 0,
      'blank': 0
    }
  };

  // initialize unique tile counter
  var tileUniqueID = 0;
  var trayUniqueID = 0;

  // spawn the list elements for the scrabbleTiles_ol html View
  for (let i = 0; i < 100; i++)
  {
    if (i > 6)
    {
      $('#scrabbleTiles_ol').append('<li id="t_' + i + '" class="hide"></li>\n');
    }
    else
    {
      $('#scrabbleTiles_ol').append('<li id="t_' + i + '" class="droppable"></li>\n');
    }
  }

  // update tray function, checks for 'none', checks bag, and pulls from bag
  function fillTrayModel() {
    for (var key in boardState.trayState)
    {
      if (boardState.trayState[key].value == 'none')
      {
        // get a new tile
        let tileRecieved = getTileFromBagModel();
        if (tileRecieved != 'all tiles used')
        {
          // add tile to tray model
          boardState.trayState[key].value = tileRecieved;
          boardState.trayState[key].tileUniqueID = tileUniqueID;
          // update html
          fillTrayView(key);
          tileUniqueID++;
        }
      }
    }
  }

  function fillTrayView(key)
  {
      let tempTileStringHTML = '';
      tempTileStringHTML = tempTileStringHTML + '<div id="' + boardState.trayState[key].tileUniqueID + '" data-letter="' + boardState.trayState[key].value;
      tempTileStringHTML = tempTileStringHTML + '" class="tile letterTile letterTile_' + boardState.trayState[key].value + ' ui-widget-content draggable"></div></li>\n';
      $('#' + key).html(tempTileStringHTML);
  }

  // get new tile from bag
  function getTileFromBagModel() {
    // set total # of tiles
    let currentBag = [];
    let currentTileSet = tileSet;
    i = 0;
    for (var key in currentTileSet.count)
    {
      // get count of tiles in "full bag" for this tile
      let tempCount = currentTileSet.count[key] - boardState.usedTiles[key];
      // add number of available tiles to array
      for (let i = 0; i < tempCount; i++)
      {
        // add that number of tiles to current bag
        currentBag.push(key);
      }
    }

    if (currentBag.length == 0)
    {
      return 'all tiles used';
    }

    // randomly pick tile from array
    let tempPickedTile = currentBag[Math.floor(currentBag.length*Math.random())];
    
    // add tile to used tiles
    boardState.usedTiles[tempPickedTile] = boardState.usedTiles[tempPickedTile] + 1;

    return tempPickedTile;
  }

  // swap tile from tray to board
  function tileTrayToBoardModel(tileUniqueID, boardUniqueID)
  {
    // find where tile currently resides
    for (var key in boardState.trayState)
    {
      if (boardState.trayState[key].tileUniqueID == tileUniqueID)
      {
        trayUniqueID = key;
      }
    }

    // move div element + update html
    tileTrayToBoardView(tileUniqueID, boardUniqueID, trayUniqueID);

    // copy the tile onto the board
    boardState.boardState[boardUniqueID].tileUniqueID = boardState.trayState[trayUniqueID].tileUniqueID;
    boardState.boardState[boardUniqueID].value = boardState.trayState[trayUniqueID].value;
    
    // set the tray values to none
    boardState.trayState[trayUniqueID].tileUniqueID = 'none';
    boardState.trayState[trayUniqueID].value = 'none';
  }

  // make sure html matches
  function tileTrayToBoardView(tileUniqueID, boardUniqueID, trayUniqueID)
  {
    // find first available open slot to copy div
    for (i = 0; i < 100; i++)
    {
      // find first available open slot to copy div
      if ($('#t_' + i).html() == '')
      {
        $('#t_' + i).html($('#' + trayUniqueID).html());
        break;
      }
    }

    // remove div from original spot
    $('#' + trayUniqueID).html('');
  }

  // initial tray fill
  fillTrayModel();
  console.log(boardState);

  // modified from https://jqueryui.com/droppable/ tutorial
  $( '.draggable' ).draggable(
    {
      start: function(event, ui) {
        lastTileTouchedID = $(this).attr('id');
      }
    });
  $( '.droppable' ).droppable({
    drop: function( event, ui ) {
      
      tileTrayToBoardModel(lastTileTouchedID , $($(this).parent()[0]).attr('id'));
      console.log(boardState);
    }
  });

  // calculate score on scrabble board
  function calculateScore()
  {
    let tempCount = 0;
    let worldMultiplierCount = 1;
    for (var key in boardState.boardState)
    {
      if (boardState.boardState[key].value == 'none')
      {
        continue;
      }
      tempCount = tempCount + ((getPoints(boardState.boardState[key].value)*boardState.boardState[key].multiplier));
      worldMultiplierCount = worldMultiplierCount * boardState.boardState[key].wordMultiplier;
    }
    return tempCount*worldMultiplierCount;
  }

  function getPoints(letter)
  {
    return tileSet.value[letter];
  }

  $('#calculate').click( function () {
    $('#score').html(calculateScore());
  });

  $('#fill').click( function () {
    fillTrayModel();
  });
  /*
  $( '#fill' ).click(
    {
      fillTrayModel();
    });
  $( '#score' ).click(
  {
    $('#score').html('4');
  });
  */
} );