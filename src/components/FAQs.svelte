<script>
    import { FAQ } from "../globals";
</script>

<div class="accordion" id="accordionExample">
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingOne">
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          {FAQ[0].question}
        </button>
      </h2>
      <div id="collapseOne" style="--bs-bg-opacity: .1;" class="bg-primary bg-gradient accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
        <div class="accordion-body">
          {FAQ[0].answer}
        </div>
      </div>
    </div>
    <div class="accordion-item">
        <h2 class="accordion-header" id="headingTwo">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                {FAQ[1].question}
            </button>
        </h2>
        <div id="collapseTwo" style="--bs-bg-opacity: .1;" class="bg-primary accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
            <div class="accordion-body">
                {FAQ[1].answer}
            </div>
        </div>
    </div>

    <div class="accordion-item">
        <h2 class="accordion-header" id="headingThree">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseTwo">
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
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseTwo">
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
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseTwo">
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
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseTwo">
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
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeven" aria-expanded="false" aria-controls="collapseTwo">
                {FAQ[6].question}
            </button>
        </h2>
        <div id="collapseSeven" style="--bs-bg-opacity: .1;" class="bg-primary accordion-collapse collapse" aria-labelledby="headingSeven" data-bs-parent="#accordionExample">
            <div class="accordion-body">
                {FAQ[6].answer}
            </div>
        </div>
    </div>
    
  </div>

<style>
    .accordion {
        margin-left: 10px;
    }
</style>