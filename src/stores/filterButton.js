import { defineStore } from 'pinia';

export const useFiltersStore = defineStore({
  id: 'filterButton',
  state: () => ({
    buttonTextArray: [],
    buttonStates: {},
    ageArray: ['Petite enfance', 'Primaire', 'Collège', 'Lycée', 'Jeune adulte'],
    thematiqueArray: ['Addiction', 'Violence', 'Discrimination', 'Harcèlement', 'Santé mentale', 'Sexualité'],
    perimetersArray: ['Municipal', 'Départemental', 'Régional', 'National'],
    selectedAgeButtons: [],
    selectedThematiqueButtons: [],
    selectedPerimeterButtons: [],
  }),
  getters: {
    getAgeFilters: (state) => state.buttonTextArray,
    getButtonState: (state) => (buttonText) => state.buttonStates[buttonText] || false,
    getSelectedAgeButtons: (state) => state.selectedAgeButtons,
    getSelectedThematiqueButtons: (state) => state.selectedThematiqueButtons,
    getSelectedPerimeterButtons: (state) => state.selectedPerimeterButtons,
  },
  actions: {
    toggleButtonState(buttonText) {
      this.buttonStates[buttonText] = !this.buttonStates[buttonText];
      if (this.ageArray.includes(buttonText)) {
        this.toggleAgeButton(buttonText);
      } else if (this.thematiqueArray.includes(buttonText)) {
        this.toggleThematiqueButton(buttonText);
      } else if (this.perimetersArray.includes(buttonText)) {
        this.togglePerimeterButton(buttonText);
      }
    },
    toggleAgeButton(buttonText) {
      if (this.selectedAgeButtons.includes(buttonText)) {
        this.selectedAgeButtons.splice(this.selectedAgeButtons.indexOf(buttonText), 1);
      } else {
        this.selectedAgeButtons.push(buttonText);
      }
    },
    toggleThematiqueButton(buttonText) {
      if (this.selectedThematiqueButtons.includes(buttonText)) {
        // eslint-disable-next-line max-len
        this.selectedThematiqueButtons.splice(this.selectedThematiqueButtons.indexOf(buttonText), 1);
      } else {
        this.selectedThematiqueButtons.push(buttonText);
      }
    },
    togglePerimeterButton(buttonText) {
      const isSelected = this.selectedPerimeterButtons.includes(buttonText);
      this.perimetersArray.forEach((perimeter) => {
        if (perimeter !== buttonText) {
          this.buttonStates[perimeter] = false;
        }
      });

      if (isSelected) {
        this.selectedPerimeterButtons = [];
      } else {
        this.selectedPerimeterButtons = [buttonText];
      }
    },
    clearAllButtons() {
      this.buttonStates = {};

      this.selectedAgeButtons = [];
      this.selectedThematiqueButtons = [];
      this.selectedPerimeterButtons = [];
    },
  },
});
