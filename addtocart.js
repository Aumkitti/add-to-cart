const product = [
  {
    id: 0,
    image: "image/dl-4.png",
    title: "Nike Dunk Low (Team Green)",
    price: 100,
  },
  {
    id: 1,
    image: "image/p-2.png",
    title: "Poosee",
    price: 54.94,
  },
  {
    id: 2,
    image: "image/NN-3.png",
    title: "Air Force 1 Mid '07",
    price: 118.12,
  },
  {
    id: 3,
    image: "image/aa-1.png",
    title: "Nike Revolution 6",
    price: 57.69,
  },
  {
    id: 4,
    image: "image/T-1.jpg",
    title: "black T-Shirt",
    price: 8.24,
  },
  {
    id: 5,
    image: "image/S-1.jpg",
    title: "Slacks",
    price: 13.74,
  },
  {
    id: 6,
    image: "image/C-1.jpg",
    title: "CASIO รุ่น MTP-VT01L-1BUDF",
    price: 38.46,
  },
  {
    id: 7,
    image: "image/G-1.png",
    title: "Bkack Cap",
    price: 5.49,
  },
];
const categories = [
  ...new Set(
    product.map((item) => {
      return item;
    })
  ),
];
let i = 0;
document.getElementById("root").innerHTML = categories
  .map((item) => {
    var { image, title, price } = item;
    return (
      `<div class='box'>
            <div class='img-box'>
                <img class='images' src=${image}></img>
            </div>
        <div class='bottom'>
        <p>${title}</p>
        <h2>$ ${price}</h2>` +
      "<button onclick='addtocart(" +
      i++ +
      ")'>หยิบใส่ตะกร้า</button>" +
      `</div>
        </div>`
    );
  })
  .join("");

var cart = [];

function addtocart(a) {
  cart.push({ ...categories[a] });
  displaycart();
}
function delElement(a) {
  cart.splice(a, 1);
  displaycart();
}

function displaycart() {
  let j = 0,
    total = 0;
  document.getElementById("count").innerHTML = cart.length;
  if (cart.length == 0) {
    document.getElementById("cartItem").innerHTML = "สินค้าในตะกร้า";
    document.getElementById("total").innerHTML = "$ " + 0 + ".00";
  } else {
    document.getElementById("cartItem").innerHTML = cart
      .map((items) => {
        var { image, title, price } = items;
        total = total + price;
        document.getElementById("total").innerHTML = "$ " + total;
        return (
          `<div class='cart-item'>
                <div class='row-img'>
                    <img class='rowimg' src=${image}>
                </div>
                <p style='font-size:12px;'>${title}</p>
                <h2 style='font-size: 15px;'>$ ${price}</h2>` +
          "<i class='fa-solid fa-trash' onclick='delElement(" +
          j++ +
          ")'></i></div>"
        );
      })
      .join("");
  }
}
function checkoutQrcode() {
  // สร้างข้อมูลรหัส QR จากตะกร้าสินค้า
  const qrData = JSON.stringify(cart);

  // แสดง QR code บนหน้าเว็บ
  document.getElementById("root").innerHTML = `
    <div><img src="image/payment.png" class="payment"></div>
  `;
}

function printReceipt() {
  // สร้างใบเสร็จ
  let receiptContent = "<h1>ใบเสร็จรับเงิน</h1>";
  receiptContent += "<ul>";

  // วนลูปเพื่อเพิ่มข้อมูลสินค้าในใบเสร็จ
  cart.forEach((item) => {
    receiptContent += `<li>${item.title}: $${item.price}</li>`;
  });

  receiptContent += "</ul>";

  // เพิ่มราคารวม
  let total = cart.reduce((acc, item) => acc + item.price, 0);
  receiptContent += `<p>รวมทั้งสิ้น: $${total}</p>`;

  // แสดงใบเสร็จ
  document.getElementById("root").innerHTML = receiptContent;
}

function printPDF() {
  // สร้างเนื้อหาของ PDF
  let content = [];

  cart.forEach((item) => {
    content.push([
      { text: item.title, style: "items" },
      { text: `$${item.price}`, style: "items" },
    ]);
  });

  // เพิ่มราคารวม
  let total = cart.reduce((acc, item) => acc + item.price, 0);
  content.push([
    { text: "Total:", style: "total" },
    { text: `$${total}`, style: "total" },
  ]);

  // กำหนดรูปแบบของ PDF
  const docDefinition = {
    content: [
      { text: "Receipt", style: "header" },
      {
        style: "table",
        table: {
          widths: ["*", "auto"],
          body: content,
        },
      },
    ],
    styles: {
      header: { fontSize: 18, bold: true, margin: [0, 0, 0, 10] },
      items: { margin: [0, 5, 0, 5] },
      total: { margin: [0, 5, 0, 5], bold: true },
    },
  };

  // สร้าง PDF
  const pdfDoc = pdfMake.createPdf(docDefinition);

  // ดาวน์โหลดไฟล์ PDF
  pdfDoc.download("receipt.pdf");
}
