/**
 * Brandon Swanberg, UMass Lowell Computer Science, brandon_swanberg@student.uml.edu
 * HW 4 Building Multiplication Tables Javascript w/ jQuery part 2
*/

// create an id for tabs
var tabId = 0;

// build sliders
$(document).ready(function(){
    // set default values for bindings
    document.getElementById('inputNumbers1').value = '-50';
    document.getElementById('inputNumbers2').value = '50';
    document.getElementById('inputNumbers3').value = '-50';
    document.getElementById('inputNumbers4').value = '50';
    // build slider for multiplier
    $('#sliderMultiplier').slider({
        min: -50,
        max: 50,
        range: true,
        values: [-50,50],
        // event change function structure referenced and modified from JREAM / https://www.youtube.com/watch?v=dh_3j_v8USU
        change: function(event, ui) {
            // update text box on change
            document.getElementById('inputNumbers1').value = ui.values[0];
            document.getElementById('inputNumbers2').value = ui.values[1];
            buildTable();
        }
    });
    // build slider for multiplicand
    $('#sliderMultiplicand').slider({
        min: -50,
        max: 50,
        range: true,
        values: [-50,50],
        // event change function structure referenced and modified from JREAM / https://www.youtube.com/watch?v=dh_3j_v8USU
        change: function(event, ui) {
            // update text box on change
            document.getElementById('inputNumbers3').value = ui.values[0];
            document.getElementById('inputNumbers4').value = ui.values[1];
            buildTable();
        }
    });
    // bind text boxes back to slider
    $('#inputNumbers1').change(function() {
        $('#sliderMultiplier').slider('values', 0, parseInt(document.getElementById('inputNumbers1').value));
    });
    $('#inputNumbers2').change(function() {
        $('#sliderMultiplier').slider('values', 1, parseInt(document.getElementById('inputNumbers2').value));
    });
    $('#inputNumbers3').change(function() {
        $('#sliderMultiplicand').slider('values', 0, parseInt(document.getElementById('inputNumbers3').value));
    });
    $('#inputNumbers4').change(function() {
        $('#sliderMultiplicand').slider('values', 1, parseInt(document.getElementById('inputNumbers4').value));
    });
});

// build tabs
$(document).ready(function(){
    $('#multTabs').tabs();
    // close tab when clicked
    $('.closeIcon').click(function() {
        console.log('test');
        var tabIdToClose = $(this).attr("id");
        console.log(tabIdToClose);
    });
});

// jQuery validation, documentation located https://jqueryvalidation.org/
$(document).ready(function(){
    // jquery validator
    $('#inputNumbersForm').validate({
        // make sure all fields are filled in and are withing digit range
        rules: {
            inputNumbers1: {
                required: true,
                range: [-50, 50],
                multiplierLessThan: true
            },
            inputNumbers2: {
                required: true,
                range: [-50, 50],
                multiplierGreaterThan: true
            },
            inputNumbers3: {
                required: true,
                range: [-50, 50],
                multiplicandLessThan: true
            },
            inputNumbers4: {
                required: true,
                range: [-50, 50],
                multiplicandGreaterThan: true
            }
        },
        // error messages to show if rules are not fulfilled
        messages: {
            inputNumbers1: {
                required: '<-- Please enter a valid number from -50 to 50.',
                range: '<-- Please enter a number within the range -50 to 50.'
            },
            inputNumbers2: {
                required: '<-- Please enter a valid number from -50 to 50.',
                range: '<-- Please enter a number within the range -50 to 50.'
            },
            inputNumbers3: {
                required: '<-- Please enter a valid number from -50 to 50.',
                range: '<-- Please enter a number within the range -50 to 50.'
            },
            inputNumbers4: {
                required: '<-- Please enter a valid number from -50 to 50.',
                range: '<-- Please enter a number within the range -50 to 50.'
            }
        },
        // function to run if validation is successful, build tables
        submitHandler: function(form) {
            buildTable();
        }
    });

    // check if multiplicand 1 is less than multiplicand 2
    jQuery.validator.addMethod('multiplierLessThan', function(value, element) {
        return (parseInt(document.getElementById('inputNumbers1').value) <= parseInt(document.getElementById('inputNumbers2').value));
    }, '<-- Please enter multiplier value less than or equal to other multiplier value.');

    // check if multiplicand 1 is less than multiplicand 2
    jQuery.validator.addMethod('multiplierGreaterThan', function(value, element) {
        return (parseInt(document.getElementById('inputNumbers1').value) <= parseInt(document.getElementById('inputNumbers2').value));
    }, '<-- Please enter multiplier value greater thanor equal to  other multiplier value.');

    // check if multiplier 1 is less than multiplicand 2
    jQuery.validator.addMethod('multiplicandLessThan', function(value, element) {
        return (parseInt(document.getElementById('inputNumbers3').value) <= parseInt(document.getElementById('inputNumbers4').value));
    }, '<-- Please enter multiplier value less thanor equal to  other multiplier value.');

    // check if multiplier 1 is less than multiplicand 2
    jQuery.validator.addMethod('multiplicandGreaterThan', function(value, element) {
        return (parseInt(document.getElementById('inputNumbers3').value) <= parseInt(document.getElementById('inputNumbers4').value));
    }, '<-- Please enter multiplier value greater than or equal to other multiplier value.');
});

function buildTable()
{
    var inputNumbers1 = document.getElementById('inputNumbers1').value;
    var inputNumbers2 = document.getElementById('inputNumbers2').value;
    var inputNumbers3 = document.getElementById('inputNumbers3').value;
    var inputNumbers4 = document.getElementById('inputNumbers4').value;

    // start and end numbers of rows/columns
    var startRow = parseInt(inputNumbers3);
    var endRow = parseInt(inputNumbers4);
    var startColumn = parseInt(inputNumbers1);
    var endColumn = parseInt(inputNumbers2);

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

    // create tab
    var stringOfValues = inputNumbers1 + ',' + inputNumbers2 + ',' + inputNumbers3 + ',' + inputNumbers4;
    $('#multTabsLinks').append('<li><a href=tab-' + tabId + '>' + stringOfValues + '<span id=' + tabId + ' class="closeIcon ui-icon ui-icon-close"></span></a></li>');
    $('#multTabs').append('<div id="tab-' + tabId + '">' + expandedMultArrayHtml + '</div>');
    
    // add html to tab
    document.getElementById('tab-' + tabId).innerHTML = '<table id="multTable-"' + tabId + '>' + expandedMultArrayHtml + '</table>';
    $('#multTabs').tabs("refresh");

    tabId++;
    // replace HTML in multTable div to update the table
    document.getElementById('multDiv').replaceChild(multTable, document.getElementById('multTable'));
}
