$(document).ready(function(){

    $('.feelings').click(function(event){

        let feelingType = $(this).attr('id');
        console.log("feeling type", feelingType);
        //feelingType = feelingType.charAt(0).toUpper() + feelingType.slice(1);


        $.post('/feeling/addFeeling', {feeling: feelingType}).done(function(data){
            console.log(data);
        })

    });

});