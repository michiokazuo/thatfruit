$(document).ready(function () {
    showMoney();

    var data_local = [];
    $.get("http://5d959608a824b400141d1bc0.mockapi.io/cart", function (data_losto, status_losto) {
        if (status_losto === "success") {
            data_local = data_losto;
        }
    }).done(function () {

        $.get("http://5d959608a824b400141d1bc0.mockapi.io/lisist-pro", function (data, status) {
            if (status === "success") {

                if (data.length === 0) {

                    document.querySelector(".infor-listproduct #tt-list span #number").innerHTML = "Không có sản phẩm để hiển thị";
                } else {
                    var content = "";
                    var pagi = "";
                    for (var j = 0; j <= data.length / 9; j++) {
                        var content_part = "";

                        for (var i = 9 * j; i < ((9 + 9 * j) < (data.length) ? (9 + 9 * j) : (data.length)); i++) {
                            content_part += fill_grid_pro(data[i].id, data[i].name, data[i].price, fill_rating(data[i].rating), data[i].img1, data[i].img2);
                        }
                        content += `<div class="fa-prd row justify-content-center pagi-hide" id="num${(j + 1) + ""}"> ${content_part}</div>`;
                        pagi += `<li class="page-item" data-item="num${(j + 1) + ""}"><a class="page-link" href="#">${(j + 1) + ""}</a></li>`
                    }
                    document.querySelector(".grid #featuredsproducts .inner-left").innerHTML = content;
                    document.querySelector(".grid .paginationjs ul.pagination").innerHTML = `<li class="page-item paginationjs-prev" data-item="prev"><a class="page-link" href="#">«</a></li>${pagi}<li class="page-item paginationjs-next" data-item="next"><a class="page-link" href="#">»</a>
                </li>`;
                    document.querySelectorAll(".grid .paginationjs ul.pagination li")[1].classList.add("active");
                    document.querySelector(".grid #featuredsproducts .inner-left .fa-prd").classList.remove("pagi-hide");
                    document.querySelector(".infor-list-product #tt-list span").innerHTML = "Hiển thị " + document.querySelectorAll(".grid #featuredsproducts .inner-left .fa-prd")[0].childElementCount + " sản phẩm";
                }
            }
        }).done(function (e) {

            add_to_cart();
            var item1 = $(".grid .pagination [data-item]");

            for (let i = 1; i < item1.length - 1; i++) {
                $(item1[i]).click(function (e) {
                    e.preventDefault();
                    for (let j = 1; j < item1.length - 1; j++) {
                        $(item1[j]).removeClass("active");
                        $(".grid #" + $(item1[j]).attr("data-item")).addClass("pagi-hide");
                    }
                    $(this).addClass("active");
                    $(".grid #" + $(this).attr("data-item")).removeClass("pagi-hide");

                    document.querySelector(".infor-list-product #tt-list span").innerHTML = "Hiển thị " + document.querySelector(".grid #featuredsproducts .inner-left #" + $(this).attr("data-item")).childElementCount + " sản phẩm";
                });
                add_to_cart();
            }

            $(item1[0]).click(function (e) {
                e.preventDefault();
                for (let i = 1; i < item1.length - 1; i++) {
                    if ($(item1[i]).attr("class").indexOf(" active") >= 0) {
                        $(item1[i]).removeClass("active");
                        $(".grid #" + $(item1[i]).attr("data-item")).addClass("pagi-hide");
                        if (i === 1) {
                            $(item1[item1.length - 2]).addClass("active");
                            $(".grid #" + $(item1[item1.length - 2]).attr("data-item")).removeClass("pagi-hide");
                            document.querySelector(".infor-list-product #tt-list span").innerHTML = "Hiển thị " + document.querySelector(".grid #featuredsproducts .inner-left #" + $(item1[item1.length - 2]).attr("data-item")).childElementCount + " sản phẩm";
                        } else {
                            $(item1[i - 1]).addClass("active");
                            $(".grid #" + $(item1[i - 1]).attr("data-item")).removeClass("pagi-hide");
                            document.querySelector(".infor-list-product #tt-list span").innerHTML = "Hiển thị " + document.querySelector(".grid #featuredsproducts .inner-left #" + $(item1[i - 1]).attr("data-item")).childElementCount + " sản phẩm";
                        }
                        break;
                    }
                }
                add_to_cart();
            });
            $(item1[item1.length - 1]).click(function (e) {
                e.preventDefault();
                for (let i = 1; i < item1.length - 1; i++) {
                    if ($(item1[i]).attr("class").indexOf(" active") >= 0) {
                        $(item1[i]).removeClass("active");
                        $(".grid #" + $(item1[i]).attr("data-item")).addClass("pagi-hide");
                        if (i === item1.length - 2) {
                            $(item1[1]).addClass("active");
                            $(".grid #" + $(item1[1]).attr("data-item")).removeClass("pagi-hide");
                            document.querySelector(".infor-list-product #tt-list span").innerHTML = "Hiển thị " + document.querySelector(".grid #featuredsproducts .inner-left #" + $(item1[1]).attr("data-item")).childElementCount + " sản phẩm";
                        } else {
                            $(item1[i + 1]).addClass("active");
                            $(".grid #" + $(item1[i + 1]).attr("data-item")).removeClass("pagi-hide");
                            document.querySelector(".infor-list-product #tt-list span").innerHTML = "Hiển thị " + document.querySelector(".grid #featuredsproducts .inner-left #" + $(item1[i + 1]).attr("data-item")).childElementCount + " sản phẩm";
                        }
                        break;
                    }
                }
                add_to_cart();
            });
        })

        $(".type-display #grid").click(function (e) {
            e.preventDefault();
            $(this).addClass("display");
            $(this).next().removeClass("display");
            $("section.grid").removeClass("show");
            $("section.list").addClass("show");

            $.get("http://5d959608a824b400141d1bc0.mockapi.io/lisist-pro", function (data, status) {
                if (status === "success") {

                    if (data.length === 0) {

                        document.querySelector(".infor-listproduct #tt-list span #number").innerHTML = "Không có sản phẩm để hiển thị";
                    } else {
                        var content = "";
                        var pagi = "";
                        for (var j = 0; j <= data.length / 9; j++) {
                            var content_part = "";

                            for (var i = 9 * j; i < ((9 + 9 * j) < (data.length) ? (9 + 9 * j) : (data.length)); i++) {
                                content_part += fill_grid_pro(data[i].id, data[i].name, data[i].price, fill_rating(data[i].rating), data[i].img1, data[i].img2);
                            }
                            content += `<div class="fa-prd row justify-content-center pagi-hide" id="num${(j + 1) + ""}"> ${content_part}</div>`;
                            pagi += `<li class="page-item" data-item="num${(j + 1) + ""}"><a class="page-link" href="#">${(j + 1) + ""}</a></li>`;
                        }
                        document.querySelector(".grid #featuredsproducts .inner-left").innerHTML = content;
                        document.querySelector(".grid .paginationjs ul.pagination").innerHTML = `<li class="page-item paginationjs-prev" data-item="prev"><a class="page-link" href="#">«</a></li>${pagi}<li class="page-item paginationjs-next" data-item="next"><a class="page-link" href="#">»</a>
                </li>`;
                        document.querySelectorAll(".grid .paginationjs ul.pagination li")[1].classList.add("active");
                        document.querySelector(".grid #featuredsproducts .inner-left .fa-prd").classList.remove("pagi-hide");
                        document.querySelector(".infor-list-product #tt-list span").innerHTML = "Hiển thị " + document.querySelectorAll(".grid #featuredsproducts .inner-left .fa-prd")[0].childElementCount + " sản phẩm";
                    }
                }
            }).done(function (e) {

                add_to_cart();
                var item1 = $(".grid .pagination [data-item]");

                for (let i = 1; i < item1.length - 1; i++) {
                    $(item1[i]).click(function (e) {
                        e.preventDefault();
                        for (let j = 1; j < item1.length - 1; j++) {
                            $(item1[j]).removeClass("active");
                            $(".grid #" + $(item1[j]).attr("data-item")).addClass("pagi-hide");
                        }
                        $(this).addClass("active");
                        $(".grid #" + $(this).attr("data-item")).removeClass("pagi-hide");

                        document.querySelector(".infor-list-product #tt-list span").innerHTML = "Hiển thị " + document.querySelector(".grid #featuredsproducts .inner-left #" + $(this).attr("data-item")).childElementCount + " sản phẩm";
                        add_to_cart();
                    });
                }

                $(item1[0]).click(function (e) {
                    e.preventDefault();
                    for (let i = 1; i < item1.length - 1; i++) {
                        if ($(item1[i]).attr("class").indexOf(" active") >= 0) {
                            $(item1[i]).removeClass("active");
                            $(".grid #" + $(item1[i]).attr("data-item")).addClass("pagi-hide");
                            if (i === 1) {
                                $(item1[item1.length - 2]).addClass("active");
                                $(".grid #" + $(item1[item1.length - 2]).attr("data-item")).removeClass("pagi-hide");
                                document.querySelector(".infor-list-product #tt-list span").innerHTML = "Hiển thị " + document.querySelector(".grid #featuredsproducts .inner-left #" + $(item1[item1.length - 2]).attr("data-item")).childElementCount + " sản phẩm";
                            } else {
                                $(item1[i - 1]).addClass("active");
                                $(".grid #" + $(item1[i - 1]).attr("data-item")).removeClass("pagi-hide");
                                document.querySelector(".infor-list-product #tt-list span").innerHTML = "Hiển thị " + document.querySelector(".grid #featuredsproducts .inner-left #" + $(item1[i - 1]).attr("data-item")).childElementCount + " sản phẩm";
                            }
                            break;
                        }
                    }
                    add_to_cart();
                });
                $(item1[item1.length - 1]).click(function (e) {
                    e.preventDefault();
                    for (let i = 1; i < item1.length - 1; i++) {
                        if ($(item1[i]).attr("class").indexOf(" active") >= 0) {
                            $(item1[i]).removeClass("active");
                            $(".grid #" + $(item1[i]).attr("data-item")).addClass("pagi-hide");
                            if (i === item1.length - 2) {
                                $(item1[1]).addClass("active");
                                $(".grid #" + $(item1[1]).attr("data-item")).removeClass("pagi-hide");
                                document.querySelector(".infor-list-product #tt-list span").innerHTML = "Hiển thị " + document.querySelector(".grid #featuredsproducts .inner-left #" + $(item1[1]).attr("data-item")).childElementCount + " sản phẩm";
                            } else {
                                $(item1[i + 1]).addClass("active");
                                $(".grid #" + $(item1[i + 1]).attr("data-item")).removeClass("pagi-hide");
                                document.querySelector(".infor-list-product #tt-list span").innerHTML = "Hiển thị " + document.querySelector(".grid #featuredsproducts .inner-left #" + $(item1[i + 1]).attr("data-item")).childElementCount + " sản phẩm";
                            }
                            break;
                        }
                    }
                    add_to_cart();
                });
            })
        });

        $(".type-display #list").click(function (e) {
            e.preventDefault();
            $(this).addClass("display");
            $(this).prev().removeClass("display");
            $("section.grid").addClass("show");
            $("section.list").removeClass("show");

            $.get("http://5d959608a824b400141d1bc0.mockapi.io/lisist-pro", function (data, status) {
                if (status === "success") {

                    if (data.length === 0) {

                        document.querySelector(".infor-listproduct #tt-list span #number").innerHTML = "Không có sản phẩm để hiển thị";
                    } else {
                        var content = "";
                        var pagi = "";
                        for (var j = 0; j <= data.length / 6; j++) {
                            var content_part = "";

                            for (var i = 6 * j; i < ((6 + 6 * j) < (data.length) ? (6 + 6 * j) : (data.length)); i++) {
                                content_part += fill_list_pro(data[i].id, data[i].name, data[i].price, fill_rating(data[i].rating), data[i].img1, data[i].img2);
                            }
                            content += `<div class="list-product pagi-hide" id="num${(j + 1) + ""}"> ${content_part}</div>`;
                            pagi += `<li class="page-item" data-item="num${(j + 1) + ""}"><a class="page-link" href="#">${(j + 1) + ""}</a></li>`
                        }
                        document.querySelector(".list .paginationjs ul.pagination").innerHTML = `<li class="page-item paginationjs-prev" data-item="prev"><a class="page-link" href="#">«</a></li>${pagi}<li class="page-item paginationjs-next" data-item="next"><a class="page-link" href="#">»</a>
                </li>`;
                        document.querySelectorAll(".list .paginationjs ul.pagination li")[1].classList.add("active");
                        document.querySelector(".list .row").innerHTML = content;
                        document.querySelector(".list .row .list-product").classList.remove("pagi-hide");
                        document.querySelector(".infor-list-product #tt-list span").innerHTML = "Hiển thị " + document.querySelectorAll(".list .row .list-product")[0].childElementCount + " sản phẩm";
                    }

                }
            }).done(function (e) {

                add_to_cart();
                var item = $(".list .pagination [data-item]");

                for (let i = 1; i < item.length - 1; i++) {
                    $(item[i]).click(function (e) {
                        e.preventDefault();
                        for (let j = 1; j < item.length - 1; j++) {
                            $(item[j]).removeClass("active");
                            $(".list #" + $(item[j]).attr("data-item")).addClass("pagi-hide");
                        }
                        $(this).addClass("active");
                        $(".list #" + $(this).attr("data-item")).removeClass("pagi-hide");
                        document.querySelector(".infor-list-product #tt-list span").innerHTML = "Hiển thị " + document.querySelector(".list .row #" + $(this).attr("data-item")).childElementCount + " sản phẩm";
                    });
                    add_to_cart();
                }

                $(item[0]).click(function (e) {
                    e.preventDefault();
                    for (let i = 1; i < item.length - 1; i++) {
                        if ($(item[i]).attr("class").indexOf(" active") >= 0) {
                            $(item[i]).removeClass("active");
                            $(".list #" + $(item[i]).attr("data-item")).addClass("pagi-hide");
                            if (i === 1) {
                                $(item[item.length - 2]).addClass("active");
                                $(".list #" + $(item[item.length - 2]).attr("data-item")).removeClass("pagi-hide");
                                document.querySelector(".infor-list-product #tt-list span").innerHTML = "Hiển thị " + document.querySelector(".list .row #" + $(item[item.length - 2]).attr("data-item")).childElementCount + " sản phẩm";
                            } else {
                                $(item[i - 1]).addClass("active");
                                $(".list #" + $(item[i - 1]).attr("data-item")).removeClass("pagi-hide");
                                document.querySelector(".infor-list-product #tt-list span").innerHTML = "Hiển thị " + document.querySelector(".list .row #" + $(item[i - 1]).attr("data-item")).childElementCount + " sản phẩm";
                            }
                            break;
                        }
                    }
                    add_to_cart();
                });
                $(item[item.length - 1]).click(function (e) {
                    e.preventDefault();
                    for (let i = 1; i < item.length - 1; i++) {

                        if ($(item[i]).attr("class").indexOf(" active") >= 0) {
                            $(item[i]).removeClass("active");
                            $(".list #" + $(item[i]).attr("data-item")).addClass("pagi-hide");
                            if (i === item.length - 2) {
                                $(item[1]).addClass("active");
                                $(".list #" + $(item[1]).attr("data-item")).removeClass("pagi-hide");
                                document.querySelector(".infor-list-product #tt-list span").innerHTML = "Hiển thị " + document.querySelector(".list .row #" + $(item[1]).attr("data-item")).childElementCount + " sản phẩm";
                            } else {
                                $(item[i + 1]).addClass("active");
                                $(".list #" + $(item[i + 1]).attr("data-item")).removeClass("pagi-hide");
                                document.querySelector(".infor-list-product #tt-list span").innerHTML = "Hiển thị " + document.querySelector(".list .row #" + $(item[i + 1]).attr("data-item")).childElementCount + " sản phẩm";
                            }
                            break;
                        }
                    }
                    add_to_cart();
                });
            })
        });

        function add_to_cart() {
            $.get("http://5d959608a824b400141d1bc0.mockapi.io/lisist-pro", function (data, status) {
                if (status === "success") {
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
            });
        }

    })
});

function fill_rating(rating) {
    var rated = "";
    for (var i = 0; i < parseInt(rating); i++) {
        rated += `<span class="fa fa-star checked"></span>`;
    }
    return rated;
}

function fill_grid_pro(id, name, price, rating, img1, img2) {
    return `<div class="item-pr col-md-6 col-lg-4 col-xs-6" style="max-width: 400px;">
    <div class="item-pr-v2 add-id-cart it-prr">
        <div class="img-prduct">
            <div class="flip-box">
                <div class="flip-box-inner">
                    <div class="flip-box-front">
                        <a href="productdetail.html">
                            <img src= "${img1}"
                                alt="">

                        </a>
                    </div>
                    <div class="flip-box-back">
                        <a href="productdetail.html">
                            <img src="${img2}">
                            <i class="fas fa-eye"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="name-product">
            <div class="fp__wapper" style="text-align: center;">
                <a href="product?id=13">
                    <span class="fp__cap">${name}</span>
                </a>

                <i class="fp__price"><del> 10.000 </del> ${price} </i>
                <div class="rating">
                    ${rating}
                </div>
                <p style="display: none;">Dâu tây Đà Lạt giống New Zealand là một trong
                    các giống dâu tây cao cấp được trồng thủy canh tại Đà Lạt. Trái dâu
                    tây Đà Lạt giống New Zealand có màu sắc bắt mắt, thịt giòn, ngọt và
                    đặc biệt là có hương thơm đặc trưng không thua kém gì dâu tây nhập
                    khẩu.</p>

                <a class="fp__label click-add-cart" data-id="${id}"> Thêm vào giỏ</a>

            </div>
        </div>
    </div>
</div>`;
}

function fill_list_pro(id, name, price, rating, img1, img2) {
    return `<div class="item-pro add-id-cart">
    <div class="row">
        <div class="col-12 col-md-5">
            <div class="flip-box">
                <a href="productdetail.html">
                    <div class="flip-box-inner">
                        <div class="flip-box-front">
                            <img src="${img1}" alt="">
                        </div>
                        <div class="flip-box-back">
                            <img src="${img2}" alt="">
                            <i class="fas fa-eye" aria-hidden="true"></i>
                        </div>
                    </div>
                </a>

            </div>
        </div>
        <div class="col-12 col-md-7 text">
            <div class="fp__wapper ">
                <span class="fp__cap">${name}</span>
                <i class="fp__price"><del>200.000 đ</del>
                    <span>${price} đ</span></i>
                <div class="rating">
                    ${rating}
                </div>
                <hr class="divider">
                <p>Dâu tây Đà Lạt giống New Zealand là một trong các giống dâu tây cao cấp nhất được
                    trồng thủy
                    canh tại Đà Lạt. Trái dâu tây Đà Lạt giống New Zealand có màu sắc bắt mắt, thịt
                    giòn, ngọt và
                    đặc biệt là có hương thơm đặc trưng không thua kém gì dâu tây nhập khẩu.</p>
                <a class="fp__label click-add-cart btn" data-id="${id}"> Thêm vào giỏ</a>

            </div>
            <!--.row-->
        </div>
        <!--.item-->
    </div>
</div>`
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

function showMNlocal(data_local) {
    $("#cart1 a.card1 .number").text(" " + data_local.length + " sp");
    var sumPrice = 0;
    for (var i = 0; i < data_local.length; i++) {
        sumPrice += parseInt(data_local[i].number) * parseInt(data_local[i].price);
    }
    $("#cart1 a.card1 .price").text(formatMoney(sumPrice) + " VNĐ");
}
