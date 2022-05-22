const nav = new DayPilot.Navigator("nav");
nav.startDate = DayPilot.Date.today();
nav.selectionDay = DayPilot.Date.today();
nav.showMonths = 3;
nav.selectMode = "Month";
nav.locale = "ru-ru";
nav.onTimeRangeSelected = function(args) {
    dp.startDate = args.start;
    dp.update();
};
nav.init();

const dp = new DayPilot.Month("dp", {
    startDate: DayPilot.Date.today(),
    locale: "ru-ru",
    onTimeRangeSelected: async function (args) {

        const colors = [
            {name: "Синий", id: "#3c78d8"},
            {name: "Зеленый", id: "#6aa84f"},
            {name: "Жёлтый", id: "#f1c232"},
            {name: "Красный", id: "#cc0000"},
        ];

        const form = [
            {name: "Текст", id: "text"},
            {name: "Цвет", id: "barColor", options: colors}
        ];

        const data = {
            text: "Событие",
            barColor: "#6aa84f"
        };

        const modal = await DayPilot.Modal.form(form, data);

        dp.clearSelection();

        if (modal.canceled) {
            return;
        }

        dp.events.add({
            start: args.start,
            end: args.end,
            id: DayPilot.guid(),
            text: modal.result.text,
            barColor: modal.result.barColor
        });

        dp.onEventClick = function(args) {
            args.preventDefault();
            dp.events.remove(args.e.id()).queue();
        };

    },
});

dp.init();
