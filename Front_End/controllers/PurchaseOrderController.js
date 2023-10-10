
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
            $("#txtItemDescription").val(item.description);
            $("#txtQTYOnHand").val(item.qtyOnHand);
            $("#txtItemPrice").val(item.unitPrice);

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
        data: {id:id},
        success:function (res) {
            var cus=res.data;
            $("#orderCustomerID").val(cus.id);
            $("#orderCustomerName").val(cus.name);
            $("#orderCustomerAddress").val(cus.address);
            $("#orderCustomerSalary").val(cus.salary);


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
        let oid = $("#txtOrderID").val();

        array.push({
            oid:oid,
        itemCode:code,
        Qty:buyQty,
        unitPrice:price,
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
        cusID:cusId,
        date:date,
        orderDetails:odDetail

}
    $.ajax({
    url:BASE_URL+"purchase",
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

