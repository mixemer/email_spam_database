<script>
    import { data } from "../dummy_data";

    let fields = { nameVar: '', email: '', scam_email: '', info: '', }
    let errors = { nameVar: '', email: '', scam_email: '', info: '', }
    let valid = false;

    const submitHandler = () => {
        valid = true;

        //Name field
        if (fields.nameVar.trim().length == 0) {
            valid = false;
            errors.nameVar = 'Name cannot be empty!';
        } else {
            errors.nameVar = '';
        }

        //Email field
        if (fields.email.trim().length < 4) {
            valid = false;
            errors.email = 'Email must be at least 4 characters long!';
        } else {
            errors.email = '';
        }

        //Scam email field
        if (fields.scam_email.trim().length < 4) {
            valid = false;
            errors.scam_email = 'Scam email must be at least 4 characters long!';
        } else {
            errors.scam_email = '';
            console.log('test');
        }

        //Scam information field
        if (errors.info.trim().length == 0) {
            valid = false;
            errors.info = 'Scam information field cannot be empty!'
        } else {
            errors.info = '';
        }

        if (valid) {
            console.log('valid', fields);
        }
    }
</script>

<div class="body">
    <h1 id="header">Scam Email Ticket</h1>
    <form id="input-area" on:submit|preventDefault={submitHandler}>
        <p id="info">Your Information</p>
        <div id="name">Name:
            <input type="text" id="name-input" bind:value={fields.nameVar}>
        </div>
        <div class="error">{ errors.nameVar }</div>
        <div id="email">Email:
            <input type="text" id="email-input" bind:value={fields.email}>
        </div>
        <div class="error">{ errors.email }</div>
        <p id="scam-info">Scam Information:</p>
        <div id="scam-email">Scam Email:
            <input type="text" id="scam-email-input" bind:value={fields.scam_email}>
        </div>
        <div class="error">{ errors.scam_email }</div>
        <div id="event-info">Information about the event:
            <textarea class="event-info-input" bind:value={fields.info}></textarea>
        </div>
        <div class="error">{ errors.info }</div>
        <button class="btn btn-success" type="submit">Send</button>
    </form>
</div>

<style>
    .body {
        width: 700px;
        height: auto + 30px;
        border: solid;
        border-radius: 5px;
        padding: 25px 50px;
        margin: 15px auto 0 auto;
        background-color: #2B6777;
        color: white;
        font-size: 16px;
    }
    #header {
        text-align: center;
        margin-bottom: 20px;
    }
    #info {
        margin-top: 20px;
        margin-bottom: 15px;
        font-weight: bold;
        font-size: 18px;
    }
    #input-area {
        margin-top: 20px;
    }
    .error {
        text-align: right;
        margin-bottom: 20px;
    }
    #name {
        text-align: center;
        display: flex;
        justify-content: space-between;
    }
    #name-input {
        border-radius: 10px;
        max-height: 20px;
        min-width: 250px;
    }
    #email {
        margin-top: 10px;
        text-align: center;
        display: flex;
        justify-content: space-between;
    }
    #email-input {
        border-radius: 10px;
        max-height: 20px;
        min-width: 250px;
    }
    #scam-info {
        margin-top: 50px;
        margin-bottom: 15px;
        font-weight: bold;
        font-size: 18px;
    }
    #scam-email {
        margin-top: 10px;
        text-align: center;
        display: flex;
        justify-content: space-between;
    }
    #scam-email-input {
        border-radius: 10px;
        max-height: 20px;
        min-width: 250px;
    }
    #event-info {
        margin-top: 15px;
        text-align: center;
        display: flex;
        justify-content: space-between;
    }
    .event-info-input {
        border-radius: 10px;
        min-height: 125px;
        min-width: 250px;
    }
    .btn-success {
        margin-top: 40px;
        margin-bottom: 10px;
        margin-left: 31%;
        width: 225px;
    }
</style>