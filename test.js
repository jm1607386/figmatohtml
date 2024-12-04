const INDICATOR_COUNT = 8;
const POST_URL = "https://bluemodo.leadspediatrack.com/post.do";

// states of active indicator
let activeIndicator = 0;    // current one
let prevActiveIndicator = 0;    // previous one

$(document).ready(() => {
    let indicatorList = $("#indicatorList");
    for (let i = 0; i < INDICATOR_COUNT; i++) {
        indicatorList.append(`<div class='indicator' id='indicator${i}'></div>`);
        $(`#indicator${i}`).click(() => {
            setIndicatorActive(i);
        });
    }

    $("#indicator0").addClass("ind-active");
})

setIndicatorActive = (index) => {
    activeIndicator = index;
    for (let i = 0; i <= index; i++) {
        $(`#indicator${i}`).addClass("ind-active")
    }
    for (let i = index + 1; i < INDICATOR_COUNT; i++) {
        $(`#indicator${i}`).removeClass("ind-active");
    }

    $(`.question-div-${prevActiveIndicator + 1}`).removeClass("active-question");
    $(`.question-div-${prevActiveIndicator + 1}`).addClass("question");

    $(`.question-div-${activeIndicator + 1}`).removeClass("question");
    $(`.question-div-${activeIndicator + 1}`).addClass("active-question");

    if (index === 7) {
        $(`.btn-prev`).html(`<img src="./assets/Refresh Icon.svg" /> Review`);
        $(`.btn-next`).html(`Submit Answers <img src="./assets/Next Icon.svg" />`);
    } else {
        $(`.btn-prev`).html(`<img src="./assets/Back Icon.svg" /> Go Back`);
        $(`.btn-next`).html(`Next Question <img src="./assets/Next Icon.svg" />`);
    }

    if (index === 0) {
        $(`.btn-prev`).prop('disabled', true);
    } else {
        $(`.btn-prev`).prop('disabled', false);
    }
}

onPrevQuestion = () => {
    prevActiveIndicator = activeIndicator;
    activeIndicator = activeIndicator === 7 ? 0 : activeIndicator === 0 ? 7 : (activeIndicator - 1) % 8;
    setIndicatorActive(activeIndicator);
}

onNextQuestion = async () => {
    if (activeIndicator === 7) {
        if (validateForm()) {
            submitLeadForm();
        }
        return;
    }
    if (activeIndicator === 1) {
        let zipcode = $("#input_zip").val();
        let stateData = await getStateFromZipcode(zipcode);
        $("#input_address").val(`${stateData?.city}, ${stateData?.state}`);
        console.log(stateData);
    }
    prevActiveIndicator = activeIndicator
    activeIndicator = (activeIndicator + 1) % 8;
    setIndicatorActive(activeIndicator);
}

validateForm = async () => {
    let firstName = $("#input_first_name").val();
    let lastName = $("#input_last_name").val();
    let email = $("#input_email").val();
    let phoneNumber = $("#input_phone").val();
    let isValid = true;

    // validate first name
    if (firstName.trim() === '') {
        $("#input_first_name").addClass('is-invalid');
        isValid = false;
    } else {
        $("#input_first_name").removeClass('is-invalid');
    }

    // validate last name
    if (lastName.trim() === '') {
        $("#input_last_name").addClass('is-invalid');
        isValid = false;
    } else {
        $("#input_last_name").removeClass('is-invalid');
    }

    // validate email
    let isValidEmail = true;
    try {
        isValidEmail = await checkValidEmail(email);
    } catch (e) {
        isValidEmail = false;
    }

    if (!isValidEmail) {
        $("#input_email").addClass('is-invalid');
        isValid = false;
    } else {
        $("#input_email").removeClass('is-invalid');
    }

    // validate phone number
    let isValidPhone = true;
    try {
        isValidPhone = await validatePhoneNumber(phoneNumber);
    } catch (e) {
        isValidPhone = false;
    }
    if (!isValidPhone) {
        $("#input_phone").addClass('is-invalid');
        isValid = false;
    } else {
        $("#input_phone").removeClass('is-invalid');
    }

    return isValid;
}

submitLeadForm = async () => {
    let propertyValue = $('input[name="q-1"]:checked').val();
    let installationPreference = $('input[name="q-3"]:checked').val();
    let checkedDesiredFeatures = $('input[name="q-4"]:checked');
    let desiredFeatures = [];
    let system = $('input[name="q-5"]:checked').val();
    let entrances = $('input[name="q-6"]:checked').val();

    for (let i = 0; i < checkedDesiredFeatures.length; i++) {
        desiredFeatures.push(checkedDesiredFeatures[i].value)
    };

    let firstName = $("#input_first_name").val();
    let lastName = $("#input_last_name").val();
    let email = $("#input_email").val();
    let phoneNumber = $("#input_phone").val();
    let address = $("#input_address").val();
    let zipcode = $("#input_zip").val();
    let city = address.split(',')[0];
    let state = address.split(',')[1];

    const campaignId = "64b9ccf73e38c";
    const campaignKey = "mYFhzwtX7LKWBGgD34Tb";
    const postURL = "https://bluemodo.leadspediatrack.com/post.do";

    //
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    let lp_s1 = params.get("s1");
    let lp_s2 = params.get("s2");
    let lp_s3 = params.get("s3");
    let lp_s4 = params.get("s4");
    let lp_s5 = params.get("s5");

    let data = {
        lp_campaign_id: campaignId,
        lp_campaign_key: campaignKey,
        lp_s1: 'test', // lp_s1,
        lp_s2: 'subid2', // lp_s2,
        lp_s3: 'subid3', // lp_s3,
        lp_s4: 'subid4', // lp_s4,
        lp_s5: 'subid5', // lp_s5,
        lp_test: 1,
        first_name: "test", //firstName,
        last_name: lastName,
        phone_home: phoneNumber,
        address: address,
        city: city,
        state: state,
        zip_code: zipcode,
        email_address: email,
        property_type: propertyValue,
        installation_preference: installationPreference,
        features: desiredFeatures,
        system_type: system,
        entrances: entrances
    };

    let response = await fetch(postURL, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        }
    });

    console.log(response);
}

checkValidEmail = async (email) => {
    const key = "6640d61fec4b4098b24a95538cf33861";
    const emailURL = `https://emailvalidation.abstractapi.com/v1/?api_key=${key}&email=${email}`;
    try {
        let response = await fetch(emailURL);
        if (!response.ok) {
            throw new Error('Request failed');
        }
        let data = await response.json();
        return data?.is_valid_format?.value || false;
    } catch (e) {
        console.log(e);
        return false;
    }
}

validatePhoneNumber = async (phoneNumber) => {
    const apiKey = "5f376bebb27cb0257abf0c0f1a0dc8b9";
    const apiUrl = `http://apilayer.net/api/validate?access_key=${apiKey}&number=${phoneNumber}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Request failed');
        }
        const data = await response.json();
        return data.valid;
    } catch (error) {
        console.log(error);
        return false;
    }
}

getStateFromZipcode = async (zipCode) => {
    const url = `https://api.zippopotam.us/us/${zipCode}`;

    try {
        let response = await fetch(url, { method: 'GET' });
        let data = await response.json();
        const city = data.places[0]["place name"];
        const state = data.places[0].state;
        return { city, state };
    } catch (e) {
        console.log(e);
    }
}