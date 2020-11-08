function pridobiPodatke(callback){
    let res = $.ajax({type: "POST", url: '/data/getData', async: false})
    let data;
    if(res.responseJSON){
        data = res.responseJSON;
        dict = []
        for (var key in data) {
            dict.push({"date": data[key].time.date.concat(" ",data[key].time.hour.toString(),":",data[key].time.minute.toString()), "value": data[key].temperature })
        }
        return dict;
    }
    console.log(res);
    return " Hahaha"
}

function pridobiPodatkeHumidity(callback){
    let res = $.ajax({type: "POST", url: '/data/getData', async: false})
    let data;
    if(res.responseJSON){
        data = res.responseJSON;
        dict = []
        for (var key in data) {
            dict.push({"date": data[key].time.date.concat(" ",data[key].time.hour.toString(),":",data[key].time.minute.toString()), "value": data[key].humidity })
        }
        return dict;
    }
    console.log(res);
    return " Hahaha"
}

function pridobiPodatkeBrightness(callback){
    let res = $.ajax({type: "POST", url: '/data/getData', async: false})
    let data;
    if(res.responseJSON){
        data = res.responseJSON;
        dict = []
        for (var key in data) {
            dict.push({"date": data[key].time.date.concat(" ",data[key].time.hour.toString(),":",data[key].time.minute.toString()), "value": data[key].brightness })
        }
        return dict;
    }
    console.log(res);
    return " Hahaha"
}

function pridobiPodatkeNoise(callback){
    let res = $.ajax({type: "POST", url: '/data/getData', async: false})
    let data;
    if(res.responseJSON){
        data = res.responseJSON;
        dict = []
        for (var key in data) {
            dict.push({"date": data[key].time.date.concat(" ",data[key].time.hour.toString(),":",data[key].time.minute.toString()), "value": data[key].noise })
        }
        return dict;
    }
    console.log(res);
    return " Hahaha"
}

function pridobiObcutke(){
    let res = $.ajax({type: "POST", url: '/data/getAll', async: false})
    let data;
    if(res.responseJSON){
        data = res.responseJSON;
        console.log(data)
    }
}