
$(document).ready(function () {
    $('button#submitSign').on('click', function () {
        if ($("#name").val() === "") {
            alert('Hãy nhập tên của bạn');
        } else if (!(checkEmail())) {
            alert("Email không đúng định dạng!")
        } else if (!(checkPhoneNumber())) {
            alert('Số điện thoại của bạn không đúng định dạng!');
        } else if ($("#password").val().length < 8) {
            alert('Hãy nhập mật khẩu đủ có độ dài từ 8 ký tự trở lên');
        } else if ($("#password-v2").val() !== $("#password").val()) {
            alert('Xác nhận mật khẩu sai');
        } else {
            $.get("http://5d959608a824b400141d1bc0.mockapi.io/accounts", function (data, status) {
                if (status === "success") {
                    for (var i in data) {
                        if (data[i].email === $('#email').val().trim() || data[i].mobile === $('#mobile').val().trim()) {
                            alert("Email | Số điện thoại đã tồn tại");
                            document.getElementById("sign-up").reset();
                            break;
                        }else {
                            $.ajax({
                                type: "POST",
                                url: "http://5d959608a824b400141d1bc0.mockapi.io/accounts",
                                data: { password: $("#password").val(), name: $("#name").val(), email: phone = $('#email').val().trim(), mobile: phone = $('#mobile').val().trim() },
                                success: function (response) {
                                }
                            }).done(function (e) {
                                alert('Sign-up success!!!');
                                
                                window.location.href = "/html/signin.html";
                            });
                            break;
                        }
                    }
                }
            })
            
        }
        
    })
});

function checkPhoneNumber() {
    var flag = false;
    var phone = $('#mobile').val().trim(); // ID của trường Số điện thoại
    phone = phone.replace('(+84)', '0');
    phone = phone.replace('+84', '0');
    phone = phone.replace('0084', '0');
    phone = phone.replace(/ /g, '');
    if (phone !== '') {
        var firstNumber = phone.substring(0, 2);
        if ((firstNumber == '09' || firstNumber == '08' || firstNumber == '03' || firstNumber == '05' || firstNumber == '07') && phone.length === 10) {
            if (phone.match(/^\d{10}/)) {
                flag = true;
            }
        }
    }
    return flag;

}

function checkEmail() {
    var email = document.getElementById('email');
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!filter.test(email.value.trim())) {
        email.focus;
        return false;
    }
    return true;
}
