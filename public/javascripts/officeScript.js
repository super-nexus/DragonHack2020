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