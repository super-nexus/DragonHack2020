$(document).ready(function(){

    $('.feelings').click(function(event){

        let feelingType = $(this).attr('id');
        feelingType = feelingType.slice(0, 1).toUpperCase() + feelingType.slice(1, feelingType.length);

        $.post('/feeling/addFeeling', {feeling: feelingType}).done(function(data){
            if(data === "OK"){

            }
        })

    });

});