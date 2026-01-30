export default {
  uid: "flashguys-calendario",
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
        date: "2026-01-30T00:00:00.000Z",
        day: 30,
        month: 1,
        year: 2026,
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
