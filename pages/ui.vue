<template>
  <div class="p-8 flex flex-col gap-4 justify-center w-full">
    <h1>PANE</h1>
    <UiPane>
      <div class="w-full flex justify-right pr-6">
        <UiLed :type="3"/>
      </div>

    </UiPane>



    <h1 class="pt-8">BUTTONS: SQUARE</h1>
    <div class="flex gap-4">
      <UiButtonSquare :variation="1">
        <template v-slot:label>
          LABEL
        </template>
      </UiButtonSquare>

      <UiButtonSquare :variation="2" align="top">
        <template v-slot:label>
          LABEL
        </template>
      </UiButtonSquare>

      <UiButtonSquare :variation="3" align="top">
        <template v-slot:label>
          LABEL
        </template>
      </UiButtonSquare>

      <UiButtonSquare :variation="3" align="top">
        <template v-slot:label>
          LABEL
        </template>
        <template v-slot:led>
          <UiLed :type="3"/>
        </template>
      </UiButtonSquare>

    </div>

    <h1 class="pt-8">BUTTONS: RECTANGLE</h1>
    <div class="flex gap-4">
    <div class="w-40">
      <UiButtonRect :variation="1">
        Sound
      </UiButtonRect>
      </div>
      <div class="w-40">
      <UiButtonRect :variation="2">
        Sound
      </UiButtonRect>
      </div>
    </div>

    <h1 class="pt-8">PUNCH HOLES</h1>
    <div class="flex gap-4">
      <UiPunchHole style="color:red;"/>
    </div>

    <h1 class="pt-8">LEDS</h1>
    <div class="flex gap-4">
      <UiLed/>
      <UiLed :type="1"/>
      <UiLed :type="2"/>
      <UiLed :type="3"/>
    </div>

    <h1 class="pt-8">LABELS</h1>
    <div class="flex gap-4">
      <UiLabel>
        Label
      </UiLabel>
      <UiLabel :type="1">
        Label
      </UiLabel>
      <UiLabel :type="2">
        Label
      </UiLabel>
<!--      <UiLabel :type="3"/>-->
    </div>


  </div>
</template>