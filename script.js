// Constants
const NIGHTFALL_CHARGES_REQ = 300;
const BASE_CHARGE_PER_SEC = 0.25;
const LOCKER_CHARGE_PER_SEC = 6;
const CHARGES_PER_TELEPORT = 10;
const CHARGES_PER_ATTACK = 20;
const CHARGES_PER_HOOK = 20;
const PLANK_MODIFIER = 1.25;
const LETTERS_MODIFIER = 1.25;
const SHINGLE_MODIFIER = 1.15;
const SKULL_MODIFIER = 1.25;

// Main calculation function
function calculateNightfall() {
  // Get checkbox values for add-ons
  const hasWoodenPlank = document.getElementById("woodenPlank").checked;
  const hasBurntLetters = document.getElementById("burntLetters").checked;
  const hasFallenShingle = document.getElementById("fallenShingle").checked;
  const hasMalthinkersSkull =
    document.getElementById("malthinkersSkull").checked;

  // Get player match data
  const teleports = parseInt(document.getElementById("teleports").value) || 0;
  const attacks = parseInt(document.getElementById("attacks").value) || 0;
  const hooks = parseInt(document.getElementById("hooks").value) || 0;
  const lockerTime = parseInt(document.getElementById("lockerTime").value) || 0;
  const injured = parseInt(document.getElementById("injured").value) || 0;

  // Calculate charges
  let remnantCharges = teleports * CHARGES_PER_TELEPORT;
  let attackCharges = hasBurntLetters
    ? attacks * CHARGES_PER_ATTACK * LETTERS_MODIFIER
    : attacks * CHARGES_PER_ATTACK;
  let hookCharges = hasWoodenPlank
    ? hooks * CHARGES_PER_HOOK * PLANK_MODIFIER
    : hooks * CHARGES_PER_HOOK;
  let lockerCharges = hasFallenShingle
    ? lockerTime * LOCKER_CHARGE_PER_SEC * SHINGLE_MODIFIER
    : lockerTime * LOCKER_CHARGE_PER_SEC;
  let injuredCharges = hasMalthinkersSkull ? injured * SKULL_MODIFIER : injured;

  // Calculate initial charges
  let charges = remnantCharges + attackCharges + hookCharges + lockerCharges;

  // Check if Nightfall is charged immediately
  let resultText = "";
  if (charges >= NIGHTFALL_CHARGES_REQ) {
    resultText = "Nightfall is already charged from match activity alone!";
  } else {
    // Calculate the time required to reach Nightfall charge
    let seconds = 0;
    while (charges < NIGHTFALL_CHARGES_REQ) {
      charges += BASE_CHARGE_PER_SEC + injuredCharges;
      seconds++;
    }
    resultText = `It would take ${seconds} seconds to charge Nightfall.`;
  }

  // Display result
  document.getElementById("results").innerHTML = `<p>${resultText}</p>`;
}

// Reset form function
function resetForm() {
  document.getElementById("nightfallForm").reset();
  document.getElementById("results").innerHTML = "";
}

// Add event listeners to calculate automatically on input change
document.querySelectorAll("#nightfallForm input").forEach((input) => {
  input.addEventListener("input", calculateNightfall);
});
