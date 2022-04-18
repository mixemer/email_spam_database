<script>

</script>

<div class="body">
    <h1 id="header">Scam Email Ticket</h1>
    <form id="input-area">
        <p id="info">Your Information</p>
        <div id="name">Name:
            <input type="text" id="name-input">
        </div>
        <div id="email">Email:
            <input type="text" id="email-input">
        </div>
        <p id="scam-info">Scam Information:</p>
        <div id="scam-email">Scam Email:
            <input type="text" id="scam-email-input">
        </div>
        <div id="event-info">Information about the event:
            <textarea class="event-info-input"></textarea>
        </div>
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