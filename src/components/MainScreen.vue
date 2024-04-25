<template>
  <div
    class="mx-auto h-screen max-w-[400px] flex flex-col overflow-hidden bg-bgColor-light dark:bg-bgColor-dark duration-200"
  >
    <div
      id="actions"
      class="relative w-[240px] h-10 mx-auto mt-8 flex rounded-3xl overflow-hidden bg-bgColor-light-dark dark:bg-bgColor-dark-light"
    >
      <div
        class="absolute top-0 bottom-0 left-0 w-1/2 rounded-3xl overflow-hidden bg-bgColor-light-extraDark dark:bg-bgColor-dark-extraLight"
      ></div>
      <div class="flex flex-1 items-center justify-around z-10">
        <div
          class="cursor-pointer text-primary dark:text-textColor-extraLight hover:text-primary duration-200"
          @click="changeDarkMode('light')"
        >
          <SunIcon />
        </div>
        <div
          class="cursor-pointer text-textColor-extraDark dark:text-primary hover:text-primary duration-200"
          @click="changeDarkMode('dark')"
        >
          <MoonIcon />
        </div>
        <div
          class="cursor-pointer text-textColor-extraDark dark:text-textColor-extraLight hover:text-primary duration-200"
          @click=""
        >
          <ClockIcon />
        </div>
        <div
          class="cursor-pointer text-textColor-extraDark dark:text-textColor-extraLight hover:text-primary duration-200"
          @click="resetAll"
        >
          <ReloadIcon />
        </div>
      </div>
    </div>
    <div
      ref="screenView"
      class="no-scrollbar flex flex-col flex-1 px-8 pt-2 pb-3 items-end justify-between text-textColor-extraDark dark:text-textColor-extraLight overflow-y-scroll"
    >
      <div class="flex w-full flex-col text-end">
        <span
          v-for="(history, index) in histories"
          :key="index"
          class="font-medium"
          >{{ history.expression }}= {{ history.result }}</span
        >
      </div>
      <div class="mt-10 flex w-full flex-col items-end">
        <p
          contenteditable
          ref="input"
          class="w-full block text-end font-bold bg-[transparent] border-none outline-none overflow-hidden resize-none break-all pointer-events-none leading-none"
          :class="[activeInput ? 'text-2xl' : 'text-base opacity-70']"
        >
          {{ expression }}
        </p>
        <span
          ref="resultView"
          class="text-end font-bold duration-200 cursor-pointer"
          :class="[
            activeInput ? 'text-lg opacity-70' : 'text-[22px]',
            { hidden: result == null },
          ]"
          @click="
            () => {
              activeInput = false;
              createHistory();
            }
          "
          >={{ result }}</span
        >
      </div>
    </div>
    <div
      class="h-[60%] max-h-[350px] px-8 py-6 flex flex-col justify-between bg-bgColor-light-dark dark:bg-bgColor-dark-light"
    >
      <div
        v-for="(buttons, index) in BUTTONS"
        :key="index"
        class="flex items-center justify-between"
      >
        <UIButton
          v-for="(btn, index) in buttons"
          :key="index"
          v-bind="btn"
          @click="actionBtn(btn.value)"
        />
      </div>

      <div class="flex items-center justify-between">
        <UIButton value="" class="opacity-0 cursor-auto" />
        <UIButton value="0" @click="actionBtn('0')" />
        <UIButton value="." font-size="text-2xl" @click="actionBtn('.')" />
        <UIButton
          value="="
          variant="circle"
          color="primary"
          @click="
            () => {
              activeInput = false;
              calculate();
              createHistory();
            }
          "
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SunIcon from "@icons/sun.svg";
import MoonIcon from "@icons/moon.svg";
import ClockIcon from "@icons/clock.svg";
import ReloadIcon from "@icons/reload.svg";
import { BUTTONS } from "@/constant";

import { onMounted, ref, watch } from "vue";
import { useHistoryStore, useThemeStore } from "@/stores";
import { storeToRefs } from "pinia";
import UIButton from "./UIButton.vue";
const { theme } = storeToRefs(useThemeStore());
const { histories } = storeToRefs(useHistoryStore());

const input = ref<HTMLTextAreaElement | null>(null);
const resultView = ref<HTMLSpanElement | null>(null);
const screenView = ref<HTMLDivElement | null>(null);
const expression = ref("0");
const result = ref<string | null>(null);
const activeInput = ref(true);
const operators = "/*-+";

const actionBtn = (character: string) => {
  const length = expression.value.length;

  if (activeInput.value == false) {
    activeInput.value = true;
    if (!isNaN(parseInt(character))) expression.value = "";
    else expression.value = result.value ?? "0";
  }

  switch (character) {
    case "AC":
      resetAll();
      break;
    case "⌫":
      if (expression.value != "0") {
        expression.value = expression.value.slice(0, -1);
      }
      break;
    case "%":
      if (!operators.includes(expression.value[length - 1])) {
        const lastOperand = expression.value.split(/[\+\-\*\/]/).pop() ?? "0";
        const preResult = eval(
          expression.value.replace(/[\+\-\*\/]\d+(\.\d+)?$/, "")
        );
        const percent = fixFloat((parseFloat(lastOperand) * preResult) / 100);

        expression.value = expression.value.replace(/\d+(\.\d+)?$/, percent);
      }
      break;
    case ".":
      const lastOperand = expression.value.split(/[\+\-\*\/]/).pop() ?? "0";
      if (!lastOperand.includes(".")) {
        expression.value += character;
      }
      break;
    default:
      if (expression.value == "0") {
        if (character == "-" || !isNaN(parseInt(character))) {
          expression.value = character;
        } else if (operators.includes(character)) {
          expression.value += character;
        }
      } else {
        if (!isNaN(parseInt(character))) {
          expression.value += character;
        } else if (operators.includes(character)) {
          expression.value = operators.includes(expression.value[length - 1])
            ? replaceAt(expression.value, character, length - 1)
            : expression.value + character;
        }
      }
      break;
  }
};

const replaceAt = (str: string, replacement: string, index: number) => {
  return (
    str.substring(0, index) +
    replacement +
    str.substring(index + replacement.length)
  );
};

const calculate = () => {
  if (!isNaN(parseInt(expression.value[expression.value.length - 1]))) {
    result.value = fixFloat(eval(expression.value));
  }
};

const fixFloat = (number: number) => {
  if (number.toString().includes("."))
    return number
      .toFixed(14)
      .toString()
      .replace(/(\.\d*?[1-9])0*$/, "$1");
  return number.toString();
};

const resetAll = () => {
  expression.value = "0";
  result.value = null;
};

const createHistory = () => {
  histories.value.push({
    expression: expression.value,
    result: result.value!,
  });
};

const changeDarkMode = (mode: "light" | "dark") => {
  theme.value = mode;
};

watch(expression, () => {
  calculate();
  screenView.value!.scrollTop = screenView.value!.scrollHeight;
});

onMounted(() => {
  screenView.value!.scrollTop = screenView.value!.scrollHeight;
});
</script>

<style>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
