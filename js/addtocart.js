$(document).ready(function () {
    loadmodal();
    showMoney();

});

function showMoney() {
    var data_local = [];
    $.get("http://5d959608a824b400141d1bc0.mockapi.io/cart", function (data_cart, status_cart) {
        if (status_cart === "success") {
            $("#cart1 a.card1 .number").text(" " + data_cart.length + " sp");
            data_local = data_cart;

            var sumPrice = 0;
            var content_cart = "";
            for (var i in data_cart) {

                content_cart += `<tr class="id-pr-cart" id="tr${data_cart[i].id}">
                    <td scope="row" width="100" class="text-center"><i class="fas fa-times click-remove-pr" style="cursor: pointer;" data-idpdcart="${data_cart[i].id}"></i></td>
                    <td><img src="${data_cart[i].img}"
                            alt=""></td>
                    <td class="ctpc">${data_cart[i].name}</td>
                    <td>${data_cart[i].price}</td>
                    <td>
                        <div class="cidoa row justify-content-center align-items-center" style="display: inline-block">
                            <i class="fas fa-arrow-alt-circle-down click-reduce" style="cursor: pointer;" data-idpdcart="${data_cart[i].id}"></i>
                            <input type="text" class="ip-cart" name="" id="num${data_cart[i].id}" value="${data_cart[i].number}"
                                placeholder="1" disabled>
                            <i class="fas fa-arrow-alt-circle-up click-increase" style="cursor: pointer;" data-idpdcart="${data_cart[i].id}"></i>
                        </div>
                    </td>
                    <td id="moneyP${data_cart[i].id}">${formatMoney(parseInt(data_cart[i].number) * parseInt(data_cart[i].price))} đ</td>
                </tr>`;

                sumPrice += parseInt(data_cart[i].number) * parseInt(data_cart[i].price);

            }

            document.querySelector("tbody#tb-cart").innerHTML = content_cart;

            $("#cart1 a.card1 .price").text(formatMoney(sumPrice) + " VNĐ");
            if (sumPrice != 0) {
                $("#table-money .text-secondary td.last").text(formatMoney(sumPrice) + " đ");
                $("#table-money tr #sumMoney").text(formatMoney(sumPrice + 50) + " đ");
            }
        }
    }).done(function () {

        $(".click-reduce").click(function () {
            let index = $(this).attr("data-idpdcart");

            for (let k = 0; k < data_local.length; k++) {
                if (data_local[k].id === index) {

                    if (parseInt(data_local[k].number) >= 2) {
                        data_local[k].number = String(parseInt(data_local[k].number) - 1);
                        showMNlocal(data_local, index, k);
                        $.ajax({
                            type: "PUT",
                            url: "http://5d959608a824b400141d1bc0.mockapi.io/cart/" + data_local[k].id,
                            data: { number: data_local[k].number },
                            success: function (response) {

                            }
                        }).done(function () {
                            loadmodal();
                        });
                    } else {
                        data_local.splice(k, 1);
                        $("tr#tr" + index).remove();
                        showMNlocalnodel(data_local);
                        $.ajax({
                            type: "DELETE",
                            url: "http://5d959608a824b400141d1bc0.mockapi.io/cart/" + index,

                            success: function (response) {

                            }
                        })
                    }

                    break;
                }
            }

        })

        $(".click-increase").click(function () {
            let index = $(this).attr("data-idpdcart");
            var poi = 0;
            for (let k = 0; k < data_local.length; k++) {
                if (data_local[k].id === index) {

                    data_local[k].number = String(parseInt(data_local[k].number) + 1);
                    showMNlocal(data_local, index, k);
                    $.ajax({
                        type: "PUT",
                        url: "http://5d959608a824b400141d1bc0.mockapi.io/cart/" + data_local[k].id,
                        data: { number: data_local[k].number },
                        success: function (response) {

                        }
                    }).done(function () {

                        loadmodal();

                    });
                    break;
                }
            }

        })

        $(".click-remove-pr").click(function () {
            let index = $(this).attr("data-idpdcart");

            for (let k = 0; k < data_local.length; k++) {
                if (data_local[k].id === index) {

                    data_local.splice(k, 1);
                    $("tr#tr" + index).remove();
                    showMNlocalnodel(data_local);
                    $.ajax({
                        type: "DELETE",
                        url: "http://5d959608a824b400141d1bc0.mockapi.io/cart/" + index,

                        success: function (response) {

                        }
                    }).done(function () {

                        loadmodal();
                    });
                    break;
                }
            }

        })

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

function loadmodal() {
    $.get("http://5d959608a824b400141d1bc0.mockapi.io/cart", function (data_modal, status_modal) {
        if (status_modal === "success") {
            if (data_modal.length === 0) {
                $("#myModal span span.sum").text(formatMoney(sumPrice1) + "0 đ");
            } else {
                var sumPrice1 = 0;
                var content_cart1 = "";
                for (var i in data_modal) {

                    content_cart1 += `<tr class="id-pr-cart" id="tr${data_modal[i].id}" style="border-right: none; border-left: none;">
                    
                    <td><img src="${data_modal[i].img}"
                            alt=""></td>
                    <td class="ctpc">${data_modal[i].name}</td>
                    <td>${data_modal[i].price}</td>
                    <td>
                        <div class="cidoa row justify-content-center align-items-center" style="display: inline-block">
                        
                            <input type="text" class="ip-cart" name="" id="num${data_modal[i].id}" value="${data_modal[i].number}"
                                placeholder="1" disabled>
                            
                        </div>
                    </td>
                    <td id="moneyP${data_modal[i].id}">${formatMoney(parseInt(data_modal[i].number) * parseInt(data_modal[i].price))} đ</td>
                </tr>`;

                    sumPrice1 += parseInt(data_modal[i].number) * parseInt(data_modal[i].price);

                }

                document.querySelector("#myModal tbody#tb-cart").innerHTML = content_cart1;

                if (sumPrice1 !== 0) {
                    $("#myModal span span.sum").text(formatMoney(sumPrice1) + " đ");
                }
            }

        }
    })
}

function showMNlocal(data_local, index, poi) {

    $("#num" + index).val(data_local[poi].number);

    $("#moneyP" + index).text(formatMoney(parseInt(data_local[poi].number) * parseInt(data_local[poi].price)) + " đ");

    $("#cart1 a.card1 .number").text(" " + data_local.length + " sp");
    var sumPrice = 0;
    for (var i = 0; i < data_local.length; i++) {
        sumPrice += parseInt(data_local[i].number) * parseInt(data_local[i].price);
    }
    if (sumPrice != 0) {
        $("#cart1 a.card1 .price").text(formatMoney(sumPrice) + " VNĐ");
        $("#table-money .text-secondary td.last").text(formatMoney(sumPrice) + " đ");
        $("#table-money tr #sumMoney").text(formatMoney(sumPrice + 50) + " đ");
    }
}
function showMNlocalnodel(data_local) {

    $("#cart1 a.card1 .number").text(" " + data_local.length + " sp");
    if (data_local.length === 0) {
        $("#cart1 a.card1 .price").text("0 VNĐ");
        $("#table-money .text-secondary td.last").text("0 đ");
        $("#table-money tr #sumMoney").text("0 đ");
    } else {
        var sumPrice = 0;
        for (var i = 0; i < data_local.length; i++) {
            sumPrice += parseInt(data_local[i].number) * parseInt(data_local[i].price);
        }
        if (sumPrice != 0) {
            $("#cart1 a.card1 .price").text(formatMoney(sumPrice) + " VNĐ");
            $("#table-money .text-secondary td.last").text(formatMoney(sumPrice) + " đ");
            $("#table-money tr #sumMoney").text(formatMoney(sumPrice + 50) + " đ");
        }
    }

}