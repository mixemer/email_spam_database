<script>
    import { data } from "../dummy_data";
    import { scam_types, sounds, Anonymous } from "../globals";
    import Toast from "./Toast.svelte"

    let fields = { nameVar: "", email: "", scam_email: '', type_of_scam: '', info: '', }
    let errors = { nameVar: '', email: '', scam_email: '', type_of_scam: '', info: '', }
    let valid = false;

    var successSound = new Audio(sounds.success)
    var errorSound = new Audio(sounds.error)

    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    const submitHandler = () => {
        valid = true;

        //Name field
        // if (fields.nameVar.trim().length == 0) {
        //     fields.nameVar = Anonymous;
        //     // valid = false;
        //     // errors.nameVar = 'Name cannot be empty!';
        // } else {
        //     errors.nameVar = '';
        // }

        // //Email field
        // if (fields.email.trim().length < 4) {
        //     fields.email = Anonymous;
        //     // valid = false;
        //     // errors.email = 'Email must be at least 4 characters long!';
        // } else {
        //     errors.email = '';
        // }

        //Scam email field
        if (fields.scam_email.trim().length < 4) {
            valid = false;
            errors.scam_email = 'Scam email must be at least 4 characters long!';
        } else {
            if (!validateEmail(fields.scam_email.trim())) {
                errors.scam_email = 'Please put a valid email adress!';
                valid = false;
            } else {
                errors.scam_email = '';
            }
        }

        //Type of scam field
        if (fields.type_of_scam.length == 0) {
            valid = false;
            errors.type_of_scam = 'You must select a type of scam!';
        } else {
            errors.type_of_scam = '';
        }

        if (valid) {
            submitFields();
        } else {
            errorSound.play();
        }
    }


    function submitFields() {
        if (fields.nameVar.trim().length == 0) {
            fields.nameVar = Anonymous;
        }
        if (fields.email.trim().length < 4) {
            fields.email = Anonymous;
        }

        for(let i = 0; i < data.length; i++) {
            //If the scam email is already reported
            if(fields.scam_email == data[i].email && scam_types[fields.type_of_scam].scam_name == data[i].type_of_scam) {
                data[i].report_count++;
                var toastLiveExample = document.getElementById('liveToastSuccess')
                var toast = new bootstrap.Toast(toastLiveExample)
                toast.show()
                successSound.play()
                return;
            }
        }
        //If the scam email is not reported
        const newData = { id: data.length + 1, email: fields.scam_email, type_of_scam: scam_types[fields.type_of_scam].scam_name, report_count: "1", first: "2022", commentLog: [] };
        data.push(newData);

        var toastLiveExample = document.getElementById('liveToastSuccess')
        var toast = new bootstrap.Toast(toastLiveExample)
        toast.show()
        successSound.play()
        
        fields = { nameVar: "", email: "", scam_email: '', type_of_scam: '', info: '', }
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
        <div id="scam-type"> Scam type:
            <div id="type-container">
                <select bind:value={fields.type_of_scam} class="select-picker" aria-label="Default select example">
                    <option selected>Pick the type of scam</option>
                    {#each scam_types as { scam_name }, i}
                        <option value="{i}">{scam_name}</option>
                    {/each}
                </select>
            </div>
        </div>
        <div class="error">{ errors.type_of_scam }</div>
        <button class="btn btn-success" type="submit">Send</button>
    </form>

    <!-- Toasts -->
	<Toast title="Scam Email Submitted" success={true}/>
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
    #scam-type {
        margin-top: 10px;
        text-align: center;
        display: flex;
        justify-content: space-between;
    }
    #type-container {
        border-radius: 10px;
        width: 250px;
    }
    .select-picker {
        font-size: 15px;
        border-radius: 10px;
        max-height: 45px;
        width: 250px;
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
    .btn-success {
        margin-top: 40px;
        margin-bottom: 10px;
        margin-left: 31%;
        width: 225px;
    }
    .error {
        color: red;
    }
</style>