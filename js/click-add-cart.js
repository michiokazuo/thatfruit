
// $.get("http://5d959608a824b400141d1bc0.mockapi.io/lisist-pro", function (data, status) {
//     if (status === "success") {

//         showMoney();
//         add_to_cart();


//         function add_to_cart() {
//             $(".click-add-cart").unbind("click");
//             $(".click-add-cart").click(function () {
//                 var index = $(this).attr("data-id");
//                 $("div.notify").html($("div.notify").html() + `<div class="alert alert-success alert-dismissible fade show" style="  width: 100%; transition: 1s; opacity: 0; transform: translateY(-30px);">
//         <button type="button" class="close" data-dismiss="alert">&times;</button>
//         Thêm sản phẩm vảo giỏ thành công.
//     </div>`);

//                 $("div.alert").addClass("display");
//                 $("div.notify").addClass("display");
//                 setTimeout(function () {
//                     $("div.alert").remove();
//                 }, 3000)


//                 $.get("http://5d959608a824b400141d1bc0.mockapi.io/cart", function (data_cart, status_cart) {
//                     if (status_cart === "success") {
//                         if (data_cart.length === 0) {
//                             $.ajax({
//                                 type: "POST",
//                                 url: "http://5d959608a824b400141d1bc0.mockapi.io/cart",
//                                 data: { name: data[index - 1].name, price: data[index - 1].price, number: 1, img: data[index - 1].img1 },
//                                 success: function (response) {
//                                     console.log("DONE post 1");
//                                 }
//                             }).done(function () { });
//                         } else {
//                             var check = 0;
//                             for (var j in data_cart) {
//                                 if (data[index - 1].name === data_cart[j].name) {

//                                     $.ajax({
//                                         type: "PUT",
//                                         url: "http://5d959608a824b400141d1bc0.mockapi.io/cart/" + data_cart[j].id,
//                                         data: { number: (parseInt(data_cart[j].number) + 1) },
//                                         success: function (response) {
//                                             console.log("DONE put");
//                                         }
//                                     }).done(function () { });
//                                     check = 1;
//                                     break;
//                                 }
//                             }
//                             if (check === 0) {
//                                 $.ajax({
//                                     type: "POST",
//                                     url: "http://5d959608a824b400141d1bc0.mockapi.io/cart",
//                                     data: { name: data[index - 1].name, price: data[index - 1].price, number: 1, img: data[index - 1].img1 },
//                                     success: function (response) {
//                                         console.log("DONE post 2");
//                                     }
//                                 }).done(function () { });
//                             }
//                         }


//                     }
//                 }).done(function () {
//                     console.log("Done get");
//                 });



//                 return false;
//             });
//         }
//     }
// }).done(function () {
//     console.log("Completed");
// })


// function showMoney() {

//     $.get("http://5d959608a824b400141d1bc0.mockapi.io/cart", function (data_cart, status_cart) {
//         if (status_cart === "success") {


//             $("#cart1 a.card1 .number").text(" " + data_cart.length + " sp");

//             var sumPrice = 0;
//             for (var i in data_cart) {

//                 sumPrice += parseInt(data_cart[i].number) * parseInt(data_cart[i].price);

//             }

//             $("#cart1 a.card1 .price").text(formatMoney(sumPrice) + " VNĐ");



//         }
//     }).done(function () {
//         console.log("Done show price");

//     });
// }
// function formatMoney(money) {
//     if (money !== 0) {
//         money = String(money);

//         var form = "";
//         for (let i = 0; i < money.length % 3; i++) {
//             form += money.substring(0, money.length % 3) + ".";
//             i = i + money.length % 3;
//         }
//         for (let i = money.length % 3; i < money.length; i++) {
//             form += money.substring(i, i + 3) + ".";

//             i = i + 2;
//         }
//         return form + "000";
//     } else {
//         return 0;
//     }

// }

// function showMNlocal(data_local) {
//     $("#cart1 a.card1 .number").text(" " + data_local.length + " sp");
//     var sumPrice = 0;
//     for (var i = 0; i < data_local.length; i++) {
//         sumPrice += parseInt(data_local[i].number) * parseInt(data_local[i].price);
//     }
//     $("#cart1 a.card1 .price").text(formatMoney(sumPrice) + " VNĐ");
// }