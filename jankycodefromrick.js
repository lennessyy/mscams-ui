import React from 'react'

function timestampIn(timeIn){
    //takes in the timestamp as a string
    var cutOne = timeIn.split(" "); //split the date and time
    var cutTwo = cutOne.split("-"); //split up the y, m, d
    var choppedRemain = {year:cutTwo[0], month:cutTwo[1], day:cutTwo[2]}
    return choppedRemain; //spit out the mutilated date string pieces as an object
}

//pass in choppedRemain returned from timestampIn and the language code
function timestampOut(sysDate,lng){
    var dateConcat = `${sysDate.month}-${sysDate.day}-${sysDate.year}`;
    var lanCode = "en-us"; //default case
    lanCode = lng;
    switch(lanCode) {
        case 'en-us' || 'en':
            dateConcat = `${sysDate.month}-${sysDate.day}-${sysDate.year}`;
            break;
        case 'zh-cn' || 'zh':
            dateConcat = `${sysDate.year}-${sysDate.month}-${sysDate.day}`;
            break;
        case 'ja':
            dateConcat = `${sysDate.year}-${sysDate.month}-${sysDate.day}`;
            break;
        //add more cases for additional locales?
    }
    return dateConcat;
}

//Event date
//MM/DD/YYYY
function eventDateIn(event_date){
    var chops = event_date.split("/");
    var choppedRemain = {year:chops[2], month:chops[0], day:chops[1]}
    return choppedRemain;
}

//mutilated date in
function eventDateOut(sysDate,lng){
    var dateConcat = `${sysDate.month}/${sysDate.day}/${sysDate.year}`;
    var lanCode = "en-us"; //default case
    lanCode = lng;
    switch(lanCode) {
        case 'en-us' || 'en':
            dateConcat = `${sysDate.month}/${sysDate.day}/${sysDate.year}`;
            break;
        case 'zh-cn' || 'zh':
            dateConcat = `${sysDate.year}/${sysDate.month}/${sysDate.day}`;
            break;
        case 'ja':
            dateConcat = `${sysDate.year}/${sysDate.month}/${sysDate.day}`;
            break;
        //add more cases for additional locales?
    }
    return dateConcat;
}
