const Profile = require("../model/Profile");

module.exports = {
  async index(request, response) {
    return response.render("profile", { profile: await Profile.get() });
  },
  async update(request, response) {
    const profile =  await Profile.get()
    // request.body para pegar os dados
    const data = request.body;
    // definir quantas semanas tem um ano: 52
    const weekPerYear = 52;
    // remover as semanas de ferias no ano, para pegar quantas semanas tem em um mês
    const weeksPerMonth = (weekPerYear - data["vacation-per-year"]) / 12;
    // quantas horas por semana estou trabalhando
    const weekTotalHours = data["hours-per-day"] * data["days-per-week"];
    // total de horas trabalhadas no mês
    const monthlyTotalHours = weekTotalHours * weeksPerMonth;
    // Qual sera o valor da minha hora
    valueHours = data["monthly-budget"] / monthlyTotalHours;

    await Profile.update({
        ...profile,
        ...request.body,
        "value-hours": valueHours
    });

    return response.redirect("/profile");
  },
};
