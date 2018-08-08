$(document).ready(function () {

    // *****************************carrusel******************************************
    $('.carousel').carousel({
        interval: 4000
    })

    // *******************llamada al ajax y api de mercado libre************************
    ajaxDress();

    function ajaxDress() {
        $.ajax({
            url: "https://api.mercadolibre.com/sites/MLA/search?q=vestidos",
            type: 'GET',
            datatype: 'json',
            limit: 5
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

    // **************************** funcion que busca la información del vestido*************************
    function getDressInfo(dressData) {
        var getResults = dressData.results;
        console.log(getResults);
        for (var i = 0; i < getResults.length; i++) {

            var currentDress = getResults[i];
            var id = currentDress.id;
            var thumbnail = currentDress.thumbnail;
            var title = currentDress.title;
            var price = currentDress.price;

            $("#template-container").append(buildingTemplate(id, thumbnail, title, price));
        }


    }
    //*********************************funcion que construye el template********************************** */

    function buildingTemplate(id, thumbnail, title, price) {
        var template = '<div class="row product">' +
            '<div class="col-2">' +
            '<img src="' + thumbnail + '" alt="">' +
            '</div>' +
            '<div class="col-6">' +
            '<h4>Dress:' +
            '<span class="dress-name"> ' + title + '</span>' +
            '</h4>' +
            '<h5>Price: ' + '$ ' +
            '<span class="dress-price">' + price + '</span>' + ' pesos' +
            '</h5>' +
            '</div>' +
            '<div class="col-4 text-center">' +
            '<button type="button" class="btn btn-dark show-single-dress" product-id="' + id + '">See more...</button>' +
            '</div>' +
            '</div>';

        return template;
    }

    //*******************************************SINGLE PRODUCT PAGE******************************** */

    $(document).on('click', '.show-single-dress', function (event) {
        event.preventDefault();
        $("#template-container2").empty();


        var dressId = $(this).attr('product-id');
        console.log(dressId);

        openSingleDress(dressId)
    });

    /*************************SINGLE PRODUCT PAGE API ********************************************** */

    function openSingleDress(dressId) {
        console.log(dressId);
        $.ajax({
            url: "https://api.mercadolibre.com/items/" + `${dressId}`,
            type: 'GET',
            datatype: 'json',

        })
            .done(function (response) {
                var data = (response);
                console.log(data);
                singleProductInfo(data);

            })
            .fail(function () {
                console.log("error");
            })
    }

    //********************************SINGLE PRODUCT PAGE INFO**************************************** */

    function singleProductInfo(data) {
        console.log(data);
        var singleProductTitle = data.title;
        var singleProductPrice = data.price;
        var singleProductPicture = data.pictures;

        var pictures = [];
        for (var i = 0; i < 4; i++) {
            pictures.push(singleProductPicture[i]);
            

        }
        var pictureOne = pictures[0].url;
        var pictureTwo = pictures[1].url;
        console.log(pictures);
        var pictureThree = pictures[2].url;
        var pictureFour = pictures[3].url;

        $("#template-container2").append(buildingTemplateSingleProduct(singleProductTitle, singleProductPrice, pictureOne, pictureTwo, pictureThree, pictureFour));

    }

    /***************************************SINGLE PRODUCT PAGE TEMPLATE***************************** */

    function buildingTemplateSingleProduct(singleProductTitle, singleProductPrice, pictureOne, pictureTwo, pictureThree, pictureFour) {
        console.log("entrando a template");

        var template = '<div class="container">' +
            '<div class="row">' +
            '<div class="col-6 minis-template-single-product">' +
            '<img src="' + pictureOne + '" alt="">' +
            '<img src="' + pictureTwo + '" alt="">' +
            '<img src="' + pictureThree + '" alt="">' +
            '</div>' +
            '<div class="col-6 big-img-template-single-product">' +
            '<img src="' + pictureFour + '" alt="">' +
            '</div>' +
            '<div class="col-12">' +
            '<h3>' +
            '<span class="dress-name"> ' + singleProductTitle + '</span>' +
            '</h3 >' +
            '<h5>' + '$'+
            '<span class="dress-price">' + singleProductPrice + '</span>' + ' pesos' +
            '</h5>' +
            '<button id="add-to-cart" type="button" class="btn btn-dark">' +
            '<i class="fa fa-shopping-cart"></i> Add to car...</button>' +
            '</div>' +
            '</div>' +
            '</div >'

        return template;
    }


});
















 /* paypal.Button.render({
      env: 'sandbox',
      client: {
        sandbox: 'demo_sandbox_client_id'
      },
      style: {
        color: 'gold',   // 'gold, 'blue', 'silver', 'black'
        size:  'medium', // 'medium', 'small', 'large', 'responsive'
        shape: 'rect'    // 'rect', 'pill'
      },
      payment: function (data, actions) {
        return actions.payment.create({
          transactions: [{
            amount: {
              total: '0.01',
              currency: 'USD'
            }
          }]
        });
      },
      onAuthorize: function (data, actions) {
        return actions.payment.execute()
          .then(function () {
           window.alert('Thank you for your purchase!');
          });
      }
    }, '#paypal-button');*/

