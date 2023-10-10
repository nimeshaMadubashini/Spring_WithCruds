/*

//load all items from the database
loadAllItems();
loadAllCustomers();
setDates();
searchCustomer();

function loadAllItems() {
    $("#selectItemCode").empty();
    $.ajax({
        url: BASE_URL + "item",
        headers:{
            Auth:"user=admin,pass=admin"
        },
        success: function (res) {
            for (let c of res.data) {
                let code = c.code;
                $("#selectItemCode").append(`<option value="${code}">${code}</option>`);
            }
        },
        error: function (error) {
            let message = JSON.parse(error.responseText).message;
            alert(message);
        }
    });
}

function loadAllCustomers() {
    $("#selectCusID").empty();
    $.ajax({
        url: BASE_URL + "customer",
        dataType: "json",
        headers:{
            Auth:"user=admin,pass=admin"
        },
        success: function (resp) {
            console.log(resp);
            for (let cus of resp.data) {
                $("#selectCusID").append(`<option value="${cus.id}">${cus.id}</option>`);
            }
        }
    });
}

function setDates() {
    let date = new Date().toJSON().split("T")[0];
    $("#txtDate").val(date);
}

function searchCustomer(cusID) {
    let response = "";
    $.ajax({
        url: BASE_URL + "customer",
        dataType: "json",
        async: false,
        headers:{
            Auth:"user=admin,pass=admin"
        },
        success: function (resp) {
            response = resp.data.filter((c) => {
                return c.id == cusID;
            });
        }
    });
    return response;
}

function searchItem(code) {
    let response = "";
    $.ajax({
        url: BASE_URL + "item",
        dataType: "json",
        async: false,
        headers:{
            Auth:"user=admin,pass=admin"
        },
        success: function (resp) {
            response = resp.data.filter((i) => {
                return i.code == code;
            });
        }
    });
    return response;
}


$("#selectCusID").change(function () {
    let cusID = $("#selectCusID").val();
    $("#orderCustomerID").val(cusID);
    let res = searchCustomer(cusID);
    if (res.length > 0) {
        $("#orderCustomerName").val(res[0].name);
        $("#orderCustomerSalary").val(res[0].salary);
        $("#orderCustomerAddress").val(res[0].address);
    }

});


$("#selectItemCode").change(function () {
    let code = $("#selectItemCode").val();
    $("#txtItemCode").val(code);
    let res = searchItem(code);
    if (res.length > 0) {
        $("#txtItemDescription").val(res[0].description);
        $("#txtItemPrice").val(res[0].unitPrice);
        $("#txtQTYOnHand").val(res[0].qty);
    }
});


$("#btnAddToTable").click(function () {
    let code = $("#selectItemCode").val();
    let description = $("#txtItemDescription").val();
    let itemPrice = $("#txtItemPrice").val();
    let buyQty = $("#txtQty").val();
    let avQty = $("#txtQTYOnHand").val();
    let total = parseFloat(itemPrice) * parseFloat(buyQty);
    $("#orderTable").append(`<tr><td>${code}</td><td>${description}</td><td>${itemPrice}</td><td>${avQty}</td><td>${buyQty}</td><td>${total}</td></tr>`);
});


$("#btnSubmitOrder").click(function () {
    let orderID = $("#txtOrderID").val();
    let customerID = $("#orderCustomerID").val();
    let orderDate = $("#txtDate").val();
    let orderD = getItemDetails();

    let ob = {
        oid: orderID,
        date: orderDate,
        cusID: customerID,
        orderDetails: orderD
    }

    //send request
    $.ajax({
        url: BASE_URL + "purchase_order",
        method: "post",
        dataType: "json",
        headers:{
            Auth:"user=admin,pass=admin"
        },
        data: JSON.stringify(ob),
        contentType: "application/json",
        success: function (resp) {
            alert(resp.message);
            clearAllPOTexts();
        },
        error: function (error) {
            alert(JSON.parse(error.responseText).message);
        }
    });


});

function getItemDetails() {
    let rows = $("#orderTable").children().length;
    var array = [];
    for (let i = 0; i < rows; i++) {
        let itCode = $("#orderTable").children().eq(i).children(":eq(0)").text();
        let avQty = $("#orderTable").children().eq(i).children(":eq(3)").text();
        let itQty = $("#orderTable").children().eq(i).children(":eq(4)").text();
        let itPrice = $("#orderTable").children().eq(i).children(":eq(2)").text();
        array.push({code: itCode,avQty:avQty, qty: itQty, price: itPrice});
    }
    return array;
}

function clearAllPOTexts(){
    $("#orderTable").empty();
    $("#txtOrderID").val("");
    $("#orderCustomerName").val("");
    $("#orderCustomerAddress").val("");
    $("#txtItemCode").val("");
    $("#txtItemDescription").val("");
    $("#txtItemPrice").val("");
    $("#txtQTYOnHand").val("");
    $("#txtQty").val("");


}
*/

    $(document).ready(function () {
    loadCustomerCode();
    loadItemCode();
    fillDate();
    $('#txtDiscount').on('keyup', function () {
    updateTotals();
});

    $('#txtCash').on('keyup', function () {
    updateTotals();
});
    $("#selectItemCode").change(function () {
    var code=$(this).val();
    if (code){
    searchItemDetail(code)
}
});
    $("#selectCusID").change(function () {
    var id=$(this).val();
    if (id){
    searchCustomerDetail(id);
}
});
});

    function fillDate() {
    let date=new Date().toISOString().split('T')[0];
    $("#txtDate").val(date);
}




    /*load Customer id*/
    function loadCustomerCode() {
    $("#selectCusID").empty();
    $.ajax({
    url: BASE_URL+'customer/one',
    success: function (res) {
        if(res.data && Array.isArray(res.data)){
            for (let cus of res.data) {
                let id = `<option>${cus}</option>`
                $("#selectCusID").append(id);
                console.log(cus)
            }
            alert(res.message)
        }else {
            alert("Invalid response data format.");
        }

},
    error: function (error) {
    alert(error.responseJson.message)
}
})
}


    /*load ItemCode*/
function loadItemCode() {
    $("#selectItemCode").empty();
    $.ajax({
        url: "http://localhost:8080/Back_End_war/item/one",
        success: function (res) {
            if (res.data && Array.isArray(res.data)) {
                for (let code of res.data) {
                    let option = `<option>${code}</option>`;
                    $("#selectItemCode").append(option);
                }
                alert(res.message);
            } else {
                alert("Invalid response data format.");
            }
        },
        error: function (error) {
            alert(JSON.parse(error.responseText).message);
        }
    });
}

    /*search item*/
    function searchItemDetail(itemcode) {
    $.ajax({
        url: BASE_URL+'item',
        data: {code: itemcode},
        success: function (res) {
            console.log(res)
            var item = res.data;
            $("#txtItemCode").val(item.code);
            console.log(item.code);
            $("#txtItemDescription").val(item.name);
            $("#txtQTYOnHand").val(item.qty);
            $("#txtItemPrice").val(item.price);

        },
        error: function (error) {
            console.log(error);
        }
    })

}


    /*Search customer*/
    function searchCustomerDetail(id) {
    $.ajax({
        url:BASE_URL+'customer',
        data: {cusId:id},
        success:function (res) {
            var cus=res.data;
            $("#orderCustomerID").val(cus.id);
            $("#orderCustomerName").val(cus.name);
            $("#orderCustomerAddress").val(cus.address);

        },
        error:function (error) {
            console.log(error)

        }

    });
}
    /*add to cart*/
    orderItem=[];
    $("#btnAddToTable").click(function () {
    let code = $("#txtItemCode").val();
    let name=$("#txtItemDescription").val();
    let price=$("#txtItemPrice").val();
    let qtyOnHand=$("#txtQTYOnHand").val();
    let byq=$("#txtQty").val();
    let total=parseInt(byq)*parseFloat(price);
    let row=`<tr><td>${code}</td><td>${name}</td><td>${price}</td><td>${qtyOnHand}</td><td>${byq}</td><td>${total}</td></tr>`;
    $("#orderTable").append(row);

    orderItem.push({
    code:code,
    name:name,
    price:price,
    qtyOnHand:qtyOnHand,
    byq:byq,
    total:total
});
    updateTotal();
});

    function updateTotal() {
    let allTotal=0;
    for (let i of orderItem){
    allTotal+=i.total;
}
    let subTotal=allTotal;
    let cshAmount=parseFloat($("#txtCash").val()) || 0;
    let discounAmount=parseFloat($("#txtDiscount").val()) ||0;

    let balance=cshAmount-discounAmount-subTotal;

    $("#total").text(allTotal.toFixed(2));
    $("#subtotal").text(subTotal.toFixed(2));
    $("#txtBalance").val(balance.toFixed(2));

}
    let disTOGave = 0;

    $('#txtDiscount').on('keyup', function() {
    let dis = parseFloat($('#txtDiscount').val());
    let tot = parseFloat($('#txtBalance').val());

    console.log(dis + "==" + tot);

    let totMin = tot * (dis / 100);
    console.log("Discount Amount: " + totMin);

    let subTot = tot - totMin;
    disTOGave = totMin;

    $('#subtotal').val(subTot);
    updateTotal();
});

    /*getOderDetail*/
    function getAllOrderDetl() {
    let rows=$("#orderTable").children().length;
    let array=[];
    for (let i = 0; i < rows; i++) {
    let  code=$("#orderTable tr:eq("+i+") td:eq(0)").text();
    let price=$("#orderTable tr:eq("+i+") td:eq(2)").text();
    let buyQty=$("#orderTable tr:eq("+i+") td:eq(3)").text();
    let qtyOnHnd=$("#orderTable tr:eq("+i+") td:eq(4)").text();
    array.push({
    code:code,
    price:price,
    buyQty:buyQty,
    qtyOnHand:qtyOnHnd
})

}
    return array;
}
    /*purchase Odr*/
    $("#btnSubmitOrder").click(function () {
    let oid = $("#txtOrderID").val();
    let date = $("#txtDate").val();
    let cusId=$("#orderCustomerID").val();
    let odDetail=getAllOrderDetl();

    let detail={
    oid:oid,
    date:date,
    cusId:cusId,
    odDetail:odDetail
}
    $.ajax({
    url:"purchase-order",
    method:"post",
    data: JSON.stringify(detail),
    dataType:"json",
    contentType: "application/json",
    success:function (res) {
    alert(res.message);
    console.log(res);
}       ,
    error:function (error) {
    alert(JSON.parse(error.responseText).message);
    console.log(error);

}
});

})

