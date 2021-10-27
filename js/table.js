/**
 * Brandon Swanberg, UMass Lowell Computer Science, brandon_swanberg@student.uml.edu
 * HW 3 Building Multiplication Tables Javascript
*/

function buildTable()
{
    var inputNumbers = document.getElementById('inputNumbers').value;
    console.log('Initial Input: ' + inputNumbers);
    
    captureGroups = parseInput(inputNumbers);

    if (captureGroups == 'Invalid Input')
    {
        // case where input doesn't match expected input
        displayError('Invalid Input: please write in the form of digit, digit, digit, digit')
    }
    else if (captureGroups == 'Out of Bounds')
    {
        // case where input numbers are out of range
        displayError('Numbers out of Range: Please choose numbers between -50 and 50 inclusive')
    }
    else if (captureGroups == 'Start Greater than End')
    {
        // case where input numbers are out of range
        displayError('Start numbers must be greater than end numbers.')
    }
    else
    {
        // case where parse was successful
        console.log('Match success with: ' + captureGroups[0]);

        // start and end numbers of rows/columns
        var startRow = parseInt(captureGroups[3]);
        var endRow = parseInt(captureGroups[4]);
        var startColumn = parseInt(captureGroups[1]);
        var endColumn = parseInt(captureGroups[2]);

        var rowLength = endRow - startRow + 1;
        var columnLength = endColumn - startColumn + 1;

        // create array for multiplication table
        var expandedMultArray = new Array(rowLength + 1);
        for (let i = 0; i < expandedMultArray.length; i++)
        {
            expandedMultArray[i] = new Array(columnLength + 1);
        }

        // build array for multiplication table
        for (let i = 0; i < expandedMultArray.length; i++)
        {
            for (let j = 0; j < expandedMultArray[i].length; j++)
            {
                // build header for top left
                if (i == 0 && j == 0)
                {
                    expandedMultArray[i][j] = '_';
                    continue;
                }

                // build header row for columns
                if (i == 0)
                {
                    expandedMultArray[i][j] = startColumn + j - 1;
                    continue;
                }

                // build header row for rows
                if (j == 0)
                {
                    expandedMultArray[i][j] = startRow + i - 1;
                    continue;
                }

                // fill in shifted multiplication table
                expandedMultArray[i][j] = (startRow + i - 1) * (startColumn + j - 1);
            }
        }

        // create HTML for table using array
        var expandedMultArrayHtml = '';
        // expandedMultArrayHtml = expandedMultArrayHtml.concat('<tr><td>' + (Math.floor(Math.random() * 5)) + '</td></tr>');
        console.log(expandedMultArrayHtml);

        for (let i = 0; i < expandedMultArray.length; i++)
        {
            expandedMultArrayHtml = expandedMultArrayHtml.concat('<tr>');
            for (let j = 0; j < expandedMultArray[i].length; j++)
            {
                // create th html for header
                if (i == 0 || j == 0)
                {
                    expandedMultArrayHtml = expandedMultArrayHtml.concat('<th>' + expandedMultArray[i][j] + '</th>');
                    continue;
                }
                expandedMultArrayHtml = expandedMultArrayHtml.concat('<td>' + expandedMultArray[i][j] + '</td>');
            }
            expandedMultArrayHtml = expandedMultArrayHtml.concat('</tr>');
        }

        // iterate through array and 

        // create array of multiplication table
        var multTable = document.createElement('table');
        multTable.setAttribute('id', 'multTable')
        multTable.innerHTML = expandedMultArrayHtml;
     
        // replace HTML in multTable div to update the table
        document.getElementById('multDiv').replaceChild(multTable, document.getElementById('multTable'));
    }
}

function parseInput(inputString)
{
    // remove all whitespace from inputString
    var inputString = inputString.replace(/\s/g, '');
    console.log('Input with Whitespace Removed:' + inputString);

    // make sure our string is in digit,digit,digit,digit form
    var captureGroups = inputString.match(/^(-?\d+),(-?\d+),(-?\d+),(-?\d+)$/);

    if (captureGroups == null)
    {
        return 'Invalid Input';
    }

    // make sure no numbers are too large or too small
    for (let i = 0; i < captureGroups.length; i++)
    {
        if (captureGroups[i] > 50 || captureGroups[i] < (-50))
        {
            return 'Out of Bounds';
        }
    }

    // make sure the bounds are correct
    if (parseInt(captureGroups[1]) > parseInt(captureGroups[2]) || parseInt(captureGroups[3]) > parseInt(captureGroups[4]))
    {
        return 'Start Greater than End';
    }

    return captureGroups;
}

function displayError(errorMessage)
{
    // dispay error
    console.log('Display Alert Error: ' + errorMessage);

    // create array of multiplication table
    var errorTable = document.createElement('table');
    errorTable.setAttribute('id', 'multTable')
    errorTable.innerHTML = '<tr><td>' + errorMessage + '</tr></td>';
 
    // replace HTML in multTable div to update the table
    document.getElementById('multDiv').replaceChild(errorTable, document.getElementById('multTable'));
}
