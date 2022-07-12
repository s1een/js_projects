const count = document.querySelector(".count");
const inputField = document.querySelector(".input_text");
const vowels = ["A", "E", "I", "O", "U", "Y"];
inputField.addEventListener("input", (event) => {
  console.log(`User input: ${inputField.value}`);
  let word = inputField.value;
  if (word !== "") {
    let countVowel = 0;
    for (const iter of word) {
      if (
        vowels.includes(iter.toLowerCase()) ||
        vowels.includes(iter.toUpperCase())
      ) {
        countVowel++;
      }
    }
    count.innerHTML = countVowel;
  }
});
