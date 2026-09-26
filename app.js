/* =====================================================
   INVENTORY MANAGEMENT SYSTEM
===================================================== */


/* =====================================================
   DATA
===================================================== */

let products = JSON.parse(
    localStorage.getItem("ims_products")
) || [

    {
        id: 1,
        name: "Steel Rods",
        sku: "STL-001",
        category: "Raw Material",
        unit: "Kg",
        stock: 100,
        reorder: 20,
        warehouse: "Main Warehouse"
    },

    {
        id: 2,
        name: "Office Chairs",
        sku: "CHR-001",
        category: "Furniture",
        unit: "Units",
        stock: 8,
        reorder: 10,
        warehouse: "Main Warehouse"
    },

    {
        id: 3,
        name: "Wooden Tables",
        sku: "TBL-001",
        category: "Furniture",
        unit: "Units",
        stock: 0,
        reorder: 5,
        warehouse: "Production Floor"
    },

    {
        id: 4,
        name: "Paint",
        sku: "PNT-001",
        category: "Raw Material",
        unit: "Litres",
        stock: 35,
        reorder: 10,
        warehouse: "Main Warehouse"
    }

];


let receipts = JSON.parse(
    localStorage.getItem("ims_receipts")
) || [];


let deliveries = JSON.parse(
    localStorage.getItem("ims_deliveries")
) || [];


let transfers = JSON.parse(
    localStorage.getItem("ims_transfers")
) || [];


let adjustments = JSON.parse(
    localStorage.getItem("ims_adjustments")
) || [];


let ledger = JSON.parse(
    localStorage.getItem("ims_ledger")
) || [];


let warehouses = JSON.parse(
    localStorage.getItem("ims_warehouses")
) || [

    {
        name: "Main Warehouse",
        location: "Primary Storage",
        capacity: "10,000 units"
    },

    {
        name: "Production Floor",
        location: "Manufacturing Area",
        capacity: "5,000 units"
    },

    {
        name: "Finished Goods",
        location: "Dispatch Area",
        capacity: "7,500 units"
    }

];


let currentPhone = "";


/* =====================================================
   STORAGE
===================================================== */

function saveData() {

    localStorage.setItem(
        "ims_products",
        JSON.stringify(products)
    );

    localStorage.setItem(
        "ims_receipts",
        JSON.stringify(receipts)
    );

    localStorage.setItem(
        "ims_deliveries",
        JSON.stringify(deliveries)
    );

    localStorage.setItem(
        "ims_transfers",
        JSON.stringify(transfers)
    );

    localStorage.setItem(
        "ims_adjustments",
        JSON.stringify(adjustments)
    );

    localStorage.setItem(
        "ims_ledger",
        JSON.stringify(ledger)
    );

    localStorage.setItem(
        "ims_warehouses",
        JSON.stringify(warehouses)
    );

}


/* =====================================================
   AUTHENTICATION
===================================================== */

function sendOTP() {

    const phone =
        document.getElementById("phoneInput")
            .value.trim();

    const message =
        document.getElementById("authMessage");


    if (!/^[0-9]{10}$/.test(phone)) {

        message.textContent =
            "Enter a valid 10 digit mobile number.";

        return;
    }


    currentPhone = phone;


    document.getElementById("displayPhone")
        .textContent = "+91 " + phone;


    document.getElementById("phoneStep")
        .classList.add("hidden");


    document.getElementById("otpStep")
        .classList.remove("hidden");


    document.getElementById("otpInput")
        .value = "";

}


function verifyOTP() {

    const otp =
        document.getElementById("otpInput")
            .value.trim();

    const message =
        document.getElementById("otpMessage");


    if (otp !== "123456") {

        message.textContent =
            "Incorrect OTP.";

        return;
    }


    localStorage.setItem(
        "ims_logged_in",
        "true"
    );

    localStorage.setItem(
        "ims_phone",
        currentPhone
    );


    openApplication();

}


function changePhone() {

    document.getElementById("otpStep")
        .classList.add("hidden");

    document.getElementById("phoneStep")
        .classList.remove("hidden");

}


function openApplication() {

    document.getElementById("authScreen")
        .classList.add("hidden");

    document.getElementById("app")
        .classList.remove("hidden");


    currentPhone =
        localStorage.getItem("ims_phone")
        || currentPhone;


    document.getElementById("userPhone")
        .textContent =
        "+91 " + currentPhone;


    document.getElementById("profilePhone")
        .textContent =
        "+91 " + currentPhone;


    document.getElementById("profileNumber")
        .textContent =
        "+91 " + currentPhone;


    document.getElementById("userAvatar")
        .textContent =
        currentPhone.charAt(0);


    refreshAll();

}


function logout() {

    localStorage.removeItem(
        "ims_logged_in"
    );

    localStorage.removeItem(
        "ims_phone"
    );


    location.reload();

}


/* =====================================================
   NAVIGATION
===================================================== */

function showPage(pageId, button) {

    document.querySelectorAll(".page-section")
        .forEach(section => {

            section.classList.add("hidden");

        });


    document.getElementById(pageId)
        .classList.remove("hidden");


    document.querySelectorAll(".nav-item")
        .forEach(item => {

            item.classList.remove("active");

        });


    if (button) {

        button.classList.add("active");

    }


    const titles = {

        dashboard: "Dashboard",

        products: "Products",

        receipts: "Receipts",

        deliveries: "Delivery Orders",

        transfers: "Internal Transfers",

        adjustments: "Inventory Adjustments",

        ledger: "Stock Ledger",

        warehouses: "Warehouses",

        profile: "My Profile"

    };


    document.getElementById("pageTitle")
        .textContent =
        titles[pageId] || "Inventory";


    if (window.innerWidth <= 900) {

        document.querySelector(".sidebar")
            .classList.remove("open");

    }

}


function showPageByName(pageId) {

    const button =
        [...document.querySelectorAll(".nav-item")]
        .find(item =>
            item.getAttribute("onclick")
                ?.includes(`'${pageId}'`)
        );


    showPage(pageId, button);

}


function toggleSidebar() {

    document.querySelector(".sidebar")
        .classList.toggle("open");

}


/* =====================================================
   MODALS
===================================================== */

function openModal(id) {

    populateProductSelects();

    populateWarehouseSelects();

    document.getElementById(id)
        .classList.remove("hidden");

}


function closeModal(id) {

    document.getElementById(id)
        .classList.add("hidden");

}


/* =====================================================
   PRODUCT MANAGEMENT
===================================================== */

function createProduct() {

    const name =
        document.getElementById("newProductName")
            .value.trim();

    const sku =
        document.getElementById("newProductSKU")
            .value.trim();

    const category =
        document.getElementById("newProductCategory")
            .value.trim();

    const unit =
        document.getElementById("newProductUnit")
            .value;

    const stock =
        Number(
            document.getElementById("newProductStock")
                .value
        );

    const reorder =
        Number(
            document.getElementById("newProductReorder")
                .value
        );

    const warehouse =
        document.getElementById("newProductWarehouse")
            .value;


    if (!name || !sku || !category) {

        alert(
            "Please fill in product name, SKU and category."
        );

        return;
    }


    if (
        products.some(
            product => product.sku === sku
        )
    ) {

        alert("SKU already exists.");

        return;
    }


    const product = {

        id: Date.now(),

        name,

        sku,

        category,

        unit,

        stock,

        reorder,

        warehouse

    };


    products.push(product);


    if (stock > 0) {

        addLedger(
            "INITIAL",
            product,
            "Adjustment",
            warehouse,
            stock,
            stock
        );

    }


    saveData();

    closeModal("productModal");

    clearProductForm();

    refreshAll();

}


function clearProductForm() {

    document.getElementById("newProductName")
        .value = "";

    document.getElementById("newProductSKU")
        .value = "";

    document.getElementById("newProductCategory")
        .value = "";

    document.getElementById("newProductStock")
        .value = 0;

    document.getElementById("newProductReorder")
        .value = 10;

}


/* =====================================================
   PRODUCT TABLE
===================================================== */

function renderProducts() {

    const table =
        document.getElementById("productsTable");


    const search =
        document.getElementById("productSearch")
            ?.value
            .toLowerCase()
            || "";


    const category =
        document.getElementById("categoryFilter")
            ?.value
            || "";


    const warehouse =
        document.getElementById("warehouseFilter")
            ?.value
            || "";


    const filtered =
        products.filter(product => {

            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(search)
                ||
                product.sku
                    .toLowerCase()
                    .includes(search);

            const matchesCategory =
                !category ||
                product.category === category;

            const matchesWarehouse =
                !warehouse ||
                product.warehouse === warehouse;


            return (
                matchesSearch &&
                matchesCategory &&
                matchesWarehouse
            );

        });


    table.innerHTML = "";


    filtered.forEach(product => {

        let status = "";

        if (product.stock === 0) {

            status =
                `<span class="badge badge-out">
                    Out of Stock
                 </span>`;

        }
        else if (
            product.stock <= product.reorder
        ) {

            status =
                `<span class="badge badge-low">
                    Low Stock
                 </span>`;

        }
        else {

            status =
                `<span class="badge badge-good">
                    Available
                 </span>`;

        }


        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                <div class="product-name">
                    ${escapeHTML(product.name)}
                </div>
            </td>

            <td>
                <span class="product-sku">
                    ${escapeHTML(product.sku)}
                </span>
            </td>

            <td>
                ${escapeHTML(product.category)}
            </td>

            <td>
                ${escapeHTML(product.warehouse)}
            </td>

            <td>
                <strong>
                    ${product.stock}
                </strong>
                ${product.unit}
            </td>

            <td>
                ${product.reorder}
            </td>

            <td>
                ${status}
            </td>

        `;


        table.appendChild(row);

    });

}


/* =====================================================
   RECEIPTS
===================================================== */

function createReceipt() {

    const supplier =
        document.getElementById("receiptSupplier")
            .value.trim();

    const productId =
        Number(
            document.getElementById("receiptProduct")
                .value
        );

    const quantity =
        Number(
            document.getElementById("receiptQuantity")
                .value
        );

    const warehouse =
        document.getElementById("receiptWarehouse")
            .value;


    const product =
        products.find(
            p => p.id === productId
        );


    if (!supplier || !product || quantity <= 0) {

        alert(
            "Please enter valid receipt details."
        );

        return;
    }


    const receipt = {

        id: "REC-" + Date.now(),

        supplier,

        product: product.name,

        productId,

        quantity,

        warehouse,

        status: "Done",

        date: new Date().toLocaleString()

    };


    receipts.unshift(receipt);


    // STOCK INCREASE

    product.stock += quantity;

    product.warehouse = warehouse;


    addLedger(
        receipt.id,
        product,
        "Receipt",
        warehouse,
        quantity,
        product.stock
    );


    saveData();

    closeModal("receiptModal");

    refreshAll();

}


/* =====================================================
   DELIVERIES
===================================================== */

function createDelivery() {

    const customer =
        document.getElementById("deliveryCustomer")
            .value.trim();

    const productId =
        Number(
            document.getElementById("deliveryProduct")
                .value
        );

    const quantity =
        Number(
            document.getElementById("deliveryQuantity")
                .value
        );

    const warehouse =
        document.getElementById("deliveryWarehouse")
            .value;


    const product =
        products.find(
            p => p.id === productId
        );


    if (!customer || !product || quantity <= 0) {

        alert(
            "Please enter valid delivery details."
        );

        return;
    }


    if (product.stock < quantity) {

        alert(
            `Not enough stock. Available: ${product.stock}`
        );

        return;
    }


    product.stock -= quantity;


    const delivery = {

        id: "DEL-" + Date.now(),

        customer,

        product: product.name,

        productId,

        quantity,

        warehouse,

        status: "Done",

        date: new Date().toLocaleString()

    };


    deliveries.unshift(delivery);


    addLedger(
        delivery.id,
        product,
        "Delivery",
        warehouse,
        -quantity,
        product.stock
    );


    saveData();

    closeModal("deliveryModal");

    refreshAll();

}


/* =====================================================
   INTERNAL TRANSFERS
===================================================== */

function createTransfer() {

    const productId =
        Number(
            document.getElementById("transferProduct")
                .value
        );

    const quantity =
        Number(
            document.getElementById("transferQuantity")
                .value
        );

    const from =
        document.getElementById("transferFrom")
            .value;

    const to =
        document.getElementById("transferTo")
            .value;


    const product =
        products.find(
            p => p.id === productId
        );


    if (!product || quantity <= 0) {

        alert("Enter valid transfer details.");

        return;
    }


    if (from === to) {

        alert(
            "Source and destination cannot be the same."
        );

        return;
    }


    if (product.stock < quantity) {

        alert(
            "Not enough stock for this transfer."
        );

        return;
    }


    product.stock -= quantity;


    const transfer = {

        id: "TRF-" + Date.now(),

        product: product.name,

        productId,

        quantity,

        from,

        to,

        status: "Done",

        date: new Date().toLocaleString()

    };


    transfers.unshift(transfer);


    addLedger(
        transfer.id,
        product,
        "Transfer Out",
        from,
        -quantity,
        product.stock
    );


    addLedger(
        transfer.id,
        product,
        "Transfer In",
        to,
        quantity,
        product.stock
    );


    saveData();

    closeModal("transferModal");

    refreshAll();

}


/* =====================================================
   ADJUSTMENTS
===================================================== */

function createAdjustment() {

    const productId =
        Number(
            document.getElementById("adjustmentProduct")
                .value
        );

    const counted =
        Number(
            document.getElementById("adjustmentQuantity")
                .value
        );

    const reason =
        document.getElementById("adjustmentReason")
            .value.trim();


    const product =
        products.find(
            p => p.id === productId
        );


    if (!product || counted < 0 || !reason) {

        alert(
            "Enter product, counted quantity and reason."
        );

        return;
    }


    const oldStock =
        product.stock;


    const difference =
        counted - oldStock;


    product.stock =
        counted;


    const adjustment = {

        id: "ADJ-" + Date.now(),

        product: product.name,

        productId,

        systemQty: oldStock,

        countedQty: counted,

        difference,

        reason,

        date: new Date().toLocaleString()

    };


    adjustments.unshift(adjustment);


    addLedger(
        adjustment.id,
        product,
        "Adjustment",
        product.warehouse,
        difference,
        counted
    );


    saveData();

    closeModal("adjustmentModal");

    refreshAll();

}


/* =====================================================
   LEDGER
===================================================== */

function addLedger(
    reference,
    product,
    type,
    location,
    quantity,
    balance
) {

    ledger.unshift({

        date:
            new Date().toLocaleString(),

        reference,

        product:
            product.name,

        type,

        location,

        quantity,

        balance

    });

}


function renderLedger() {

    const table =
        document.getElementById("ledgerTable");


    const search =
        document.getElementById("ledgerSearch")
            ?.value
            .toLowerCase()
            || "";


    const filtered =
        ledger.filter(item => {

            return (

                item.product
                    .toLowerCase()
                    .includes(search)

                ||

                item.reference
                    .toLowerCase()
                    .includes(search)

                ||

                item.type
                    .toLowerCase()
                    .includes(search)

            );

        });


    table.innerHTML = "";


    filtered.forEach(item => {

        const row =
            document.createElement("tr");


        const qty =
            item.quantity > 0
            ? `<span style="color:#16a34a">
                    +${item.quantity}
               </span>`
            : `<span style="color:#dc2626">
                    ${item.quantity}
               </span>`;


        row.innerHTML = `

            <td>
                ${item.date}
            </td>

            <td>
                <strong>
                    ${item.reference}
                </strong>
            </td>

            <td>
                ${escapeHTML(item.product)}
            </td>

            <td>
                ${item.type}
            </td>

            <td>
                ${escapeHTML(item.location)}
            </td>

            <td>
                ${qty}
            </td>

            <td>
                ${item.balance}
            </td>

        `;


        table.appendChild(row);

    });

}


/* =====================================================
   RENDER RECEIPTS
===================================================== */

function renderReceipts() {

    const table =
        document.getElementById("receiptsTable");


    table.innerHTML = "";


    receipts.forEach(item => {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                <strong>
                    ${item.id}
                </strong>
            </td>

            <td>
                ${escapeHTML(item.supplier)}
            </td>

            <td>
                ${escapeHTML(item.product)}
            </td>

            <td>
                ${item.quantity}
            </td>

            <td>
                ${escapeHTML(item.warehouse)}
            </td>

            <td>
                <span class="badge badge-done">
                    ${item.status}
                </span>
            </td>

            <td>
                <button
                    class="action-btn"
                >
                    View
                </button>
            </td>

        `;


        table.appendChild(row);

    });

}


/* =====================================================
   RENDER DELIVERIES
===================================================== */

function renderDeliveries() {

    const table =
        document.getElementById("deliveriesTable");


    table.innerHTML = "";


    deliveries.forEach(item => {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                <strong>
                    ${item.id}
                </strong>
            </td>

            <td>
                ${escapeHTML(item.customer)}
            </td>

            <td>
                ${escapeHTML(item.product)}
            </td>

            <td>
                ${item.quantity}
            </td>

            <td>
                ${escapeHTML(item.warehouse)}
            </td>

            <td>
                <span class="badge badge-done">
                    ${item.status}
                </span>
            </td>

            <td>
                <button class="action-btn">
                    View
                </button>
            </td>

        `;


        table.appendChild(row);

    });

}


/* =====================================================
   RENDER TRANSFERS
===================================================== */

function renderTransfers() {

    const table =
        document.getElementById("transfersTable");


    table.innerHTML = "";


    transfers.forEach(item => {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                <strong>
                    ${item.id}
                </strong>
            </td>

            <td>
                ${escapeHTML(item.product)}
            </td>

            <td>
                ${item.quantity}
            </td>

            <td>
                ${escapeHTML(item.from)}
            </td>

            <td>
                ${escapeHTML(item.to)}
            </td>

            <td>
                <span class="badge badge-done">
                    ${item.status}
                </span>
            </td>

            <td>
                <button class="action-btn">
                    View
                </button>
            </td>

        `;


        table.appendChild(row);

    });

}


/* =====================================================
   RENDER ADJUSTMENTS
===================================================== */

function renderAdjustments() {

    const table =
        document.getElementById("adjustmentsTable");


    table.innerHTML = "";


    adjustments.forEach(item => {

        const difference =
            item.difference > 0
            ? `+${item.difference}`
            : item.difference;


        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                <strong>
                    ${item.id}
                </strong>
            </td>

            <td>
                ${escapeHTML(item.product)}
            </td>

            <td>
                ${item.systemQty}
            </td>

            <td>
                ${item.countedQty}
            </td>

            <td>
                ${difference}
            </td>

            <td>
                ${escapeHTML(item.reason)}
            </td>

            <td>
                ${item.date}
            </td>

        `;


        table.appendChild(row);

    });

}


/* =====================================================
   DASHBOARD
===================================================== */

function updateDashboard() {

    const lowStock =
        products.filter(
            p =>
                p.stock > 0 &&
                p.stock <= p.reorder
        );


    const outOfStock =
        products.filter(
            p => p.stock === 0
        );


    document.getElementById("kpiProducts")
        .textContent =
        products.length;


    document.getElementById("kpiLowStock")
        .textContent =
        lowStock.length;


    document.getElementById("kpiOutStock")
        .textContent =
        outOfStock.length;


    document.getElementById("kpiReceipts")
        .textContent =
        receipts.filter(
            r => r.status !== "Done"
        ).length;


    document.getElementById("kpiDeliveries")
        .textContent =
        deliveries.filter(
            d => d.status !== "Done"
        ).length;


    document.getElementById("kpiTransfers")
        .textContent =
        transfers.filter(
            t => t.status !== "Done"
        ).length;


    document.getElementById("alertCount")
        .textContent =
        lowStock.length +
        outOfStock.length;


    renderLowStock();

    renderActivity();

}


function renderLowStock() {

    const container =
        document.getElementById("lowStockList");


    const items =
        products.filter(
            p =>
                p.stock <= p.reorder
        );


    if (items.length === 0) {

        container.innerHTML = `
            <div class="activity-item">
                <div class="activity-main">
                    <strong>
                        All stock levels are healthy
                    </strong>
                    <small>
                        No products require attention.
                    </small>
                </div>
            </div>
        `;

        return;
    }


    container.innerHTML = "";


    items.slice(0, 6)
        .forEach(product => {

            const div =
                document.createElement("div");


            div.className =
                "low-stock-item";


            div.innerHTML = `

                <div>
                    <strong>
                        ${escapeHTML(product.name)}
                    </strong>

                    <small>
                        ${escapeHTML(product.sku)}
                        • ${escapeHTML(product.warehouse)}
                    </small>
                </div>

                <span class="low-stock-value">
                    ${product.stock}
                    ${product.unit}
                </span>

            `;


            container.appendChild(div);

        });

}


function renderActivity() {

    const container =
        document.getElementById("activityList");


    if (ledger.length === 0) {

        container.innerHTML = `
            <div class="activity-item">
                <div class="activity-main">
                    <strong>
                        No activity yet
                    </strong>
                    <small>
                        Inventory movements will appear here.
                    </small>
                </div>
            </div>
        `;

        return;
    }


    container.innerHTML = "";


    ledger.slice(0, 6)
        .forEach(item => {

            const div =
                document.createElement("div");


            div.className =
                "activity-item";


            const quantity =
                item.quantity > 0
                ? `+${item.quantity}`
                : item.quantity;


            div.innerHTML = `

                <div class="activity-main">

                    <strong>
                        ${escapeHTML(item.product)}
                    </strong>

                    <small>
                        ${item.type}
                        •
                        ${item.reference}
                    </small>

                </div>

                <span class="activity-qty">
                    ${quantity}
                </span>

            `;


            container.appendChild(div);

        });

}


/* =====================================================
   SELECTS
===================================================== */

function populateProductSelects() {

    const ids = [

        "receiptProduct",

        "deliveryProduct",

        "transferProduct",

        "adjustmentProduct"

    ];


    ids.forEach(id => {

        const select =
            document.getElementById(id);


        if (!select) return;


        const current =
            select.value;


        select.innerHTML = "";


        products.forEach(product => {

            const option =
                document.createElement("option");


            option.value =
                product.id;


            option.textContent =
                `${product.name} (${product.stock} ${product.unit})`;


            select.appendChild(option);

        });


        if (current) {

            select.value = current;

        }

    });

}


function populateWarehouseSelects() {

    const ids = [

        "newProductWarehouse",

        "receiptWarehouse",

        "deliveryWarehouse",

        "transferFrom",

        "transferTo"

    ];


    ids.forEach(id => {

        const select =
            document.getElementById(id);


        if (!select) return;


        const current =
            select.value;


        select.innerHTML = "";


        warehouses.forEach(warehouse => {

            const option =
                document.createElement("option");


            option.value =
                warehouse.name;


            option.textContent =
                warehouse.name;


            select.appendChild(option);

        });


        if (current) {

            select.value = current;

        }

    });

}


function populateFilters() {

    const categorySelect =
        document.getElementById("categoryFilter");


    const warehouseSelect =
        document.getElementById("warehouseFilter");


    if (!categorySelect ||
        !warehouseSelect) return;


    const categories =
        [
            ...new Set(
                products.map(
                    p => p.category
                )
            )
        ];


    categorySelect.innerHTML =
        `<option value="">
            All Categories
         </option>`;


    categories.forEach(category => {

        categorySelect.innerHTML += `
            <option value="${escapeHTML(category)}">
                ${escapeHTML(category)}
            </option>
        `;

    });


    warehouseSelect.innerHTML =
        `<option value="">
            All Locations
         </option>`;


    warehouses.forEach(warehouse => {

        warehouseSelect.innerHTML += `
            <option value="${escapeHTML(warehouse.name)}">
                ${escapeHTML(warehouse.name)}
            </option>
        `;

    });

}


/* =====================================================
   CURRENT STOCK
===================================================== */

function showCurrentStock() {

    const id =
        Number(
            document.getElementById(
                "adjustmentProduct"
            ).value
        );


    const product =
        products.find(
            p => p.id === id
        );


    if (!product) return;


    document.getElementById(
        "currentStockDisplay"
    ).textContent =
        `Current stock: ${product.stock} ${product.unit}`;

}


/* =====================================================
   WAREHOUSES
===================================================== */

function renderWarehouses() {

    const container =
        document.getElementById("warehouseGrid");


    container.innerHTML = "";


    warehouses.forEach(warehouse => {

        const div =
            document.createElement("div");


        div.className =
            "warehouse-card";


        const stock =
            products
                .filter(
                    p =>
                        p.warehouse ===
                        warehouse.name
                )
                .reduce(
                    (sum, p) =>
                        sum + p.stock,
                    0
                );


        div.innerHTML = `

            <div class="warehouse-icon">
                ⌂
            </div>

            <h3>
                ${escapeHTML(warehouse.name)}
            </h3>

            <p>
                ${escapeHTML(warehouse.location)}
            </p>

            <p>
                Capacity:
                ${escapeHTML(warehouse.capacity)}
            </p>

            <p style="margin-top:10px">
                Current stock:
                <strong>${stock}</strong>
            </p>

        `;


        container.appendChild(div);

    });

}


function addWarehouse() {

    const name =
        prompt("Warehouse name:");


    if (!name) return;


    if (
        warehouses.some(
            w => w.name.toLowerCase() ===
                name.toLowerCase()
        )
    ) {

        alert("Warehouse already exists.");

        return;
    }


    warehouses.push({

        name,

        location: "New Location",

        capacity: "Not specified"

    });


    saveData();

    refreshAll();

}


/* =====================================================
   FILTER
===================================================== */

function filterTable(tableId, value) {

    const table =
        document.getElementById(tableId);


    if (!table) return;


    const rows =
        table.querySelectorAll("tr");


    rows.forEach(row => {

        const text =
            row.textContent;


        row.style.display =
            !value ||
            text.includes(value)
            ? ""
            : "none";

    });

}


/* =====================================================
   SECURITY HELPER
===================================================== */

function escapeHTML(value) {

    const div =
        document.createElement("div");


    div.textContent =
        String(value);


    return div.innerHTML;

}


/* =====================================================
   REFRESH EVERYTHING
===================================================== */

function refreshAll() {

    updateDashboard();

    renderProducts();

    renderReceipts();

    renderDeliveries();

    renderTransfers();

    renderAdjustments();

    renderLedger();

    renderWarehouses();

    populateProductSelects();

    populateWarehouseSelects();

    populateFilters();

}


/* =====================================================
   START APPLICATION
===================================================== */

window.onload = function () {

    const loggedIn =
        localStorage.getItem(
            "ims_logged_in"
        );


    if (loggedIn === "true") {

        currentPhone =
            localStorage.getItem(
                "ims_phone"
            );


        openApplication();

    }

};
