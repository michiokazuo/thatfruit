$(document).ready(function () {
    $.get("http://5d959608a824b400141d1bc0.mockapi.io/lisist-pro", function (data, status) {
        if (status === "success") {
            var data_local = [];
            $.get("http://5d959608a824b400141d1bc0.mockapi.io/cart", function (data_losto, status_losto) {
                if (status_losto === "success") {
                    data_local = data_losto;
                }
            }).done(function () {
                $(document).scroll(function () {
                    createNewInner("#proseller .carousel-inner", "#proseller .carousel-inner .carousel-item .row .p-1");
                    createNewInner("#dealOM .carousel-inner", "#dealOM .carousel-inner .carousel-item .row .p-1");

                    add_to_cart();
                })

                add_to_cart();

                function add_to_cart() {
                    $(".click-add-cart").unbind("click");
                    $(".click-add-cart").click(function () {

                        toastr.options = {
                            "closeButton": true,
                            "debug": false,
                            "newestOnTop": false,
                            "progressBar": false,
                            "positionClass": "toast-top-right",
                            "preventDuplicates": false,
                            "onclick": null,
                            "showDuration": "300",
                            "hideDuration": "2000",
                            "timeOut": "2000",
                            "extendedTimeOut": "1000",
                            "showEasing": "swing",
                            "hideEasing": "linear",
                            "showMethod": "fadeIn",
                            "hideMethod": "fadeOut"
                        }
                        toastr["success"]("Thêm sản phẩm vảo giỏ thành công.")
                        var index = $(this).attr("data-id");

                        if (data_local.length === 0) {
                            data_local[0] = { id: "1", name: data[index - 1].name, price: data[index - 1].price, number: "1", img: data[index - 1].img1 };
                            showMNlocal(data_local);
                            $.ajax({
                                type: "POST",
                                url: "http://5d959608a824b400141d1bc0.mockapi.io/cart",
                                data: { name: data[index - 1].name, price: data[index - 1].price, number: 1, img: data[index - 1].img1 },
                                success: function (response) {

                                }
                            }).done(function () { });

                        } else {
                            var test = 1;
                            for (let k = 0; k < data_local.length; k++) {
                                if (data_local[k].name === data[index - 1].name) {

                                    data_local[k].number = String(parseInt(data_local[k].number) + 1);
                                    test = 0;

                                    showMNlocal(data_local);
                                    $.ajax({
                                        type: "PUT",
                                        url: "http://5d959608a824b400141d1bc0.mockapi.io/cart/" + data_local[k].id,
                                        data: { number: data_local[k].number },
                                        success: function (response) {

                                        }
                                    }).done(function () { });
                                    break;
                                }
                            }
                            if (test === 1) {
                                data_local[data_local.length] = { id: (parseInt(data_local[data_local.length - 1].id) + 1) + "" + "", name: data[index - 1].name, price: data[index - 1].price, number: "1", img: data[index - 1].img1 };
                                showMNlocal(data_local);
                                $.ajax({
                                    type: "POST",
                                    url: "http://5d959608a824b400141d1bc0.mockapi.io/cart",
                                    data: { name: data[index - 1].name, price: data[index - 1].price, number: 1, img: data[index - 1].img1 },
                                    success: function (response) {

                                    }
                                }).done(function () { });
                            }
                        }

                        return false;
                    });
                }

            })
        }
    }).done(function () {

    })

    showMoney();
    var li = document.querySelectorAll("section#bestsellers .container .row .menu .bs-list li");
    for (let i = 0; i < li.length; i++) {
        li[i].onclick = function () {
            for (let k = 0; k < li.length; k++) {
                li[k].classList.remove("actived");
            }
            this.classList.add("actived");
        }
    }
});

function divideitem(link, number) {
    var listitem = document.querySelectorAll(link);
    var content_cover = "";
    for (let i = 0; i < number; i++) {
        var content = "";
        for (let k = (6 / number) * i; k < (6 / number) * (i + 1); k++) {
            content += `<div class="p-1"> ${"" + $(listitem[k]).html()} </div>`;
        }
        if (i === 0) {
            content_cover += `<div class="carousel-item active">
        <div class="row d-flex justify-content-center">
        ${content}
        </div></div>`;
        } else {
            content_cover += `<div class="carousel-item">
        <div class="row d-flex justify-content-center">
        ${content}
        </div></div>`;
        }
    }
    return content_cover;
}

function createNewInner(link1, link2) {
    var coverlist = document.querySelector(link1);
    if ($(window).width() > 991) {
        coverlist.innerHTML = divideitem(link2, 2);
    } else if ($(window).width() > 768 && $(window).width() <= 991) {
        coverlist.innerHTML = divideitem(link2, 3);
    } else if ($(window).width() < 768) {
        coverlist.innerHTML = divideitem(link2, 6);
    }
}

function showMNlocal(data_local) {

    $("#cart1 a.card1 .number").text(" " + data_local.length + " sp");
    var sumPrice = 0;
    for (var i = 0; i < data_local.length; i++) {
        sumPrice += parseInt(data_local[i].number) * parseInt(data_local[i].price);
    }
    $("#cart1 a.card1 .price").text(formatMoney(sumPrice) + " VNĐ");
}

function showMoney() {

    $.get("http://5d959608a824b400141d1bc0.mockapi.io/cart", function (data_cart, status_cart) {
        if (status_cart === "success") {
            $("#cart1 a.card1 .number").text(" " + data_cart.length + " sp");

            var sumPrice = 0;
            for (var i in data_cart) {
                sumPrice += parseInt(data_cart[i].number) * parseInt(data_cart[i].price);
            }

            $("#cart1 a.card1 .price").text(formatMoney(sumPrice) + " VNĐ");
        }
    }).done(function () {

    });
}

function formatMoney(money) {
    if (money !== 0) {
        money = String(money);

        var form = "";
        for (let i = 0; i < money.length % 3; i++) {
            form += money.substring(0, money.length % 3) + ".";
            i = i + money.length % 3;
        }
        for (let i = money.length % 3; i < money.length; i++) {
            form += money.substring(i, i + 3) + ".";

            i = i + 2;
        }
        return form + "000";
    } else {
        return 0;
    }

}
