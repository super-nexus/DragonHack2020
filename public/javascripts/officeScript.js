function pridobiPodatke(){
    let res = $.ajax({type: "POST", url: '/data/getDataByDate', data:{"date":"2020-11-08"}, async: false})
    let data;
    console.log("Ni podatkov");
    if(res.responseJSON){
        data = res.responseJSON;
        console.log("ppp", data);
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
    let res = $.ajax({type: "POST", url: '/feeling/getTodaysFeelings', async: false})
    let data;
    if(res.responseJSON){
        data = res.responseJSON;
        dict = {"Frustrated":0, "Ok":0, "Fantastic":0}
        for (var key in data) {
            dict[data[key]["feeling"]] += 1
        }
        out = []
        for (var key in dict) {
            out.push({"feeling":key, "times":dict[key]})
        }
        return out;
    }
    return null;
}

pridobiObcutke()
