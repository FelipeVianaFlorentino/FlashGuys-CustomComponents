export default {
  editor: {
    label: {
      en: "Calendar",
      pt: "Calendário",
    },
  },
  triggerEvents: [
    {
      name: "dateSelected",
      label: {
        en: "On date selected",
        pt: "Ao selecionar data",
      },
      event: {
        date: "",
        day: 0,
        month: 0,
        year: 0,
      },
    },
  ],
  properties: {
    primaryColor: {
      label: {
        en: "Primary color",
        pt: "Cor primária",
      },
      type: "Color",
      defaultValue: "#667eea",
    },
    secondaryColor: {
      label: {
        en: "Secondary color",
        pt: "Cor secundária",
      },
      type: "Color",
      defaultValue: "#764ba2",
    },
  },
};
