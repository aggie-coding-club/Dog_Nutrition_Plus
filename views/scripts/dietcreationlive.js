function getIds(callback) {
    $.ajax({
        url: '/diet/getFoodIds',
        type: 'GET',
        success: function (data, status, xhr) {
            callback(data);
        }
    })
}

function getAmounts(callback) {
    let amountsRet = [];
    $('.amountInputs').each(i => {
        amountsRet.push($('.amountInputs')[i].value);
        if (i === $('.amountInputs').length - 1) {
            callback(amountsRet);
            amountsRet = [];
        }
    })
}

$('.amountInputs').on('change', function () {
    getIds(function (ids) {
        getAmounts(function (amounts) {
            $.ajax({
                url: '/diet/update',
                type: 'POST',
                // datatype: 'json',
                data: {
                    cartIds: ids,
                    amounts: amounts
                },
                success: function (data, status, xhr) {
                    console.log("Worked")
                },
                error: function (jqXhr, textStatus, errorMessage) {
                    console.log(errorMessage);
                }
            });
        })
    })
});





