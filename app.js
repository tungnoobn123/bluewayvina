    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
    import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

    // Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyDhxnVgevg2_Mp5eFTWtgEAMDFz9Y5uGgE",
        authDomain: "tungnoobn.firebaseapp.com",
        projectId: "tungnoobn",
        storageBucket: "tungnoobn.appspot.com",
        messagingSenderId: "207168692116",
        appId: "1:207168692116:web:903456d7ae9d13de03f981"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
   
  

     

      document.addEventListener("DOMContentLoaded", function () {
        let bringFamilyRadios = document.getElementsByName("bringFamily");
        let containerLine = document.getElementById("containerLine");

        function toggleFamilyFields() {
            if (document.getElementById("customRadio1").checked) {
                containerLine.classList.remove("d-none");
            } else {
                containerLine.classList.add("d-none");
            }
        }

        bringFamilyRadios.forEach(radio => {
            radio.addEventListener("change", toggleFamilyFields);
        });

        document.getElementById("btnsave").addEventListener("click", function () {
            //alert(1);
            let cardCode = document.getElementById("cardCode").value;
            let fullName = document.getElementById("fullName").value;

            let bringFamily = document.querySelector('input[name="bringFamily"]:checked').value;
            let familyInfo = document.getElementById("familyInfo").value;

            let selectedLocation = document.querySelector('input[name="location"]:checked');
            let locationText = selectedLocation ? selectedLocation.value : "Chưa chọn địa điểm";

            if(cardCode=="")
            {
                Swal.fire({
                    //position: "top-end",
                    icon: "warning",
                    title: "Nhập mã thẻ",
                    showConfirmButton: false,
                    timer: 2000
                });
                return;
            }
            else if(fullName=="")
            {
                Swal.fire({
                    //position: "top-end",
                    icon: "warning",
                    title: "Nhập họ và tên",
                    showConfirmButton: false,
                    timer: 2000
                });
                return;
            }
            if(bringFamily==="Có")
            {
                if(familyInfo=="")
                {
                    Swal.fire({
                    //position: "top-end",
                    icon: "warning",
                    title: "Nhập tên và tuổi người đi cùng",
                    showConfirmButton: false,
                    timer: 2000
                    });
                    return;
                }
            }
            else
            {
                familyInfo="";
            }
            if(locationText=="Chưa chọn địa điểm")
            {
                Swal.fire({
                    //position: "top-end",
                    icon: "warning",
                    title: "Chọn địa điểm",
                    showConfirmButton: false,
                    timer: 2000
                    });
                    return;
            }
           //alert(locationText);
           // Tạo chuỗi theo định dạng yyyMMddHHmmsss
           var currentDate = new Date();
        // alert( $("#txtName").val());
        // alert(nd);
        // Lấy các thành phần ngày, giờ, phút, giây và mili giây
        var year = currentDate.getFullYear().toString(); // Năm
        var month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Tháng (thêm '0' phía trước nếu số tháng < 10)
        var day = ('0' + currentDate.getDate()).slice(-2); // Ngày (thêm '0' phía trước nếu số ngày < 10)
        var hours = ('0' + currentDate.getHours()).slice(-2); // Giờ (thêm '0' phía trước nếu số giờ < 10)
        var minutes = ('0' + currentDate.getMinutes()).slice(-2); // Phút (thêm '0' phía trước nếu số phút < 10)
        var seconds = ('0' + currentDate.getSeconds()).slice(-2); // Giây (thêm '0' phía trước nếu số giây < 10)
        var milliseconds = ('00' + currentDate.getMilliseconds()).slice(-3); // Mili giây (thêm '00' hoặc '0' phía trước nếu số mili giây < 10 hoặc < 100)
            var formattedDate = year + month + day + hours + minutes + seconds + milliseconds;
                //alert(formattedDate); 
                set(ref(db,"noidung1/"+formattedDate),{
                    userid:cardCode,
                    username:fullName,
                    bringFamily:bringFamily,
                    familyInfo:familyInfo,
                    locationText:locationText
                })
                .then(()=>{
                    Swal.fire({
                                    //position: "top-end",
                                    icon: "success",
                                    title: "Bình chọn đi :"+locationText+" thành công  <br> Xin cảm ơn "+fullName+" <_> <br> Chúc bạn có chuyển đi vui vẻ ",
                                    showConfirmButton: false,
                                    timer: 5000
                                });
                                
                })
                .catch((error)=>{
                    Swal.fire({
                    //position: "top-end",
                    icon: "warning",
                    title: error,
                    showConfirmButton: false,
                    timer: 2000
                    });
                    return;
                })
            
              
        });

        toggleFamilyFields(); // Đảm bảo trạng thái ban đầu đúng

        
    });