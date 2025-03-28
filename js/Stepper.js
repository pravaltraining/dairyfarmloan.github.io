
let currentStep = 1;

function showStep(step) {
    document.querySelectorAll('.step')?.forEach((el, index) => {
        if (index < step - 1) {
            el.classList.add('completed');
            el.classList.remove('active');
        } else if (index === step - 1) {
            el.classList.add('active');
            el.classList.remove('completed');
        } else {
            el.classList.remove('completed', 'active');
        }
    });

    document.querySelectorAll('.content')?.forEach(el => el.classList.remove('active'));
    document.getElementById('step' + step)?.classList?.add('active');

    currentStep = step;
    var prevStep = document.getElementById('prevstep');
    if(step===1){
        if(!prevStep?.classList?.contains('d-none')){
            prevStep?.classList?.add('d-none');
        }
    }
    else{
        prevStep?.classList?.remove('d-none');
    }

    if (step === 3) {
        var nextStep = document.getElementById('nextstep');
        if (nextStep) { 
            nextStep.innerHTML = 'Apply Loan';
        }
    }
    else{
        var nextStep = document.getElementById('nextstep');
        if (nextStep) { 
            nextStep.innerHTML = 'Next';
        }
    }

}

function nextStep() {
    if (currentStep < 3) {
        showStep(currentStep + 1);
    } else {
        var modalElement = document.getElementById('apply-loan');
        var modalInstance = bootstrap.Modal.getInstance(modalElement);

        if (modalInstance) {
            modalInstance.hide();
        }
        setTimeout(() => {
            document.querySelectorAll('.modal-backdrop').forEach(backdrop => backdrop.remove());
            document.body.classList.remove('modal-open');
            modalElement.classList.remove("show");
            modalElement.setAttribute("aria-hidden", "true");
            modalElement.style.display = "none"; 
                var myModal = new bootstrap.Modal(document.getElementById("loanconfirm"));
                myModal.show();
        }, 300);
        closeApplyLoan();
    }
}



function prevStep() {
    if (currentStep > 1) {
        showStep(currentStep - 1);
    }
}
document.addEventListener("DOMContentLoaded", function () {
    showStep(1);
});

var identityLabel = '';
var selectedField  = '';

function showInputField(id){
    document.getElementById(id)?.classList.remove('d-none')
    if(id == 'verifyidentity'){
        window.alert(`An OTP has been sent to your ${selectedField} linked mobile number`);
    }
    else if (id == 'verifyOTP'){
        window.alert('An OTP has been sent to your registered mobile number');
    }
}

function getElementById(id){
   return document.getElementById(id);
}

identityLabelNames = {
    aadhar:'Aadhar Card',
    pan:'Pan Card',
    voter:"Voter Id",
    passport:"Passport",
    driving:"Driving Licence"
}


function showIdentityField(identityType){
    selectedField = identityLabelNames[identityType];
    identityLabel = selectedField+" Number";
    showInputField('identityinputfield');
    getElementById('identitylabel').innerText = identityLabel;
    
}

function closeApplyLoan(){
    const ids = ['verifyOTP','verifiedOTP','verifyidentity','verifiedOTP2'];
    ids?.forEach(id=>{
        var tag = getElementById(id);
        if(!tag?.classList?.contains('d-none')){
            tag?.classList?.add('d-none');
        }
    })
    currentStep = 1;
    showStep(1);
}