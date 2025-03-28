function generateLoanRecords(count = 50) {
    const loanTypes = ["Dairy Loan", "Personal Loan", "Home Loan", "Auto Loan"];
    const loanstatus = [
        { status: "Approved", class: "approved" },
        { status: "Rejected", class: "rejected" },
        { status: "In Progress", class: "pending" },
        { status: "Kyc Completed", class: "bg-primary" },
        { status: "Document Request", class: "bg-secondary" }
    ];
    
    const records = [];
    
    for (let i = 1; i <= count; i++) {
        const loanRefId = (i % 2 === 0 ? "DFL" : "PFL") + String(i).padStart(4, '0');
        const customerName = `Customer ${i}`;
        const loanType = loanTypes[Math.floor(Math.random() * loanTypes.length)];
        const mobileNumber = `+91 8096****${String(i % 10).padStart(2, '0')}`;
        const status = status[Math.floor(Math.random() * status.length)];
        
        records.push({
            loanRefId,
            customerName,
            loanType,
            mobileNumber,
            status: { text: loanstatus.status, class: loanstatus.class },
            viewIcon: `<i class='bi bi-eye-fill cursor-pointer' onClick="openProfile('${loanRefId}')"></i>`
        });
    }

    localStorage.setItem("loanRecords", JSON.stringify(records));
    return records;
}

const statuses = [
    { status: "Approved", id: "approved" },
    { status: "Rejected", id: "rejected" },
    { status: "In Progress", id: "inprogress" },
    { status: "Kyc Completed", id: "kyc" },
    { status: "Document Request", id: "documentrequest" }
];




function getLoanRecords() {
    var records = localStorage.getItem("loanRecords");
    records = records ? JSON.parse(records) : [];
    if(records?.length!=0){
        return records;
    }
    else{
        return generateLoanRecords();
    }
}


function generateTable(records) {
    const container = document.getElementById("loanrecords");
    if (!container) return;

    let tableHtml = `
        <table class="table text-right">
            <thead class="position-sticky top-0 box-shadow bg-theme text-white">
                <tr>
                    <th scope="col">S.no</th>
                    <th scope="col">Loan Ref Id</th>
                    <th scope="col">Customer Name</th>
                    <th scope="col">Loan Type</th>
                    <th scope="col">Mobile Number</th>
                    <th  class = "text-center" scope="col">Loan Status</th>
                    <th class="text-center" scope="col">View</th>
                </tr>
            </thead>
            <tbody>
    `;
    var count = 1;
    records.forEach(record => {
        tableHtml += `
            <tr>
                <th scrope="row">${count}</th>
                <th scope="row">${record.loanRefId}</th>
                <td>${record.customerName}</td>
                <td>${record.loanType}</td>
                <td>${record.mobileNumber}</td>
                <td class="text-center d-flex justify-content-center"><div class="loan-status ${record.status?.class}">${record.status.text}</div></td>
                <td class="text-center">${record.viewIcon}</td>
            </tr>
        `;
        count++;
    });

    tableHtml += `</tbody></table>`;
    container.innerHTML = tableHtml;
}

document.addEventListener("DOMContentLoaded", () => filterLoanRecords(''));

var prevSelectedCard= '';
var currentSelectedCard = 'all';

function getLoanTypeOptions(records){
    const container = document.getElementById("loantypes");
    if (!container) return;
    let select = `
    <select class="form-select" aria-label="Default select example" onChange="filterLoantypes()" id = "selectedloantype">`;
    let options =  [...new Set(records.map(item => item.loanType))];
    options.unshift('All');
    options?.map((option)=>{
        select +=`<option value="${option}">${option}</option>`
    })
    select+='</select>'

    container.innerHTML = select;
}



function filterLoanRecords(id){
    if(id!='')
        handleSelectedCard(id);
    var records = getLoanRecords();
    id = prevSelectedCard === '' ? 'all' :id;
    if(id=='all' || id=='entry'){
        generateTable(records);
    }
    else{
        var status = statuses?.filter(s=>s.id === id)[0].status;
        records = records?.filter(r=>r.status?.text === status);
        generateTable(records);
    }
    getLoanTypeOptions(records);
}


function handleSelectedCard(id){
    if(prevSelectedCard==''){
        document.getElementById(id).classList.add('active');
        prevSelectedCard = id;
        currentSelectedCard = id;

    }
    else if(prevSelectedCard === id){
        document.getElementById(prevSelectedCard).classList?.remove('active');
        prevSelectedCard = '';
        currentSelectedCard = 'All';
    }
    else{
        document.getElementById(prevSelectedCard).classList?.remove('active');
        document.getElementById(id).classList.add('active');
        prevSelectedCard = id;
        currentSelectedCard = id;
    }
}

function openProfile(id){
    // console.log(id);
}

function logOut(){
    window.location.href = 'index.html';
}  

function filterLoantypes(){
    var loanType = document.getElementById('selectedloantype').value;
    var records = getLoanRecords();
    if(currentSelectedCard=='all'){
        if(loanType!='All'){
            records = records?.filter(fr=>fr.loanType === loanType);
        } 
    }
    else{
        var status = statuses?.filter(s=>s.id === currentSelectedCard)[0].status;
        records = records?.filter(r=>r.status?.text === status);
        if(loanType!='All'){
            records = records?.filter(fr=>fr.loanType === loanType);
        }
    }
    generateTable(records);
}

