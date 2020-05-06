$(document).ready(function () {
    $(document).ready(function () {
        $('button#submit').on('click', function () {
            if ($("#username").val() === "") {
                alert("Hãy điền Email | Phone Number ")
            } else if ($("#password").val() === "") {
                alert('Hãy nhập mật khẩu đủ có độ dài từ 8 ký tự trở lên');
            } else  {
                $.get("http://5d959608a824b400141d1bc0.mockapi.io/accounts", function (data, status) {
                    if (status === "success") {
                        var check = false
                        for (var i in data) {
                            if ((data[i].email === $('#username').val().trim() || data[i].mobile === $('#username').val().trim()) && data[i].password === $("#password").val())  {
                                
                                check = true;
                            } 
                        }
                        if(!check){
                            alert("Xem lại Email(Phone Number) | Password");
                        }
                    }
                }).done(function(){
                    
                    document.getElementById("sign-in").reset();
                    window.location.href = "/html/detailuser.html";
                })
            }
        })
    });
    
});