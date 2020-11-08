$(document).ready(function(){

    $('.feelings').click(function(event){

        let feelingType = $(this).attr('id');
        feelingTypeCapitalized = feelingType.slice(0, 1).toUpperCase() + feelingType.slice(1, feelingType.length);
        $(this).off("click");

        $.post('/feeling/addFeeling', {feeling: feelingTypeCapitalized}).done(function(data){
            if(data === "OK"){
                $('.feelings').each(function () {
                    if($(this).attr('id') != feelingType) {
                        $(this).addClass('feeling-notclicked');
                        $(this).off('click');
                    }
                    else{
                        $(this).hover(function(event){
                            $(this).css({"border" : "0px"});
                        })
                    }
                })
            }
        })

    });


});