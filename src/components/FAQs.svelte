<script>
    import { FAQ, sounds } from "../globals";
</script>

<div class="accordion" id="accordionExample">
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingOne">
        <audio id="sound1" src="{sounds.info}" preload="auto"></audio>
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" onclick="document.getElementById('sound1').play();">
          {FAQ[0].question}
        </button>
      </h2>
      <div id="collapseOne" style="--bs-bg-opacity: .1;" class="bg-primary bg-gradient accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
        <div class="accordion-body">
          {FAQ[0].answer} <br><br>
          {FAQ[0].answer1} <br> 
          {FAQ[0].answer2} <br> 
          {FAQ[0].answer3} <br> 
          {FAQ[0].answer4} <br> 
          {FAQ[0].answer5} <br>
          {FAQ[0].answer6}
        </div>
      </div>
    </div>

    <div class="accordion-item">
        <h2 class="accordion-header" id="headingTwo">
            <audio id="sound1" src="{sounds.info}" preload="auto"></audio>
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" onclick="document.getElementById('sound1').play();">
                {FAQ[1].question}
            </button>
        </h2>
        <div id="collapseTwo" style="--bs-bg-opacity: .1;" class="bg-primary accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
            <div class="accordion-body">
                {FAQ[1].answer} <br>
                {FAQ[1].answer1}
            </div>
        </div>
    </div>

    <div class="accordion-item">
        <h2 class="accordion-header" id="headingThree">
            <audio id="sound1" src="{sounds.info}" preload="auto"></audio>
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree" onclick="document.getElementById('sound1').play();">
                {FAQ[2].question}
            </button>
        </h2>
        <div id="collapseThree" style="--bs-bg-opacity: .1;" class="bg-primary accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
            <div class="accordion-body">
                {FAQ[2].answer}
            </div>
        </div>
    </div>

    <div class="accordion-item">
        <h2 class="accordion-header" id="headingFour">
            <audio id="sound1" src="{sounds.info}" preload="auto"></audio>
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour" onclick="document.getElementById('sound1').play();">
                {FAQ[3].question}
            </button>
        </h2>
        <div id="collapseFour" style="--bs-bg-opacity: .1;" class="bg-primary accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
            <div class="accordion-body">
                {FAQ[3].answer}
            </div>
        </div>
    </div>

    <div class="accordion-item">
        <h2 class="accordion-header" id="headingFive">
            <audio id="sound1" src="{sounds.info}" preload="auto"></audio>
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive" onclick="document.getElementById('sound1').play();">
                {FAQ[4].question}
            </button>
        </h2>
        <div id="collapseFive" style="--bs-bg-opacity: .1;" class="bg-primary accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
            <div class="accordion-body">
                {FAQ[4].answer}
            </div>
        </div>
    </div>

    <div class="accordion-item">
        <h2 class="accordion-header" id="headingSix">
            <audio id="sound1" src="{sounds.info}" preload="auto"></audio>
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix" onclick="document.getElementById('sound1').play();">
                {FAQ[5].question}
            </button>
        </h2>
        <div id="collapseSix" style="--bs-bg-opacity: .1;" class="bg-primary accordion-collapse collapse" aria-labelledby="headingSix" data-bs-parent="#accordionExample">
            <div class="accordion-body">
                {FAQ[5].answer}
            </div>
        </div>
    </div>

    <div class="accordion-item">
        <h2 class="accordion-header" id="headingSeven">
            <audio id="sound1" src="{sounds.info}" preload="auto"></audio>
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven" onclick="document.getElementById('sound1').play();">
                {FAQ[6].question}
            </button>
        </h2>
        <div id="collapseSeven" style="--bs-bg-opacity: .1;" class="bg-primary accordion-collapse collapse" aria-labelledby="headingSeven" data-bs-parent="#accordionExample">
            <div class="accordion-body">
                {FAQ[6].answer}
            </div>
        </div>
    </div>

    <div class="accordion-item">
        <h2 class="accordion-header" id="headingSeven">
            <audio id="sound1" src="{sounds.info}" preload="auto"></audio>
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEight" aria-expanded="false" aria-controls="collapseEight" onclick="document.getElementById('sound1').play();">
                {FAQ[7].question}
            </button>
        </h2>
        <div id="collapseEight" style="--bs-bg-opacity: .1;" class="bg-primary accordion-collapse collapse" aria-labelledby="headingSeven" data-bs-parent="#accordionExample">
            <div class="accordion-body">
                {FAQ[7].answer}
            </div>
        </div>
    </div>

    <div class="accordion-item">
        <h2 class="accordion-header" id="headingSeven">
            <audio id="sound1" src="{sounds.info}" preload="auto"></audio>
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseNine" aria-expanded="false" aria-controls="collapseNine" onclick="document.getElementById('sound1').play();">
                {FAQ[8].question}
            </button>
        </h2>
        <div id="collapseNine" style="--bs-bg-opacity: .1;" class="bg-primary accordion-collapse collapse" aria-labelledby="headingSeven" data-bs-parent="#accordionExample">
            <div class="accordion-body">
                {FAQ[8].answer} <br>
                {FAQ[8].answer1}
            </div>
        </div>
    </div>

    <div class="accordion-item">
        <h2 class="accordion-header" id="headingSeven">
            <audio id="sound1" src="{sounds.info}" preload="auto"></audio>
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTen" aria-expanded="false" aria-controls="collapseTen" onclick="document.getElementById('sound1').play();">
                {FAQ[9].question}
            </button>
        </h2>
        <div id="collapseTen" style="--bs-bg-opacity: .1;" class="bg-primary accordion-collapse collapse" aria-labelledby="headingSeven" data-bs-parent="#accordionExample">
            <div class="accordion-body">
                {FAQ[9].answer}
            </div>
        </div>
    </div>
    
  </div>

<style>
    .accordion {
        margin-left: 10px;
        overflow-y: auto;
        max-height: 450px;
    }

    .accordion-button {
        color: white;
        background-color: #2b6777;
    }
</style>