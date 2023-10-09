const BASE_URL = "http://localhost:8080/Back_End_war/";

//load all existing customers
getAllcustomer();

getAllcustomer();
$("#btnCustomer").click(function () {
    let formData = $("#customerForm").serialize();
    $.ajax({
        url: BASE_URL+"customer",
        method: "post",
        data: formData,
        dataType: "json",
        success: function (res) {
            if (res && res.message !== undefined) {
                alert(res.message);

            } else {
                alert("Invalid data formata")
            }
            console.log(res)
            console.log("Response message:", res.message);
            clearValues();
            getAllcustomer();
        },
        error: function (error) {
            alert(JSON.parse(error.responseText).message);
        }
    });
});

function clearValues() {
    $("#txtCustomerID").val("")
    $("#txtCustomerName").val("")
    $("#txtCustomerAddress").val("")

}

function getAllcustomer() {
    $("#tblCustomer").empty();
    $.ajax({
        url: BASE_URL+"customer",
        method: "get",
        dataType: "json",

        success: function (res) {
            let customer = res.data;
            for (let i in customer) {
                let cus = customer[i];
                let id = cus.id;
                let name = cus.name;
                let address = cus.address;
                let salary = cus.salary;

                let row = `<tr>
<td>${id}</td>
<td>${name}</td>
<td>${address}</td>
<td>${salary}</td>



                              </tr>`
                $("#tblCustomer").append(row);

            }
            bindClickEvent();
        },
        error: function (error) {
            alert(error.responseJSON.message)
        }
    });

}

function bindClickEvent() {
    $("#tblCustomer>tr").click(function () {
        let id = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let address = $(this).children().eq(2).text();
        let salary = $(this).children().eq(3).text();


        $("#txtCustomerID").val(id);
        $("#txtCustomerName").val(name);
        $("#txtCustomerAddress").val(address);
        $("#txtCustomerSalary").val(salary);


    })
}

$("#btnUpdate").click(function () {
    let id = $("#txtCustomerID").val();
    let name = $("#txtCustomerName").val();
    let address = $("#txtCustomerAddress").val();
    let salary= $("#txtCustomerSalary").val();
    var cusObj={
        id:id,
        name:name,
        address:address,
        salary:salary
    }

    $.ajax( {
        url:BASE_URL+"customer",
        method:"PUT",
        contentType:"application/json",
        data: JSON.stringify(cusObj),
        dataType:"json",
        success:function (res) {
            alert(res.message)
            getAllcustomer();
            clearValues();
        },
        error:function (error) {
            alert(error.responseText.message)
        }
    });

});

$("#btnCusDelete").click(function () {
    let id = $("#txtCustomerID").val();
    let consent = confirm("Do you want to delete.?");
    if(consent) {
        $.ajax({
            url:BASE_URL+ "customer?cusID=" + id,
            method: "DELETE",
            dataType: "json",
            success: function (res) {
                alert(res.message);
                clearValues();
                getAllcustomer();
            },
            error: function (error) {
                alert(error.responseText.message)
            }
        })
    }
});