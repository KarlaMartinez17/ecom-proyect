$(document).ready(function () {

    $('.carousel').carousel({
        interval: 4000
    })

    ajaxDress();

    function ajaxDress() {
        $.ajax({
            url: "https://api.mercadolibre.com/sites/MLA/search?q=vestidos",
            type: 'GET',
            datatype: 'json',
            limit: 20
        })
            .done(function (response) {
                var data = (response);
                console.log(data);
                getDressInfo(data);
            })
            .fail(function () {
                console.log("error");
            })
    }


    function getDressInfo(dressData) {
        var getResults = dressData.results;
        console.log(getResults);
        for (var i = 0; i < getResults.length; i++) {
            
            var currentDress = getResults[i];
            var id = currentDress.id;
            var thumbnail = currentDress.thumbnail;
            var title = currentDress.title;
            var price = currentDress.price;

            $("#template-container").append(buildingTemplate(id, thumbnail,title,price));
        }
        

    }

    function buildingTemplate(id, thumbnail,title,price){
        var template = '<div class="row product">'+
            '<div class="col-sm-2">'+
            '<img src="'+thumbnail+'" alt="">'+
            '</div>'+
            '<div class="col-sm-6">'+
                '<h4>Dress:'+
                    '<span class="dress-name"> '+title+'</span>'+
               '</h4>'+
                '<h5>Price:'+
                    '<span class="dress-price">'+price+'</span>'+
                '</h5>'+
            '</div>'+
            '<div class="col-sm-4 text-center">'+
                '<button type="button" class="btn btn-dark show-single-dress" product-id="'+id+'">See more...</button>'+
            '</div>'+
        '</div>';

        return template;
    }

    $(document).on('click', '.show-single-dress', function(event){
        event.preventDefault();

        var dressId = $(this).attr('product-id');
        
        openSingleDress(dressId)
    });
    
    function openSingleDress(dressId){
        console.log(dressId);
        //AJAX
    }

});

















//   paypal.Button.render({
//     env: 'sandbox',
//     client: {
//       sandbox: 'demo_sandbox_client_id'
//     },
//     style: {
//       color: 'gold',   // 'gold, 'blue', 'silver', 'black'
//       size:  'medium', // 'medium', 'small', 'large', 'responsive'
//       shape: 'rect'    // 'rect', 'pill'
//     },
//     payment: function (data, actions) {
//       return actions.payment.create({
//         transactions: [{
//           amount: {
//             total: '0.01',
//             currency: 'USD'
//           }
//         }]
//       });
//     },
//     onAuthorize: function (data, actions) {
//       return actions.payment.execute()
//         .then(function () {
//           window.alert('Thank you for your purchase!');
//         });
//     }
//   }, '#paypal-button');

